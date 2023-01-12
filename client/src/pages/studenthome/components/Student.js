import React, {useContext, useEffect, useState} from 'react'
import {Navigate} from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';

//Bootstrap
import { AuthContext } from '../../../helpers/AuthContext'
import Navbar from '../../Navigation/components/Navigation';
import LoanTable from './LoanTable'
import '../style.css'
import Button from 'react-bootstrap/esm/Button';

import Studentcreateloan from '../../modals/components/Studentcreateloan';

export default function Student() {
  
  const auth = useContext(AuthContext)
  const [loanSubmit, setLoanSubmit] = useState(true)
  const createloan = () =>{
    const modal = document.getElementById("modal")
    modal.style.display = 'block'
    
  }
  
  useEffect(()=>{
   console.log(loanSubmit)
    console.log(auth)
  }, [loanSubmit])

  const errornotif = (errormsg)=>{
    toast.error(errormsg, {
        toastId:"student-home",
        position: "bottom-center", 
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        progress: undefined, 
        theme: "light"
    })
  }
  const successnotif = (successmsg) =>{
    toast.success(successmsg, {
        toastId: "student-home",
        position: "bottom-center", 
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        progress: undefined, 
        theme: "light"
    })
  }
  const handleSetLoanSubmit = () => {
    setLoanSubmit(!loanSubmit)
  }
  
  if (auth.authState.status ===false || auth.authState.userType === "staff") {
    return <Navigate replace to="/student/login" />;
  } else {
    return (
      <div>
        <Navbar/>
        <div id = "createloan">
         <Button onClick = {createloan}>Create loan</Button>
         
         <Studentcreateloan successnotif = {successnotif} errornotif = {errornotif} loanSubmit = {loanSubmit} handleSetLoanSubmit = {handleSetLoanSubmit}/>
         
        </div>
        
        <div id = "loan-table"> 
        
          <LoanTable successnotif = {successnotif} errornotif = {errornotif} loanSubmit = {loanSubmit}/>
        </div>
        <ToastContainer position="bottom-center"
            autoClose={5000}
            hideProgressBar
            newestOnTop={false}
            closeOnClick/>
      </div>
    );
  }
  
}
