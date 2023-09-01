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
      const compressedImage = new File([compressedImageBlob], 'logo-compressed-image', { type: 'image/jpeg' })
      setImages(compressedImage)
      setImagesPreview(URL.createObjectURL(compressedImage))
    } else {
      setImagesPreview(URL.createObjectURL(e.target.files[0]))
      setImages(e.target.files[0])
    }
  }

  async function handleRegister(e) {
    e.preventDefault()

    const tempToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1pZnRhaGZhcmhhbjNAZ21haWwuY29tIiwidXNlcklkIjoiYzNlNTdhNzEtODY4ZC00NDVhLTllOGEtOTcxMDJlYTQwYWQ2Iiwicm9sZSI6ImdlbmVyYWwiLCJpYXQiOjE2OTMzNjc2MDl9.fRSLVNbbCRZFV7eBl4MlNLaOF-p1VtN0CfFxBLK1BmQ'

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

    const formSignup = document.getElementById('auth-form-signup')
    const formLogin = document.getElementById('auth-form-login')
    formLogin.style.top = '0%'
    formLogin.style.bottom = '0%'
    formSignup.style.top = '100%'
    formSignup.style.bottom = '-100%'
  }

  return (
    <>
      <section id="signup" className="signup mb-sm-0">
        <div className="signup__wrap">
          <div className="signup__wrap-title d-flex flex-column justify-content-center align-items-center my-3">
            <p className="fw-bold mb-3">Sign Up</p>
            <img src={imagesPreview} alt="" />
            <div className="input-upload mb-5">
              <label htmlFor="chooseImage" className="form-label my-3 fs-5">
                <i className="bx bxs-cloud-upload"></i> Choose Image
              </label>
              <input id="chooseImage" type="file" accept="image/*" onChange={(e) => handleImages(e)} className="form-control" required />
            </div>
          </div>
          <form className="signup__wrap-form">
            <div className="input-box2">
              <span className="input-box__icon">
                <i className="bx bxs-id-card"></i>
              </span>
              <input ref={registerNameRef} type="text" autoComplete="new-password" required placeholder='Name'/>
            </div>
            <div className="input-box2">
              <span className="input-box__icon">
                <i className="bx bxs-user"></i>
              </span>
              <input ref={registerUsernameRef} type="text" autoComplete="new-password" required placeholder='Username'/>
            </div>
            <div className="input-box2">
              <span className="input-box__icon">
                <i className="bx bxs-envelope"></i>
              </span>
              <input ref={registerEmailRef} type="email" autoComplete="new-password" required placeholder='Email'/>
            </div>
            <div className="input-box2">
              <span className="input-box__icon">
                <i className="bx bxs-lock-alt"></i>
              </span>
              <input ref={registerPasswordRef} type="password" autoComplete="new-password" required placeholder='Password'/>
            </div>
            <div className="input-box2">
              <span className="input-box__icon">
                <i className="bx bxs-lock-alt"></i>
              </span>
              <input ref={registerPasswordRepeatRef} type="password" autoComplete="new-password" required placeholder='Repeat Password'/>
            </div>
            <div className="input-box2">
              <span className="input-box__icon">
                <i className="bx bxs-phone"></i>
              </span>
              <input ref={registerPhoneNumberRef} type="number" autoComplete="new-password" required placeholder='Phone Number'/>
            </div>
            <div className="input-box2">
              <span className="input-box__icon">
                <i className="bx bxs-notepad"></i>
              </span>
              <input ref={registerBioRef} type="text" autoComplete="new-password" required placeholder='Bio'/>
            </div>
            <div className="input-box2">
              <span className="input-box__icon">
                <i className="bx bx-globe"></i>
              </span>
              <input ref={registerWebsiteRef} type="text" autoComplete="new-password" required placeholder='Website'/>
            </div>
            <button type="submit" className="button-reg btn btn-primary w-50 p-2 mt-3 fs-7" onClick={handleRegister}>
              Sign Up
            </button>
            <div className="register d-flex justify-content-center mt-4">
              <p className='fs-5'>
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
