import React, {useContext, useEffect, useRef, useState} from 'react'
import { Navigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
//Bootstrap
import Button from 'react-bootstrap/esm/Button';
import NavigationStaff from '../../Navigation/components/NavigationStaff'
import InventoryTable from './InventoryTable';
import Staffcreateitem from '../../modals/components/Staffcreateitem';
import Staffcsvinventory from '../../modals/components/Staffcsvinventory';

//Backend
import axios from 'axios';
import ENV from '../../../config.js'; 
import { AuthContext } from '../../../helpers/AuthContext';


const API_HOST = ENV.api_host
function Inventory() {
  const auth = useContext(AuthContext)
  const [labs, setLabs ] = useState([])
  const [selected, setSelected] = useState("")
  const [itemSubmit, setItemSubmit] = useState(false)
  const [editItem, setEditItem] = useState(false)

  useEffect(()=>{
    const url = API_HOST + "/lab"
    axios.get(url).then((response)=>{
      setLabs(response.data)
    })
  },[selected, itemSubmit, editItem])
  const handleEditItemSubmit = ()=>{
    setEditItem(!editItem)
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
  console.log("SEnd success")
  toast.success(successmsg,{
    toastId: "inventory-notif",
    position: "bottom-center", 
    autoClose: 5000,
    hideProgressBar: true,
    closeOnClick: true,
    progress: undefined, 
    theme: "light"
})

}
  const InventoryTableref = useRef()
  const selectChange = (e) =>{
    if (e.target.value !== "All labs"){
      setSelected(e.target.value)
    }
    else {
      setSelected("")
    }
    InventoryTableref.current.handleSelectChange()
    
  }
  const createItem = ()=>{
    const modal = document.getElementById('modal-create-item')
    modal.style.display = 'block'
  }
  const exportToCSV = ()=>{
    
    const modal = document.getElementById('modal-inventory-csv')
    modal.style.display = 'block'

  
  }
  const handleSetItemSubmit = ()=>{
    setItemSubmit(!itemSubmit)
  }
  if (auth.authState.status ===false) {
    return <Navigate replace to="/staff/inventory" />;
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
          <Button  className = 'float-right secondary' onClick = {exportToCSV} >Export to CSV </Button>
          </div>
          
        
        </div>
        <Staffcreateitem successnotif = {successnotif} errornotif = {errornotif} handleSetItemSubmit={handleSetItemSubmit}/> 
        <Staffcsvinventory errornotif = {errornotif} />
        
         <div id = "inventory-table"> 
          <InventoryTable successnotif = {successnotif}  errornotif = {errornotif} editItem = {editItem} handleEditItemSubmit = {handleEditItemSubmit} itemSubmit = {itemSubmit} ref = {InventoryTableref} selected = {selected}/>
        </div>
        <ToastContainer position="bottom-center"
            autoClose={5000}
            hideProgressBar
            newestOnTop={false}
            closeOnClick/>
      </div> 

    
  )}
}

export default Inventory