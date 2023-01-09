
import React, { useEffect, useState } from 'react'
import ENV from '../../../config.js'; 

//Bootstrap
import Table from 'react-bootstrap/esm/Table.js';
import Staffupdateimage from '../../modals/components/Staffupdateimage.js';
import Tippy from '@tippyjs/react'
import 'tippy.js/dist/tippy.css';
import { AiOutlineEdit } from 'react-icons/ai';
//Backend
import axios from 'axios'
const API_HOST = ENV.api_host;

export default function ExpandedTable({stock, editItem}) {
    const [itemstock, setItemstock] = useState([])
    const [itemDetail, setItemDetail] = useState([])
    const [image, setImage] = useState("")
    useEffect(()=>{
       axios.get(API_HOST+"/stock/itemname/"+ encodeURIComponent(stock.itemname)).then((response)=>{
        setItemstock(response.data)
       })

       axios.get(API_HOST+"/item/"+encodeURIComponent(stock.itemname)).then((response)=>{
       
            setItemDetail({
                name: response.data[0].name,
                description: response.data[0].description, 
                remark: response.data[0].remark, 
                imageid: response.data[0].imageid
            })
            if (response.data[0].imageid !== null){
                axios.get(API_HOST + '/image/'+ response.data[0].imageid).then((response)=>{
           
                    setImage(response.data.image)
                    
                    
                })
            }
            
    })
        
        
    }, [editItem])
    
    const showModal = (e)=> {
        console.log(e)
        const modal = document.getElementById("modal-update-image-"+ e.target.alt)
        modal.style.display = "block"
    }
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
        
        </td>
        <td className='grey' colSpan = {6}>
                <div  className='md'> 
                   
                    
                
                        <h3> Image</h3>
                        {image!== ""? 
                        
                        <img src= {image} alt={itemDetail.imageid} onClick = {showModal} className="img-overlay-image"/>
                       
                      : <button >No image found</button>}
                    
                    <Staffupdateimage img = {image} itemDetail = {itemDetail} />
                </div>
        
        </td>
      
    </tr>  
    )
}
