
import React, { useEffect, useState } from 'react'
import ENV from '../../../config.js'; 
import Table from 'react-bootstrap/esm/Table.js';
//Backend
import axios from 'axios'
const API_HOST = ENV.api_host;

export default function ExpandedTable({stock}) {
    const [itemstock, setItemstock] = useState([])
    const [itemDetail, setItemDetail] = useState([])
    const [subitems, setSubItems] = useState([])
    useEffect(()=>{

       axios.get(API_HOST+"/stock/itemname/"+ encodeURIComponent(stock.itemname)).then((response)=>{
        setItemstock(response.data)
       })

       axios.get(API_HOST+"/item/"+encodeURIComponent(stock.itemname)).then((response)=>{
       
        if(response.data[0].subitems!==""){
            const subitem = response.data[0].subitems.split(",")
            const subitemstemp = []

            subitem.forEach((subitemid)=>{
            axios.get(API_HOST+"/item/id/"+subitemid).then((response)=>{
                subitemstemp.push(response.data[0].name)
                
                setSubItems(subitemstemp)
            })
            })
            
            setItemDetail({
                name: response.data[0].name,
                description: response.data[0].description, 
                remark: response.data[0].remark, 
                subitems: subitems
            })
            
        }else {
            setItemDetail({
                name: response.data[0].name,
                description: response.data[0].description, 
                remark: response.data[0].remark
            })
        }
        
        
      
    })
        
        
    }, [])
  return (
    
     <tr id = {stock.itemname + "-" + stock.lab + '-expanded'}className='expanded'>
         
        <td className = "grey" colSpan = {2}>
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
                            {itemstock.map((item,key)=>{
                            
                                return(
                                    <>
                                    <tr key = {item.lab + "-" + stock.itemname+"-expanded-table"}> 
                                        <td key = {item.lab + '-' + stock.itemname + '-lab'}> {item.lab}</td>
                                        <td key = {item.lab + '-' + stock.itemname + '-total'}> {item.Available + item.OnLoan + item.LabUse} </td>
                                        <td key = {item.lab + '-' + stock.itemname + '-available'}> {item.Available}</td>
                                        <td key = {item.lab + '-' + stock.itemname + '-onloan'}> {item.OnLoan}</td> 
                                        <td key = {item.lab + '-' + stock.itemname + ''}> {item.LabUse} </td>
                                    </tr>
                                    </>
                                )
                            })}
                        </tbody>
                    </Table>    
            </div>
            </div>
        </td>
        <td className='grey' colSpan={3}> 
            <div> 
                <h3> Item Description </h3> 
                <p> {itemDetail.description===""? "No description": itemDetail.description} </p> 
            </div> 
            <div>
                <h3> Remarks </h3> 
                <p> {itemDetail.remark===""? "No remark": itemDetail.remark} </p> 
            </div> 
            <div> 
                <h3> Subitems </h3>
                <p> {itemDetail.subitems===""? "No subitems": subitems.toString()} </p>
            </div> 
        </td>
        <td className='grey' colSpan = {6}>
                <div className='md'> 
                    <h3> image</h3>
                </div>
        
        </td>
      
    </tr>  
    )
}
