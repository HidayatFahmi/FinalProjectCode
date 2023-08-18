import { useContext } from "react";
import { Outlet } from "react-router";
import { GlobalContext } from "../../config/GlobalState";
import Auth from "./Auth";
import Navbar from "../navbar/Navbar";
import './Home.css'

export default function Home(){
    const { isLogin }= useContext(GlobalContext);

    return(
        <div>
            {!isLogin?(<Auth/>
            ):(
            <div className="container-fluid home-page bg-dark">
                  <div className="container-fluid  col-12 ms-5">
                    <div className="row">
                        <div className="col-xl-2 bg-light">
                            <Navbar/>
                        </div>
                        <div className="col-10 outlet-page bg-dark  d-flex">
                            <Outlet/>
                        </div>  
                    </div>   
                  </div>
            </div>
  )}
        </div>
    )
}