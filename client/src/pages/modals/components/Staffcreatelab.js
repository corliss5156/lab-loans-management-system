
import React, { useEffect, useState } from 'react'


//Bootstrap 
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Select from 'react-select'
//Backend
import ENV from '../../../config.js'; 
import axios from 'axios'
import { FaTeamspeak } from 'react-icons/fa';

const API_HOST = ENV.api_host;


export default function Staffcreatelab({handleCreateLab, successnotif, errornotif}) {
    const [lab, setLab] = useState("")
    const [options, setOptions] = useState([])
    const [staff, setStaff] = useState("")
    
    const closeModal = ()=>{
        const modal = document.getElementById("modal-create-lab")
        modal.style.display = "none"
    }

    useEffect(()=>{
        axios.get(API_HOST+"/staff").then((response)=>{
            const temp = []
            for (let i in response.data){
                temp.push({
                    'value': response.data[i].email, 
                    'label': response.data[i].email
                })
            }
            setOptions(temp)
        })
    })
    
    const submit = (e)=>{
        axios.post(API_HOST+"/lab", {
            lab: lab, 
            staff: staff
        }).then((response)=>{
            console.log(response)
            if(response.data==="Validation error"){
                errornotif("Lab name must be unique.")
            }else{
                successnotif("Lab successfully created.")
                closeModal()
            }
        })
    }

    const handleSelect = (e)=>{
        
        setStaff(e.value)
    }
    
  return (
    <div> 
        <div id = "modal-create-lab" className = "modal">
                
                <div className = 'modal-content'> 
                <span onClick = {closeModal} className="close">&times;</span>
            
                <div className = 'modal-header'>    
                    <h2> Create lab </h2>    
                </div>
                <div className='modal-sub-page'> 
                    <Form> 
                        <Form.Group> 
                            <Form.Label>Lab name </Form.Label> 
                            <Form.Control onChange = {(e)=>{setLab(e.target.value)}}/> 
                        </Form.Group>
                        
                        <Form.Group> 
                            <Select onChange = {handleSelect}  options = {options} /> 
                        </Form.Group>
                
                    </Form>
                    
                </div>
                <div className = 'form-footer'> 
                   
                        <Button onClick = {submit} className = 'bth-block' variant = "primary" type = "submit"> Submit </Button>

                </div>
                </div>
        </div>
        
    </div>
  )
}
