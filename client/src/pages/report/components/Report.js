import React, { useContext } from 'react'
import NavigationStaff from '../../Navigation/components/NavigationStaff'
import ReportTable from "./ReportTable"; 

//Backend
import { AuthContext } from '../../../helpers/AuthContext'
import {Navigate} from 'react-router-dom'

function Report() {
  const auth = useContext(AuthContext)
  if (auth.authState.status === false || auth.authState.userType === "student"){
    return <Navigate replace to="/" />;
  }else{
  return (
    <div> 
      <NavigationStaff current = "Report" />
      <div id = 'report-table'> 
        <ReportTable/>
      </div>
    </div> 
  )}
}

export default Report