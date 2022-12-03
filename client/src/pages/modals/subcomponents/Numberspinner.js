import React from 'react'

export default function Numberspinner({qtyreceived}){
    const handleChange = (e) => {
      const itemquantity = parseInt(e.target.parentElement.parentElement.previousSibling.textContent.trim())
      const itemname = e.target.parentElement.parentElement.previousSibling.previousSibling.childNodes[0]
     
      
      const checkbox = e.target.parentElement.parentElement.previousSibling.previousSibling.childNodes[0].childNodes[2]
      // If quantity entered is equals to itemquantity, mark checkbox as checked 
      if (parseInt(e.target.value.trim())=== itemquantity) {
        checkbox.checked = true
        itemname.style.color = "#333"
      } else {  
        checkbox.checked = false
        itemname.style.color = "red"

      }

    }
  return (
    <div className="numberspinner-container">
	
	
    <input type="number" onChange={handleChange} className="input"  placeholder = {qtyreceived? qtyreceived: "Fill in quantity"}/> 
    </div>
  )
}
