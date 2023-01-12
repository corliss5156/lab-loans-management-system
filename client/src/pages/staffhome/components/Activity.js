import React, {useState, useEffect}from 'react'
import '../style.css'
//Bootstrap
import { AiOutlineEdit, AiFillDelete } from 'react-icons/ai';
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'
import Tippy from '@tippyjs/react'
import 'tippy.js/dist/tippy.css';
import Staffshowactivity from '../../modals/components/Staffshowactivity';
import Staffdeleteactivity from '../../modals/components/Staffdeleteactivity';
//Backend
import axios from 'axios';
import ENV from '../../../config.js'

const API_HOST = ENV.api_host

export default function Activity({successnotif}) {
    const [activity, setActivity] = useState([])
    const [deleteActivity, setDeleteActivity] = useState(false)
    
    useEffect(()=>{
        //Get activity
        axios.get(API_HOST+"/activity/limit").then((response)=>{
            
            setActivity(response.data)
        })

    },[deleteActivity]
    )
    const handleSetDeleteActivity = () =>{
        setDeleteActivity(!deleteActivity)
    }
    const showModal = (e)=>{
       
        const modal = document.getElementById("modal-activity-" + e.target.name)
           modal.style.display = 'block'
    }
    const showActivityModal = () =>{
        const modal = document.getElementById("modal-activity-delete")
        modal.style.display = "block"
    }
    
  return (
    <div id = "staff-table">
        <div className = "header"> Activity 
        <Button onClick = {showActivityModal} className = 'float-right' variant = "danger"><AiFillDelete/> Delete activity </Button>
        </div>
        <Table> 
            <thead>
                <tr>
                    <th> Action </th> 
                <th></th>
                </tr>
                
            </thead>
            <tbody>
    {
        activity.map((avt)=>{
           
            return(
                <>
                <tr> 
                    <td>{avt.staff + " editted stock for " + avt.item}</td> 
                    <td><Tippy content="Show details ">
   <button name = {avt.id} onClick = {showModal}  className='empty-button' ><AiOutlineEdit pointerEvents="none"/><span>Click button</span></button>
   </Tippy></td>
                
                </tr>
                <Staffshowactivity activity = {avt} />
                <Staffdeleteactivity handleSetDeleteActivity = {handleSetDeleteActivity}successnotif = {successnotif}/>
                </>
            )
        })
    }
            </tbody>
        </Table>


    </div>    
) 
}
