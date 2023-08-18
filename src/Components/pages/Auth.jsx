// import React from "react";
import Login from "../login/Login"
import SignUp from "../signup/Signup"

export default function Auth(){
    

    return(
        <section id="auth" className="bg-warning min-vh-100 d-flex align-items-center">
        <div className="container">
            <div className="row border border-3 border-primary">
                <div className="col-12 text-center">
                    <div className="form-login-box">
                    <Login/>
                    </div>
                    <div className="form-signup-box">
                    <SignUp/>
                    </div>
                </div>
            </div>
        </div>
        </section>
    )
}

{/* <h2>Hallo fahmi hidayat </h2>
<Login/> */}