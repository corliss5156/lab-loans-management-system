
import React, { useEffect, useState } from 'react'


//Bootstrap 
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

import Select from 'react-select'
//Backend
import ENV from '../../../config.js'; 
import axios from 'axios'
const API_HOST = ENV.api_host;


export default function Staffeditlabstaff({lab, defaultStaff, handleUpdateLab, successnotif, errornotif}) {
    
    const [staff, setStaff] = useState("")
    const [originalStaff, setOriginalStaff] = useState()
    const [options, setOptions] = useState([])
    const closeModal = ()=>{
        const modal = document.getElementById("modal-edit-lab-staff-"+ lab.lab)
        modal.style.display = "none"
    }
   
    useEffect(()=>{
       
        setStaff(lab.staff)
        //Get list of all staff
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
    }, [])
    const submit = (e)=>{
       axios.put(API_HOST+"/lab", {
        lab:lab.lab, 
        staff: staff
       }).then((response)=>{
        if (response.status===200){
            successnotif("Lab staff successfully updated.")
            closeModal()
            handleUpdateLab()
        }else{
            errornotif("Error updating lab staff.")
            closeModal()
            handleUpdateLab()
        }
       })
    }
    const handleSelect = (e)=>{
        setStaff(e.value)
        
    }
  return (
    <div> 
        <div id = {"modal-edit-lab-staff-"+ lab.lab} className = "modal">
                
                <div className = 'modal-content'> 
                <span onClick = {closeModal} className="close">&times;</span>
            
                <div className = 'modal-header'>    
                    <h2> Edit Labs: {lab.lab} </h2>    
                </div>
                <div className='modal-sub-page'> 
                    <Form> 
                        <Form.Group> 
                            <Select  defaultValue  = {defaultStaff} onChange = {handleSelect} options = {options} /> 
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
