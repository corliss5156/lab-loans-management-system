import React, {useContext, useEffect, useState} from 'react'
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../../../helpers/AuthContext';
import Button from 'react-bootstrap/esm/Button';
import NavigationStaff from '../../Navigation/components/NavigationStaff'
import InventoryTable from './InventoryTable';
import Staffcreateitem from '../../modals/components/Staffcreateitem';
import ENV from '../../../config.js'; 
import {MdArrowDropDown} from 'react-icons/md'
import axios from 'axios';

const API_HOST = ENV.api_host
function Inventory() {
  const auth = useContext(AuthContext)
  const [labs, setLabs ] = useState([])
  const [selected, setSelected] = useState("")

  useEffect(()=>{
    const url = API_HOST + "/lab"
    axios.get(url).then((response)=>{
      setLabs(response.data)
    })
  },[])

  const selectChange = (e) =>{
    if (e.target.value !== "All labs"){
      setSelected(e.target.value)
    }
    else {
      setSelected("")
    }
    
  }
  const createItem = ()=>{
    const modal = document.getElementById('modal-create-item')
    modal.style.display = 'block'
  }
  if (auth.authState.status ===false) {
    return <Navigate replace to="/student/login" />;
  }else{
  return (
    <div> 
        <NavigationStaff current = "Inventory" />
        
          
        <div id = "select-lab"> 
          <div>
          
          <label class = "custom-select float-left"> 
          Select lab
            <select onChange = {selectChange} className = "custom-select-wrapper"> 
              <option val = ""> All labs </option> 
              {labs.map((lab, key)=>{
                return(
                  <option key = {lab.lab} val = {lab.lab}> {lab.lab} </option>
                )
              })}
            </select> 
            
          </label>
          <Button className = 'float-right' onClick = {createItem}> Create Item </Button>
          </div>
          
        
        </div>
        <Staffcreateitem /> 
        
         <div id = "inventory-table"> 
          <InventoryTable selected = {selected}/>
        </div>
      </div> 

    
  )}
}

export default Inventory