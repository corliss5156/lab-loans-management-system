import React from 'react'
import { useState, useEffect, useRef } from 'react'
import Select from 'react-select'

//Bootstrap 
import Form from 'react-bootstrap/Form'
import Table from 'react-bootstrap/esm/Table';
import Button from 'react-bootstrap/Button'

//Backend

import axios from 'axios'
import ENV from '../../../config.js'; 
const API_HOST = ENV.api_host


export default function Staffedititem({itemname, handleEditItemSubmit, lab}) {
   
    const [item, setItem] = useState([])
    const [newSubItems, setNewSubItems] = useState([])
    const [stock, setStock] = useState([])
    const [originstock, setOriginStock] = useState([])
    const [subItems, setSubItems] = useState([])
    const closeModal = () =>{
        const modal = document.getElementById('modal-edit-stock-'+itemname + "-" + lab)
        modal.style.display = 'none'
    }
    useEffect(()=>{
       
        //get item details
        axios.get(API_HOST + "/item/"+ encodeURIComponent(itemname)).then((response)=>{
            
            const subitemnames = []
            if (response.data[0].subitems  !== ""){
                let temp = response.data[0].subitems.split(",")
                const subitemstemp = []
                temp.forEach((subitemid)=>{
                    axios.get(API_HOST + "/item/id/"+subitemid).then((res)=>{
                        subitemstemp.push({
                            'value': res.data[0].id,
                            'label': res.data[0].name
                        })
                    })
                })
            }
            setItem({
                ...response.data[0]
            })
           
        })
        
        //Get all items 
        axios.get(API_HOST + '/item').then((response)=>{
            
            
            let temp = []
            Array.from(response.data).forEach((item)=>{
                temp.push({'value': item.id, 'label': item.name})
            })
            temp = temp.filter((item)=>{
                return item.value !== itemname
            })

            setSubItems(temp)

        })
        //get stock details 
        axios.get(API_HOST + '/stock/lab/itemname/'+ lab +"/"+ itemname).then((response)=>{
            setStock(response.data[0])
            setOriginStock(response.data[0])
        })



    }, [])
    
    const handleChange = (e)=>{
        const labname = e.target.parentElement.parentElement.parentElement.firstChild.textContent.toString().trim()
        const tablerow= e.target.parentElement.parentElement.parentElement
        const inputs = tablerow.getElementsByClassName("input")
        const inputvalues = []
        for (let input of inputs){
           
            if (input.value === ""){
                inputvalues.push(input.placeholder)

            }else{
            
                inputvalues.push(input.value)
            }
        }
        
        setStock({
            lab: lab, 
            itemname: itemname, 
            Available: inputvalues[0], 
            OnLoan: inputvalues[1], 
            LabUse: inputvalues[2]
        })
        
        const totaltd = tablerow.firstChild.nextSibling
        let total = 0
        Array.from(inputs).forEach((input)=>{
            if(input.value){
            total += parseInt(input.value)
            }else{
                total += parseInt(input.placeholder)
            }
        })
        if(total<0){
            totaltd.innerHTML = "Invalid"    
        }
        else if(isNaN(total)){
            totaltd.innerHTML = ""
        } else{
            totaltd.innerHTML = total
        }
    }

    const submit = (e)=>{
        e.preventDefault()
       
        const uploadsubitems = []
        
        if(newSubItems.length>0){
            newSubItems.forEach((subitem)=>{
            uploadsubitems.push(subitem.value)
        }) 
        }
       
        //Upload item
        axios.put(API_HOST +'/item/'+encodeURIComponent(itemname), {
            name: item.name, 
            description: item.description, 
            remark: item.remark, 
            subitems: uploadsubitems.toString()
        }).then((response)=>{
            console.log(response.data)
        })
        //Update stocks 
       
        axios.put(API_HOST+"/stock/"+lab+"/"+ itemname, {
            Available: stock.Available,
            OnLoan: stock.OnLoan, 
            LabUse: stock.LabUse
        }).then((response)=>{
            console.log(response.data)
        })
       //Close modal
        const modal = document.getElementById('modal-edit-stock-'+itemname + "-" + lab)
        modal.style.display = 'none'
        handleEditItemSubmit()
    }
    const handleSelect = (e)=>{
        const temp =[]
        e.forEach((item)=>{
            temp.push(item)
        })
        setNewSubItems(temp)
    }

    //Form handles
    const handleItemName = (e) =>{
        setItem({
            ...item, 
            name: e.target.value 
        })
    }
    const handleDescription = (e) =>{
        setItem({
            ...item, 
            description: e.target.value
        })
    }
    const handleRemark = (e)=>{
        setItem({
            ...item, 
            remark: e.target.value
        })
    }
  return (
    <div id = {'modal-edit-stock-'+itemname + "-" + lab} className='modal'> 
        <div className='modal-content'> 
            <span onClick = {closeModal} className="close">&times;</span>
            <div className = 'modal-header'>    
                <h2> Edit item: {item.name}</h2>    
            </div>
            
            <div className = 'modal-sub-page'> 

            <Form>
            <Form.Group> 
                <Form.Label>Item name</Form.Label> 
                <Form.Control disabled placeholder = {item.name} onChange = {handleItemName}/> 
                
            </Form.Group>
            <Form.Group> 
                <Form.Label>Description</Form.Label> 
                <Form.Control onChange = {handleDescription} placeholder = {item.description===""? "No Description": item.description}  /> 
                
            </Form.Group>
            <Form.Group>
                <Form.Label> Sub Items </Form.Label> 
                <Select onChange = {handleSelect} options = {subItems} classNamePrefix="select"  closeMenuOnSelect={false} isMulti className = 'basic-multi-select'  />
            </Form.Group>
            <Form.Group> 
                <Form.Label>Remarks</Form.Label> 
                <Form.Control onChange = {handleRemark} placeholder = {item.remark=== ""||item.remark===null? "No remarks" : item.remark}  /> 
                
            </Form.Group>
        </Form> 
        <div id = 'review-table'>
            <Table>
                <thead>
                    <tr> 
                        <td>Location</td>
                        <td>Total</td>
                        <td>Available</td>
                        <td>On Loan</td> 
                        <td>Lab Use</td> 
                    </tr>
                </thead> 
                <tbody>
                            
                            <tr> 
                                <td>{stock.lab}</td> 
                                <td>{stock.Available + stock.OnLoan + stock['LabUse']} </td>
                                <td>
                                    <div className="numberspinner-container">
                                        <input onChange = {handleChange} type="number" name = "Available" className="input"  placeholder = {stock.Available}/> 
                                    </div>
                                </td>
                                <td><div className="numberspinner-container">
                                    <input onChange = {handleChange} type="number" name = "On Loan" className="input"   placeholder = {stock.OnLoan}/> 
                                </div>
                                </td>
                                <td>
                                    <div className="numberspinner-container">
                                        <input onChange = {handleChange} type="number" name = "Lab Use" className="input"  placeholder = {stock['LabUse']}/> 
                                    </div>
                                </td>
                            </tr> 
                        
                </tbody>

            </Table>
        </div>
        <div className = 'form-footer'> 
            <Button onClick = {submit} className = "btn-block" variant = "primary" type = "submit"> Submit </Button>
        </div>
            </div>
        </div>
    </div>
  )
}
