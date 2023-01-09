import React, { useEffect, useState } from 'react'

//Bootstrap 
import {AiOutlineEdit} from 'react-icons/ai'
import Table from "react-bootstrap/Table"
import Tippy from '@tippyjs/react'
import 'tippy.js/dist/tippy.css';

//Subcomponents
import Staffeditlab from '../../modals/components/Staffeditlab.js'
import Staffeditlabstaff from '../../modals/components/Staffeditlabstaff.js';
//Backend 
import axios from 'axios';
import ENV from '../../../config.js'
const API_HOST = ENV.api_host

export default function Labs({successnotif, errornotif}) {
  const [labs, setLabs] = useState([])
  const [updateLab, setUpdateLab]= useState(false)
  useEffect(()=>{
    axios.get(API_HOST+"/lab").then((response)=>{
    
      setLabs(response.data)
    })
  }, [updateLab])
  const handleUpdateLab = ()=>{
    setUpdateLab(!updateLab)
  }
  
  const showModal = (e)=>{
    const modal = document.getElementById("modal-edit-lab-staff-" + e.target.name)
    modal.style.display = 'block'
}
  
  return (
    <div id = 'staff-table'> 
        <div className='header'> Labs </div>
        <Table >
        <thead>
          <tr>
            <th>Lab</th>
            <th>Staff in charge </th>
            <th></th> 
          </tr>
        </thead>
        <tbody> 
          {
            labs.map((lab)=>{
              
                const temp = [{
                    'value': lab.staff, 
                    'label': lab.staff
                }]
              return(
               <>
                <tr>
                  <td>{lab.lab}</td>
                  
                  

                  <td>{lab.staff}</td>
                  <td><Tippy content="Edit staff in charge">
   <button onClick = {showModal} name = {lab.lab} className='empty-button' ><AiOutlineEdit pointerEvents="none"/><span>Click button</span></button>
   </Tippy></td>
   
                </tr>
                <Staffeditlabstaff defaultStaff = {temp} handleUpdateLab = {handleUpdateLab} lab = {lab} successnotif = {successnotif}  errornotif = {errornotif}/>
                </>  
              )
              })
          }
        </tbody>
        </Table>

        
    </div>
  )
}
