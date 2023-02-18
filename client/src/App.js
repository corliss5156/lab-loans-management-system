import './App.css';

import "bootstrap/dist/css/bootstrap.min.css";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"; 
import LoginStudent from './pages/loginstudent/components/LoginStudent';
import LoginStaff from './pages/loginstaff/components/LoginStaff'
import SignupStudent from './pages/signupstudent/components/SignupStudent';
import SignupStaff from './pages/signupstaff/components/SignUpStaff';
import Student from './pages/studenthome/components/Student';
import Staff from './pages/staffhome/components/Staff';
import Loan from './pages/loans/components/Loan';
import Inventory from './pages/inventory/components/Inventory';
import Report from './pages/report/components/Report';
import Forgotpassword from './pages/forgotpassword/components/Forgotpassword';
import Home from './pages/home/components/Home'
import axios from 'axios'; 
import { useEffect, useState } from 'react';
import { AuthContext } from './helpers/AuthContext';

import ENV from './config'
import Resetpassword from './pages/resetpassword/components/Resetpassword';
const API_HOST = ENV.api_host;


function App() {
  const [authState, setAuthState] = useState({
    user: "", 
    status: false, 
    userType: ""
  });

  useEffect(() => {
    console.log(authState)
    const url = API_HOST + `/student/auth`
    axios.get(url, {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        }
      })
      .then((response) => {
        
        if (response.data.error) {
          setAuthState({...authState, status: false});
        } else {
          console.log(response)
          setAuthState({
            user: response.data.username, 
            status: true, 
            userType: response.data.userType
          });
        }
      });
  }, []);
  return (
    <div className='App'> 
   
      <AuthContext.Provider value={{ authState, setAuthState }}>

        <Router> 
          <Routes> 
            <Route path = "/" element = {<Home/>} />
            <Route path = "/student/login" element = {<LoginStudent />} />
            <Route path = "/student/signup" element = {<SignupStudent />}  />
            <Route path = "/staff/login" element = {<LoginStaff/>} />
            <Route path = "/staff/signup" element = {<SignupStaff/>} /> 
            <Route path = "/staff/forgotpassword" element = {<Forgotpassword/>} />
            <Route path = "/student/home" element = {<Student/>}  /> 
            <Route path = "/staff/home" element = {<Staff />} />
            <Route path = "/staff/inventory" element = {<Inventory />} />
            <Route path = "/staff/loan" element = {<Loan />} />
            <Route path = "/staff/report" element = {<Report />} />
            <Route path = "/staff/resetpassword/:email" element = {<Resetpassword/>} /> 
            
          </Routes>
        </Router> 
      </AuthContext.Provider>
      </div>
  );
}
 
export default App;
