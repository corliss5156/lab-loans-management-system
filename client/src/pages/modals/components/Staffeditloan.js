import React, { useEffect, useContext, useState } from 'react'
import Form from 'react-bootstrap/Form'
import { AuthContext } from '../../../helpers/AuthContext'
import axios from 'axios'
import ENV from '../../../config.js'; 
import {FiAlertCircle} from 'react-icons/fi'
import {FiEdit} from 'react-icons/fi'
import {AiOutlineDownload} from 'react-icons/ai'
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'
const API_HOST = ENV.api_host;

export default function Staffeditloan({email, formreference, handleUpdate}) {
    const auth = useContext(AuthContext)
    const [loan, setLoan] = useState([])
    const [change, setChange] = useState([])
    const [originalitems, setOriginalItems] = useState([])
    const [items, setItems]  = useState([])
    const [groupmembers, setGroupmembers] = useState([])
    const downloadpdf = ()=>{
        console.log("Download pdf")
    }
    useEffect(()=>{
        axios.get(API_HOST+ "/loanrequest/"+ email + "/" + formreference).then((response)=>{
            setLoan(response.data[0])
            setGroupmembers(Array.from(response.data[0].groupmembers.split(',')))
            
        })
        axios.get(API_HOST + '/loanitem/' + formreference).then((response)=>{
            setItems(response.data)
            setOriginalItems(response.data)
        })
    }, [change])
    const closeModal = () => {
        const modal = document.getElementById('modal-edit-loan-' + formreference)
        modal.style.display = 'none'
    }

    const handleChange = (e)=>{
        // Check if new quantity is equals to qty to receive. If yes, remove the red icon
        const value = parseInt(e.target.value)
        const qtytoreceive = parseInt(e.target.parentElement.parentElement.previousSibling.textContent)
        const fiedit = e.target.parentElement.parentElement.parentElement.firstChild.firstChild.nextSibling
        const itemname = e.target.parentElement.parentElement.previousSibling.previousSibling.textContent.toString().trim()
        if (value === qtytoreceive){
          
            fiedit.style.display = 'none'
            
        }
        else{
            fiedit.style.display='block'

        }
        const item = {
            item: itemname, 
            qtyreceived: value
        }
        //Add item name to list of changed items 
        setChange([...change, item])
    }
    const edit = (e)=> {
        //Update each item that was changed 

        change.map((item, key)=>{
            axios.put(API_HOST + "/loanitem/"+ formreference + "/item", {qtyreceived: item.qtyreceived, item: item.item}).then((response)=>{
                setChange(change.filter(x => x.item !== item.item))
            })
        })

        //Loop through all items. If all items qty receive == qty to receive, loan status == "on loan"
        if(loan.status ==='Partial'){
            const tbody = document.getElementById('tbody-'+ formreference)
            const numberspinner = tbody.getElementsByClassName('numberspinner-container')
            if(Array.from(numberspinner).length === 0){
                //update loan status
                axios.put(API_HOST+'/loanrequest/status/'+formreference, {status: "On loan"}).then((response)=>{
                    
                })
            }
        }
        closeModal()
        handleUpdate()

        
    }
  return (
    <div id = {'modal-edit-loan-' + formreference} className='modal'>
        <div className = 'modal-content'> 
        <span onClick = {closeModal} className = 'close'> &times; </span> 
        <div className = 'modal-header'> 
            <h2> {loan.formreference} </h2>
        </div> 

        <div className = 'modal-sub-page'> 
        <Form> 
            <div className = 'flex-container'> 
                <Form.Group className = 'md md-right'> 
                <Form.Label> Status </Form.Label>
                <Form.Control disabled placeholder = {loan.status} ></Form.Control>
               
                </Form.Group>
                <Form.Group className = 'md md-left'> 
                <Form.Label> Borrower Email </Form.Label>
                <Form.Control disabled placeholder = {loan.borroweremail} ></Form.Control>
               
                </Form.Group>
        
            </div> 
            <div className = 'flex-container'>
                <Form.Group className = 'md md-right'> 
                <Form.Label> Borrower Name</Form.Label>
                <Form.Control disabled placeholder = {loan.borrowername} ></Form.Control>
               
                </Form.Group>
                <Form.Group className = 'md md-left'> 
                <Form.Label> Supervisor Email </Form.Label>
                <Form.Control disabled placeholder = {loan.supervisoremail} ></Form.Control>
               
                </Form.Group>

            </div> 
            <div className = 'flex-container'>
                <Form.Group className = 'smx smx-right'> 
                <Form.Label> Borrow Date </Form.Label>
                <Form.Control disabled placeholder = {loan.borrowdate} ></Form.Control>
               
                </Form.Group>
                <Form.Group className = "smx"> 
                <Form.Label> Return Date </Form.Label>
                <Form.Control disabled placeholder = {loan.returndate} ></Form.Control>
               
                </Form.Group>
                <Form.Group className = "smx smx-left"> 
                <Form.Label> Request Reason </Form.Label>
                <Form.Control disabled placeholder = {loan.requestreason} ></Form.Control>
               
                </Form.Group>
               
            </div>
            <Form.Group> 
            <Form.Label> Group members </Form.Label>
          
          </Form.Group>
            <div id = 'groupmembers'> 
            {groupmembers.length > 0? groupmembers.map((value, key)=>{
                return(
                    <div className = 'group-member' key = {key}> 
                        <p> {value} </p> 
                    </div>
                )
            }): null}
        </div>
        </Form> 
        <div> 
        <Table>
          <thead> 
            <tr>
            <th></th>
            <th> Item </th> 
            <th> Quantity to Receive </th> 
            <th> Quantity Received </th> 
            </tr>
          </thead>
          <tbody id = {'tbody-' + formreference}>
            {items.map((item)=>{
                if(parseInt(item['qtytoreceive']) !== parseInt(item['qtyreceived'])){
                    
                    return(
                      <tr >
                        <td> <div><FiAlertCircle style = {{color: 'red'}}/></div></td>
                        <td> {item.item} </td>
                        <td> {item['qtytoreceive']} </td>
                        <td>  <div className="numberspinner-container">
	
	
    <input onChange = {handleChange} type="number" className="input"  placeholder = {item.qtyreceived}/> 
    </div>
    </td>
                      </tr>
                    )
                  }
                  else {
                    return(
                      <tr>
                        <td></td>
                        <td> {item.item} </td>
                        <td> {item['qtytoreceive']} </td>
                        <td> {item.qtyreceived} 
                        </td>
                      </tr>
                    )
                  }
            })}
          </tbody>
        </Table>
        <div className = 'form-footer'> 
            <Button onClick = {edit} className = 'bth-block' variant = "secondary" type = "submit"> <FiEdit/> Edit </Button>
          <Button onClick = {downloadpdf} className = "btn-block" variant = "primary" type = "submit" > <AiOutlineDownload/> Download PDF</Button>
        </div>
        </div>
        </div>
        </div> 
    </div>
  )
}
