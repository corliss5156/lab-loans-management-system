import React, {useContext, useEffect} from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../helpers/AuthContext";
import {FaBars} from 'react-icons/fa'
import '../style.css';
import logo from '../../../assets/svg/NTU_logo.svg';


export default function NavigationStaff({current}) {
    const navigate = useNavigate()
    const { setAuthState } = useContext(AuthContext)
    const auth= useContext(AuthContext)

    const resize = () => {
        const x = document.getElementById('topNav')
        if (x.className === 'topnav'){
            x.className += " responsive"
        } else {
            x.className = "topnav"
        }
    }
    const logout = () => {
        localStorage.removeItem("accessToken")
        navigate('/staff/login')
        setAuthState({user: "", status: false})
    }
    useEffect(()=>{
        const active = document.getElementById(current)
        if (active !== null){
            active.classList.add("active")
        }
        
    },[])
  return (
    <div> 
        <div id = "logo"> 
            <img src = {logo} alt = "NTU logo"/>
        </div>
        <div id = "topNav" className = "topnav"> 
            <Link to = "/staff/home" id = "Home">Home</Link>
            <Link to = "/staff/loan" id = "Loans">Loans</Link>
            <Link to = "/staff/inventory" id = "Inventory">Inventory</Link>
            <Link to = "/staff/report" id = "Report">Report</Link>
        <div className="right-lnk">
            <p>{auth.authState.user.split('@')[0]}</p>
            <a onClick = {logout} href="#">Log out </a>
        </div>
        <a href="#!" className="icon" onClick={resize}>
            <FaBars />
        </a>
        </div>
    </div> 
  )
}
