import React, {useEffect, useState} from 'react'
import {set, useForm} from 'react-hook-form'


//Bootstrap 
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Select, { components, PlaceholderProps } from 'react-select'
import { AiOutlineDownload, AiTwotoneEdit, AiFillDelete } from 'react-icons/ai'

//Backend
import axios from 'axios'
import ENV from '../../../config.js'; 

const API_HOST = ENV.api_host;



export default function ({errornotif, successnotif}) {
    const [loanreason, setLoanReason] = useState("")
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [allItems, setAllItems] = useState([])
    const [loanItems, setLoanItems] = useState([])
    const [item, setItem] = useState('')
    const [mainItem, setMainItem] = useState('')
    const [qty, setQty] = useState('')
    const [loanTemplates, setLoanTemplates] = useState([])
    
    useEffect(()=>{
        
        //Get list of all item 
        axios.get(API_HOST + "/item").then((response)=>{
            const temp = []
            for (let i in response.data){
                temp.push({
                    'value': response.data[i].name, 
                    'label': response.data[i].name
                })
            }
            setAllItems(temp)
            
        })
        //Get list of distinct loan templates 

        axios.get(API_HOST + "/loanformtemplate/loanreason/distinct").then((response)=>{
            const temp = []

            for (let i in response.data){
                temp.push({
                    'value': response.data[i], 
                    'label': response.data[i]
                })
            }
            setLoanTemplates(temp)
        })


    }, [loanItems])

    const Placeholder = (props: PlaceholderProps<ColourOption>) => {
        return <components.Placeholder {...props} />;
      };

    const closeModal = ()=>{
        const modal = document.getElementById('modal-loan-form-template')
        modal.style.display = 'none'
    }

    const handleItemSelect = (e)=>{
        setItem(e.value)
    }
    const handleMainItemSelect = (e)=>{
        setMainItem(e.value)
    }
    
    const handleChange = (e) =>{
        setQty(e.target.value)
    }
    const handleAddItem = (e)=>{
        setLoanItems([...loanItems, {'item': item,'qtytoreceive': qty, 'mainitem': mainItem}])
        
    }
    const handleRemoveItem = (index)=>{
        const list = [...loanItems]
        const remove = index - 1
        list.splice(index, 1)
        console.log(list)
        
        setLoanItems(list)
    }

    const handleSetLoanReason = (e)=>{
        setLoanReason(e.value)
        axios.get(API_HOST + "/loanformtemplate/"+ e.value).then((response)=>{
            console.log(response.data)
            const temp = []
            for (let i in response.data) {
                temp.push({'item': response.data[i].item, 'qtytoreceive': response.data[i].qtytoreceive, 'mainitem': response.data[i].mainitem})
            }
            setLoanItems(temp)
        })
    }
    const onSubmit = (data, e) => {
        //Delete all entries in loanformtemplate where loanreason == loanreason 
        const url = API_HOST+"/loanformtemplate/delete/"+ loanreason
        console.log(url)
        axios.post(url).then((response)=>{
            console.log(response)
            for (let i in loanItems){
                axios.post(API_HOST + "/loanformtemplate", {
                    loanreason: loanreason, 
                    qtytoreceive: loanItems[i].qtytoreceive, 
                    item: loanItems[i].item, 
                    mainitem: loanItems[i].mainitem
                })
            }
            successnotif("Successfully updated loan form template")
            closeModal()
        })
        


    };
    const onError = (errors, e) => console.log(errors, e);
    
    const customStyles = {
        control: base => ({
          ...base,
          height: 35,
          minHeight: 35
        })
      };
      
  return (
    
        <div id = 'modal-loan-form-template' className = 'modal'> 
            <div className='modal-content'> 
                <span onClick = {closeModal} className = "close"> &times; </span>
            <div className= 'modal-header'> 
                <h2> Create loan form template </h2> 
            </div>
            <div className='modal-sub-page'> 
                <Form onSubmit={handleSubmit(onSubmit, onError)}>

                    <Form.Group>
                        <Form.Label>Loan Reason</Form.Label>
                        <Select onChange = {handleSetLoanReason}options = {loanTemplates} />
                    </Form.Group>
                    <div id = "loan-form-items"> 
                        <h3> Items </h3> 
                        {
                            loanItems.map((element, index)=>{
                                return(
                                    <div className = "flex-container" key = {index}>
                                        
                                        <Form.Control value = {element.item}className = "smx smx-right loanitem"/>
                                            
                                            
                                        
                                        <Form.Control value = {element.mainitem} className = "smx smx-right loanitem"/>
                                            
                                            
                                        <div className = "smx flex-container loanitem"> 
                                            <Form.Control value = {element.qtytoreceive} className = "md"/>
                                                
                                               
                                            
                                                <span onClick = {()=>handleRemoveItem(index)} className = "deleteButton"> <AiFillDelete pointerEvents= "none"/></span>
                                            
                                            
                                        </div>
                                    </div>

                                )
                                
                                
                            })
                        }


                                    <div className = "flex-container addItem" >
                                        
                                        <Form.Group className = "smx smx-right">
                                            
                                            <Select styles={customStyles}
                                                    components={{ Placeholder }}
                                                    placeholder={'Select item'}  onChange = {(e)=> handleItemSelect(e)} options = {allItems} /> 
                                        </Form.Group>
                                        <Form.Group className = "smx smx-right">
                                            
                                            <Select styles={customStyles}
                                                    components={{ Placeholder }}
                                                    placeholder={'Select main item'}
                                                    onChange = {(e)=> handleMainItemSelect(e)} options = {allItems} /> 
                                        </Form.Group>
                                        <div className = "smx flex-container"> 
                                            <Form.Group className = "md">                          
                                                <Form.Control placeHolder = "Quantity to receive" onChange = {(e)=>handleChange(e)}></Form.Control>
                                            </Form.Group>
                                            
                                            <span className = "addItem" onClick = {handleAddItem}> + Add Item</span>
                                            
                                            
                                        </div>
                                    </div>
                        
                    </div>
                    

            
                <div className = 'form-footer'> 
                  
                  <Button  className = "btn-block" variant = "primary" type = "submit" >Submit</Button>
              </div>
                </Form>
                
                
            </div>
            
            </div>
        </div>
   
  )
}
