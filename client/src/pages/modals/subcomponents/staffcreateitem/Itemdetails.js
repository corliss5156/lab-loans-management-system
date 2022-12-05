import React, { useEffect, useState, useImperativeHandle, forwardRef} from 'react'
import Select from 'react-select'



//React bootstrap
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/esm/Button';

//Backend
import axios from 'axios'
import ENV from '../../../../config.js'; 
const API_HOST = ENV.api_host

const Itemdetails = forwardRef(({childnavigate, item, setItem}, ref) =>{
    const [name, setName] = useState(item.name)
    const [description, setDescription] = useState(item.description)
    const [remark, setRemark] = useState(item.remark)
    const [allItems, setAllItems] = useState([])
    const [subitems, setSubItems] = useState(item.subitems)
    
    useImperativeHandle(
        ref,
      () => ({
        submit(){
            
            item.name = name 
            item.description = description 
            item.remark = remark
            item.subitems = subitems 
            setItem(item)
        },
      })
    )
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
        item.subitems = subitems 
        setItem(item)
        
    }
    const handleSelect = (e)=>{
        const temp =[]
        e.forEach((item)=>{
            temp.push(item)
        })
        setSubItems(temp)
        
    }

  return (
    <div className='modal-sub-page' >
        <Form>
            <Form.Group> 
                <Form.Label>Item name</Form.Label> 
                <Form.Control onChange = {(e)=>{setName(e.target.value)}} placeholder = {item.name===''? "Enter item name": item.name}  /> 
                
            </Form.Group>
            <Form.Group> 
                <Form.Label>Description</Form.Label> 
                <Form.Control onChange = {(e)=>{setDescription(e.target.value)}} placeholder = {item.description===''?"Enter item description": item.description}  /> 
                
            </Form.Group>
            <Form.Group>
                <Form.Label> Sub Items </Form.Label> 
                <Select defaultValue = {item.subitems} onChange= {handleSelect} classNamePrefix="select" closeMenuOnSelect={false} isMulti className = 'basic-multi-select' options = {allItems} />
            </Form.Group>
            
            <Form.Group> 
                <Form.Label>Remarks</Form.Label> 
                <Form.Control onChange = {(e)=>{setRemark(e.target.value)}}  placeholder = {item.remark===''? "Enter remarks for item": item.remark}  /> 
                
            </Form.Group>
        </Form> 
        <div className = 'form-footer'> 
            <Button onClick = {submit} className = "btn-block" variant = "primary" type = "submit"> Next </Button>
        </div>
    </div>
  )
}
)

export default Itemdetails