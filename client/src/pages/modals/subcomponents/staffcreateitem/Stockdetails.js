import React, { forwardRef, useState, useEffect } from 'react'

//React boostrap 

import Table from 'react-bootstrap/esm/Table'
import Button from 'react-bootstrap/Button'


//Backend
import axios from 'axios'
import ENV from '../../../../config.js'; 
const API_HOST = ENV.api_host


const Stockdetails = forwardRef(({childnavigate, stock,setStock}, ref)=>{
    const [labs, setLabs] = useState([])

    useEffect(()=>{
        const temp = []
        if(stock.length ===0 ){
            axios.get(API_HOST+"/lab").then((response)=>{
            setLabs(response.data)
            
            Array.from(response.data).forEach((lab)=>{
                temp.push( 
                    {"lab": lab.lab, 
                    "Available": 0, 
                    "On Loan": 0, 
                    "Lab Use": 0})
            })
        })
        setStock(temp)
        }
    }, [])
 const handleChange = (e) =>{
    const labname = e.target.parentElement.parentElement.parentElement.firstChild.textContent.toString().trim()
    
    const stockstatus = e.target.name
    const stocklevel = e.target.value
    const temp = stock 
    temp.forEach((lab)=>{
        if (lab.lab === labname){
            lab[stockstatus] = parseInt(stocklevel)
        }
    })
    setStock(temp)

    //Update total 
    const tr = e.target.parentElement.parentElement.parentElement
    const divs = tr.getElementsByClassName('input')
    const totaltd = tr.firstChild.nextSibling
    
    let total = 0
    Array.from(divs).forEach((div)=>{
        if(div.value){
        total += parseInt(div.value)
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
 const submit = ()=>{
    childnavigate('3')
 }

  return (
    <div id = 'stock-table'>
        <Table > 
            <thead> 
                <tr> 
                    <th>Location</th> 
                    <th>Total</th>
                    <th>Available</th> 
                    <th>Lab Use </th>
                    <th>On Loan </th> 
                </tr>
            </thead>
            <tbody>
                {Array.from(stock).map((labstock)=>{
                   
                    return(
                        <tr> 
                            <td> {labstock.lab}</td> 
                            <td> {labstock['Available'] + labstock['Lab Use'] + labstock['On Loan']}</td>
                            <td> 
                                <div className="numberspinner-container">
                                    <input min="0" type="number" name = "Available" className="input"  onChange = {handleChange} placeholder = {labstock.Available}/> 
                                </div>
                            </td>
                            <td> 
                                <div className="numberspinner-container">
                                    <input type="number" name = "Lab Use" className="input"  onChange = {handleChange} placeholder = {labstock['Lab Use']}/> 
                                </div>
                            </td>
                            <td> 
                                <div className="numberspinner-container">
                                    <input type="number" name = "On Loan" className="input"  onChange = {handleChange} placeholder = {labstock['On Loan']}/> 
                                </div>
                            </td>
                        </tr>
                    )
                })}
            </tbody>
        </Table>
        <div className = 'form-footer'> 
        <Button onClick = {submit} className = "btn-block" variant = "primary" type = "submit"> Next </Button>
      </div>
        
    </div>
  )
}
)

export default Stockdetails
