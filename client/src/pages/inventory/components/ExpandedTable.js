import axios from 'axios'
import React, { useEffect, useState } from 'react'
import ENV from '../../../config.js'; 
import Table from 'react-bootstrap/esm/Table.js';
const API_HOST = ENV.api_host;

export default function ExpandedTable({item}) {
    const [stock, setStock] = useState([])
    useEffect(()=>{
        const url = API_HOST + "/inventorystock/" + item.name

        axios.get(url).then((response)=>{
           
            response.data.map((res)=>{
                setStock(old=>[...old, res])
            })
            
        })
        
        
        
    }, [])
  return (
    <tr id = {item.name + '-expanded'}className='expanded'>
         <td> </td>
        <td className = "grey" colSpan = {8}>
            <div id = "flex-container"> 
            <div className='md'>
                <Table id = "grey"> 
                        <thead>
                            <tr> 
                                <th></th>
                                <th> Total </th>
                                <th>Available</th>
                                <th>On loan </th>
                                <th>Lab Use </th>
                            </tr>
                        </thead>
                        <tbody> 
                            {stock.map((item,key)=>{
                                return(
                                    <>
                                    <tr> 
                                        <td> {item.lab}</td>
                                        <td> {item.Available + item.OnLoan + item.LabUse} </td>
                                        <td> {item.Available}</td>
                                        <td> {item.OnLoan}</td> 
                                        <td> {item.LabUse} </td>
                                    </tr>
                                    </>
                                )
                            })}
                        </tbody>
                    </Table>    
            </div>
                <div className='md'> 
                    <h3> image</h3>
                </div>
            </div>
        </td>
        <td colSpan = {3}></td>
     
    </tr>  
    )
}
