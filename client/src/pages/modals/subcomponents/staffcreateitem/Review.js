import React, { useEffect } from 'react'

//React bootstrap
import Button from 'react-bootstrap/esm/Button'
import Form from 'react-bootstrap/Form'
import Select from 'react-select'
import Table from 'react-bootstrap/Table'

//Backend
import axios from 'axios'
import ENV from '../../../../config.js'; 
const API_HOST = ENV.api_host


export default function Review({handleSetItemSubmit, stock, item}) {
    
    const submit = (e)=>{
        e.preventDefault()
        const subitems = []
        item.subitems.forEach((subitem)=>{
            subitems.push(subitem.value)
        })
        
        //Upload item
        axios.post(API_HOST +'/item', {
            name: item.name, 
            description: item.description, 
            remark: item.remark, 
            subitems: subitems.toString()
        }).then((response)=>{
            console.log(response.data)
        })

        
        //Add stock 
        stock.forEach((stocklevel)=>{
            axios.post(API_HOST+'/stock', {
                lab: stocklevel.lab, 
                itemname: item.name, 
                Available: stocklevel.Available, 
                OnLoan: stocklevel['On Loan'], 
                LabUse: stocklevel['Lab Use']

        }).then((response)=>{
        })
        })
      //Close modal
      const modal = document.getElementById('modal-create-item')
        modal.style.display = 'none'
        handleSetItemSubmit()
        
    }
    return (
        <div className='modal-sub-page' >
        <Form>
            <Form.Group> 
                <Form.Label>Item name</Form.Label> 
                <Form.Control disabled placeholder = {item.name}  /> 
                
            </Form.Group>
            <Form.Group> 
                <Form.Label>Description</Form.Label> 
                <Form.Control disabled placeholder = {item.description}  /> 
                
            </Form.Group>
            <Form.Group>
                <Form.Label> Sub Items </Form.Label> 
                <Select classNamePrefix="select" closeMenuOnSelect={false} isDisabled = {true} isMulti className = 'basic-multi-select' defaultValue = {item.subitems}  />
            </Form.Group>
            
            <Form.Group> 
                <Form.Label>Remarks</Form.Label> 
                <Form.Control disabled placeholder = {item.remark=== ""? "No remarks" : item.remark}  /> 
                
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
                    {stock.map((stocklevel)=>{
                        const total = parseInt(stocklevel['Available']) + parseInt(stocklevel['On Loan']) + parseInt(stocklevel['Lab Use'])
                        return(
                            <tr key = {stocklevel.lab +"-" +stocklevel.itemname}> 
                                <td>{stocklevel.lab}</td> 
                                <td> {total} </td>
                                <td>{stocklevel['Available']}</td>
                                <td>{stocklevel['On Loan']}</td>
                                <td>{stocklevel['Lab Use']}</td>
                            </tr> 
                        )
                    })}
                </tbody>

            </Table>
        </div>
        <div className = 'form-footer'> 
            <Button onClick = {submit} className = "btn-block" variant = "primary" type = "submit"> Submit </Button>
        </div>
    </div>
  )
}
