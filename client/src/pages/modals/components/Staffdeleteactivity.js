import React, {useState} from 'react'
import {useForm} from 'react-hook-form'


//Bootstrap 
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { AiFillDelete } from 'react-icons/ai'

//Backend
import axios from 'axios'
import ENV from '../../../config.js'; 

const API_HOST = ENV.api_host;



export default function ({successnotif, handleSetDeleteActivity }) {
    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [startDate, setStartDate] = useState("")
    const [endDate, setEndDate] = useState("")
    
    const closeModal = ()=>{
        const modal = document.getElementById('modal-activity-delete')
        modal.style.display = 'none'
    }
    
   
    const deleteActivity = ()=>{
       
        
axios.post(API_HOST+"/activity/date/" + startDate + '/' + endDate).then((response)=>{
            
            handleSetDeleteActivity() 
        })
        
        closeModal()
        
        
        
    }
    
    const onSubmit = (data, e) => {
            deleteActivity()
            successnotif("Successfully deleted")
         
    };
    const onError = (errors, e) => console.log(errors, e);

  return (
    
        <div id = 'modal-activity-delete' className = 'modal'> 
            <div className='modal-content'> 
                <span onClick = {closeModal} className = "close"> &times; </span>
            <div className= 'modal-header'> 
                <h2> Delete activity data </h2> 
            </div>
            <div className='modal-sub-page'> 
                <Form onSubmit={handleSubmit(onSubmit, onError)}>

                <div className = 'flex-container'>
                    <Form.Group className = 'md md-right'> 
                        <Form.Label>From</Form.Label>
                        <Form.Control {...register("startdate", {required: true})} onChange = {(e)=>{setStartDate(e.target.value)}}type = 'date'></Form.Control>
                        {errors.startdate && <Form.Text className = "error">Please select start date.</Form.Text>}
                    </Form.Group>
                    <Form.Group className='md md-left'>
                    <Form.Label>To</Form.Label>
                        <Form.Control {...register("enddate", {required: "Please select end date.", 
                        validate: {
                            morethanstartdate: v => {
                                return new Date(startDate) <= new Date(endDate) || "Start date should be before end date."
                            }
                        }
                        })} onChange = {(e)=>{setEndDate(e.target.value)}}type = 'date'></Form.Control>
                        {errors.enddate && <Form.Text className = "error">{errors.enddate.message}</Form.Text>}
                    </Form.Group>
                </div>
                <div className = 'form-footer'> 
                  
                  <Button  className = "btn-block" variant = "danger" type = "submit" > <AiFillDelete/> Delete</Button>
              </div>
                </Form>
                
                
            </div>
            
            </div>
        </div>
   
  )
}
