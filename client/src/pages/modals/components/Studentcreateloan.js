import React, { useEffect, useState, useRef } from 'react'
import '../style.css'

import Loandetails from '../subcomponents/studentcreateloan/Loandetails'; 
import Items from '../subcomponents/studentcreateloan/Items';
import Review from '../subcomponents/studentcreateloan/Review';


import ENV from '../../../config.js'; 
import axios from 'axios'
const API_HOST = ENV.api_host;


export default function Studentcreateloan({successnotif , errornotif, loanSubmit, handleSetLoanSubmit}) {
    const [page, setPage] = useState('1')
    const [loan, setLoan] = useState({
        'formreference': '',
        'borrowername':'', 
        'borroweremail': '', 
        'borrowdate': '',
        'returndate': '', 
        'supervisoremail': '', 
        'phonenumber': '',
        'status': '', 
        'lab': '', 
        'groupmembers': '', 
        'semester': '', 
        'groupnumber': [], 
        'loanreason': ''
    })
    const [items, setItems] = useState({})
    const [loanItems, setLoanItems] = useState([])

  
   const closeModal = () =>{
    const modal = document.getElementById('modal')
    modal.style.display = 'none'
   }
   const setloandetails = (loandata) =>{
    setLoan(loan =>({
        ...loan, 
        ...loandata
    }))
   }
   const childsetLoanItems = (loanitemschild) =>{
    setLoanItems(loanItems=>({
      ...loanItems, 
      ...loanitemschild
    }))
   }
   const setLoanitems = (loanreason) =>{
    const url = API_HOST + "/loanformtemplate/" + loanreason
        axios.get(url).then((response)=>{
          console.log(response.data)
            const items = response.data
            const setofitems = {}
            const setofLoanItems = {}
            const mainitems = items.filter((item)=>{
                return (item.mainitem === '' || item.mainitem ===null)
              })
              const subitems = items.filter((item)=>{
                return (item.mainitem !== ''&& item.mainitem !==null)
              })
              mainitems.forEach((item) => {
                setofitems[item.item] = {
                  'name': item.item, 
                  'description': item.description, 
                  'subitems': [{
                    'name': item.item, 
                    'quantity': item.qtytoreceive
                  }]
                }
                setofLoanItems[item.item] = {
                  'qtytoreceive': item.qtytoreceive, 
                  'qtyreceived': null
                }
               
                
              })
              console.log(mainitems)
              console.log(subitems)
              if(subitems.length>0){
                subitems.forEach((item)=>{
                setofitems[item.mainitem]['subitems'].push({
                  'name': item.item, 
                  'quantity': item.qtytoreceive
                })
                setofLoanItems[item.item] = {
                  'qtytoreceive': item.qtytoreceive, 
                  'qtyreceived': null
                }
              })
              }
              
              console.log(setofLoanItems)
              setItems(items => ({
                ...items, 
                ...setofitems
              }))
              setLoanItems(loanItems=>({
                ...loanItems, 
                ...setofLoanItems
              }))
        })
   }
   useEffect(()=>{
    navigateTo()
   })
   const loandetailssubmit = useRef()
   const itemsubmit = useRef()
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
   const childnavigate = page =>{
    setPage(page)
   }
  return (
        <div id = "modal" className = "modal">
            
            <div className = 'modal-content'> 
            <span onClick = {closeModal} className="close">&times;</span>
          
            <div className = 'modal-header'>    
                <h2> Request loan</h2>    
            </div>
            <div className='modal-navbar' id = 'flex-container'> 
                <div className='modal-navbar-item' onClick = {()=>{if(page==='2'){
                  itemsubmit.current.submit()
                  setPage('1')
                }else{
                  setPage('1')
                }}}> 
                    <div className='number active-num'> 1 </div> 
                    <div className = 'active'> Loan details</div>
                </div>
                <div className='modal-navbar-item' onClick = {()=>{if(page==='1'){
                  loandetailssubmit.current.submit()
                  setPage('2')
                }else{
                  setPage('2')
                }}}> 
                    <div className='number'> 2 </div>              
                    <div> Items </div>
                </div> 
                <div className='modal-navbar-item' onClick = {()=>{if(page==='1'){
                  loandetailssubmit.current.submit(
                    setPage('3')
                  )
                }else{
                  itemsubmit.current.submit()
                  setPage('3')
                }}}> 
                    <div className='number'> 3</div> 
                    <div> Review </div> 
                </div>
            </div>
            
            <div>
              
                {page === "1"? <Loandetails errornotif = {errornotif} ref = {loandetailssubmit} childnavigate = {childnavigate} loan = {loan} setLoanitems = {setLoanitems} setloandetails = {setloandetails}/> : null}
                {page=== "2"? <Items ref = {itemsubmit} childnavigate = {childnavigate} items = {items} loanItems = {loanItems} childsetLoanItems = {childsetLoanItems} />: null } 
                {page === "3"?<Review successnotif = {successnotif} errornotif={errornotif} handleSetLoanSubmit = {handleSetLoanSubmit} loanSubmit = {loanSubmit} childnavigate = {childnavigate} loanItems = {loanItems} loan = {loan} />: null}
            </div>

            </div>
        </div>
  )
}
