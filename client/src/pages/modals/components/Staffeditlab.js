
import React, { useEffect, useState } from 'react'


//Bootstrap 
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

import Select from 'react-select'
//Backend
import ENV from '../../../config.js'; 
import axios from 'axios'
const API_HOST = ENV.api_host;


export default function Staffeditlab({staff, priviledge, handleUpdateLab, defaultLabs, successnotif, errornotif}) {
    const [allLabs, setAllLabs] = useState([])
    const [selectedlabs, setSelectedLabs] = useState([])
    const [options, setOptions] = useState([])
    const [checked, setChecked] = useState(priviledge)

    const closeModal = ()=>{
        const modal = document.getElementById("modal-edit-lab-"+ staff.email)
        modal.style.display = "none"
    }
   
    useEffect(()=>{
        
        //Get list of all labs 
        axios.get(API_HOST + "/lab").then((response)=>{
            setAllLabs(response.data)
            const temp = []

            for (let i in response.data){
                temp.push( {
                    'value': response.data[i].lab, 
                    'label': response.data[i].lab
                })
            }
            setOptions(temp)

        })
    }, [])
    const submit = (e)=>{
        e.preventDefault()
        axios.put(API_HOST + "/staff/"+ staff.email, {
            labs: selectedlabs.toString(),
            priviledge: checked
        }).then((response)=>{
            
            if (response.status ===200){
                successnotif("Successfully updated access rights for " + staff.email)
                closeModal()
                handleUpdateLab()
            }
        })


    }
    const handleSelect = (e)=>{
        
        const temp = []
        for (let i in e){
            temp.push(e[i].value)

        }
        setSelectedLabs(temp)
    }
    const handlePriviledge = (e)=>{
        setChecked(!checked)
    }
   return (
    <div> 
        <div id = {"modal-edit-lab-"+ staff.email} className = "modal">
                
                <div className = 'modal-content'> 
                <span onClick = {closeModal} className="close">&times;</span>
            
                <div className = 'modal-header'>    
                    <h2> Edit Priviledges: {staff.email} </h2>    
                </div>
                <div className='modal-sub-page'> 
                    <Form> 
                        <Form.Group> 
                            <Select  defaultValue  = {defaultLabs} onChange = {handleSelect} isMulti options = {options} /> 
                        </Form.Group>
                        <Form.Group> 
                            <Form.Check checked = {checked} onChange = {handlePriviledge} type = 'checkbox' label = 'priviledge'/>
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
