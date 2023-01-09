import React, {useEffect, useState} from 'react'
import {useForm} from 'react-hook-form'


//Bootstrap 
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { AiOutlineDownload, AiTwotoneEdit } from 'react-icons/ai'

//Backend
import axios from 'axios'
import ENV from '../../../config.js'; 

const API_HOST = ENV.api_host;



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
                <h2> Export loan data to CSV </h2> 
            </div>
            <div className='modal-sub-page'> 
                <pre> {JSON.stringify(activity, null, 4)} </pre>
                
                
                
            </div>
            </div>
            
        </div>
   
  )
}
