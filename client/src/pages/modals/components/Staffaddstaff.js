import React, {useState} from 'react'
import {useForm} from 'react-hook-form'


//Bootstrap 
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { AiOutlineUserAdd } from 'react-icons/ai'

//Backend
import axios from 'axios'
import ENV from '../../../config.js'; 

const API_HOST = ENV.api_host;


export default function Staffaddstaff({successnotif, errornotif, handleUpdateLab}) {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [priviledge, setPriviledge] = useState(false)

    const { register, handleSubmit, formState: { errors } } = useForm();

    const randomGenerate = () =>{
        setPassword(Math.random().toString(36).slice(-8))
    }
    const closeModal = ()=>{
        const modal = document.getElementById('modal-add-staff')
        modal.style.display = 'none'
    }
    const addStaff = () =>{
        axios.post(API_HOST+"/staff", {
            email: email, 
            password: password, 
            priviledge: priviledge
        }).then((res)=>{
            if (res.data.name==="SequelizeUniqueConstraintError"){
                errornotif("User already exists")
            }
            else{
                successnotif("Successfully created user")
                handleUpdateLab()
                closeModal()
            }
        })
    }
    const onSubmit = (data, e) => {
        addStaff()
    };
    const onError = (errors, e) => console.log(errors, e);

  return (
    <div id = 'modal-add-staff' className = 'modal'>
        <div className = 'modal-content'> 
            <span onClick={closeModal} className = "close">&times;</span>
            <div className = 'modal-header'>
                <h2> Add staff </h2>
            </div>
            <div className = 'modal-sub-page'>
                <Form onSubmit={handleSubmit(onSubmit, onError)} > 
                    <Form.Group>
                        <Form.Label>Email</Form.Label>
                        <Form.Control {...register("email", {required: true})} onChange = {(e)=>setEmail(e.target.value)} type = "email"></Form.Control>
                        {errors.email && <Form.Text className = "error">{errors.email.message}</Form.Text>}
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Password</Form.Label>
                        <Form.Control placeholder = {password} disabled onChange = {(e)=>setPassword(e.target.value)} type = "password"></Form.Control>
                        
                        
                    </Form.Group>
                    <Button onClick = {randomGenerate}>Generate Password</Button>
               
                        <Form.Check onChange = {(e)=>{setPriviledge(!priviledge)
                            
                        }}id = 'priviledge' label = "Create user as priviledge user?" type = "checkbox" />
                    
                    <div className = 'form-footer'> 
                        <Button className = 'btn-block' variant = "primary" type = "submit" > <AiOutlineUserAdd/> Add staff</Button>
                    </div>
                </Form>
            </div>
        </div>
    </div>
  )
}
