import { useRef, useState } from 'react'
import logApi from '../../api/logApi'
import { compressAccurately } from 'image-conversion'
import "./CreatePostModal.css"

export default function CreatePostModal() {

  const [images, setImages] = useState()
  const [imagesPreview, setImagesPreview] = useState()
  const createPostCaptionRef = useRef()

  const token = JSON.parse(localStorage.getItem('token'))

  async function handleImages(e) {
    if (e.target.files[0].size > 900 * 900) {
      const compressedImageBlob = await compressAccurately(e.target.files[0], 900)
      const compressedImage = new File([compressedImageBlob], 'photologue-compressed-image', { type: 'image/jpeg' })
      setImages(compressedImage)
      setImagesPreview(URL.createObjectURL(compressedImage))
    } else {
      setImagesPreview(URL.createObjectURL(e.target.files[0]))
      setImages(e.target.files[0])
    }
  }

  async function createPost(e) {
    e.preventDefault()

    const formData = new FormData()
    formData.append('image', images)

    const imageUrl = await logApi.uploadImage(formData, token)

    const data = {
      imageUrl: imageUrl.url,
      caption: createPostCaptionRef.current.value,
    }

    const newPost = await logApi.createPost(data, token)
    alert(newPost.message)
    window.location.reload()
  }
  return (
    <div className="modal fade createPost" id={`createPostModal`} tabIndex={-1} aria-labelledby="createPostModalLabel" aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered modal-xl modal-fullscreen-sm-down">
        <div className="modal-content border-primary">
          <div className="modal-header">
            <h1 className="modal-title fs-5 text-primary" id="createPostModalLabel">
              Create Post
            </h1>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            <form>
              <div className="input-upload">
                <label htmlFor={`chooseImageCreatePost`} className="form-label">
                  <i className="bx bxs-cloud-upload"></i> Choose Image
                </label>
                <input id={`chooseImageCreatePost`} type="file" accept="image/*" onChange={(e) => handleImages(e)} className="form-control" required />
              </div>
              <div className="input-box">
                <span className="input-box__icon">
                  <i className="bx bxs-edit"></i>
                </span>
                <input ref={createPostCaptionRef} type="text" autoComplete="new-password" required />
                <label>Caption</label>
              </div>
            </form>
            <div className="mb-3 image-preview d-flex justify-content-center">
              {images && (
                <>
                  <img src={imagesPreview} alt="" />
                </>
              )}
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-primary" onClick={(e) => createPost(e)}>
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
