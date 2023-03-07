import React, {useState} from 'react'
import {useForm} from 'react-hook-form'


//Bootstrap 
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { AiOutlineDownload} from 'react-icons/ai'

//Backend
import axios from 'axios'
import ENV from '../../../config.js'; 

const API_HOST = ENV.api_host;



export default function ({errornotif, img, itemDetail, successnotif, handleSetImageUpdate}) {
    
    const [image, setImage] = useState([])
    const [preview, setPreview] = useState(undefined)
    const { register, handleSubmit, formState: { errors } } = useForm();

    const closeModal = ()=>{
        const modal = document.getElementById('modal-update-image-'+ itemDetail.imageid)
        modal.style.display = 'none'
    }
    
    
    const handleSetImage =(e)=>{
        e.preventDefault()
        let reader = new FileReader()
        document.getElementById("image-prompt").style.display = "none"
        if(e.target.files[0].size<64000){
            document.getElementById("update-image-button").disabled = false
            reader.onload = () =>{
                if(reader.readyState === 2){
                  setPreview(reader.result)
                  
                  setImage(e.target.files[0])
                }
            }
           
            reader.readAsDataURL(e.target.files[0])
        }else{
            errornotif("Maximum file size is 64kb.")
            const button = document.getElementById("update-image-button")
            setPreview(undefined)
            button.disabled = true
        }
        
    }
    

    const submit = ()=>{
        
        
        let reader = new FileReader()
        reader.onloadend = function(){
            let base64 = reader.result 

            axios.put(API_HOST + "/image", {
                id: itemDetail.imageid, 
                image: base64
            }).then((response)=>{
                if (response.data.image.id === itemDetail.imageid){
                    successnotif("Image successfully updated")
                    handleSetImageUpdate()
                    closeModal()
                }else{
                    errornotif("Unable to update image")
                }
            })
        }
        reader.readAsDataURL(image)
    }
    const onSubmit = (data, e) =>{
        submit()
    }
    const onError = (errors, e) => console.log(errors, e);
  return (
    
        <div id = {'modal-update-image-' + itemDetail.imageid} className = 'modal'> 
            <div className='modal-content'> 
                <span onClick = {closeModal} className = "close"> &times; </span>
            <div className= 'modal-header'> 
                <h2> Edit Image: {itemDetail.name}</h2> 
            </div>
            <div className='modal-sub-page'> 
                <Form onSubmit={handleSubmit(onSubmit, onError)}>
                <div className='flex-container'> 
                    <div className='md'>
                        <input hidden accept="image/png, image/jpeg"{...register("image", {required: true})} onChange = {handleSetImage} id = 'image-upload' type = "file"/>
                        <label for = "image-upload">
                            
                            <span id = {"image-prompt"}></span> 
                        </label>    
                        <div> <img src = {preview}/> </div>
                    </div>
                    
                    
                    <div  className='md'> 
                    <span> Original image </span>
                        <img src = {img} />    
                    </div> 
                
                </div>
                <div className = 'form-footer'> 
                  
                  <Button  id = "update-image-button" className = "btn-block" variant = "primary" type = "submit" > <AiOutlineDownload/> Update</Button>
              </div>
                </Form>
                
                
            </div>
            
            </div>
        </div>
   
  )
}
