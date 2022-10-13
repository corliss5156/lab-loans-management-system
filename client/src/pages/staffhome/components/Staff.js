import React, { useEffect, useContext } from 'react'
import NavigationStaff from '../../Navigation/components/NavigationStaff'
import { AuthContext } from '../../../helpers/AuthContext'
import { redirect, useNavigate } from 'react-router-dom'
import Reports from './Reports'
import Staffs from './Staffs'
function Staff() {
  const auth = useContext(AuthContext)
  const navigate = useNavigate()
  const { setAuthState } = useContext(AuthContext)
  
  return (
    <div> 
      <NavigationStaff current = "Home" />
      <div id = "flex-container"> 
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
