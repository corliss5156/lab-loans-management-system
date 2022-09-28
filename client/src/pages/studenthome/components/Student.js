import React, {useContext} from 'react'
import {Navigate} from 'react-router-dom'
import { AuthContext } from '../../../helpers/AuthContext'
import Navbar from '../../Navigation/components/Navigation';
import LoanTable from './Table'
import '../style.css'
import Button from 'react-bootstrap/esm/Button';

function Student() {
  const auth = useContext(AuthContext)
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