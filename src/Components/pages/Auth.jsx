
import SignUp from "../signup/Signup.jsx"
import Login from "../login/Login.jsx"
import { useEffect } from 'react'
import "./Auth.css"


export default function Auth() {
  useEffect(() => {
    const loginButton = document.querySelector('.login-link')
    const signupButton = document.querySelector('.register-link')
    const formLogin = document.getElementById('auth-form-login')
    const formSignup = document.getElementById('auth-form-signup')

    signupButton.addEventListener('click', (e) => {
      e.preventDefault()
      formLogin.style.top = '-100%'
      formLogin.style.bottom = '100%'
      formSignup.style.top = '0%'
      formSignup.style.bottom = '0%'
    })

    loginButton.addEventListener('click', (e) => {
      e.preventDefault()
      formLogin.style.top = '0%'
      formLogin.style.bottom = '0%'
      formSignup.style.top = '100%'
      formSignup.style.bottom = '-100%'
    })
  }, [])


  return (
    <section id="auth" className="auth min-vh-100 d-flex flex-column justify-content-center align-items-center">
      <div className="container user-form col-sm-8 col-md-6 col-xl-4">
        <div className="row justify-content-center align-items-center">
          <div className="col-sm-10">
            <div className="auth-form-login" id="auth-form-login">
              <Login />
            </div>
            <div className="auth-form-signup overflow-auto" id="auth-form-signup">
              <SignUp />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
