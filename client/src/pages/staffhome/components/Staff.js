import React from 'react'
import NavigationStaff from '../../Navigation/components/NavigationStaff'

import Reports from './Reports'
import Staffs from './Staffs'
function Staff() {
  
  return (
    <div> 
      <NavigationStaff current = "Home" />
      <div className = "flex-container"> 
        <div className='md'> 
          <div> 
            <Reports />
          </div> 
          <div> 
            <Staffs />
          </div> 
        
        </div>
        <div className = "md"> 
        Recent Activity</div>
      </div> 

    </div>
    
  )
}

export default Staff
