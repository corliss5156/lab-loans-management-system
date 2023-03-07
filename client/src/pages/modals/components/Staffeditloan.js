import React, { useEffect, useContext, useState } from 'react'
import {useForm} from 'react-hook-form'
import jsPDF from 'jspdf'
//Bootstrap 
import Form from 'react-bootstrap/Form'
import {FiAlertCircle} from 'react-icons/fi'
import {FiEdit} from 'react-icons/fi'
import {AiOutlineDownload} from 'react-icons/ai'
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'

//Backend
import { AuthContext } from '../../../helpers/AuthContext'
import axios from 'axios'
import ENV from '../../../config.js'; 

const API_HOST = ENV.api_host;




export default function Staffeditloan({successnotif, errornotif, email, formreference, handleUpdate}) {
   
    const auth = useContext(AuthContext)
    const [originalstatus, setOriginalStatus] = useState([])
    const [newstatus, setNewStatus] = useState("")
    const [loan, setLoan] = useState([])
    const [change, setChange] = useState([])
    const [originalitems, setOriginalItems] = useState([])
    const [newitems, setNewItems] = useState([])
    const [items, setItems]  = useState([])
    const [groupmembers, setGroupmembers] = useState([])
    const [returnDate, setReturnDate] = useState('')
    const [remark, setRemark] = useState("")

    const handleReturnDate = (e)=>{
        setReturnDate(e.target.value)

    }
    
    const downloadpdf = ()=>{
        const doc = new jsPDF();

      doc.setFontSize(10)
      doc.setFont("arial", "normal")
      doc.text("Nanyang Technological University", 80, 20)
      doc.text("School of Computer Science and Engineering", 80, 25)
      doc.setFont("arial", 'bold')
      doc.text("MDP loan form details", 20, 40)
      doc.line(20, 41, 20+ doc.getTextWidth("MDP loan form details"), 41)
      doc.text("Loan Details", 20, 53).setFont("arial", 'normal')
      doc.line(20, 55, 190, 55 )
      doc.text("Form reference: " + loan.formreference, 20, 60)
      doc.text("Supervisor email: " + loan.supervisoremail, 130, 60)
      doc.text("Borrower name: " + loan.borrowername, 20, 65)
      doc.text("Borrower email: " + loan.borroweremail, 130, 65)
      doc.text("Loan Status: "+ loan.status, 20, 70 )
      doc.text("Lab: " + loan.lab, 130,70 )
      doc.text("Borrow date: " + loan.borrowdate, 20, 75)
      doc.text("Return date: " + loan.returndate, 130, 75)
      doc.setFont("arial", 'bold')
      doc.text("Item Details", 20, 88 ).setFont("arial", "normal")
      doc.line(20, 90, 190, 90)
      doc.text("Item name", 20, 95)
      doc.text("Quantity Received", 130, 95)
      let lineheight = 100
      
      for (let i in items){
        doc.text(items[i].item, 20, lineheight)
        doc.text(items[i].qtyreceived.toString(), 130, lineheight)
        lineheight +=5
      }
    
      
      doc.save(loan.formreference+".pdf");
    }
    useEffect(()=>{
        
        axios.get(API_HOST+ "/loanrequest/"+ email + "/" + formreference).then((response)=>{
            setLoan(response.data[0])
            setOriginalStatus(response.data[0].status)
            setGroupmembers(Array.from(response.data[0].groupmembers.split(',')))
            setReturnDate(response.data[0].returndate)
            setNewStatus(response.data[0].status)
            setRemark(response.data[0].remark)
            
        })
        axios.get(API_HOST + '/loanitem/' + formreference).then((response)=>{
            const data = response.data
            
            setItems(data)
            setOriginalItems(data)
            setNewItems(data)
        })
        
    }, [])
    const closeModal = () => {
        const modal = document.getElementById('modal-edit-loan-' + formreference)
        modal.style.display = 'none'
    }

    const handleChange = (e)=>{
        // Check if new quantity is equals to qty to receive. If yes, remove the red icon
        const value = parseInt(e.target.value)
        const qtytoreceive = parseInt(e.target.parentElement.parentElement.previousSibling.textContent)
        const fiedit = e.target.parentElement.parentElement.parentElement.firstChild.firstChild.nextSibling
        const itemname = e.target.parentElement.parentElement.previousSibling.previousSibling.textContent.toString().trim()
        if (value === qtytoreceive){
          
            fiedit.style.display = 'none'
            
        }
        else{
            fiedit.style.display='block'

        }
        const item = {
            formreference: loan.formreference,
            item: itemname, 
            qtytoreceive: qtytoreceive,
            lab: loan.lab,
            qtyreceived: value
        }
        
        setChange([...change, item])
        const ls = newitems.filter(a=>
            a.item!==itemname
        )
        ls.push(item)
        setNewItems(ls)
        
    }
    const edit = (e)=> {
        if(returnDate===null&&newstatus !== "Complete"){
            errornotif("Set return date")
        }
        else{
           
            //update return date
            axios.put(API_HOST+"/loanrequest/returndate/" + formreference, {returndate: returnDate}).then((response)=>{
                console.log(response)
            })
           
            
            if (originalstatus==="Partial"&&newstatus==="Partial"){
                const tbody = document.getElementById('tbody-'+ formreference)
                const numberspinners = tbody.getElementsByClassName("input")
                // If all number spinners qtyreceived == qtytoreceive, update stock based on new stock 
                let allsame = true
                for (let input in numberspinners){
                    if(numberspinners[input].className==="input"){
                        if(parseInt(numberspinners[input].name)!==parseInt(numberspinners[input].value)) {allsame = false}
                    }
                }
                if (allsame){
                    errornotif("Status of loan should be changed to 'On Loan'")
                }else{
                    updateRemark()
                    partialedit("On Loan")
                    closeModal()
                    handleUpdate()
                }
                
            }
            else if(newstatus === originalstatus){
                errornotif("Status must be set.")
            }
            else if(originalstatus==="To Be Approved"&&newstatus === "On Loan"){
                //Check that all qtytoreceive == qtyreceived. If yes update stock based on qtyreceived 
               
                //If no changes were made to inputs, direct update 
                
                //Check through all number spinners
                
                    const tbody = document.getElementById('tbody-'+ formreference)
                    const numberspinners = tbody.getElementsByClassName("input")
                    
                    //If all number spinners qtyreceived == qtytoreceive, update stock based on new stock 
                    let allsame = true
                    for (let input in numberspinners){
                        if(numberspinners[input].className==="input"){
                            
                            if(parseInt(numberspinners[input].name)!==parseInt(numberspinners[input].value)) {allsame = false}
                        }
                    }
                    
                    if(allsame){
                        updateRemark()
                        normalEdit(newstatus)
                        closeModal()
                        handleUpdate()
                    } else{
                        //Else 
                        errornotif("Status of loan cannot be 'On Loan' if quantities to receive do not equal to quantities received ")
                    }
                
                
            } 
            else if (originalstatus === "To Be Approved"&&newstatus ==="Partial"){
                const tbody = document.getElementById('tbody-'+ formreference)
                    const numberspinners = tbody.getElementsByClassName("input")
                    
                    //If all number spinners qtyreceived == qtytoreceive, update stock based on new stock 
                    let allsame = true
                    for (let input in numberspinners){
                        if(numberspinners[input].className==="input"){
                            if(parseInt(numberspinners[input].name)!==parseInt(numberspinners[input].value)) {allsame = false}
                        }
                    }
                    
                    if (allsame){
                        errornotif("Status of loan cannot be 'Partial' if quantities to receive match quantities received. Changed to 'On Loan' instead.")
                    }else{
                        updateRemark()
                        normalEdit("Partial")
                        closeModal()
                        handleUpdate()
                    }
            }
            else if (originalstatus==="Partial"&&newstatus==="On Loan"){
                
                const tbody = document.getElementById('tbody-'+ formreference)
                const numberspinners = tbody.getElementsByClassName("input")
                // If all number spinners qtyreceived == qtytoreceive, update stock based on new stock 
                let allsame = true
                for (let input in numberspinners){
                    if(numberspinners[input].className==="input"){
                        if(parseInt(numberspinners[input].name)!==parseInt(numberspinners[input].value)) {allsame = false}
                    }
                }
                if(!allsame){
                    errornotif("Status of loan cannot be 'On Loan' if quantities to receive do not match quantities received")
                }
                else{
                    updateRemark()
                    partialedit("On Loan")
                    closeModal()
                    handleUpdate()
                }
            }
            else if(originalstatus==="On Loan"&&newstatus === "Complete"){
               
                //return items 
                updateRemark()
                returnstock()
                closeModal()
                handleUpdate()
                
               
            }
            else if(originalstatus==="Partial"&&newstatus === "Complete"){
               
                //return items 
                updateRemark()
                returnstock()
                closeModal()
                handleUpdate()
                
               
            }
            
        }
        
        
        
    }

    const updateRemark = ()=>{
        axios.put(API_HOST+"/loanrequest/remark/"+ formreference, {
            remark: remark
        }).then((response)=>{
            console.log(response)
        })
    }
    //Return stock

    const returnstock = ()=>{
        axios.put(API_HOST+"/loanrequest/status/"+ formreference, {status: "Complete"}).then((response)=>{
            console.log(response)
            for (let item in items){
                console.log(item)
                //Increment available stock for item 
                axios.put(API_HOST +"/stock/increment/"+ loan.lab+"/"+items[item].item, {
                    status: "Available", 
                    qtyreceived: items[item].qtyreceived
                }).then((response)=>{
                    console.log(response)
                })
                //Decrement on loan stock for item
                axios.put(API_HOST +"/stock/decrement/"+ loan.lab+"/"+items[item].item, {
                    status: "OnLoan", 
                    qtyreceived: items[item].qtyreceived
                }).then((response)=>{
                    console.log(response)
                    if(response.data.name){
                        errornotif(response.data.original.sqlmessage)
                    }
                    successnotif("Successfully updated.")
                })
            }
        })
    }
    //Compares changes from original stock and new stock to update stock
    const partialedit =(status)=>{
        //update stock for each stock that was changed
        axios.put(API_HOST+"/loanrequest/status/"+ formreference, {status: status}).then((response)=>{
            console.log(response)
        for (let ch in change){
            const oitem = originalitems.find(a=>a.item===change[ch].item)
            //Return the original item and bring new item to loan 
            axios.put(API_HOST+"/stock/increment/"+oitem.lab+"/"+encodeURIComponent(oitem.item), {
                status: "Available", 
                qtyreceived: oitem.qtyreceived
            }).then((response)=>{
                console.log(response)
            })
            axios.put(API_HOST+"/stock/decrement/"+oitem.lab+"/"+encodeURIComponent(oitem.item), {
                status: "OnLoan", 
                qtyreceived: oitem.qtyreceived
            }).then((response)=>{
                console.log(response)
            })
            axios.put(API_HOST+"/stock/decrement/"+oitem.lab+"/"+encodeURIComponent(oitem.item), {
                status: "Available", 
                qtyreceived: change[ch].qtyreceived
            }).then((response)=>{
                console.log(response)
            })
            axios.put(API_HOST+"/stock/increment/"+oitem.lab+"/"+encodeURIComponent(oitem.item), {
                status: "OnLoan", 
                qtyreceived: change[ch].qtyreceived
            }).then((response)=>{
                console.log(response)
            })
            
            //Update loan item 
            axios.put(API_HOST+ "/loanitem/"+ formreference +"/item", {
                item: change[ch].item, 
                qtyreceived: change[ch].qtyreceived
            }).then((response)=>{
                console.log(response)
            })
        }
        })
    }

    //Increment and decrement stock level based on newstock only 
    const normalEdit=(status)=>{
        //Update loan status only 
        axios.put(API_HOST+"/loanrequest/status/"+ formreference, {status: status}).then((response)=>{
            console.log(response)
            //Minus qty received from stock 
        for (let item in newitems){
            //Updates stock 
            axios.put(API_HOST+"/stock/increment/"+newitems[item].lab +"/"+ encodeURIComponent(newitems[item].item), {
                status: "OnLoan",
                qtyreceived: newitems[item].qtyreceived
            }).then((response)=>{
                console.log(response)
            })
            axios.put(API_HOST+"/stock/decrement/"+newitems[item].lab +"/"+ encodeURIComponent(newitems[item].item), {
                status: "Available",
                qtyreceived: newitems[item].qtyreceived
            }).then((response)=>{
                console.log(response)
            })
            //Update loan item 
            axios.put(API_HOST+ "/loanitem/"+ formreference +"/item", {
                item: newitems[item].item, 
                qtyreceived: newitems[item].qtyreceived
            }).then((response)=>{
                console.log(response)
                successnotif("Successfully updated")
            })
        }
        })
    }
    
    
  return (
    <div>
    <div id = {'modal-edit-loan-' + formreference} className='modal'>
        <div className = 'modal-content'> 
        <span onClick = {closeModal} className = 'close'> &times; </span> 
        <div className = 'modal-header'> 
            <h2> {loan.formreference} </h2>
        </div> 

        <div className = 'modal-sub-page'> 
        
        <Form> 
            <div className = 'flex-container'> 
                <Form.Group className = 'md md-right'> 
                <Form.Label> Status </Form.Label>
                <Form.Select className = 'cursor' onChange = {(e)=>{setNewStatus(e.target.value)}} >
                    <option>{loan.status}</option>
                    <option value = "To Be Approved">To Be Approved</option>
                    <option value = "On Loan">On Loan</option> 
                    <option value = "Partial">Partial</option>
                    <option value = "Complete">Complete</option>
                </Form.Select>
               
                </Form.Group>
                <Form.Group className = 'md md-left'> 
                <Form.Label> Borrower Email </Form.Label>
                <Form.Control disabled placeholder = {loan.borroweremail} ></Form.Control>
               
                </Form.Group>
        
            </div> 
            <div className = 'flex-container'>
                <Form.Group className = 'md md-right'> 
                <Form.Label> Borrower Name</Form.Label>
                <Form.Control disabled placeholder = {loan.borrowername} ></Form.Control>
               
                </Form.Group>
                <Form.Group className = 'md md-left'> 
                <Form.Label> Supervisor Email </Form.Label>
                <Form.Control disabled placeholder = {loan.supervisoremail} ></Form.Control>
               
                </Form.Group>

            </div> 
            <div className = 'flex-container'>
                <Form.Group className = 'smx smx-right'> 
                <Form.Label> Borrow Date </Form.Label>
                <Form.Control disabled placeholder = {loan.borrowdate} ></Form.Control>
               
                </Form.Group>
                <Form.Group className = "smx"> 
                <Form.Label> Return Date </Form.Label>
                <Form.Control className = "blackPlaceholder cursor" onChange = {handleReturnDate}  type = "text" placeholder= {loan.returndate}  onFocus={(e) => (e.target.type = "date")}
        onBlur={(e) => (e.target.type = "text")} ></Form.Control>
               
                </Form.Group>
                <Form.Group className = "smx smx-left"> 
                <Form.Label> Request Reason </Form.Label>
                <Form.Control disabled placeholder = {loan.requestreason} ></Form.Control>
               
                </Form.Group>
                
            </div>
            <Form.Group > 
                <Form.Label> Remark </Form.Label>
                <Form.Control className = "blackPlaceholder cursor" onChange = {(e)=>setRemark(e.target.value)} placeholder = {loan.remark? loan.remark: "No remark"} ></Form.Control>
               
                </Form.Group>
               
            <Form.Group> 
            <Form.Label> Group members </Form.Label>
          
          </Form.Group>
            <div id = 'groupmembers'> 
            {groupmembers.length > 0? groupmembers.map((value, key)=>{
                return(
                    <div className = 'group-member' key = {key}> 
                        <p> {value} </p> 
                    </div>
                )
            }): null}
        </div>
        </Form> 
        <div> 
        <Table className='itemtable'>
          <thead> 
            <tr>
            <th></th>
            <th> Item </th> 
            <th> Quantity to Receive </th> 
            <th> Quantity Received </th> 
            </tr>
          </thead>
          <tbody id = {'tbody-' + formreference}>
            {items.map((item)=>{
                
                if(parseInt(item['qtytoreceive']) !== parseInt(item['qtyreceived'])){
                   
                    return(
                      <tr >
                        <td> <div><FiAlertCircle style = {{color: 'red'}}/></div></td>
                    
                        <td> {item.item} </td>
                        <td> {item['qtytoreceive']} </td>
                        <td>  <div className="numberspinner-container">
	
	
    <input name = {item['qtytoreceive']} onChange = {handleChange} type="number" className="input"  placeholder = {item.qtyreceived}/> 
    </div>
    </td>
                      </tr>
                    )
                  }
                  else {
                    return(
                      <tr>
                        <td></td>
                        <td> {item.item} </td>
                        <td> {item['qtytoreceive']} </td>
                        <td> {item.qtyreceived} 
                        </td>
                      </tr>
                    )
                  }
            })}
          </tbody>
        </Table>
        <div className = 'form-footer'> 
            <Button onClick = {edit} className = 'bth-block' variant = "secondary" type = "submit"> <FiEdit/> Edit </Button>
          <Button onClick = {downloadpdf} className = "btn-block" variant = "primary" type = "submit" > <AiOutlineDownload/> Download PDF</Button>
        </div>
        </div>
        </div>
        </div> 
        
    </div>
   
    </div>
  )
}
