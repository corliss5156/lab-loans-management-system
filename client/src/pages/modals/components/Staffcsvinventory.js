import React, {useState} from 'react'
import {useForm} from 'react-hook-form'


//Bootstrap 
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { AiOutlineDownload } from 'react-icons/ai'

//Backend
import axios from 'axios'
import ENV from '../../../config.js'; 

const API_HOST = ENV.api_host;



export default function ({errornotif}) {
    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [startDate, setStartDate] = useState("")
    const [endDate, setEndDate] = useState("")

    const closeModal = ()=>{
        const modal = document.getElementById('modal-inventory-csv')
        modal.style.display = 'none'
    }
    const downloadCSV = ()=>{
        console.log(startDate, endDate)
        axios.get(API_HOST+"/stock/" + startDate + '/' + endDate).then((response)=>{
            const data = response.data
            if(data === "No records found."){
                errornotif("No records found. Change date range.")
            } else {
                const titleKeys = Object.keys(data[0])
                const refinedData = []
                refinedData.push(titleKeys)
                data.forEach(item => {
                    refinedData.push(Object.values(item))  
                  })
                let csvContent = ''
    
                refinedData.forEach(row => {
                csvContent += row.join(',') 
                csvContent += '\r\n'
                })
                
                console.log(csvContent)
                var hiddenElement = document.createElement('a');
                hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csvContent);
                hiddenElement.target = '_blank';
                hiddenElement.download = 'Inventory.csv';
                hiddenElement.click();
            }
            closeModal()
            
        })
        
        

    }
    const onSubmit = (data, e) =>{
        downloadCSV()
        
    }
    const onError = (errors, e) => console.log(errors, e);
  return (
    
        <div id = 'modal-inventory-csv' className = 'modal'> 
            <div className='modal-content'> 
                <span onClick = {closeModal} className = "close"> &times; </span>
            <div className= 'modal-header'> 
                <h2> Export inventory data to CSV </h2> 
            </div>
            <div className='modal-sub-page'> 
                <Form onSubmit={handleSubmit(onSubmit, onError)}>
                <div className = 'flex-container'>
                    <Form.Group className = 'md md-right'> 
                        <Form.Label>From</Form.Label>
                        <Form.Control {...register("startdate", {required: true})}  onChange = {(e)=>{setStartDate(e.target.value)}}type = 'date'></Form.Control>
                        {errors.startdate && <Form.Text className = "error">Please select start date.</Form.Text>}
                    </Form.Group>
                    <Form.Group className='md md-left'>
                    <Form.Label>To</Form.Label>
                        <Form.Control 
                        {...register("enddate", {required: "Please select end date.", 
                        validate: {
                            morethanstartdate: v => {
                                return new Date(startDate) <= new Date(endDate) || "Start date should be before end date."
                            }
                        }
                        })}
                        onChange = {(e)=>{setEndDate(e.target.value)}}type = 'date'></Form.Control>
                        {errors.enddate && <Form.Text className = "error">{errors.enddate.message}</Form.Text>}
                    </Form.Group>
                </div>
                <div className = 'form-footer'> 
                    <Button className = "btn-block" variant = "primary" type = "submit" > <AiOutlineDownload/> Download CSV</Button>
                </div>
                </Form>
                
            </div>
            </div>
        </div>
   
  )
}
