import React from 'react'
import { useState, useEffect, useContext } from 'react'
import Select from 'react-select'

//Bootstrap 
import Form from 'react-bootstrap/Form'
import Table from 'react-bootstrap/esm/Table';
import Button from 'react-bootstrap/Button'

//Backend

import axios from 'axios'
import ENV from '../../../config.js'; 
import { AuthContext } from "../../../helpers/AuthContext";



export default function Staffedititem({handleEditItemSubmit, stock, editItem}) {
   
    const [item, setItem] = useState([])
    const [newStock, setNewStock] = useState([])
    const [originalStock, setOriginalStock] = useState([])
    const API_HOST = ENV.api_host

    const auth= useContext(AuthContext)

    const closeModal = () =>{
        const modal = document.getElementById('modal-edit-stock-'+stock.itemname + "-" + stock.lab)
        modal.style.display = 'none'
    }
    useEffect(()=>{
        
        //get item details
        axios.get(API_HOST + "/item/"+ encodeURIComponent(stock.itemname)).then((response)=>{
      
            setItem({
                ...response.data[0]
            })
           
        })
        

        // get stock details 
        axios.get(API_HOST + '/stock/lab/itemname/'+ stock.lab +"/"+ stock.itemname).then((response)=>{
            setOriginalStock(response.data[0])
            setNewStock(response.data[0])
            
        })



    }, [editItem])
    
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
        
        setNewStock({
            lab: stock.lab, 
            itemname: stock.itemname, 
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
       
        
       
        //Upload item
        axios.put(API_HOST +'/item/'+encodeURIComponent(stock.itemname), {
            name: item.name, 
            description: item.description, 
            remark: item.remark
        }).then((response)=>{
            console.log(response.data)
        })
        //Update stocks 
       
        axios.put(API_HOST+"/stock/"+stock.lab+"/"+ stock.itemname, {
            Available: newStock.Available,
            OnLoan: newStock.OnLoan, 
            LabUse: newStock.LabUse
        }).then((response)=>{
            console.log(response.data)
        })

        //Insert into activity 
        axios.post(API_HOST + "/activity", {
            staff: auth.authState.user, 
            item: item.name, 
            oldAvailable: originalStock.Available, 
            oldOnLoan: originalStock.OnLoan,
            oldLabUse: originalStock.LabUse,
            newAvailable:newStock.Available, 
            newOnLoan: newStock.OnLoan,
            newLabUse: newStock.LabUse
        })
        
        setNewStock([])
       //Close modal
        closeModal()
        handleEditItemSubmit()
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
    <div id = {'modal-edit-stock-'+stock.itemname + "-" + stock.lab} className='modal'> 
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
                                <td>{newStock.Available + newStock.OnLoan + newStock['LabUse']} </td>
                                <td>
                                    <div className="numberspinner-container">
                                        <input onChange = {handleChange} type="number" name = "Available" className="input"  placeholder = {newStock.Available}/> 
                                    </div>
                                </td>
                                <td><div className="numberspinner-container">
                                    <input onChange = {handleChange} type="number" name = "On Loan" className="input"   placeholder = {newStock.OnLoan}/> 
                                </div>
                                </td>
                                <td>
                                    <div className="numberspinner-container">
                                        <input onChange = {handleChange} type="number" name = "Lab Use" className="input"  placeholder = {newStock['LabUse']}/> 
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
