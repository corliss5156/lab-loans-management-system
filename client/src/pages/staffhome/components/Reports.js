import React, {useState, useEffect}from 'react'
import '../style.css'
import approvedlogo from '../../../assets/svg/Approved_Report.svg'; 
import submittedlogo from '../../../assets/svg/Submitted_Report.svg'
//Backend

import axios from 'axios';
import ENV from '../../../config.js'
const API_HOST = ENV.api_host
export default function Reports() {
    const [approvedreports, setApprovedReports] = useState("")
    const [submittedreports, setSubmittedReports] = useState("")
    

    useEffect(()=>{
        const url = API_HOST + "/report/status/"
        axios.get(url + "Approved").then((response)=>{
            setApprovedReports(response.data[0].count)
        })
        axios.get(url + "Submitted").then((response)=>{
            setSubmittedReports(response.data[0].count)
        })
        
    })  
  return (
    <div id = "staff-table">
        <div className = "header"> Reports </div>
        <div id = 'flex-container'>
            <div className = "report-div approved md">
                <div className='md'> 
                    <h4> {approvedreports} </h4> 
                    <p> Approved </p>
                </div> 
                <div className = 'md img'> 
                    <img src = {approvedlogo} />
                </div>
            </div>
            <div className='report-div submitted md'> 
            <div className='md'> 
                    <h4 > {submittedreports} </h4> 
                    <p> Submitted</p>
                </div> 
                <div className = 'md img'> 
                    <img src = {submittedlogo} />
                </div>
            </div>
        </div> 


    </div>     )
}
