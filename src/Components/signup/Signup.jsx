import {useRef, useState} from 'react'
import logApi from '../../api/logApi'
import {compressAccurately} from 'image-conversion'
import './Signup.css'

export default function SignUp(){
    const defaultImageUrl = 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8dXNlcnxlbnwwfHwwfHw%3D&w=1000&q=80';
    const [images, setImages] = useState();
    const [imagesPreview, setImagesPreview] = useState(defaultImageUrl);

    const [
        registerNameRef,
        registerUsernameRef,
        registerEmailRef,
        registerPasswordRef,
        registerPasswordRepeatRef,
        registerPhoneNumberRef,
        registerBioRef,
        registerWebsiteRef
      ] = Array(8).fill().map(() => useRef());

      async function handleImages(e){
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
      

      async function handleRegister(e){
        e.preventDefault()

        const tempToken = 'eyJlbWFpbCI6Im1pZnRhaGZhcmhhbkBnbWFpbC5jb20iLCJ1c2VySWQiOiJhNTRjNTllNy1hMWI2LTRhYzQtYWU3Yi05ODg1YTk4ZWQ4NjkiLCJyb2xlIjoiZ2VuZXJhbCIsImlhdCI6MTY4MTAxMzEzN30'
        
        let imageUrl = { url: defaultImageUrl }
        if (images) {
            const formData = new FormData()
            formData.append('image', images)

            imageUrl = await logApi.uploadImage(formData, tempToken)
        }

        const data={
        name : registerNameRef.current.value,
        username : registerUsernameRef.current.value,
        email : registerEmailRef.current.value,
        repeatPassword : registerPasswordRepeatRef.current.value,
        profilePictureUrl : imageUrl.url,
        phoneNumber : registerPhoneNumberRef.current.value,
        bio: registerBioRef.current.value,
        website : registerWebsiteRef.current.value,
        }

        const register = await logApi.registerUser(data)
        alert (register.message)
    }

    return(
        <section id = "signup" className='Signup-box'>
            <div className="sign-warp-title">
                <p className='text-primary'>Sign Up</p>
                <img src={imagesPreview} alt="Can't loading image" />
                <div className="input-upload">
                    <label htmlFor="chooseImage" className='form-label'>Choose Image</label>
                    <input type="file" id="chooseImage" accept='image/*' onChange={(e)=>handleImages(e)} className='form-control' required/>
                </div>
            </div>
            <form className="signup-warp-form">
                <div className="input-box">
                    <input type="text" autoComplete='new-password' required ref={registerNameRef}/>
                    <label>Name</label>
                </div>
                <div className="input-box">
                    <input type="text" autoComplete='new-password' required ref={registerUsernameRef}/>
                    <label>Username</label>
                </div>
                <div className="input-box">
                    <input type="email" autoComplete='new-password' required ref={registerEmailRef}/>
                    <label>Email</label>
                </div>
                <div className="input-box">
                    <input type="password" autoComplete='new-password' required ref={registerPasswordRef}/>
                    <label>Password</label>
                </div>
                <div className="input-box">
                    <input type="password" autoComplete='new-password' required ref={registerPasswordRef}/>
                    <label>Repeat Password</label>
                </div>
                <div className="input-box">
                    <input type="text" autoComplete='new-password' required ref={registerPhoneNumberRef}/>
                    <label>Phone Number</label>
                </div>
                <div className="input-box">
                    <input type="text" autoComplete='new-password' required ref={registerBioRef}/>
                    <label>Bio</label>
                </div>
                <div className="input-box">
                    <input type="text" autoComplete='new-password' required ref={registerWebsiteRef}/>
                    <label>Website</label>
                </div>
                <button type='submit' className='btn btn-primary w-100 p-2 mt-3' onClick={handleRegister}>
                    Sign Up
                </button>
                <div className='already-register'>
                    <p>Already have an account?
                    <a href="#" className='text-decoration-none login-link'></a>
                    </p>
                </div>
            </form>
        </section>
    )
      
}