import React, { useEffect, useContext } from 'react'
import '../style.css';
import logo from '../../../assets/svg/NTU_logo.svg';

import Button from 'react-bootstrap/Button';
import {AuthContext} from '../../../helpers/AuthContext'; 
import {Link} from 'react-router-dom'

import ENV from '../../../config.js'; 
const API_HOST = ENV.api_host;

export default function Home() {
  const auth = useContext(AuthContext)
  const { setAuthState } = useContext(AuthContext)
  useEffect(()=>{
    console.log(auth)
  })
  return (
    <div className="h-100 align-items-center justify-content-center d-flex p-2 form">
      
        <img src = {logo} alt = "NTU logo"/>
        <h2 className = "mb-3"> Log In As </h2>
        <div className = "home-login"> 
          <Button> <Link to = '/student/login'>Student</Link> </Button>
          <Button> <Link to = '/staff/login'>Staff</Link>  </Button>
        
        </div>
        
        
      
      
    </div>
  )
}
