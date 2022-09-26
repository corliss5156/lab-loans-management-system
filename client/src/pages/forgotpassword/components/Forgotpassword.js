import React from 'react'; 
import '../style.css';

import Button from 'react-bootstrap/Button'; 
import Form from 'react-bootstrap/Form';

import logo from '../../../assets/svg/NTU_logo.svg'; 

function Login() {
  return (
    <div className="h-100 align-items-center justify-content-center d-flex p-2 form">
        <img src = {logo} alt = "NTU logo"/>
        <h2 class = "mb-3"> Forgot Password </h2>
        <p> You will receive instructions for reseting your password. </p>
        <Form > 
          <Form.Group> 
            <Form.Control className = "height" type = "email" placeholder = "Enter NTU email"/>
          </Form.Group> 

          <Button className = "height btn-block margin-10" variant = "primary" type = "submit"> Send </Button>
        </Form>
      
      
      
    </div>

  )
}

export default Login