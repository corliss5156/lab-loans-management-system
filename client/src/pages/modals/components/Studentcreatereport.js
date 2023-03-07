import React, { useEffect, useState } from 'react'
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useForm} from 'react-hook-form'

//Bootstrap 
import Button from 'react-bootstrap/esm/Button';
import Form from 'react-bootstrap/esm/Form'

//Backend
import ENV from '../../../config.js'; 
import axios from 'axios'
const API_HOST = ENV.api_host;

export default function Studentcreatereport({formreference, loan, handleReport, successnotif, errornotif}) {
    const [items, setItems] = useState([])
    const [loanItem, setLoanItem] = useState("")
    const [quantity, setQuantity] = useState(0)
    const [reason, setReason] = useState("")
    const [image, setImage] = useState("")
    const [preview, setPreview] = useState("")
    const { register, handleSubmit, formState: { errors } } = useForm();

    useEffect(()=>{
        //Get list of loan items 
        axios.get(API_HOST+ "/loanitem/"+ formreference).then((response)=>{
           
            setItems(response.data)
        })
    }, [])

    const submit = ()=>{
        let imageid = null
        //Post image 
        let reader = new FileReader()
        reader.onloadend = function(){
            let base64 = reader.result
            
            axios.post(API_HOST+"/image", {
                image: base64
            }).then((response)=>{
                console.log(response)
                imageid = response.data.id
                // //Post to report table
        axios.post(API_HOST+"/report", {
            formreference: formreference, 
            status: 'Submitted', 
            qty: quantity, 
            borrowername: loan.borrowername, 
            borroweremail: loan.borroweremail, 
            reason: reason, 
            lab: loan.lab, 
            item: loanItem, 
            imageid: imageid
        }).then((response)=>{
            console.log(response)
            if(response.status ===200){
                successnotif("Report submitted")
            }
        })

            })
        }
        reader.readAsDataURL(image)
        
        
        
        handleReport()
        closeModal()
    }

    const closeModal = ()=>{
        const modal = document.getElementById("modal-create-report-"+ formreference)
        modal.style.display = "none"
    }
    const handleSetImage =(e)=>{
        e.preventDefault()
        let reader = new FileReader()
        document.getElementById("image-prompt-"+formreference).style.display = "none"
        if(e.target.files[0].size<64000){
            reader.onload = () =>{
                if(reader.readyState === 2){
                  setPreview(reader.result)
                  console.log(reader)
                  setImage(e.target.files[0])
                }
            }
           
            reader.readAsDataURL(e.target.files[0])
        }else{
            errornotif("Maximum file size is 64kb.")
        }
        
        
        
    }
    
    const onSubmit = (data, e) =>{
        submit()
    }
    const onError = (errors, e) => console.log(errors, e);
 
    
  return (
    <div>
    <div id = {'modal-create-report-' + formreference} className='modal'>
        <div className = 'modal-content'> 
        <span onClick = {closeModal} className = 'close'> &times; </span> 
        <div className = 'modal-header'> 
            <h2> {formreference} </h2>
        </div> 

        <div className = 'modal-sub-page'> 
            <Form onSubmit={handleSubmit(onSubmit, onError)}>
                <div className = 'flex-container'>
                    <Form.Group className = 'md md-right'> 
                        <Form.Label> Select loan item</Form.Label>
                        <Form.Select {...register("item", {required: true})}  onChange = {(e)=>{setLoanItem(e.target.value)}}> 
                        <option></option> 
                            {
                                items.map((item)=>{
                                    return(
                                        <option value = {item.item}>{item.item}</option>
                                    )
                                })
                            }
                        </Form.Select>
                        {errors.item && <Form.Text className = "error">Required</Form.Text>}
                    </Form.Group>
                    <Form.Group className = 'md md-left' >
                        <Form.Label> Quantity Requested </Form.Label>
                        <Form.Control {...register("qtyrequested", {required: true})} onChange = {e=> setQuantity(e.target.value)}  type = "number" placeholder = "Enter quantity"/>
                        {errors.qtyrequested && <Form.Text className = "error">Required</Form.Text>}
                    </Form.Group> 
                    
                </div>
                <Form.Group > 
                    <Form.Label> Reason </Form.Label>
                    <Form.Control {...register("reason", {required: true})} onChange = {e=>setReason(e.target.value)}type = 'text' placeholder = "Enter reason for loan request"/> 
                    {errors.qtyrequested && <Form.Text className = "error">Required</Form.Text>}
                </Form.Group>
                <input hidden accept="image/png, image/jpeg"{...register("image", {required: true})} onChange = {handleSetImage} id = 'image-upload' type = "file"/>
                <label for = "image-upload">
                    
                    <span id = {"image-prompt-"+formreference}> Upload screenshot of confirmation email from supervisor</span> 
                </label>
                
                <div > 
                    
                        
                        
                        
                        <img src = {preview} />
                    
                   
                </div> 
                <div className = 'form-footer'> 
            <Button  className = 'bth-block' variant = "primary" type = "submit"> Submit </Button>
          
        </div>
            </Form>
            
        </div>
        
        </div>
    </div> 
        <ToastContainer position="bottom-center"
            autoClose={5000}
            hideProgressBar
            newestOnTop={false}
            closeOnClick/>
    </div>

  )
}
