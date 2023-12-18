import React from 'react'
import { useState, useEffect, useRef } from 'react'
//Subcomponents
import Itemdetails from '../subcomponents/staffcreateitem/Itemdetails'
import Review from '../subcomponents/staffcreateitem/Review'
import Stockdetails from '../subcomponents/staffcreateitem/Stockdetails'

export default function Staffcreateitem({handleSetItemSubmit, successnotif, errornotif}) {
    const [page, setPage] = useState("1")
    const [item, setItem] = useState({
        name: "", 
        description: "", 
        subitems: [],
        remark: ""
    })
    const [stock, setStock] = useState([])
    const closeModal = () =>{
        const modal = document.getElementById('modal-create-item')
        modal.style.display = 'none'
    }
    useEffect(()=>{
        navigateTo()
    })
    //Function: changes UI of active number when setting page 
    const navigateTo = () =>{
        const navbar_item = document.getElementsByClassName("modal-navbar-item")
         Array.from(navbar_item).forEach(item =>{
        const firstChild = item.firstChild
        if (String(firstChild.textContent).trim()===page){
            item.style.borderBottom = "5px solid var(--lightblue)"
            firstChild.classList.add('active-num')
            item.lastChild.classList.add('active')
        }else{
            if (item.firstChild.classList.contains('active-num')){
                item.style.borderBottom = "2px solid var(--lightblue)"
                item.firstChild.classList.remove('active-num')
                item.lastChild.classList.remove('active')}
        }
        return null
    })
    }

    const childnavigate = page => {
        setPage(page)
    }
    //References 
    const itemssubmit = useRef()
  return (
    <div id = 'modal-create-item' className='modal'> 
        <div className='modal-content'> 
            <span onClick = {closeModal} className="close">&times;</span>
            <div className = 'modal-header'>    
                <h2> Create item</h2>    
            </div>
            <div classname = 'modal-navbar' id = 'flex-container'> 
            <div className='modal-navbar-item' onClick = {()=>{if(page==='2'){
                  setPage('1')
                }else{
                  setPage('1')
                }}}> 
                    <div className='number active-num'> 1 </div> 
                    <div className = 'active'> Item details</div>
                </div>
                <div className='modal-navbar-item' onClick = {()=>{if(page==='1'){
                  itemssubmit.current.submit()
                  setPage('2')
                }else{
                  setPage('2')
                }}}> 
                    <div className='number'> 2 </div>              
                    <div> Stock </div>
                </div> 
                <div className='modal-navbar-item' onClick = {()=>{if(page==='1'){
                    if(page==="1"){
                        itemssubmit.current.submit()
                        setPage('3')
                    }
                    
                 
                }else{
                  
                  setPage('3')
                }}}> 
                    <div className='number'> 3</div> 
                    <div> Review </div> 
                </div>
            </div>
            <div> 
                {page === "1"? <Itemdetails errornotif={errornotif} ref = {itemssubmit} childnavigate = {childnavigate} item = {item} setItem = {setItem} /> : null}
                {page ==="2"? <Stockdetails childnavigate = {childnavigate} stock = {stock} setStock = {setStock} /> : null}
                {page === "3"? <Review  successnotif = {successnotif} errornotif = {errornotif} handleSetItemSubmit={handleSetItemSubmit} stock = {stock} item = {item} />: null }
            </div>
        </div>
    </div>
  )
}
