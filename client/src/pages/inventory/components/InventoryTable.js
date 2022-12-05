
import {forwardRef, useEffect, useState, useImperativeHandle} from 'react';
import '../style.css'



//Subcomponents 
import Hover from "../../modals/Hover";
import ExpandedTable from "./ExpandedTable";
import StockDiv from "./StockDiv";
//Bootstrap 
import Table from "react-bootstrap/Table"
import { FiEdit } from "react-icons/fi";
import {BiMessageSquareDetail} from "react-icons/bi"
//Backend 
import axios from 'axios'; 
import ENV from '../../../config.js'; 
import Staffedititem from '../../modals/components/Staffedititem';
const API_HOST = ENV.api_host;


const InventoryTable = forwardRef(({selected, itemSubmit, editItem, handleEditItemSubmit}, ref)=>{
  const [selectChange, setSelectChange] = useState(false)
  const [stocklevels, setStocklevels] = useState([])
  
   
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

    
    
  }, [selectChange, itemSubmit, editItem])

  const showHover = (e)=>{
    
    if(e.target.nextSibling.nodeName==="DIV"){
      e.target.nextSibling.style.display = "block"
    }
    setTimeout(()=>{
      e.target.nextSibling.style.display = "none"
    }, 1000)
  }
  
  const expand = (e) =>{
    
    const id = e.target.parentNode.parentNode.id 
    console.log(id)
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
    const itemname = e.target.parentElement.parentElement.firstChild.nextSibling.textContent.toString().trim()
    const labname = e.target.parentElement.previousSibling.previousSibling.previousSibling.previousSibling.previousSibling.textContent.toString().trim()
    console.log(labname)
    const modal = document.getElementById('modal-edit-stock-'+itemname + '-' + labname)
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
                <td className = "action-td"> <FiEdit className = "cursor" onClick = {showEditModal} onMouseEnter= {showHover} /> 
                      <Hover text= "Edit item"/> 
                     
                
                </td>

              </tr> 

              <ExpandedTable key = {stock.itemname+ "-" + stock.lab + "-expanded"} stock = {stock}/>
              <Staffedititem lab = {stock.lab} handleEditItemSubmit = {handleEditItemSubmit} itemname= {stock.itemname} /> 
              </>
            )
          
        })}
      </tbody>
      {/* <tbody>
        
        {inventory.map((item, key)=>{
          if(selected !== ""){
            if(item.lab === selected){
              return(
                <>
    <tr id = {item.name} key = {item.name}>
                  <td > <div onClick  = {expand} className = 'arrow'> </div></td>
                  <td> {item.name} </td>
                  <td> {item.description} </td> 
                  <td className = "stocktd" colSpan={3}> <StockDiv name = {item.name + item.lab}available = {item.Available} onloan = {item.OnLoan} labuse = {item.LabUse} /></td>
                  <td> {item.lab}</td>
                  <td> {item.Available + item.OnLoan + item.LabUse} </td>
                  <td> {item.Available} </td> 
                  <td> {item.OnLoan}</td>
                  <td> {item.LabUse} </td>
                  <td > <FiEdit /> </td>
                </tr>
                <ExpandedTable key = {item.name + "-expanded"} item = {item}/>
    
                </>
                
              
                
              )
            }
          }
          else {
            return(
              <>
  <tr id = {item.name + item.lab} key = {item.name}>
                <td > <div onClick  = {expand} className = 'arrow'> </div></td>
                <td> {item.name} </td>
                <td> {item.description} </td> 
                <td className = "stocktd" colSpan={3}> <StockDiv name = {item.name + item.lab} available = {item.Available} onloan = {item.OnLoan} labuse = {item.LabUse} /></td>
                <td> {item.lab}</td>
                <td> {item.Available + item.OnLoan + item.LabUse} </td>
                <td> {item.Available} </td> 
                <td> {item.OnLoan}</td>
                <td> {item.LabUse} </td>
                <td > <FiEdit /> </td>
              </tr>
              <ExpandedTable key = {item.name + item.lab + "-expanded"} item = {item}/>
  
              </>
              
            
              
            )
          }
           
          
        })}
        
      </tbody>  */}
      <tbody> 
      </tbody> 
    </Table>
    </div>
  )
})

export default InventoryTable