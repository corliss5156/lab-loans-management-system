import React, { useState, useContext } from 'react'; 
import axios from 'axios'
import '../style.css';

import Button from 'react-bootstrap/Button'; 
import Form from 'react-bootstrap/Form';

import { Link, useNavigate, Navigate } from 'react-router-dom';
import {AuthContext} from '../../../helpers/AuthContext';
import logo from '../../../assets/svg/NTU_logo.svg';


import ENV from '../../../config.js'; 
const API_HOST = ENV.api_host;

function LoginStaff() {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const auth = useContext(AuthContext)
  const { setAuthState } = useContext(AuthContext)
   
  let navigate = useNavigate()

  const login = (event) =>{
    //Front end error 
    document.getElementById("email-error").style.display = 'none'
    document.getElementById("password-error").style.display = 'none'
    const url = API_HOST + `/staff/login`
    const data = {email: email, password: password}
    event.preventDefault()
    axios.post(url, data).then((response)=>{
      if(response.data.error){
      
        if(response.data.error ==="User Doesn't Exist"){
          document.getElementById("email-error").style.display = 'block'
        } else {
          document.getElementById("password-error").style.display = 'block'
        }
      } else{
        localStorage.setItem("accessToken", response.data.accessToken)
       
        setAuthState({user: response.data.user, status: true, userType: "staff"})
    
        navigate('/staff/home')
      }
      
    }).catch(err => console.log(err))
  }
  if (auth.authState.status===true){
    return <Navigate replace to="/staff/home" />;
  }
  else{

  
  return (
    
    <div className="h-100 align-items-center justify-content-center d-flex p-2 form">
      
        <img src = {logo} alt = "NTU logo"/>
        <h2 className = "mb-3"> Log In </h2>
        <Form > 
          <Form.Group> 
            <Form.Control onChange = {(e)=> {setEmail(e.target.value)}} className = "height" type = "email" placeholder = "Enter NTU email"/>
          </Form.Group> 
          <Form.Text id = "email-error"> User does not exist </Form.Text>
          <Form.Group> 
            <Form.Control onChange = {(e)=> {setPassword(e.target.value)}} className = "height" type = "password" placeholder = "Enter password"/>
          </Form.Group>
          <Form.Text id = "password-error"> Wrong password </Form.Text>
          <p className =  "text-left"><Link  to = '/staff/forgotpassword'> Forgot password? </Link> </p>
          <Button onClick = {login} className = "height btn-block margin-10" variant = "primary" type = "submit"> Log in </Button>
        </Form>
      
        <p className = "text-center"> <Link to = '/staff/signup'> Sign up Now</Link> </p>
        
      
      
    </div>

  )
  }
}

export default LoginStaff