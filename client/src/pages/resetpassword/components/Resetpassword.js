import React , {useState}from 'react'; 
import {useForm} from 'react-hook-form'

import '../style.css';

import Button from 'react-bootstrap/Button'; 
import Form from 'react-bootstrap/Form';

import logo from '../../../assets/svg/NTU_logo.svg'; 
import axios from 'axios'
import ENV from '../../../config.js'
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
const API_HOST = ENV.api_host;
function Resetpassword() {
  let {email } = useParams()
  const { register, handleSubmit, formState: { errors } } = useForm();
  
  const [password, setPassword] = useState("")
  const [cPassword, setCpassword] = useState("")
  const [success, setSuccess] = useState(false)

  

  const onSubmit = (data, e) => {
    axios.put(API_HOST + "/staff/changepassword", {
      email: email, 
      password: password
    }).then((response)=>{
      setSuccess(true)
    })
}
const onError = (errors, e) => console.log(errors, e);

  return (
    <div className="h-100 align-items-center justify-content-center d-flex p-2 form">
        <img src = {logo} alt = "NTU logo"/>
        <h2 class = "mb-3"> Change Password: {email}</h2>

        <Form onSubmit = {handleSubmit(onSubmit, onError)}> 
          <Form.Group> 
            <Form.Control {...register("password", {required: true})} onChange = {(e)=>setPassword(e.target.value)} className = "height" type = "password" placeholder = "Enter new password"/>
            {errors.password && <Form.Text className  = "error"> {errors.password.message}</Form.Text>}
          </Form.Group> 
          <Form.Group> 
            <Form.Control {...register("cPassword", {required: true, 
            validate:{
              match: v=>{
                return password === cPassword || "Passwords must match"
              }
              }})} onChange = {(e)=>setCpassword(e.target.value)} className = "height" type = "password" placeholder = "Enter new password"/>
            {errors.cPassword && <Form.Text className  = "error"> {errors.cPassword.message}</Form.Text>}
          </Form.Group> 
          {success &&<Form.Text>Password has been successfully reset. <Link to = '/staff/home'> Back to home</Link> </Form.Text>}
          <Button className = "height btn-block margin-10" variant = "primary" type = "submit"> Submit </Button>
        </Form>
      
      
      
    </div>

  )
}

export default Resetpassword