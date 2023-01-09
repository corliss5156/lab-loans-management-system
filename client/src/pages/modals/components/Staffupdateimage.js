import React, {useEffect, useState} from 'react'
import {useForm} from 'react-hook-form'


//Bootstrap 
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { AiOutlineDownload, AiTwotoneEdit } from 'react-icons/ai'

//Backend
import axios from 'axios'
import ENV from '../../../config.js'; 

const API_HOST = ENV.api_host;



export default function ({errornotif, img, itemDetail}) {
    
    const [image, setImage] = useState([])
    const [preview, setPreview] = useState(undefined)
    const { register, handleSubmit, formState: { errors } } = useForm();

    const closeModal = ()=>{
        const modal = document.getElementById('modal-update-image-'+ itemDetail.imageid)
        modal.style.display = 'none'
    }
    
    
    const handleSetImage =(e)=>{
        setImage(e.target.files[0])
       
        console.log(e.target.files[0])
        const span = e.target.previousSibling
        span.innerText = e.target.files[0].name
        setPreview(URL.createObjectURL(e.target.files[0]))
    }
    
    
    const onSubmit = (data, e) => {
        console.log(data, e)
    };
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

                <div className = 'flex-container'>
                <div className='image-area'> 
                    <label for = "image-upload">
                        <span> Upload image</span> 
                        <input  onChange = {handleSetImage} id = 'image-upload' type = "file"/>
                        {preview && <div>
          <img src={preview} alt="" />
        </div>}
                            <img src = {img}/>
                    </label>
                   
                </div> 
                </div>
                <div className = 'form-footer'> 
                  
                  <Button  className = "btn-block" variant = "primary" type = "submit" > <AiOutlineDownload/> Download CSV</Button>
              </div>
                </Form>
                
                
            </div>
            
            </div>
        </div>
   
  )
}
