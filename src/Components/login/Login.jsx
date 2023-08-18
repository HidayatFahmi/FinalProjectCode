import { useRef, useContext } from "react";
import logApi from "../../api/logApi";
import getLoggedUser from "../../config/getLoggedUser";
import { GlobalContext } from "../../config/GlobalState";
import './Login.css'

export default function Login(){
    const {setIsLogin, setLoggedUser} = useContext(GlobalContext);

    const loginEmailRef=useRef();
    const loginPassRef=useRef();

    async function loginUser(e){
        try{
            e.preventDefault()
            const [email, password] = [loginEmailRef.current.value, loginPassRef.current.value];

            const login = await logApi.loginUser(email, password);
            localStorage.setItem('token',JSON.stringify(login.token));
            const loggedUser = await getLoggedUser(login.token);
            setLoggedUser(loggedUser);
            setIsLogin(true);
        }catch(err){
        console.log(err);
        alert(`${err.respone.data.message}`);
    }
    }

    return(
        <section id="login" className="d-flex flex-column justify-content-start align-items-center">
            <div className="login-wrap">
                <div className="login-title">
                    <h2>Image</h2>
                </div>
                <form className="login-form">
                    <div className="input-box">
                        <input ref={loginEmailRef} type="text" autoComplete="new-password" required />
                        <label htmlFor="inputEmailLabel">Email</label>
                    </div>
                    <div className="input-box">
                        <input ref={loginPassRef} type="password" autoComplete="new-password" required />
                        <label htmlFor="inputEmailLabel">Password</label>
                    </div>
                <div className="forgot-pass">
                    <label>
                        <input type="checkbox" />Remember Me
                    </label>
                    <a href="#">Forgot Password?</a>
                </div>
                <button type="Submit" className="btn  btn-primary w-50 p-2" onClick={loginUser}>
                    Login
                </button>
                <div className="register">
                    <p>Dont have an account?
                    <a href="#" className="login-link">Register</a>
                    </p>
                </div>
                </form>
            </div>
        </section>
    )
}