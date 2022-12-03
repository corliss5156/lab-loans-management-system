import Table from "react-bootstrap/Table"
import {useEffect, useState} from 'react';
import axios from 'axios'; 
import ExpandedTable from "./ExpandedTable";
import ENV from '../../../config.js'; 
import { FiEdit } from "react-icons/fi";
import '../style.css'
import StockDiv from "./StockDiv";
const API_HOST = ENV.api_host;



function InventoryTable({selected}){

  const [inventory, setInventory] = useState([])
  

  useEffect(()=>{   
    if (selected !== ""){
      //Filter out selected labs 
    }
    const url = API_HOST + "/inventorystock"
    axios.get(url).then((response)=>{
        setInventory(response.data)
    })
  }, [])

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
  return (
    <div> 
      <div className = 'header'> Inventory Items </div>
      <Table >
      <thead>
        <tr>
          <th></th>
          <th>Item</th>
          <th>Description </th> 
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
        
      </tbody> 
    </Table>
    </div>
  )
}

export default InventoryTable