import React, { useContext }  from 'react'

//Bootstrap
import Button from 'react-bootstrap/esm/Button'
import Table from 'react-bootstrap/Table'
import Form from 'react-bootstrap/Form'
import {FiAlertCircle} from 'react-icons/fi'

//Backend
import axios from 'axios'
import ENV from '../../../../config.js'; 
import { AuthContext } from '../../../../helpers/AuthContext';
const API_HOST = ENV.api_host;


export default function Review({loan, loanItems, handleSetLoanSubmit}) {
  
  const auth = useContext(AuthContext)
  const date = new Date()
  const month = date.getMonth()+1

  const submit = (event) =>{
    event.preventDefault()
    console.log(loan.lab)
    
    // Upload to loanitems table 
    axios.post(API_HOST + "/loanrequest", {
      formreference: loan.formreference, 
      borrowername: loan.borrowername, 
      borroweremail: auth.authState.user, 
      borrowdate: date.getFullYear() + "-" + month + "-" + date.getDate(), 
      requestreason: loan.loanreason, 
      supervisoremail: loan.supervisoremail, 
      phonenumber: loan.phonenumber, 
      status: "To Be Approved",
      lab: loan.lab, 
      groupmembers: loan.groupmembers.toString()
    }).then((response)=>{
      console.log(response)
      for (const item in loanItems) {
        console.log(item)
        axios.post(API_HOST + "/loanitem", {
          formreference: loan.formreference, 
          item: item,   
          lab: loan.lab,
          qtyreceived: loanItems[item]['qtyreceived']? loanItems[item]['qtyreceived'] : 0  ,
          qtytoreceive: loanItems[item]['qtytoreceive']
        }).then((response)=>{
          console.log(response)
        })
      }
    })

    

    const modal = document.getElementById('modal')
    modal.style.display = 'none'
    handleSetLoanSubmit()
  }
  return (
    <div className='modal-sub-page' id = 'review-sub-page'>
      <div className='modal-sub-page' id = 'loandetail-sub-page'>
        
      <Form> 
      <fieldset disabled>
        <div className = 'flex-container'> 
        
          <Form.Group className = 'md md-right'> 
            <Form.Label> Username </Form.Label>
            <Form.Control disabled placeholder = {loan.borrowername ==='' ? "Enter leader's username": loan.borrowername}></Form.Control>
          </Form.Group>
          <Form.Group className = 'md md-left'> 
            <Form.Label> Supervisor's email</Form.Label>
            <Form.Control disabled type = 'email'  placeholder = {loan.supervisoremail===''? "Enter supervisor's email": loan.supervisoremail}></Form.Control>
          </Form.Group>
        </div>
        <div className = 'flex-container'> 
          <Form.Group className = 'md md-right'> 
          <Form.Label> Lab </Form.Label> 
          <Form.Select disabled > 
            
            <option>{loan.lab ===''? "Lab": loan.lab}</option>
            
          </Form.Select>
          </Form.Group>
          <Form.Group className = 'md md-left'> 
            <Form.Label> Phone Number</Form.Label>
            <Form.Control disabled placeholder = {loan.phonenumber === ''? "Enter your phone number": loan.phonenumber}></Form.Control>
          </Form.Group>
        </div>
        <div className = 'flex-container'>
          <div className = "smx smx-right"> 
          <Form.Label> Semester </Form.Label> 
          <Form.Select disabled > 
            
            <option>{loan.semester ===''? "Semester": loan.semester}</option>
            
          </Form.Select>
          </div>
          <Form.Group className = "smx"> 
            <Form.Label> Group Number </Form.Label>
            <Form.Control disabled placeholder = {loan.formreference === ''? "Enter your MDP group number" : loan.groupnumber} ></Form.Control>
          </Form.Group>
          <div className = 'smx smx-left'>
            <Form.Label> Loan reason </Form.Label>
            <Form.Select disabled > 
              <option> {loan.loanreason === ''?  "Loan Reason": loan.loanreason}</option>
              <option value="MDP">MDP</option>
              <option value="FYP">FYP</option>
            </Form.Select>
          </div>
        </div>
        
        <div id = 'groupmembers'> 
          <div> 
          <Form.Group> 
            <Form.Label> Group members </Form.Label>
          
          </Form.Group>
          </div>
          {loan.groupmembers.length > 0 ? loan.groupmembers.map((value, key)=>{
            
            return(
             
              <div className = 'group-member' key = {key}>
                <p>{value}</p>
              </div> 
            )
          }) : null}
        </div>
        </fieldset> 
        
      </Form>
      </div>
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
            {Object.keys(loanItems).length > 1 ? 
            Object.keys(loanItems).map((key)=>{
              if(parseInt(loanItems[key]['qtytoreceive']) !== parseInt(loanItems[key]['qtyreceived'])){
                
                return(
                  <tr >
                    <td> <FiAlertCircle style = {{color: 'red'}}/></td>
                    <td> {key} </td>
                    <td> {loanItems[key]['qtytoreceive']} </td>
                    <td> {loanItems[key]['qtyreceived']? loanItems[key]['qtyreceived'] : 0 } </td>
                  </tr>
                )
              }
              else {
                return(
                  <tr>
                    <td></td>
                    <td> {key} </td>
                    <td> {loanItems[key]['qtytoreceive']} </td>
                    <td> {loanItems[key]['qtyreceived']? loanItems[key]['qtyreceived'] : 0 } </td>
                  </tr>
                )
              }
              
            })
            : null}
          </tbody>
        </Table>
        <div className = 'form-footer'> 
          <Button onClick = {submit} className = "btn-block" variant = "primary" type = "submit" > Submit </Button>
        </div>
      </div> 

    </div>
  )
}
