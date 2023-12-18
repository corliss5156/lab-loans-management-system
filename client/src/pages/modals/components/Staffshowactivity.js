import React from 'react'




export default function ({activity}) {
   
    
    const closeModal = ()=>{
        const modal = document.getElementById('modal-activity-' + activity.id)
        modal.style.display = 'none'
    }
    
   

  return (
    
        <div id = {'modal-activity-' + activity.id} className = 'modal'> 
            <div className='modal-content'> 
                <span onClick = {closeModal} className = "close"> &times; </span>
            <div className= 'modal-header'> 
                <h2> {activity.staff + " editted stock for " + activity.item}  </h2> 
            </div>
            <div className='modal-sub-page'> 
                <pre> {JSON.stringify(activity, null, 4)} </pre>
                
                
                
            </div>
            </div>
            
        </div>
   
  )
}
