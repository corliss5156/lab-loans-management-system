import React, {useContext, useEffect} from 'react'
import {Navigate} from 'react-router-dom'
import { AuthContext } from '../../../helpers/AuthContext'
import Navbar from '../../Navigation/components/Navigation';
import LoanTable from './LoanTable'
import '../style.css'
import Button from 'react-bootstrap/esm/Button';
// import { useNavigate } from "react-router-dom";

function Student() {
  // const navigate = useNavigate()
  const auth = useContext(AuthContext)
  // const { setAuthState } = useContext(AuthContext)
  const createloan = () =>{
    console.log("Create loan")
  }
  

  if (auth.authState.status ===false) {
    return <Navigate replace to="/student/login" />;
  } else {
    return (
      <div>
        <Navbar/>
        <div id = "createloan">
         <Button onClick = {createloan}>Create loan</Button>
        </div>
        
        <div id = "loan-table"> 
          <LoanTable/>
        </div>
      </div>
    );
  }
  
}

export default Student