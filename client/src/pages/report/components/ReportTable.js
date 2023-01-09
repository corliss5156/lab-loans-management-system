
import React, { useEffect, useState } from 'react'
import Tippy from '@tippyjs/react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//Bootstrap
import Table from 'react-bootstrap/esm/Table.js';
import "../style.css"
import {AiOutlineEdit} from 'react-icons/ai'; 
import Staffeditreport from '../../modals/components/Staffeditreport';
//backend
import ENV from "../../../config.js"
import axios from 'axios'
const API_HOST = ENV.api_host; 

export default function ReportTable() {
    const [reports, setReports] = useState([])
    const [reportUpdate, setReportUpdate] = useState(false)

    const errornotif = (errormsg)=>{
        toast.error(errormsg, {
            position: "bottom-center", 
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            progress: undefined, 
            theme: "light"
        })
    }

    const successnotif = (msg)=>{
        toast.success(msg, {
            position: "bottom-center", 
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            progress: undefined, 
            theme: "light"
        })
    }

  useEffect(()=>{
    const url = API_HOST + "/report"
    axios.get(url).then((response)=>{
        setReports(response.data)
    })
  }, [reportUpdate])  
  const handleReportUpdate = ()=>{
    setReportUpdate(!reportUpdate)
  }
  const editReport = (e)=>{
    const modal = document.getElementById("modal-edit-report-"+e.target.name)
    
    modal.style.display= "block"
  }
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
                                <td> { new Date(report.createdAt).toDateString()} </td> 
                                <td> {report.lab} </td> 
                                <td> {report.status} </td> 
                                <td><Tippy content="Edit Report">
                                        <button name = {report.id} onClick = {editReport} className='empty-button' ><AiOutlineEdit pointerEvents="none"/></button>
                                    </Tippy></td> 
                            </tr>
                            <Staffeditreport handleReportUpdate={handleReportUpdate} report = {report} successnotif = {successnotif} errornotif = {errornotif}/>
                        </>
                    )
                })}
            </tbody> 
        </Table>
        <ToastContainer position="bottom-center"
            autoClose={5000}
            hideProgressBar
            newestOnTop={false}
            closeOnClick/>
    </div>    
  )
}
