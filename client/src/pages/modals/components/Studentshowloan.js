import React, { useEffect, useContext, useState } from 'react'

import jsPDF from 'jspdf'
//Components
import Form from 'react-bootstrap/Form'
import {FiAlertCircle} from 'react-icons/fi'
import {AiOutlineDownload} from 'react-icons/ai'
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'
//Backend
import { AuthContext } from '../../../helpers/AuthContext'
import axios from 'axios'
import ENV from '../../../config.js'; 
const API_HOST = ENV.api_host;

export default function Studentshowloan({formreference}) {
    const auth = useContext(AuthContext)
    const [loan, setLoan] = useState([])
    const [items, setItems]  = useState([])
    const [groupmembers, setGroupmembers] = useState([])
    const downloadpdf = ()=>{
      const doc = new jsPDF();

      doc.setFontSize(10)
      doc.setFont("arial", "normal")
      doc.text("Nanyang Technological University", 80, 20)
      doc.text("School of Computer Science and Engineering", 80, 25)
      doc.setFont("arial", 'bold')
      doc.text("MDP loan form details", 20, 40)
      doc.line(20, 41, 20+ doc.getTextWidth("MDP loan form details"), 41)
      doc.text("Loan Details", 20, 53).setFont("arial", 'normal')
      doc.line(20, 55, 190, 55 )
      doc.text("Form reference: " + loan.formreference, 20, 60)
      doc.text("Supervisor email: " + loan.supervisoremail, 130, 60)
      doc.text("Borrower name: " + loan.borrowername, 20, 65)
      doc.text("Borrower email: " + loan.borroweremail, 130, 65)
      doc.text("Loan Status: "+ loan.status, 20, 70 )
      doc.text("Lab: " + loan.lab, 130,70 )
      doc.text("Borrow date: " + loan.borrowdate, 20, 75)
      doc.text("Return date: " + loan.returndate, 130, 75)
      doc.setFont("arial", 'bold')
      doc.text("Item Details", 20, 88 ).setFont("arial", "normal")
      doc.line(20, 90, 190, 90)
      doc.text("Item name", 20, 95)
      doc.text("Quantity Received", 130, 95)
      let lineheight = 100
      
      for (let i in items){
        doc.text(items[i].item, 20, lineheight)
        doc.text(items[i].qtyreceived.toString(), 130, lineheight)
        lineheight +=5
      }
    
      
      doc.save(loan.formreference+".pdf");
    }
    useEffect(()=>{

        axios.get(API_HOST+ "/loanrequest/"+auth.authState.user + "/" + formreference).then((response)=>{
            setLoan(response.data[0])
            console.log(loan)
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
                <Form.Label> Lab </Form.Label>
                <Form.Control disabled placeholder = {loan.lab} ></Form.Control>
               
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
        <Table className='itemtable'>
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
          <Button onClick = {downloadpdf}  className = "btn-block" variant = "primary" type = "submit" > <AiOutlineDownload/> Download PDF</Button>
        </div>
        </div>
        </div>
        </div> 
    </div>
  )
}
