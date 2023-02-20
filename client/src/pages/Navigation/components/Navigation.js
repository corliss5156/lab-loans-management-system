
import React, {useContext} from "react";
import { Link } from 'react-router-dom'
import { useNavigate } from "react-router-dom";

//Frontend
import '../style.css';
import Tippy from '@tippyjs/react'
import 'tippy.js/dist/tippy.css';
import logo from '../../../assets/svg/NTU_logo.svg';
import {FaBars} from 'react-icons/fa'

//Backend
import { AuthContext } from "../../../helpers/AuthContext";


function Navbar() {
  const navigate = useNavigate()
  const { setAuthState } = useContext(AuthContext)
  const auth= useContext(AuthContext)
  
  const logout = () =>{
    localStorage.removeItem("accessToken")
    navigate('/student/login')
    setAuthState({user: "", status: false})
  }
 
  const resize = () => {
    const x = document.getElementById('topNav')
    if (x.className === 'topnav'){
        x.className += " responsive"
    } else {
        x.className = "topnav"
    }
}
  return (
    <div> 
        <div id = "logo"> 
            <img src = {logo} alt = "NTU logo"/>
        </div>
        <div id = "topNav" className = "topnav"> 
           
        <div className="right-lnk">
             <Tippy content = 'Reset password'> 
                <Link to = {`/student/resetpassword/${auth.authState.user}`}>{auth.authState.user.split('@')[0]} </Link> 
             
             </Tippy>
             
            <a onClick = {logout} href="#">Log out </a>
        </div>
        <a href="#!" className="icon" onClick={resize}>
            <FaBars />
        </a>
        </div>
    </div> 
    
  );
}

export default Navbar;
