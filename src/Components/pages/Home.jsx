import { useContext } from "react";
import { Outlet } from "react-router";
import { GlobalContext } from "../../config/GlobalState";
import Auth from "./Auth";
import Navbar from "../navbar/Navbar";
import NavbarSmall from "../navbar/NavbarSmall";
import CreatePostModal from "../modal/createPostModal";
import './Home.css'

export default function Home(){
    const { isLogin }= useContext(GlobalContext);

    return(
        <div>
            {!isLogin?(<Auth/>
            ):(
            <div className="container-fluid home-page bg-dark">
                  <div className="container-fluid col-12">
                    <div className="row">
                        <div className="navbar-box d-none d-sm-block col-2 bg-light">
                            <Navbar/>
                        </div>
                        <div className="col-12 col-sm-10 outlet-page bg-light d-flex">
                            <Outlet/>
                        </div>  
                        <div>
                            <CreatePostModal/>
                        </div>
                    </div>   
                    <div className="row">
                        <div className="col d-block d-sm-none position-fixed navbarSmall">
                            <NavbarSmall/>
                        </div>
                    </div>
                  </div>
            </div>
  )}
        </div>
    )
}