import React, { useState } from 'react'; 
import axios from 'axios';

import '../style.css';

import Button from 'react-bootstrap/Button'; 
import Form from 'react-bootstrap/Form';

import { Link } from 'react-router-dom';

import logo from '../../../assets/svg/NTU_logo.svg'; 

import ENV from '../../../config.js'; 
const API_HOST = ENV.api_host;

function SignupStudent() {

  
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  

  const register = (event) =>{
    event.preventDefault()
    console.log(API_HOST)
    axios.post(API_HOST + "/student", {
    email: email, 
    password: password
  }).then((response)=>{
    console.log(response)
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
          <Button onClick = {register} className = "height btn-block margin-10" variant = "primary" type = "submit"> Sign up</Button>
        </Form>
      
        <p className = "text-center"> <Link to = '/student/login'> Back to log in</Link> </p>
          
        
        
      
      
    </div>

  )
}

export default SignupStudent