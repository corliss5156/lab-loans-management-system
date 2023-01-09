
import {forwardRef, useEffect, useState, useImperativeHandle, useContext} from 'react';
import '../style.css'


//Subcomponents 
import ExpandedTable from "./ExpandedTable";
import StockDiv from "./StockDiv";
//Bootstrap 
import Table from "react-bootstrap/Table"
import Tippy from '@tippyjs/react'
import 'tippy.js/dist/tippy.css';
import { AiOutlineEdit } from 'react-icons/ai';
import { IconContext } from "react-icons";
//Backend 
import axios from 'axios'; 
import ENV from '../../../config.js'; 
import { AuthContext } from "../../../helpers/AuthContext";
import Staffedititem from '../../modals/components/Staffedititem';
const API_HOST = ENV.api_host;


const InventoryTable = forwardRef(({selected, itemSubmit, editItem, handleEditItemSubmit}, ref)=>{
  const [selectChange, setSelectChange] = useState(false)
  const [stocklevels, setStocklevels] = useState([])
  const [labs, setLabs] = useState([])
  
  const auth= useContext(AuthContext)
   
  useImperativeHandle(
    ref,
    () => ({
      handleSelectChange(){
        setSelectChange(!selectChange)
      }
    })
  )

  useEffect(()=>{   
    //Select all items 
    axios.get(API_HOST+'/stock').then((response)=>{
      let stocklevelstemp = []
      if (selected===""){       
      setStocklevels(response.data)
      }
      else{
         stocklevelstemp = response.data.filter((value)=>{
        return value.lab === selected
      })
        setStocklevels(stocklevelstemp)

      }
    })
    //Select permitted labs 
    const user = auth.authState.user
    axios.get(API_HOST + "/staff/" + user).then((response)=>{
      setLabs(response.data[0].labs.split(","))
    })
    
  }, [selectChange, itemSubmit, editItem])

  
  const expand = (e) =>{
    
    const id = e.target.parentNode.parentNode.id 
    
    if (e.target.classList.contains('rotate')){
        e.target.classList.remove('rotate')
        const element = document.getElementById(id + "-expanded")
        element.style.display = 'none'
      }
      else{
        e.target.classList.add('rotate')
        const element = document.getElementById(id + "-expanded")
        element.style.display = 'contents'
      }  
      
  }
  const showEditModal = (e)=>{
    
    const modal = document.getElementById('modal-edit-stock-'+e.target.name)
    modal.style.display = 'block'
  }
  return (
    <div> 
      <div className = 'header'> Inventory Items </div>
      <Table >
      <thead>
        <tr>
          <th></th>
          <th>Item</th>
          <th>Stock</th>
          <th></th>
          <th></th>
          <th>Location</th>
          <th>Total</th>
          <th>Available</th>
          <th>On loan</th>
          <th>Lab use</th>
          <th>Actions </th> 
        </tr>
      </thead>
      <tbody>
        {stocklevels.map((stock, key)=>{
          
            return(
              <>
              <tr id = {stock.itemname+"-"+stock.lab} key = {stock.itemname+"-"+stock.lab}> 
                <td><div onClick={expand} className = "arrow"></div></td>
                <td>{stock.itemname}</td>
                <td className = "stocktd" colSpan={3}> <StockDiv name = {stock.itemname + stock.lab} available = {stock.Available} onloan = {stock.OnLoan} labuse = {stock.LabUse} /> </td>
                <td>{stock.lab}</td>
                <td>{parseInt(stock.Available) + parseInt(stock.OnLoan) + parseInt(stock.LabUse)}</td>
                <td>{stock.Available}</td>
                <td>{stock.OnLoan}</td>
                <td>{stock.LabUse}</td>
                <td>
                  

                  {labs.includes(stock.lab)? <Tippy content="Edit Stock" >
                    <button name = {stock.itemname+"-"+stock.lab} onClick = {showEditModal} className='empty-button' ><AiOutlineEdit pointerEvents="none"/></button>
                  </Tippy>: <Tippy content="Unable to edit stock" >
                    <button name = {stock.itemname+"-"+stock.lab} className='empty-button' >

                      <IconContext.Provider value={{ color: "grey", className: "global-class-name" }}>
                        <div>
                          <AiOutlineEdit/>
                        </div>
                      </IconContext.Provider>
                    </button>
                  </Tippy>

                  }
                </td>

              </tr> 

              <ExpandedTable editItem= {editItem} key = {stock.itemname+ "-" + stock.lab + "-expanded"} stock = {stock}/>
              <Staffedititem  editItem = {editItem} handleEditItemSubmit = {handleEditItemSubmit} stock = {stock} /> 
              </>
            )
          
        })}
      </tbody>
    </Table>
    
    </div>
  )
})

export default InventoryTable