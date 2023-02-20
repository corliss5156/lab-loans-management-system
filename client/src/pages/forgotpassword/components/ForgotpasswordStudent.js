import React , {useState}from 'react'; 
import {useForm} from 'react-hook-form'

import '../style.css';

import Button from 'react-bootstrap/Button'; 
import Form from 'react-bootstrap/Form';

import logo from '../../../assets/svg/NTU_logo.svg'; 
import axios from 'axios'
import ENV from '../../../config.js'

const API_HOST = ENV.api_host;
function ForgotpasswordStudent() {

  const { register, handleSubmit, formState: { errors } } = useForm();
  
  const [email, setEmail] = useState("")
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState(false)

  

  const onSubmit = (data, e) => {
    const password = Math.random().toString(36).slice(-8)
    axios.put(API_HOST + "/student/resetpassword", {
      email: email, 
      password: password
    }).then((response)=>{
      console.log(response)
      if(response.data==="Success"){
        setSubmitted(true)
        setError(false)
      }
      else{
        setSubmitted(false)
        setError(true)
      }
      
    })
}
const onError = (errors, e) => console.log(errors, e);

  return (
    <div className="h-100 align-items-center justify-content-center d-flex p-2 form">
        <img src = {logo} alt = "NTU logo"/>
        <h2 class = "mb-3"> Forgot Password</h2>

        <Form onSubmit = {handleSubmit(onSubmit, onError)}> 
          <Form.Group> 
            <Form.Control {...register("email", {required: true})} onChange = {(e)=>setEmail(e.target.value)} className = "height" type = "email" placeholder = "Enter email"/>
            {errors.email && <Form.Text className  = "error"> {errors.email.message}</Form.Text>}
          </Form.Group> 
        {submitted && <Form.Text>An email with password reset instructions has been sent to your email.</Form.Text>}
        {error && <Form.Text className = "error">User not found</Form.Text>}
          <Button className = "height btn-block margin-10" variant = "primary" type = "submit"> Submit </Button>
        </Form>
      
      
      
    </div>

  )
}

export default ForgotpasswordStudent