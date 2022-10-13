import React, { useEffect } from 'react'

export default function StockDiv({name, available, onloan, labuse}) {


const setWidth = (parentwidth, total, div) =>{

    const width = (parseInt(div)/parseInt(total)) * parseInt(parentwidth)
    return String(width) + "px"
}


useEffect(()=>{
    const parent = document.getElementById(name)
    const parentwidth = parent.offsetWidth
    
    const total = available + onloan + labuse
    const availablediv = parent.childNodes[0]
    availablediv.style.width = setWidth(parentwidth, total, available)
    const onloandiv = parent.childNodes[1]
    onloandiv.style.width = setWidth(parentwidth,total, onloan)
    const labusediv = parent.childNodes[2]
    labusediv.style.width = setWidth(parentwidth, total, labuse)
})
  return (
    <>
    <div id = {name} className='stock'>
        <div  className = "available"></div>
        <div className = "onloan"> </div>
        <div  className = "labuse"></div>      
        
    </div>
    <div> {available} out of {available + onloan + labuse} available.</div> 
    </>
    
  )
}
