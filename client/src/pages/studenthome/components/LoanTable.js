import Table from "react-bootstrap/Table"
import {useEffect, useState, useContext} from 'react';
import { AuthContext } from '../../../helpers/AuthContext'
import axios from 'axios'; 
import ExpandedTable from "./ExpandedTable";
import ENV from '../../../config.js'; 
import { FiEdit } from "react-icons/fi";
import '../style.css'
const API_HOST = ENV.api_host;


function LoanTable(){
    
  const auth = useContext(AuthContext)
  const [loans, setLoans] = useState([])
  
  useEffect(()=>{
    const url = API_HOST + "/loanrequest/" + auth.authState.user 
    axios.get(url).then((response)=>{
        setLoans(response.data)
    })
  }, [])

  

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
              <td> {loan.location}</td>
              <td> {loan.status} </td>
              <td > <FiEdit /> </td>
            </tr>
            <ExpandedTable key = {loan.formreference + "-expanded"} loan = {loan} />

            </>
            
          
            
          )
        })}
      </tbody>
    </Table>
    </div>
  )
}

export default LoanTable