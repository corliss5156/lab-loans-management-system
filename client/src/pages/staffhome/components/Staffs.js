import React, { useEffect, useState, useContext } from 'react'

//Bootstrap 
import {AiOutlineMail, AiFillDelete} from 'react-icons/ai'
import {AiOutlineEdit} from 'react-icons/ai'

import Table from "react-bootstrap/Table"
import Tippy from '@tippyjs/react'
import 'tippy.js/dist/tippy.css';
import Button from 'react-bootstrap/Button';
import { IconContext } from "react-icons";
//Subcomponents
import Staffeditlab from '../../modals/components/Staffeditlab.js'
import Staffaddstaff from '../../modals/components/Staffaddstaff.js'
import Staffdeletestaff from '../../modals/components/Staffdeletestaff.js'
//Backend 
import axios from 'axios';
import ENV from '../../../config.js'

import { AuthContext } from '../../../helpers/AuthContext'
const API_HOST = ENV.api_host

export default function Staffs({successnotif, errornotif}) {
  const auth = useContext(AuthContext)

  const [staffs, setStaffs] = useState([])
  const [updateLab, setUpdateLab] = useState(false)
  const [priviledge, setPriviledge] = useState(false)
  
  useEffect(()=>{
    axios.get(API_HOST+"/staff").then((response)=>{
      setStaffs(response.data) 
      const staffData = response.data.filter((staff)=>staff.email === auth.authState.user)
      setPriviledge(staffData[0].priviledge)
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
  const showModal = ()=>{
    const modal = document.getElementById("modal-add-staff")
    modal.style.display = 'block'
  }
  const deleteStaff = (e) =>{
    const modal = document.getElementById('modal-delete-staff-' + e.target.name)
    modal.style.display = 'block'
  }
 
  return (
    <div id = 'staff-table'> 
        <div className='header'> Staff
        <Button onClick = {showModal}className = 'float-right' variant = 'danger'>Add staff</Button> 
        </div>
        
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
                  <td>  {priviledge? 
                  <><Tippy content="Delete staff">
                  <button name = {staff.email} className='empty-button' onClick = {deleteStaff}><AiFillDelete pointerEvents="none"/><span>Click button</span></button>
                  </Tippy>
                                   <Tippy content="Edit priviledges">
                  <button name = {staff.email} className='empty-button' onClick = {editLabs}><AiOutlineEdit pointerEvents="none"/><span>Click button</span></button>
                  </Tippy>
                  
                  </>
                  
                  :
                  <>
                  <Tippy content="Unable to delete staff" >
                    <button name = {staff.email} className='empty-button' >

                      <IconContext.Provider value={{ color: "grey", className: "global-class-name" }}>
                        <div>
                          <AiFillDelete/>
                        </div>
                      </IconContext.Provider>
                    </button>
                  </Tippy>
                  <Tippy content="Unable to edit lab" >
                    <button name = {staff.email} className='empty-button' >

                      <IconContext.Provider value={{ color: "grey", className: "global-class-name" }}>
                        <div>
                          <AiOutlineEdit/>
                        </div>
                      </IconContext.Provider>
                    </button>
                  </Tippy>
                  
                    
                  
                  
                  </>
   
   }
   </td>
                </tr>

   <Staffeditlab priviledge = {staff.priviledge} successnotif={successnotif} defaultLabs = {temp} staff = {staff} handleUpdateLab = {handleUpdateLab} />
   <Staffaddstaff successnotif= {successnotif} errornotif = {errornotif} handleUpdateLab = {handleUpdateLab}/>
   <Staffdeletestaff successnotif= {successnotif} errornotif = {errornotif} handleUpdateLab = {handleUpdateLab} staff = {staff}/>
                </>  
              )
              })
          }
        </tbody>
        </Table>

        
    </div>
  )
}
