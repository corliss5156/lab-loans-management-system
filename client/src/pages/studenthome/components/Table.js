import Table from 'react-bootstrap/Table';
import { AuthContext } from '../../../helpers/AuthContext';
import {useContext, useEffect, useState} from 'react';
import axios from 'axios'; 
import ENV from '../../../config.js'; 
import {FiEdit} from 'react-icons/fi'
import ExpandedTable from './ExpandedTable';
import ReactDOMServer from "react-dom/server"
const API_HOST = ENV.api_host;

function LoanTable() {
  const auth = useContext(AuthContext)
  const [loans, setloans] = useState([])
  const [loanitems, setloanitems] = useState([])
  
  const user = auth.authState.user
  useEffect(()=>{
    const url = API_HOST + "/loanrequest/" + user
    axios.get(url).then((response)=>{
      setloans(response.data)
    })
    
  })

  const expand = (e) =>{
    const id = e.target.parentNode.parentNode.id 
    
   
    let url = API_HOST + "/loanrequest/" + user + "/" + id 
    axios.get(url).then((response)=>{
      const data = response.data[0]
      url = API_HOST + "/loanitem/" + id 
      console.log(url)
      axios.get(url).then((response)=>{
        const items = []
        response.data.forEach((item)=>{
          items.push(item.item)
        })
        console.log(items)
        const section = ReactDOMServer.renderToString(<ExpandedTable formreference={data.formreference} requestreason = {data.requestreason} supervisoremail = {data.supervisoremail} 
        groupmembers = {data.groupmembers} />);
        const column = "<td></td>"
      if (e.target.classList.contains('rotate')){
        e.target.classList.remove('rotate')
      }
      else{
        e.target.classList.add('rotate')
      }  
      
      
      const element = document.getElementById(id + "-section")
      if (element ===null) {
        //Row is not expanded, add section 
         //Create section
        const newsection = document.createElement("tr")
        newsection.innerHTML = column + section
        newsection.id = id + '-section'
        const tr = document.getElementById(id)
        
        tr.insertAdjacentElement('afterend', newsection)
        const insertItems = document.getElementById(id + "-div")
        insertItems.innerHTML = items
        
      } else {
        //Row is expanded, delete section 
        element.remove()
      }
      })
      
      
    })
   
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