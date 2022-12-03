import React, { forwardRef, useEffect, useState, useImperativeHandle } from 'react'
import Table from 'react-bootstrap/Table'
import Itemcard from './Itemcard'
import Button from 'react-bootstrap/esm/Button'

const Item = forwardRef(({items, childnavigate, childsetLoanItems, loanItems}, ref) => {
  useImperativeHandle(
    ref,
    () => ({
     submit(){
      const quantities = document.getElementsByClassName('numberspinner-container')
    
      //update loanitems with quantity 
      const loanItemsCopy = loanItems
      Array.from(quantities).forEach((container)=>{
        const itemname = container.parentElement.previousSibling.previousSibling.childNodes[0].textContent.trim()
        if(container.childNodes[0].value.trim()) {
          loanItemsCopy[itemname]['qtyreceived'] = parseInt(container.childNodes[0].value.trim())     
        }
        else if(loanItems[itemname]['qtyreceived']){
          loanItemsCopy[itemname]['qtyreceived'] = loanItemsCopy[itemname]['qtyreceived']
        } 
        
      })
      childsetLoanItems(loanItemsCopy)
    
     },
    })
  )

  const submit = () => {
    //Check if all quantites have been filled in
    const quantities = document.getElementsByClassName('numberspinner-container')
    
      //update loanitems with quantity 
      const loanItemsCopy = loanItems
      Array.from(quantities).forEach((container)=>{
        const itemname = container.parentElement.previousSibling.previousSibling.childNodes[0].textContent.trim()
        if(container.childNodes[0].value.trim()) {
          loanItemsCopy[itemname]['qtyreceived'] = parseInt(container.childNodes[0].value.trim())     
        }
        else if(loanItems[itemname]['qtyreceived']){
          loanItemsCopy[itemname]['qtyreceived'] = loanItemsCopy[itemname]['qtyreceived']
          
        } 
        
      })
      childsetLoanItems(loanItemsCopy)
      childnavigate('3')
    
  }
  
  
  return (
    <div className='modal-sub-page' id = 'items-sub-page'>
      <Table> 
        <thead> 
          <tr> 
            <th> </th>
            <th> Item </th> 
            <th> Components </th> 
            <th> Quantity to Receive </th>
            <th> Quantity Received </th> 
          </tr>
        </thead>
        <tbody> 
          {Object.keys(items).length>0 ? Object.keys(items).map((key)=>{
            const value = items[key]
            
            
            return(<Itemcard itemname = {value.name} description = {value.description}
              subitems = {value.subitems} qtyreceived = {loanItems[value.name]['qtyreceived']}
              />)
            
          }): null}
         
        </tbody>
      </Table>
      <div className = 'form-footer'> 
        <Button onClick = {submit} className = "btn-block" variant = "primary" type = "submit"> Next </Button>
      </div>
    </div>
  )
})

export default Item