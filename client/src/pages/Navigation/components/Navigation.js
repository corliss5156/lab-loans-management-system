
import React, {useContext} from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../helpers/AuthContext";
import '../style.css';

import logo from '../../../assets/svg/NTU_logo.svg';


function Navbar() {
  const navigate = useNavigate()
  const { setAuthState } = useContext(AuthContext)
  const auth= useContext(AuthContext)
  
  const logout = () =>{
    localStorage.removeItem("accessToken")
    navigate('/student/login')
    setAuthState({user: "", status: false})
  }
 
  return (
    <div> 
      <div id = "logo"> 
        <img src = {logo} alt = "NTU logo"/>
      </div>
      <div id = "navbar"> 
      <div className="nav-right"> 
        <p>{auth.authState.user.split('@')[0]}</p>
        <p onClick={logout}> Log out </p>
      </div>
    </div>
    </div>
    
  );
}

export default Navbar;
