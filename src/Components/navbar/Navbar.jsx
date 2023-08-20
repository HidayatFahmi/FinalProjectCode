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
        <div className="navbar position-fixed ">
        <div className="container bg-light">
            <div className="row">
                <div className="navbar_wrap d-flex flex-column">
                    <div className="navbar_wrap_content">
                        <div className="navbar-logo ms-3">
                            <img src={logo} alt="" />
                        </div>
                        <hr className="text-primary"/>
                        <ul className="navbar_wrap_content_list flex-column" id="menu">
                            <HashLink to={'/#'} className="nav-link flex-column mt-2 ">
                                <li className="nav-items">
                                    <i className="bx bx-home"></i>
                                    <span className="ms-1">Home</span>
                                </li>
                            </HashLink>
                            <HashLink to={`/u/${loggedUser.id}#`} className="nav-link">
                                <li className="nav-items">
                                    <i className="bx bx-user"></i>
                                    <span className="ms-1">Profile</span>
                                </li>
                            </HashLink>
                            <HashLink to={`/editprofile#`}>
                                <li className="nav-items">
                                    <i className="bx bx-edit"></i>
                                    <span className="ms-1">Edit Profile</span>
                                </li>
                            </HashLink>
                            <li className="nav-items">
                                <div className="nav-link d-flex align-items-center" aria-current="page" data-bs-toggle="modal" data-bs-target="#createPostModal">
                                    <i className="bx bx-plus-circle"></i>
                                    <span className="ms-1">Post</span>
                                </div>
                            </li>
                            <li className="nav-items text-center">
                                <button className="btn btn-primary fs-4 w-75 rounded shadow " onClick={logoutUser}>
                                    Logout
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        </div>
    )
}