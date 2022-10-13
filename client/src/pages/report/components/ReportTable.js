import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Table from 'react-bootstrap/esm/Table.js';
import ENV from "../../../config.js"
import "../style.css"
import {FiEdit} from 'react-icons/fi'
const API_HOST = ENV.api_host; 

export default function ReportTable() {
    const [reports, setReports] = useState([])
  useEffect(()=>{
    const url = API_HOST + "/report"
    axios.get(url).then((response)=>{
        setReports(response.data)
    })
  })  
  return (
    <div>
        <div className = 'header'> All reports</div>
        <Table> 
            <thead> 
                <tr> 
                    <th></th> 
                    <th>Borrower name</th>
                    <th>Item </th> 
                    <th>Form Reference </th> 
                    <th>Reported on </th> 
                    <th>Location</th> 
                    <th>Status </th>
                    <th>Actions </th> 
                </tr>
            </thead> 
            <tbody>
                {reports.map((report, key)=>{
                    return(
                        <>
                            <tr id = {report.id} key = {report.id}> 
                                <td></td> 
                                <td> {report.borrowername}</td>
                                <td> {report.item}</td> 
                                <td> {report.formreference} </td> 
                                <td> {report.createdAt} </td> 
                                <td> {report.lab} </td> 
                                <td> {report.status} </td> 
                                <td><FiEdit /> </td> 
                            </tr>
                        </>
                    )
                })}
            </tbody> 
        </Table>
    </div>    
  )
}
