import React, {useContext} from 'react'
import {Navigate} from 'react-router-dom'
import LoanTable from './LoanTable'
import { AuthContext } from '../../../helpers/AuthContext'

import NavigationStaff from '../../Navigation/components/NavigationStaff'
function Loan() {
  const auth = useContext(AuthContext)
  
  if (auth.authState.status ===false) {
    return <Navigate replace to="/student/login" />;
  }else{
    return (
      <div> 
        <NavigationStaff current = "Loans" />
         <div id = "loan-table"> 
          <LoanTable/>
        </div>
      </div> 

    )
  }
  
}

export default Loan


  
