import React, { useEffect, useContext, useState } from 'react'
import Form from 'react-bootstrap/Form'
import { AuthContext } from '../../../helpers/AuthContext'
import axios from 'axios'
import ENV from '../../../config.js'; 
import {FiAlertCircle} from 'react-icons/fi'
import {AiOutlineDownload} from 'react-icons/ai'
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'
const API_HOST = ENV.api_host;

export default function Studentshowloan({formreference}) {
    const auth = useContext(AuthContext)
    const [loan, setLoan] = useState([])
    const [items, setItems]  = useState([])
    const [groupmembers, setGroupmembers] = useState([])
    const downloadpdf = ()=>{
        console.log("Download pdf")
    }
    useEffect(()=>{
      
        axios.get(API_HOST+ "/loanrequest/"+auth.authState.user + "/" + formreference).then((response)=>{
            setLoan(response.data[0])
            setGroupmembers(Array.from(response.data[0].groupmembers.split(',')))
            
        })
        axios.get(API_HOST + '/loanitem/' + formreference).then((response)=>{
            setItems(response.data)
        })
    }, [])
    const closeModal = () => {
        const modal = document.getElementById('modal-show-loan-' + formreference)
        modal.style.display = 'none'
    }
  return (
    <div id = {'modal-show-loan-' + formreference} className='modal'>
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
          <tbody>
            {items.map((item)=>{
                if(parseInt(item['qtytoreceive']) !== parseInt(item['qtyreceived'])){
                    
                    return(
                      <tr >
                        <td> <FiAlertCircle style = {{color: 'red'}}/></td>
                        <td> {item.item} </td>
                        <td> {item['qtytoreceive']} </td>
                        <td> {item['qtyreceived']} </td>
                      </tr>
                    )
                  }
                  else {
                    return(
                      <tr>
                        <td></td>
                        <td> {item.item} </td>
                        <td> {item['qtytoreceive']} </td>
                        <td> {item['qtyreceived']} </td>
                      </tr>
                    )
                  }
            })}
          </tbody>
        </Table>
        <div className = 'form-footer'> 
          <Button onClick = {downloadpdf} className = "btn-block" variant = "primary" type = "submit" > <AiOutlineDownload/> Download PDF</Button>
        </div>
        </div>
        </div>
        </div> 
    </div>
  )
}
