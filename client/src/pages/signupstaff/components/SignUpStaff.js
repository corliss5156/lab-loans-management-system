import React, { useState } from 'react'; 
import axios from 'axios';

import '../style.css';

import Button from 'react-bootstrap/Button'; 
import Form from 'react-bootstrap/Form';

import { Link, useNavigate} from 'react-router-dom';

import logo from '../../../assets/svg/NTU_logo.svg'; 

import ENV from '../../../config.js'; 
const API_HOST = ENV.api_host;

function SignupStaff() {
   
  let navigate = useNavigate()
  
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  

  const register = (event) =>{
    event.preventDefault()
    axios.post(API_HOST + "/staff", {
    email: email, 
    password: password
  }).then((response)=>{
    if (response.data === "Success") {
      navigate('/saff/login')

    }
    else {
      document.getElementById("error").style.display = 'block'
    }
    
  }).catch((err)=>{
    console.log(err)
  })
}

  return (
    <div className="h-100 align-items-center justify-content-center d-flex p-2 form">
        <img src = {logo} alt = "NTU logo"/>
        <h2 className = "mb-3"> Sign Up </h2>
        <Form > 
          <Form.Group> 
            <Form.Control onChange = {(e)=> {setEmail(e.target.value)}}  className = "height" type = "email" placeholder = "Enter NTU email"/>
          </Form.Group> 
          <Form.Group> 
            <Form.Control onChange = {(e)=> {setPassword(e.target.value)}}  className = "height" type = "password" placeholder = "Enter password"/>
          </Form.Group>
          <Form.Group> 
            <Form.Control className = "height" type = "password" placeholder = "Confirm password"/>
          </Form.Group>
          <Form.Text id = "error"> Error. Try again later </Form.Text>
          <Button onClick = {register} className = "height btn-block margin-10" variant = "primary" type = "submit"> Sign up</Button>
        </Form>
      
        <p className = "text-center"> <Link to = '/staff/login'> Back to log in</Link> </p>
          
        
        
      
      
    </div>

  )
}

export default SignupStaff