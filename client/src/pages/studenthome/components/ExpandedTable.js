
import React, { useEffect, useState } from 'react'

//Bootstrap 
import Table from 'react-bootstrap/Table'
//Backend
import axios from 'axios'
import ENV from '../../../config.js'; 
const API_HOST = ENV.api_host;

export default function ExpandedTable({loan}) {
    const [items, setitems] = useState([])
    const [reports, setReports] = useState([])
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
        //Get reports belonging to a loan
        axios.get(API_HOST+"/report/" + loan.formreference).then((response)=>{
           
            setReports(response.data)
        })
        
        
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
                <Table hover> 
                    <thead>
                        <tr> 
                        <th> Item </th> 
                        <th> Quantity Requested </th>
                        <th> Status </th>
                        </tr>
                    </thead> 
                
                <tbody id = "report-tablebody-expanded"> 
                
                    {reports.map((report)=>{
                        return(

                            <tr id = {report.id} key = {report.id}> 
                                <td>{report.item}</td> 
                                <td>{report.qty}</td>
                                <td>{report.status}</td>

                            </tr>
                            
                        )
                    })}
                </tbody>
                </Table>
                
            </div>
        </div>
        </td>
    </tr>  
    )
}