import Table from 'react-bootstrap/Table';
import { AuthContext } from '../../../helpers/AuthContext';
import {useContext, useEffect, useState} from 'react';
import axios from 'axios'; 
import ENV from '../../../config.js'; 
import {FiEdit} from 'react-icons/fi'
const API_HOST = ENV.api_host;

function LoanTable() {
  const auth = useContext(AuthContext)
  const [loans, setloans] = useState([])
  
  const user = auth.authState.user
  useEffect(()=>{
    const url = API_HOST + "/loanrequest/" + user
    axios.get(url).then((response)=>{
      setloans(response.data)
    })
  })
  const expand = (e) =>{
    
    if (e.target.classList.contains('rotate')){
      e.target.classList.remove('rotate')
    }
    else{
      e.target.classList.add('rotate')
    }   

    const div = document.createElement("div")
    div.innerHTML = "New Div "
    const tr = document.getElementById(e.target.parentNode.parentNode.id)
    tr.insertAdjacentElement('afterend', div)
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
            <tr id = {loan.formreference} key = {loan.formreference}>
              <td > <div onClick  = {expand} className = 'arrow'> </div></td>
              <td> {loan.formreference} </td>
              <td> {loan.borrowdate}</td>
              <td> {loan.returndate} </td> 
              <td> {loan.location}</td>
              <td> {loan.status} </td>
              <td > <FiEdit /> </td>
            </tr>
          )
        })}
      </tbody>
    </Table>
    </div>
    
  );
}

export default LoanTable