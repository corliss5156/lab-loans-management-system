
import {useEffect, useState, useContext} from 'react';


//Subcomponents
import ExpandedTable from "./ExpandedTable";
import Studentshowloan from "../../modals/components/Studentshowloan";
import Studentcreatereport from '../../modals/components/Studentcreatereport';


//CSS
import Tippy from '@tippyjs/react'
import 'tippy.js/dist/tippy.css';
import Table from "react-bootstrap/Table"
import { AiOutlineEdit } from 'react-icons/ai';
import {HiOutlineDocumentText} from 'react-icons/hi';


//Backend
import ENV from '../../../config.js'; 
import '../style.css'
import { AuthContext } from '../../../helpers/AuthContext'
import axios from 'axios'; 

const API_HOST = ENV.api_host;


function LoanTable({loanSubmit, successnotif, errornotif}){

    
  const [loans, setLoans] = useState([])
  const [report, setReport] = useState(false)
  const auth = useContext(AuthContext)

  useEffect(()=> {
    const url = API_HOST + "/loanrequest/" + auth.authState.user 
    console.log("reload table")
    axios.get(url).then((response)=>{
        setLoans(response.data)
    })
  }, [loanSubmit, report])
  
  const handleReport = ()=>{
    setReport(!report)
  }
  

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
  const createReport = (e)=>{
    const modal = document.getElementById("modal-create-report-"+ e.target.name)
    modal.style.display = "block"
  }
  
  const showLoan = (e) => {
     
      const modal = document.getElementById('modal-show-loan-'+ e.target.name) 
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
              <td> {loan.borrowdate}</td>
              <td> {loan.returndate} </td> 
              <td> {loan.lab}</td>
              <td> {loan.status} </td>
              <td > <Tippy content="Loan Details" >
                    <button name = {loan.formreference} onClick = {showLoan} className='empty-button' ><AiOutlineEdit pointerEvents="none"/></button>
                   
                  </Tippy>
                  <Tippy content = 'Create Report'>
                  <button name = {loan.formreference} onClick = {createReport} className = 'empty-button'><HiOutlineDocumentText pointerEvents="none"/></button>
                  </Tippy>
                  </td>
            </tr>
            <ExpandedTable key = {loan.formreference + "-expanded"} report = {report} loan = {loan} />
            <Studentshowloan formreference={loan.formreference}/> 
            <Studentcreatereport successnotif = {successnotif} errornotif = {errornotif} handleReport = {handleReport} loan = {loan}formreference={loan.formreference}/> 
            
            </>
            
          
            
          )
        })}
      </tbody>
    </Table>
    </div>
  )
}

export default LoanTable