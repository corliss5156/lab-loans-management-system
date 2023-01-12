import React, { useEffect, useState } from 'react'
import Numberspinner from '../Numberspinner'

//Backend

import axios from 'axios'
import ENV from '../../../../config.js'; 

const API_HOST = ENV.api_host;


export default function Itemcard({itemname, imgpath, description, subitems, qtyreceived}) {
    const [image, setImage ]  = useState("")

    useEffect(()=>{
        //Get image id from itemname 
        axios.get(API_HOST + "/item/" + itemname).then((response)=>{
            if (response.data[0].imageid !== null){
                const imageid = response.data[0].imageid 
                axios.get(API_HOST+"/image/"+ imageid).then((res)=>{
                   setImage(res.data.image)
                })
            }
            
        })
    })

    
    const handleCheck = (e) => {
        const checkbox = e.target

        const itemquantity = e.target.parentElement.parentElement.nextSibling.textContent.trim()
        
        const numberspinner = e.target.parentElement.parentElement.nextSibling.nextSibling.childNodes[1].childNodes[0]

        if(checkbox.checked){
            numberspinner.value = parseInt(itemquantity)
            const itemname = e.target.parentElement.parentElement.childNodes[0]
            itemname.style.color = "#333"
        } else {
            numberspinner.value = null
        }
    }
  return (
    
    <>
    <tr> 
        <td rowSpan = {subitems.length}>  </td>
        <td rowSpan = {subitems.length}>
            <div className = 'checkbox-div'>
                <h3> {itemname} </h3>
                <img src = {image}/>
                
                <p> {description} </p> 
                <div> </div>
            </div>    
        </td> 
        <td > 
            
             <label className="container"> {subitems[0].name}
                <input onChange = {handleCheck} type="checkbox" />
                <span className="checkmark"></span>
            </label>
            
        </td>
        <td > {subitems[0].quantity} </td> 
        <td > <Numberspinner itemname = {subitems[0].name} qtyreceived = {qtyreceived}/> </td> 
        
    </tr>
    {subitems.length > 1 ? subitems.map((value, index)=>{
            
            if (index!== 0 ){
                return(
                    <tr key = {index}> 
                        <td className='no-border'>
                            
                            <label className="container"> {value.name}
                                <input onChange = {handleCheck} type="checkbox" />
                                <span  className="checkmark"></span>
                                </label>
                            
                            
                        </td>
                        <td className='no-border'> {value.quantity}</td>
                        <td className='no-border'> <Numberspinner itemname = {value.name}/> </td>
                     </tr> 
                )
            }
        }):null}
    </>
  )
}
