import React, {createContext, useContext, useEffect, useState} from 'react'
import {Navigate} from 'react-router-dom'
import { AuthContext } from '../../../helpers/AuthContext'
import Navbar from '../../Navigation/components/Navigation';
import LoanTable from './LoanTable'
import '../style.css'
import Button from 'react-bootstrap/esm/Button';

import Studentcreateloan from '../../modals/components/Studentcreateloan';

export const modalContext  = createContext()
function Student() {
  
  const auth = useContext(AuthContext)
  const [loanSubmit, setLoanSubmit] = useState(true)
  const createloan = () =>{
    const modal = document.getElementById("modal")
    modal.style.display = 'block'
    
  }
  
  useEffect(()=>{
   
    
  }, [loanSubmit])
  const handleSetLoanSubmit = () => {
    setLoanSubmit(!loanSubmit)
  }
  
  if (auth.authState.status ===false) {
    return <Navigate replace to="/student/login" />;
  } else {
    return (
      <div>
        <Navbar/>
        <div id = "createloan">
         <Button onClick = {createloan}>Create loan</Button>
         
         <Studentcreateloan loanSubmit = {loanSubmit} handleSetLoanSubmit = {handleSetLoanSubmit}/>
         
        </div>
        
        <div id = "loan-table"> 
        
          <LoanTable loanSubmit = {loanSubmit}/>
        </div>
      </div>
    );
  }
  
}

export default Student