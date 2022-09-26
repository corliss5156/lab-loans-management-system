import './App.css';

import "bootstrap/dist/css/bootstrap.min.css";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"; 
import LoginStudent from './pages/loginstudent/components/LoginStudent';
import SignupStudent from './pages/signupstudent/components/SignupStudent';
import Student from './pages/studenthome/components/Student';
import Labtech from './pages/labtechhome/components/Labtech';
import Error from './pages/error/components/Error';
import Loan from './pages/loans/components/Loan';
import Inventory from './pages/inventory/components/Inventory';
import Report from './pages/report/components/Report';
import Forgotpassword from './pages/forgotpassword/components/Forgotpassword';
import axios from 'axios'; 
import { useEffect, useState } from 'react';
import { AuthContext } from './helpers/AuthContext';

import ENV from './config'
const API_HOST = ENV.api_host;


function App() {
  const [authState, setAuthState] = useState(false);

  useEffect(() => {
    const url = API_HOST + `/student/auth`
    axios.get(url, {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        }
      })
      .then((response) => {
        console.log(response)
        if (response.data.error) {
          setAuthState(false);
        } else {
          setAuthState(true);
        }
      });
  }, []);

  return (
    <div className='App'> 
      <AuthContext.Provider value={{ authState, setAuthState }}>
        <Router> 
          <Routes> 
            <Route path = "/student/login" element = {<LoginStudent />} />
            <Route path = "/student/signup" element = {<SignupStudent />} />
            {/* <Route path = "/staff/signup" element = {<LoginStaff/>} />
            <Route path = "/staff/login" element = {<SignupStaff/>} /> */}
            <Route path = "/forgotpassword" element = {<Forgotpassword/>} />
            <Route path = "/student/home" element = {<Student />} />
            <Route path = "/staff/home" element = {<Labtech />} />
            <Route path = "/staff/inventory" element = {<Inventory />} />
            <Route path = "/staff/loan" element = {<Loan />} />
            <Route path = "/staff/report" element = {<Report />} />
            <Route path = "*" element = {<Error />} />
          </Routes>
        </Router> 
      </AuthContext.Provider>
      </div>
  );
}
 
export default App;
