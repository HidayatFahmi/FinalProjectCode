import { useRef, useState } from 'react'
import logApi from '../../api/logApi'
import { compressAccurately } from 'image-conversion'
import profile from "../../assets/images/profile.png"
import "./Signup.css"


export default function Signup() {
  const defaultImageUrl = profile;
  const [images, setImages] = useState()
  const [imagesPreview, setImagesPreview] = useState(defaultImageUrl)

  const registerNameRef = useRef()
  const registerUsernameRef = useRef()
  const registerEmailRef = useRef()
  const registerPasswordRef = useRef()
  const registerPasswordRepeatRef = useRef()
  const registerPhoneNumberRef = useRef()
  const registerBioRef = useRef()
  const registerWebsiteRef = useRef()

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

  async function handleRegister(e) {
    e.preventDefault()

    const tempToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1pZnRhaGZhcmhhbkBnbWFpbC5jb20iLCJ1c2VySWQiOiJhNTRjNTllNy1hMWI2LTRhYzQtYWU3Yi05ODg1YTk4ZWQ4NjkiLCJyb2xlIjoiZ2VuZXJhbCIsImlhdCI6MTY4MTAxMzEzN30.AxhIjhRXMoFoxldGOqwLur6jNBC-mx9-Ig18RWfYkLM'

    let imageUrl = { url: defaultImageUrl }
    if (images) {
      const formData = new FormData()
      formData.append('image', images)

      imageUrl = await logApi.uploadImage(formData, tempToken)
    }

    const data = {
      name: registerNameRef.current.value,
      username: registerUsernameRef.current.value,
      email: registerEmailRef.current.value,
      password: registerPasswordRef.current.value,
      passwordRepeat: registerPasswordRepeatRef.current.value,
      profilePictureUrl: imageUrl.url,
      phoneNumber: registerPhoneNumberRef.current.value,
      bio: registerBioRef.current.value,
      website: registerWebsiteRef.current.value,
    }

    const register = await logApi.registerUser(data)
    alert(register.message)

    const formSignup = document.getElementById('auth__form-signup')
    const formLogin = document.getElementById('auth__form-login')
    formLogin.style.top = '0%'
    formLogin.style.bottom = '0%'
    formSignup.style.top = '100%'
    formSignup.style.bottom = '-100%'
  }

  return (
    <>
      <section id="signup" className="signup mb-sm-0">
        <div className="signup__wrap">
          <div className="signup__wrap-title d-flex flex-column justify-content-center align-items-center mt-5">
            <p className="fw-bold m-0">Sign Up</p>
            <img src={imagesPreview} alt="" />
            <div className="input-upload mb-5">
              <label htmlFor="chooseImage" className="form-label">
                <i className="bx bxs-cloud-upload"></i> Choose Image
              </label>
              <input id="chooseImage" type="file" accept="image/*" onChange={(e) => handleImages(e)} className="form-control" required />
            </div>
          </div>
          <form className="signup__wrap-form">
            <div className="input-box">
              <span className="input-box__icon">
                <i className="bx bxs-id-card"></i>
              </span>
              <label>Name</label>
              <input ref={registerNameRef} type="text" autoComplete="new-password" required />
            </div>
            <div className="input-box">
              <span className="input-box__icon">
                <i className="bx bxs-user"></i>
              </span>
              <label>Username</label>
              <input ref={registerUsernameRef} type="text" autoComplete="new-password" required />
            </div>
            <div className="input-box">
              <span className="input-box__icon">
                <i className="bx bxs-envelope"></i>
              </span>
              <label>Email</label>
              <input ref={registerEmailRef} type="email" autoComplete="new-password" required />
            </div>
            <div className="input-box">
              <span className="input-box__icon">
                <i className="bx bxs-lock-alt"></i>
              </span>
              <label>Password</label>
              <input ref={registerPasswordRef} type="password" autoComplete="new-password" required />
            </div>
            <div className="input-box">
              <span className="input-box__icon">
                <i className="bx bxs-lock-alt"></i>
              </span>
              <label>Repeat Password</label>
              <input ref={registerPasswordRepeatRef} type="password" autoComplete="new-password" required />
            </div>
            <div className="input-box">
              <span className="input-box__icon">
                <i className="bx bxs-phone"></i>
              </span>
              <label>Phone Number</label>
              <input ref={registerPhoneNumberRef} type="number" autoComplete="new-password" required />
            </div>
            <div className="input-box">
              <span className="input-box__icon">
                <i className="bx bxs-notepad"></i>
              </span>
              <label>Bio</label>
              <input ref={registerBioRef} type="text" autoComplete="new-password" required />
            </div>
            <div className="input-box">
              <span className="input-box__icon">
                <i className="bx bx-globe"></i>
              </span>
              <label>Website</label>
              <input ref={registerWebsiteRef} type="text" autoComplete="new-password" required />
            </div>
            <button type="submit" className="button-reg btn btn-primary w-50 p-2 mt-3 fs-5" onClick={handleRegister}>
              Sign Up
            </button>
            <div className="register d-flex justify-content-center mt-4">
              <p className='fs-4'>
                Already have an account?{' '}
                <a href="#" className="text-decoration-none fw-bold login-link">
                  Login
                </a>
              </p>
            </div>
          </form>
        </div>
      </section>
    </>
  )
}
