import React, {useContext} from 'react'
import {Navigate} from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';


//Bootstrap
import NavigationStaff from '../../Navigation/components/NavigationStaff'
import Staffcsvloan from '../../modals/components/Staffcsvloan'
import LoanTable from './LoanTable'
import Button from 'react-bootstrap/Button'
import Staffcreateloanformtemplate from '../../modals/components/Staffcreateloanformtemplate';
//Backend
import { AuthContext } from '../../../helpers/AuthContext'
function Loan() {
  const auth = useContext(AuthContext)
  const showModal = () =>{
    const modal = document.getElementById('modal-loan-csv')
    modal.style.display = 'block'
  }
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
const successnotif = (successmsg) =>{
  toast.success(successmsg, {
    toastId: "loan",
    position: "bottom-center", 
    autoClose: 5000,
    hideProgressBar: true,
    closeOnClick: true,
    progress: undefined, 
    theme: "light"
}

  )
}
  const showLoanFormModal = () =>{
    const modal = document.getElementById("modal-loan-form-template")
    modal.style.display = "block"
  }
  if (auth.authState.status ===false) {
    return <Navigate replace to="/staff/loan" />;
  }else{
    return (
      <div> 
        <NavigationStaff current = "Loans" />
          <div id = "createloan"> 
            
            <Button className = "float-right "onClick = {showLoanFormModal}> Create loan form </Button> 
            <Button className = 'float-right secondary' onClick = {showModal}>Export to CSV</Button>
          </div>

          
          <Staffcsvloan errornotif={errornotif}/> 
          <Staffcreateloanformtemplate errornotif={errornotif} successnotif = {successnotif}/>
         <div id = "loan-table-staff"> 
          <LoanTable successnotif = {successnotif} errornotif={errornotif}/>
        </div>
        <ToastContainer position="bottom-center"
            autoClose={5000}
            hideProgressBar
            newestOnTop={false}
            closeOnClick/>
      </div> 

    )
  }
  
}

export default Loan


  
