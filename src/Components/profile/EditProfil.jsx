import { useContext, useRef, useState } from 'react'
import "./EditProfil.css"
import { GlobalContext } from '../../config/GlobalState'
import logApi from '../../api/logApi'
import getLoggedUser from '../../config/getLoggedUser'
import { compressAccurately } from 'image-conversion'

export default function EditProfile() {
  const token = JSON.parse(localStorage.getItem('token'))
  const { loggedUser, setLoggedUser } = useContext(GlobalContext)
  const [images, setImages] = useState()
  const [imagesPreview, setImagesPreview] = useState(loggedUser.profilePictureUrl)

  const loggedNameRef = useRef(loggedUser ? loggedUser.name : null)
  const loggedUsernameRef = useRef(loggedUser ? loggedUser.username : null)
  const loggedEmailRef = useRef(loggedUser ? loggedUser.email : null)
  const loggedPhoneNumberRef = useRef(loggedUser ? loggedUser.phoneNumber : null)
  const loggedBioRef = useRef(loggedUser ? loggedUser.bio : null)
  const loggedWebsiteRef = useRef(loggedUser ? loggedUser.website : null)

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

  async function editProfile(e) {
    try {
      e.preventDefault()

      let imageUrl = { url: loggedUser.profilePictureUrl }
      if (images) {
        const formData = new FormData()
        formData.append('image', images)

        imageUrl = await logApi.uploadImage(formData, token)
      }
      // * API Update User Profile
      const data = {
        name: loggedNameRef.current.value,
        username: loggedUsernameRef.current.value,
        email: loggedEmailRef.current.value,
        profilePictureUrl: imageUrl.url,
        phoneNumber: loggedPhoneNumberRef.current.value,
        bio: loggedBioRef.current.value,
        website: loggedWebsiteRef.current.value,
      }

      const updateUserProfile = await logApi.updateUserProfile(data, token)

      // * Update User Data
      const loggedUser2 = await getLoggedUser(token)
      setLoggedUser(loggedUser2)
      alert('Edit Profile Success')
    } catch (err) {
      alert(err.response.data.message)
    }
  }

  return (
    <section id="editprofile" className="editprofile min-vh-100 mb-5 mb-sm-0 d-flex">
      <div className="editprofile__wrap">
        <div className="editprofile__wrap-title d-flex flex-column justify-content-center align-items-center">
          <p className="text-primary fw-bold fs-2 m-0">Edit Profile</p>
          <img src={imagesPreview} alt="" />
          <div className="input-upload">
            <label htmlFor="chooseImage" className="form-label">
              <i className="bx bxs-cloud-upload"></i> Choose Image
            </label>
            <input id="chooseImage" type="file" accept="image/*" onChange={(e) => handleImages(e)} className="form-control" required />
          </div>
        </div>
        <form className="editprofile__wrap-form">
          <div className="input-box">
            <span className="input-box__icon">
              <i className="bx bxs-id-card"></i>
            </span>
            <input ref={loggedNameRef} defaultValue={loggedUser.name} type="text" autoComplete="new-password" required />
            <label>Name</label>
          </div>
          <div className="input-box">
            <span className="input-box__icon">
              <i className="bx bxs-user"></i>
            </span>
            <input ref={loggedUsernameRef} defaultValue={loggedUser.username} type="text" autoComplete="new-password" required />
            <label>Username</label>
          </div>
          <div className="input-box">
            <span className="input-box__icon">
              <i className="bx bxs-envelope"></i>
            </span>
            <input ref={loggedEmailRef} defaultValue={loggedUser.email} type="email" autoComplete="new-password" required />
            <label>Email</label>
          </div>
          <div className="input-box">
            <span className="input-box__icon">
              <i className="bx bxs-phone"></i>
            </span>
            <input ref={loggedPhoneNumberRef} defaultValue={loggedUser.phoneNumber} type="number" autoComplete="new-password" required />
            <label>Phone Number</label>
          </div>
          <div className="input-box">
            <span className="input-box__icon">
              <i className="bx bxs-notepad"></i>
            </span>
            <input ref={loggedBioRef} defaultValue={loggedUser.bio} type="text" autoComplete="new-password" required />
            <label>Bio</label>
          </div>
          <div className="input-box">
            <span className="input-box__icon">
              <i className="bx bx-globe"></i>
            </span>
            <input ref={loggedWebsiteRef} defaultValue={loggedUser.website} type="text" autoComplete="new-password" required />
            <label>Website</label>
          </div>
          <button type="submit" className="btn btn-primary w-100 p-2" onClick={(e) => editProfile(e)}>
            Submit
          </button>
        </form>
      </div>
    </section>
  )
}
