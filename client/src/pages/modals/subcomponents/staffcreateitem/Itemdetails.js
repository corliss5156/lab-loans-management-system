import React, { useEffect, useState, useImperativeHandle, forwardRef} from 'react'
import {useForm} from 'react-hook-form'



//React bootstrap
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/esm/Button';
import {AiOutlineCloudUpload} from 'react-icons/ai'
//Backend
import axios from 'axios'
import ENV from '../../../../config.js'; 
const API_HOST = ENV.api_host

const Itemdetails = forwardRef(({childnavigate, item, setItem, errornotif}, ref) =>{
    const [name, setName] = useState(item.name)
    const [description, setDescription] = useState(item.description)
    const [remark, setRemark] = useState(item.remark)
    const [allItems, setAllItems] = useState([])
    const [preview, setPreview] = useState()
    const [image, setImage] = useState("")
    const { register, handleSubmit, formState: { errors } } = useForm();
    
    useImperativeHandle(
        ref,
      () => ({
        submit(){
            
            item.name = name 
            item.description = description 
            item.remark = remark
            item.image = image
            item.preview = preview
            setItem(item)
        },
      })
    )

    const handleSetImage =(e)=>{
        e.preventDefault()
        let reader = new FileReader()
        document.getElementById("image-prompt").style.display = "none"
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
    useEffect(()=>{
        axios.get(API_HOST+"/item").then((response)=>{
            const temp = []
            Array.from(response.data).forEach((item)=>{
                temp.push({'value': item.id, 'label': item.name})
            })
            setAllItems(temp)
        })
    })
    const submit = () =>{
       
        childnavigate('2')
        item.name = name 
        item.description = description 
        item.remark = remark
        item.image = image
        item.preview = preview
        setItem(item)
        
    }
    const onSubmit = (data, e) =>{
        console.log(preview)
        submit()
    }
    const onError = (errors, e) =>{
        console.log(errors, e)
    }

  return (
    <div className='modal-sub-page' >
        <Form onSubmit={handleSubmit(onSubmit, onError)}>
            <Form.Group> 
                <Form.Label>Item name</Form.Label> 
                <Form.Control 
                {...register("itemname", {required: true})}
                onChange = {(e)=>{setName(e.target.value)}} placeholder = {item.name===''? "Enter item name": item.name}  /> 
                {errors.itemname && <Form.Text className = "error">Required</Form.Text>}
            </Form.Group>
            <Form.Group> 
                <Form.Label>Description</Form.Label> 
                <Form.Control
                 onChange = {(e)=>{setDescription(e.target.value)}} placeholder = {item.description===''?"Enter item description": item.description}  /> 
                
            </Form.Group>
           
            
            <Form.Group> 
                <Form.Label>Remarks</Form.Label> 
                <Form.Control onChange = {(e)=>{setRemark(e.target.value)}}  placeholder = {item.remark===''? "Enter remarks for item": item.remark}  /> 
                
            </Form.Group>

            <input accept="image/png, image/jpeg" {...register("image", {required: true})} onChange = {handleSetImage} id = 'image-upload' type = "file" hidden/>
            <label for = "image-upload">             
                <span id = {"image-prompt"}> Upload image</span> 
            </label>
            <div >    
                <img  src={preview} />
            </div> 
            <div className = 'form-footer'> 
            <Button className = "btn-block" variant = "primary" type = "submit"> Next </Button>
        </div>
        </Form> 
       
    </div>
  )
}
)

export default Itemdetails