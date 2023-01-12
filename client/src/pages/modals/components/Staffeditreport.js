
import React, { useEffect, useState } from 'react'


import Button from 'react-bootstrap/esm/Button';
import Form from 'react-bootstrap/Form'

//Backend
import ENV from '../../../config.js'; 
import axios from 'axios'
const API_HOST = ENV.api_host;

export default function Staffeditreport({report, handleReportUpdate, successnotif, errornotif}) {
    const [loan, setLoan]= useState([])
    const [originalStatus, setOriginalStatus] = useState(report.status)
    const [status, setStatus] = useState("")
    const [remark, setRemark] = useState("")
    const [dispose, setDispose] = useState(false)
    const [image, setImage] = useState([])

    
    const closeModal= ()=>{
        const modal = document.getElementById("modal-edit-report-"+ report.id)
        modal.style.display = "none"
    }
    const submit = ()=>{
        if(originalStatus==="Submitted" && status==="Processed"){
            //Reject
            errornotif("Unable to change status from 'Submitted' to 'Processed'. Change to 'Approved' or 'Rejected' first.")
        }
        else if (originalStatus === "Rejected" && status === "Processed"){
            errornotif("Unable to change status from 'Rejected' to 'Processed'.")
        }
        else{
            if(dispose){
                //Minus available stock of item by quantity requested
                axios.put(API_HOST+ "/stock/decrement/"+report.lab+ "/"+ report.item, {
                    qtyreceived: report.qty, 
                    status: "Available"
                }).then((response)=>{
                    console.log(response)
                })
            }
            axios.put(API_HOST+"/report/status/"+ report.id + "/"+ status).then((response)=>{
                if(response.status===200){
                    successnotif("Successfully updated report")
                    closeModal()
                    handleReportUpdate()
                }
                else{
                    errornotif("Unable to update report. Try again later.")
                }
            })
            setStatus(status)
            setOriginalStatus(status)
        }
    }
    useEffect(()=>{
        setStatus(report.status)
        console.log(report.imageid)
        setRemark(report.remark)
        axios.get(API_HOST + "/loanrequest/"+ report.borroweremail + "/"+report.formreference).then((response)=>{
           
            setLoan(response.data[0])
        })

        axios.get(API_HOST + '/image/'+ report.imageid).then((response)=>{
           
            setImage(response.data.image)
            
        })
    }, [])
  return (
    <div> 
        <div id = {"modal-edit-report-" + report.id} className = 'modal'> 
            <div className = 'modal-content'> 
                <span onClick = {closeModal} className = 'close'> &times; </span> 
            <div className = 'modal-header'> 
                <h2> {report.formreference} </h2>
            </div> 
            <div className = 'modal-sub-page'> 
                <Form> 
                    <Form.Group> 
                        <Form.Label> Form Reference Number </Form.Label> 
                        <Form.Control disabled type = "text" placeholder = {report.formreference}/>
                    </Form.Group>
                    
                    <Form.Group> 
                        <Form.Label> Supervisor Email </Form.Label> 
                        <Form.Control disabled type = "text" placeholder = {loan.supervisoremail}/>
                    </Form.Group>
                    <Form.Group> 
                        <Form.Label> Borrower Email </Form.Label> 
                        <Form.Control disabled type = "text" placeholder = {loan.borroweremail}/>
                    </Form.Group>
                   
                    <Form.Group> 
                        <Form.Label> Item </Form.Label> 
                        <Form.Control disabled type = "text" placeholder = {report.item}/>
                    </Form.Group>
                    <Form.Group> 
                        <Form.Label> Quantity </Form.Label> 
                        <Form.Control disabled type = "text" placeholder = {report.qty}/>
                    </Form.Group>
                    <Form.Group> 
                        <Form.Label> Reason </Form.Label> 
                        <Form.Control disabled type = "text" placeholder = {report.reason}/>
                    </Form.Group>
                    <Form.Group> 
                        <Form.Label>Status</Form.Label>
                        <Form.Select onChange = {(e)=>{setStatus(e.target.value)}}> 
                            <option value = {status}>{status}</option>
                            <option value = "Approved">Approved</option>
                            <option value = "Rejected">Rejected</option> 
                            <option value = "Processed">Processed</option>
                        </Form.Select>
                    </Form.Group>
                    {status==="Processed"? <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Check type="checkbox" label="Item was disposed" onChange = {(e)=>{setDispose(!dispose)}} />
      </Form.Group>: null}
                    <Form.Group> 
                        <Form.Label>Remark</Form.Label>
                        <Form.Control onChange = {(e) =>{setRemark(e.target.value)}} type = "text" placeholder = {report.remark}/> 
                    </Form.Group>
                    <div> 
                        <span>Email confirmation</span>
                        <img src = {image}/>
                    </div> 
                    <Button onClick = {submit}>Submit</Button>
                    
                </Form>
            </div>
                 

            </div>
        </div>
       
    </div>
  )
}
