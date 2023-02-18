import React, { useState } from 'react'; 
import axios from 'axios';
import {useForm} from 'react-hook-form'
import { ToastContainer, toast } from 'react-toastify';

import '../style.css';

import Button from 'react-bootstrap/Button'; 
import Form from 'react-bootstrap/Form';

import { Link, useNavigate} from 'react-router-dom';

import logo from '../../../assets/svg/NTU_logo.svg'; 

import ENV from '../../../config.js'; 
const API_HOST = ENV.api_host;

function SignupStaff() {

  const errornotif = (errormsg)=>{
    toast.error(errormsg, {
        position: "bottom-center", 
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        progress: undefined, 
        theme: "light"
    })
}
   
  let navigate = useNavigate()
  
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const { register, handleSubmit, formState: { errors } } = useForm();
  
  

  const submit = (event) =>{
    event.preventDefault()
    
    axios.post(API_HOST + "/staff", {
    email: email, 
    password: password
  }).then((response)=>{
    console.log(response)
    if (response.data.name === "SequelizeUniqueConstraintError") {
      errornotif("Staff account already exists")
    }
    else {
      successnotif("Successfully signed up.")
      navigate('/staff/login')
      
    }
    
  }).catch((err)=>{
    console.log(err)
  })
}

const successnotif = (successmsg) =>{
  toast.success(successmsg, {
      toastId: "student-home",
      position: "bottom-center", 
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      progress: undefined, 
      theme: "light"
  })
}
const onSubmit = (data, e)=>{
  e.preventDefault()
  submit(e)
}
const onError = (errors, e) =>{
  console.log(errors, e)
}

  return (
    <div className="h-100 align-items-center justify-content-center d-flex p-2 form">
        <img src = {logo} alt = "NTU logo"/>
        <h2 className = "mb-3"> Sign Up </h2>
        <Form onSubmit={handleSubmit(onSubmit, onError)} > 
          <Form.Group> 
            <Form.Control  {...register("email", {
              required:true, 
              pattern: {
                value: /^[A-Za-z0-9._%+-]+@e.ntu.edu.sg$/,
                message: "Please use NTU email address."
              }
            })} onChange = {(e)=> {setEmail(e.target.value)}}  className = "height" type = "email" placeholder = "Enter NTU email"/>
          </Form.Group>
          {errors.email && <Form.Text className='error'>{errors.email.message}</Form.Text>} 
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
          {errors.cpassword && <Form.Text className='error'>{errors.cpassword.message}</Form.Text>} 
          <Form.Text id = "error"> Error. Try again later </Form.Text>
          <Button onClick = {register} className = "height btn-block margin-10" variant = "primary" type = "submit"> Sign up</Button>
        </Form>
      
        <p className = "text-center"> <Link to = '/staff/login'> Back to log in</Link> </p>
        <ToastContainer position="bottom-center"
            autoClose={5000}
            hideProgressBar
            newestOnTop={false}
            closeOnClick/>
        
        
      
      
    </div>

  )
}

export default SignupStaff