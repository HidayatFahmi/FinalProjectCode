import { useContext } from "react"
import { useNavigate } from "react-router"
import { GlobalContext } from "../../config/GlobalState"
import { HashLink } from "react-router-hash-link"
import logApi from "../../api/logApi"
import "./NavbarSmall.css"
import 'boxicons/css/boxicons.min.css'


export default function NavbarSmall(){

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
            <div className="row ">
                <div className="col-12">
                    <div className="navbarWrapContent2 ms-4 bg-light">
    
                        <ul className="navbarWrapContentList2 d-flex" id="menu">
                            <HashLink to={'/#'} className="nav-link">
                                <li className="nav-items">
                                    <i className="bx bx-home"></i>
                                    <span className="ms-1 d-xxl-inline d-none">Home</span>
                                </li>
                            </HashLink>
                            <HashLink to={`/u/${loggedUser.id}#`} className="nav-link">
                                <li className="nav-items">
                                    <i className="bx bx-user"></i>
                                    <span className="ms-1 d-xxl-inline d-none">Profile</span>
                                </li>
                            </HashLink>
                            <HashLink to={`/editprofile#`}>
                                <li className="nav-items">
                                    <i className="bx bx-edit"></i>
                                    <span className="ms-1 d-xxl-block d-none">Edit Profile</span>
                                </li>
                            </HashLink>
                            <li className="nav-items">
                                <div className="nav-link d-flex align-items-center" aria-current="page" data-bs-toggle="modal" data-bs-target="#createPostModal">
                                    <i className="bx bx-plus-circle"></i>
                                    <span className="ms-1 d-xxl-inline d-none">Post</span>
                                </div>
                            </li>
                            <li>
                            <i className="bx bx-log-out d-inline d-xxl-none" onClick={logoutUser}></i>
                            </li>
                            <li className="nav-items text-center">
                                <button className="btn btn-primary fs-6 w-100 rounded shadow d-none d-xxl-inline" onClick={logoutUser}>
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