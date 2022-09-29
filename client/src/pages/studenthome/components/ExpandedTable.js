import React, { useEffect, useState} from 'react'
import axios from 'axios'; 
import ENV from '../../../config.js'; 
const API_HOST = ENV.api_host;


function ExpandedTable({formreference, requestreason, groupmembers, supervisoremail}) {
 
  return (
    <td colSpan = {6}  className = 'section'> 
      <div id="flex-container">
          <div className="flex-item">
            <div className = "loanpurpose">
              <h3> Request Reason</h3>
              <p> {requestreason}</p>
            </div> 
            <div className = "groupmembers"> 
              <h3> Group Members </h3> 
              <p> {groupmembers}</p> 
            </div> 
          </div>
          <div className="flex-item">
            <div className = "items">
              <h3> Items </h3> 
              <div id = {formreference + "-div"}> </div>
            </div>
            <div className = "supervisor">
              <h3> Supervisor Email </h3> 
              <p> {supervisoremail} </p> 
            </div>
          </div>
          <div className="flex-item">
            <h3> Report </h3>
          </div>
      </div>
    </td>
  )
}
export default ExpandedTable;