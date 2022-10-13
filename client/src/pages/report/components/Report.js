import React from 'react'
import NavigationStaff from '../../Navigation/components/NavigationStaff'
import ReportTable from "./ReportTable"; 
function Report() {
  
  return (
    <div> 
      <NavigationStaff current = "Report" />
      <div id = 'report-table'> 
        <ReportTable/>
      </div>
    </div> 
  )
}

export default Report