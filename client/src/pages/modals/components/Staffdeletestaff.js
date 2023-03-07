import React from 'react'


//Bootstrap 
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
//Backend
import axios from 'axios'
import ENV from '../../../config.js'; 

const API_HOST = ENV.api_host;
export default function Staffdeletestaff({staff, successnotif, errornotif, handleUpdateLab}) {
    const closeModal = ()=>{
        const modal = document.getElementById("modal-delete-staff-"+ staff.email)
        modal.style.display = 'none'
    }
    const submit = () =>{
        axios.post(API_HOST + "/staff/delete", {email: staff.email}).then((response)=>{
            if (response.data === 1){
                successnotif("Staff successfully deleted")
                handleUpdateLab()
                closeModal()
            }else{
                errornotif("Staff has already been deleted")
            }
        })
    }
  return (
    <div id = {'modal-delete-staff-'+staff.email }className='modal'>
        <div className='modal-content'>
        <span onClick = {closeModal} className = "close"> &times; </span>
            <div className= 'modal-header'> 
                <h2> {"Delete staff: " +staff.email} </h2> 
            </div>
            <div className = 'modal-sub-page delete-modal'> 
                <Form> 
                <Form.Group> 
                    <Form.Label> Are you sure you want to delete staff?  </Form.Label>
                </Form.Group>
                <div className = 'form-footer'> 
                    <Button onClick = {submit}className = "float-right">Confirm</Button> 
                </div>
               
                </Form> 
 
                
            </div>
        </div>
    </div>
  )
}
