import { useContext, useRef } from 'react'
import logApi from '../../api/logApi'
import { GlobalContext } from '../../config/GlobalState'
import linePose from "../../assets/images/logo.png"
import getLoggedUser from '../../config/getLoggedUser'
import "./Login.css"

export default function Login() {
  const { setIsLogin, setLoggedUser } = useContext(GlobalContext)

  const loginEmailRef = useRef()
  const loginPasswordRef = useRef()

  async function loginUser(e) {
    try {
      e.preventDefault()
      const [email, password] = [loginEmailRef.current.value, loginPasswordRef.current.value]

      // * API Login User
      const login = await logApi.loginUser(email, password)
      localStorage.setItem('token', JSON.stringify(login.token))
      const loggedUser = await getLoggedUser(login.token)
      setLoggedUser(loggedUser)
      setIsLogin(true)
    } catch (err) {
      console.log(err)
      alert(`${err.response.data.message}`)
    }
  }
  return (
    <section id="login" className="login d-flex flex-column h-100">
      <div className="loginWrap">
        <div className="loginWrapTitle d-flex justify-content-center mt-4 mb-4">
          <img src={linePose} alt="" />
        </div>
        <form className="loginWrapForm" autoComplete="off">
          <div className="inputBox1 my-2">
            <span className="inputBoxIcon">
              <i className="bx bxs-envelope "></i>
            </span>
            <input ref={loginEmailRef} type="email" autoComplete="new-password" required  placeholder='Email'/>
          </div>
          <div className="inputBox1">
            <span className="inputBoxIcon">
              <i className="bx bxs-lock-alt"></i>
            </span>
            <input ref={loginPasswordRef} type="password" autoComplete="new-password" required placeholder='Password'/>
          </div>
          <div className="rememberForgot mb-4">
            <label className='d-flex align-items-center'>
              <input type="checkbox"className='me-3' />
             <span className='fs-7 mb-3'>Remember me</span>
            </label>
            <a href="#" className='fs-7'>Forgot Password?</a>
          </div>
          <button type="submit" className="btn btn-primary w-50 p-2" onClick={loginUser}>
            Login
          </button>
          <div className="register d-flex justify-content-center mt-4">
            <p>
              <a href="#" className="registerLink fs-7">
                Have an account ? Register
              </a>
            </p>
          </div>
        </form>
      </div>
    </section>
  )
}
