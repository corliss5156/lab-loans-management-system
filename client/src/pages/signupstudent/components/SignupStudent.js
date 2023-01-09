import React, { useState } from 'react'; 
import axios from 'axios';
import {useForm} from 'react-hook-form'

import '../style.css';

import Button from 'react-bootstrap/Button'; 
import Form from 'react-bootstrap/Form';

import { Link, useNavigate} from 'react-router-dom';

import logo from '../../../assets/svg/NTU_logo.svg'; 

import ENV from '../../../config.js'; 
const API_HOST = ENV.api_host;

function SignupStudent() {
   
  let navigate = useNavigate()
  
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const { register, handleSubmit, formState: { errors } } = useForm();
  

  const submit = (event) =>{
    
    axios.post(API_HOST + "/student", {
    email: email, 
    password: password
  }).then((response)=>{
    if (response.data === "Success") {
      navigate('/student/login')

    }
    else {
      document.getElementById("error").style.display = 'block'
    }
    
  }).catch((err)=>{
    console.log(err)
  })
}
  const onSubmit = (data, e)=>{
    e.preventDefault()
    submit()
  }
  const onError = (errors, e) =>{
    console.log(errors, e)
  }
  return (
    <div className="h-100 align-items-center justify-content-center d-flex p-2 form">
        <img src = {logo} alt = "NTU logo"/>
        <h2 className = "mb-3"> Sign Up </h2>
        <Form onSubmit={handleSubmit(onSubmit, onError)}> 
          <Form.Group> 
            <Form.Control {...register("email", {
              required:true, 
              pattern: {
                value: /^[A-Za-z0-9._%+-]+@e.ntu.edu.sg$/,
                message: "Please use NTU email address."
              }
            })}
            onChange = {(e)=> {setEmail(e.target.value)}}  className = "height" type = "email" placeholder = "Enter NTU email"/>
          </Form.Group> 
          {errors.email && <Form.Text className = "error">{errors.email.message}</Form.Text>}
          <Form.Group> 
            <Form.Control {...register("password", {
              required: true
            })} onChange = {(e)=> {setPassword(e.target.value)}}  className = "height" type = "password" placeholder = "Enter password"/>
          </Form.Group>
          <Form.Group> 
            <Form.Control {...register("cpassword", {
              required: true, 
              validate: {
                matchpassword: v =>{
                  return v === password || "Passwords must match."
                }
              }
            })
            
            } className = "height" type = "password" placeholder = "Confirm password"/>
          </Form.Group>
          {errors.cpassword && <Form.Text className = "error">{errors.cpassword.message}</Form.Text>}
          <Form.Text id = "error"> Error. Try again later </Form.Text>
          <Button  className = "height btn-block margin-10" variant = "primary" type = "submit"> Sign up</Button>
        </Form>
      
        <p className = "text-center"> <Link to = '/student/login'> Back to log in</Link> </p>
          
        
        
      
      
    </div>

  )
}

export default SignupStudent