import axios from 'axios'
import React, { useEffect, useState } from 'react'
import ENV from '../../../config.js'; 
import logo from '../../../assets/svg/No_report.svg';
const API_HOST = ENV.api_host;

export default function ExpandedTable({loan}) {
    const [items, setitems] = useState([])
    useEffect(()=>{
        const url = API_HOST + "/loanitem/" + loan.formreference
        if(items.length === 0){
            axios.get(url).then((response)=>{
            response.data.map((res)=>{
                const newitem = res.item
                setitems(old => [...old, newitem])            
            })
            
           
        })
        }
        
        
    }, [])
  return (
    <tr id = {loan.formreference + '-expanded'}className='expanded'>
        <td> </td>
        <td colSpan = {8}>
            <div id="flex-container">
            <div className="sm">
                <div className = "loanpurpose">
                <h3> Request Reason</h3>
                <p> {loan.requestreason}</p>
                </div> 
                <div className = "groupmembers"> 
                <h3> Group Members </h3> 
                <p> {loan.groupmembers}</p> 
                </div> 
            </div>
            <div className="sm">
                <div className = "items">
                <h3> Items </h3> 
                <div id = {loan.formreference + "-div"}> 
                    {items.map((item, key)=>{
                        return (<p key = {key}> {item}</p>)
                    })
                    }
                </div>
                </div>
                <div className = "supervisor md">
                <h3> Supervisor Email </h3> 
                <p> {loan.supervisoremail} </p> 
                </div>
            </div>
            <div className="md">
                <h3> Report </h3>
                <div className='no-reports'> 
                    <img src = {logo}/>
                    <p> No reports</p>
                </div>
                
            </div>
        </div>
        </td>
    </tr>  
    )
}