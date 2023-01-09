import React, {useState, useEffect}from 'react'
import '../style.css'
//Bootstrap
import { AiOutlineEdit } from 'react-icons/ai';
import Table from 'react-bootstrap/Table'
import Tippy from '@tippyjs/react'
import 'tippy.js/dist/tippy.css';
//Backend
import axios from 'axios';
import ENV from '../../../config.js'
import Staffshowactivity from '../../modals/components/Staffshowactivity';
const API_HOST = ENV.api_host

export default function Activity() {
    const [activity, setActivity] = useState([])
    
    useEffect(()=>{
        //Get activity
        axios.get(API_HOST+"/activity/limit").then((response)=>{
            
            setActivity(response.data)
        })

    },[]
    )
    const showModal = (e)=>{
        console.log(e)
        const modal = document.getElementById("modal-activity-" + e.target.name)
           modal.style.display = 'block'
    }

    
  return (
    <div id = "staff-table">
        <div className = "header"> Activity </div>
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
                </>
            )
        })
    }
            </tbody>
        </Table>


    </div>    
) 
}
