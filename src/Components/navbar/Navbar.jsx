import { useContext } from "react"
import { useNavigate } from "react-router"
import { GlobalContext } from "../../config/GlobalState"
import { HashLink } from "react-router-hash-link"
import logApi from "../../api/logApi"
import "./Navbar.css"
import 'boxicons/css/boxicons.min.css'
import logo from "../../assets/images/logo.png"


export default function Navbar(){

    const { loggedUser, setIsLogin } = useContext(GlobalContext)
    const navigate = useNavigate()
    
    const token = JSON.parse(localStorage.getItem('token'))
    
    async function logoutUser(e) {
        try {
        e.preventDefault()
    
        // * API Logout User
        await logApi.logoutUser(token)
        localStorage.clear()
        setIsLogin(false)
        navigate('/')
        } catch (err) {
        alert(`${err.response.data.message}`)
        }
    }

    return(
        <div className="navbar position-fixed">
            <div className="row">
                <div className="col-12 navbar-box">
                    <div className="navbarWrapContent">
                        <div className="navbar-logo ms-3 d-none d-xxl-inline ms-5">
                            <img src={logo} alt="" />
                        </div>
                        <hr className="text-primary"/>
                        <ul className="navbarWrapContentList" id="menu">
                            <HashLink to={'/#'} className="nav-link mt-2 ">
                                <li className="nav-items">
                                    <i className="bx bx-home"></i>
                                    <span className="ms-1 d-xxl-inline d-none d-lg-block">Home</span>
                                </li>
                            </HashLink>
                            <HashLink to={`/u/${loggedUser.id}#`} className="nav-link">
                                <li className="nav-items">
                                    <i className="bx bx-user"></i>
                                    <span className="ms-1 d-xxl-inline d-none d-lg-block">Profile</span>
                                </li>
                            </HashLink>
                            <HashLink to={`/editprofile#`}>
                                <li className="nav-items">
                                    <i className="bx bx-edit"></i>
                                    <span className="ms-1 d-xxl-inline d-none d-lg-block">Edit Profile</span>
                                </li>
                            </HashLink>
                            <li className="nav-items">
                                <div className="nav-link d-flex align-items-center" aria-current="page" data-bs-toggle="modal" data-bs-target="#createPostModal">
                                    <i className="bx bx-plus-circle"></i>
                                    <span className="ms-1 d-xxl-inline d-none d-lg-block">Post</span>
                                </div>
                            </li>
                            <li>
                            <i className="bx bx-log-out d-inline d-xxl-none d-lg-none" onClick={logoutUser}></i>
                            </li>
                            <li className="nav-items text-center mt-5">
                                <button className="btn btn-primary fs-6 w-75 rounded shadow d-none d-xxl-block d-lg-block" onClick={logoutUser}>
                                    Logout
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}