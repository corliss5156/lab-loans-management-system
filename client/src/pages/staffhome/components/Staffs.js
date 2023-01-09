import React, { useEffect, useState } from 'react'

//Bootstrap 
import {AiOutlineMail} from 'react-icons/ai'
import {AiOutlineEdit} from 'react-icons/ai'
import Table from "react-bootstrap/Table"
import Tippy from '@tippyjs/react'
import 'tippy.js/dist/tippy.css';

//Subcomponents
import Staffeditlab from '../../modals/components/Staffeditlab.js'
//Backend 
import axios from 'axios';
import ENV from '../../../config.js'
const API_HOST = ENV.api_host

export default function Staffs({successnotif}) {
  const [staffs, setStaffs] = useState([])
  const [updateLab, setUpdateLab] = useState(false)
  
  useEffect(()=>{
    axios.get(API_HOST+"/staff").then((response)=>{
      setStaffs(response.data)
    })
  }, [updateLab])
  const handleUpdateLab = ()=>{
    setUpdateLab(!updateLab)
  }
  const copyEmail = (e)=>{
    
    const email = e.target.parentElement.previousSibling.textContent.toString()
    navigator.clipboard.writeText(email)

  }
  const editLabs = (e)=>{
    const modal = document.getElementById('modal-edit-lab-'+e.target.name)
    modal.style.display = "block"
  }
  return (
    <div id = 'staff-table'> 
        <div className='header'> Staff </div>
        <Table >
        <thead>
          <tr>
            <th>Staff</th>
            <th></th> 
            <th>Lab</th> 
            <th></th> 
          </tr>
        </thead>
        <tbody> 
          {
            staffs.map((staff)=>{
              const temp = []
              if (staff.labs!==null){
                 const templabs = staff.labs.split(",") 
              for(let i in templabs){
                  temp.push({
                      'value': templabs[i], 
                      'label': templabs[i]
                  })
              }
              }
             
              return(
               <>
                <tr>
                  <td>{staff.email}</td>
                  
                  <td> <Tippy content="Copy Email">
   <button className='empty-button' onClick = {copyEmail}><AiOutlineMail  pointerEvents="none"/></button>
   </Tippy>
</td> 
                  <td>{staff.labs}</td>
                  <td><Tippy content="Edit labs">
   <button name = {staff.email} className='empty-button' onClick = {editLabs}><AiOutlineEdit pointerEvents="none"/><span>Click button</span></button>
   </Tippy></td>
                </tr>

   <Staffeditlab successnotif={successnotif} defaultLabs = {temp} staff = {staff} handleUpdateLab = {handleUpdateLab} />
                </>  
              )
              })
          }
        </tbody>
        </Table>

        
    </div>
  )
}
