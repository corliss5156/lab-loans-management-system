import React, {useEffect, useContext, useState} from 'react'
import {Navigate} from 'react-router-dom'
import NavigationStaff from '../../Navigation/components/NavigationStaff'

//Bootstrap 
import { ToastContainer, toast } from 'react-toastify';
import Button from 'react-bootstrap/Button'

//Subcomponents
import Reports from './Reports'
import Staffs from './Staffs'
import Staffcreatelab from '../../modals/components/Staffcreatelab';
import Activity from './Activity';
import Labs from './Labs';

//Backend
import { AuthContext } from '../../../helpers/AuthContext'
import Staffcsvactivity from '../../modals/components/Staffcsvactivity';

export default function Staff() {
  const auth = useContext(AuthContext)
  const [createLab, setCreateLab] = useState(false)
  useEffect(()=>{
    console.log(("Rerender"))
  }, [createLab])
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
const handleCreateLab = ()=>{
  setCreateLab(!createLab)
}
const successnotif = (successmsg) =>{
 
  toast.success(successmsg,{
    position: "bottom-center", 
    autoClose: 5000,
    hideProgressBar: true,
    closeOnClick: true,
    progress: undefined, 
    theme: "light"
})}
const showStaffCreateLab = ()=>{
  const modal = document.getElementById("modal-create-lab")
  modal.style.display = "block"
}
const showStaffCSVActivity = () =>{
  const modal = document.getElementById("modal-activity-csv")
  modal.style.display = "block"
}
  useEffect(()=>{
    console.log(auth)
  })
  if (auth.authState.status === false || auth.authState.userType === "student"){
    return <Navigate replace to="/staff/login" />;
  }else{
    return (
      <div> 
        <NavigationStaff current = "Home" />
        <div id = "createloan">
         <Button className = 'float-right'  onClick = {showStaffCreateLab}>Add lab </Button>
         <Staffcreatelab handleCreateLab = {handleCreateLab} successnotif = {successnotif} errornotif = {errornotif}/>
         <Button className = 'float-right secondary ' onClick = {showStaffCSVActivity}>Download Activity</Button>
         <Staffcsvactivity errornotif={errornotif} />
        </div>
        <div className = "flex-container"> 
          <div className='md'> 
            <div> 
              <Reports />
            </div> 
            <div> 
              <Staffs successnotif = {successnotif}/>
            </div> 
          
          </div>
          <div className = "md"> 
          
          <div> 
              <Activity successnotif={successnotif} />
            </div> 
            <div> 
              
              <Labs createLab = {createLab} successnotif={successnotif} errornotif = {errornotif} />
            </div> </div>
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


