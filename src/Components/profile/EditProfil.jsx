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
      <div className="container-fluid editprofile__wrap d-flex" id="editprofile">
   
        <div className="row container-fluid d-block d-lg-flex">
        <div className="col-12 col-lg-5">
          <div className="editprofile__wrap-title text-center">
          <p className="text-primary fw-bold fs-2 my-3">Edit Profile</p>
            <img src={imagesPreview} alt="" />
            <div className="input-upload col-8 col-md-6 col-lg-10 m-auto">
              <label htmlFor="chooseImage" className="form-label">
              <i className="bx bxs-cloud-upload"></i> Choose Image
              </label>
              <input id="chooseImage" type="file" accept="image/*" onChange={(e) => handleImages(e)} className="form-control" required />
            </div>
          </div>
          </div>
          
          <div className="col-12 col-lg-5 d-flex justify-content-center align-items-center position-relative">
              <form className="editprofile__wrap-form">
                <div className="input-box">
                  <label>Name</label>
                  <span className="input-box__icon">
                  <i className="bx bxs-id-card"></i>
                  </span>
                  <input ref={loggedNameRef} defaultValue={loggedUser.name} type="text" autoComplete="new-password" required />
                </div>
                <div className="input-box">
                  <label>Username</label>
                  <span className="input-box__icon">
                  <i className="bx bxs-user"></i>
                  </span>
                  <input ref={loggedUsernameRef} defaultValue={loggedUser.username} type="text" autoComplete="new-password" required />
                </div>
                <div className="input-box">
                  <label>Email</label>
                  <span className="input-box__icon">
                  <i className="bx bxs-envelope"></i>
                  </span>
                  <input ref={loggedEmailRef} defaultValue={loggedUser.email} type="email" autoComplete="new-password" required />
                </div>
                  <div className="input-box">
                  <label>Phone Number</label>
                  <span className="input-box__icon">
                  <i className="bx bxs-phone"></i>
                  </span>
                  <input ref={loggedPhoneNumberRef} defaultValue={loggedUser.phoneNumber} type="number" autoComplete="new-password" required />
                </div>
                <div className="input-box">
                  <label>Bio</label>
                  <span className="input-box__icon">
                  <i className="bx bxs-notepad"></i>
                  </span>
                  <input ref={loggedBioRef} defaultValue={loggedUser.bio} type="text" autoComplete="new-password" required />
                </div>
                <div className="input-box">
                  <label>Website</label>
                  <span className="input-box__icon">
                  <i className="bx bx-globe"></i>
                  </span>
                  <input ref={loggedWebsiteRef} defaultValue={loggedUser.website} type="text" autoComplete="new-password" required />
                </div>
               <div className='text-center'>
                <button type="submit" className="btn btn-primary w-75 mt-5" onClick={(e) => editProfile(e)}>
                  Submit
                  </button>
               </div>
              </form>
          </div>
        </div>
      </div>
  )
}
