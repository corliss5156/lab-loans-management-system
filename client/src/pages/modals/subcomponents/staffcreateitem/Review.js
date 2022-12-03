import React, { useEffect } from 'react'

//React bootstrap
import Button from 'react-bootstrap/esm/Button'
import Form from 'react-bootstrap/Form'
import Select from 'react-select'
import Table from 'react-bootstrap/Table'

export default function Review({childnavigate, stock, item}) {
    useEffect(()=>{
        console.log(stock, item)
    })
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
                            <tr> 
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
            <Button  className = "btn-block" variant = "primary" type = "submit"> Submit </Button>
        </div>
    </div>
  )
}
