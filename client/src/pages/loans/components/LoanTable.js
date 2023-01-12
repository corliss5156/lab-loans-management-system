
import {useEffect, useState} from 'react';
//Bootstrap 
import '../style.css'
import Tippy from '@tippyjs/react'
import 'tippy.js/dist/tippy.css';
import Table from "react-bootstrap/Table"
import ExpandedTable from "./ExpandedTable";
import Staffeditloan from "../../modals/components/Staffeditloan";
import { AiOutlineEdit } from 'react-icons/ai';
//Backend
import axios from 'axios'; 
import ENV from '../../../config.js'; 
const API_HOST = ENV.api_host;


function LoanTable({errornotif, successnotif}){
    

  const [loans, setLoans] = useState([])
  const [updated, setUpdated] = useState([])
  const handleUpdate = () =>{
    setUpdated(!updated)
  }

  useEffect(()=>{
    const url = API_HOST + "/loanrequest"
    axios.get(url).then((response)=>{
        setLoans(response.data)
    })
  }, [updated])

  const expand = (e) =>{
    
    const id = e.target.parentNode.parentNode.id 
    if (e.target.classList.contains('rotate')){
        e.target.classList.remove('rotate')
        const element = document.getElementById(id + "-expanded")
        element.style.display = 'none'
      }
      else{
        e.target.classList.add('rotate')
        const element = document.getElementById(id + "-expanded")
        element.style.display = 'contents'
      }  
      
  }

  const showModal =(e) =>{
    const id = 'modal-edit-loan-'+e.target.name
    const modal = document.getElementById(id)
    modal.style.display = 'block'
  }
  return (
    <div> 
      <div className = 'header'> All loans </div>
      <Table >
      <thead>
        <tr>
          <th></th>
          <th>Form Reference</th>
          <th>Borrower Name </th> 
          <th>Borrower Email </th>
          <th>Borrow Date</th>
          <th>Return Date</th>
          <th>Location</th>
          <th>Status </th>
          <th>Actions </th> 
        </tr>
      </thead>
      <tbody>
        
        {loans.map((loan, key)=>{
           
          return(
            <>
<tr id = {loan.formreference} key = {loan.formreference}>
              <td > <div onClick  = {expand} className = 'arrow'> </div></td>
              <td> {loan.formreference} </td>
              <td> {loan.borrowername} </td> 
              <td> {loan.borroweremail}</td>
              <td> {loan.borrowdate}</td>
              <td> {loan.returndate} </td> 
              <td> {loan.lab}</td>
              <td> {loan.status} </td>
              <td > 
                
                  <Tippy content="Edit Loan">
                    <button name = {loan.formreference} onClick = {showModal} className='empty-button' ><AiOutlineEdit pointerEvents="none"/></button>
                  </Tippy>
                  
              
                </td>
            </tr>
            <ExpandedTable  key = {loan.formreference + "-expanded"} loan = {loan} />
            <Staffeditloan successnotif = {successnotif} errornotif={errornotif} handleUpdate = {handleUpdate} email = {loan.borroweremail} formreference = {loan.formreference}/>
            </>
            
          
            
          )
        })}
      </tbody>
    </Table>
    </div>
  )
}

export default LoanTable