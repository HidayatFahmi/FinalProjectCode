import { useContext } from "react";
import { GlobalContext } from "../config/GlobalState";

export default function Logout(){
    const {setIsLogin} = useContext(GlobalContext);

    const handleLogout = () => {
        return setIsLogin(false);
    }

    return(
        <div>
            <h2>Sudah Login</h2>
            <div className="btn btn-warning">
                <button type="submit" onClick={handleLogout}>Log Out</button>
            </div>
        </div>
    )
}