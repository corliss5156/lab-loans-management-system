import React, {useState, forwardRef, useImperativeHandle, useEffect} from 'react'
import {useForm} from 'react-hook-form'
//Boostrap 
import Button from 'react-bootstrap/esm/Button'
import Form from 'react-bootstrap/Form'

//Backend
import axios from 'axios'
import ENV from '../../../../config.js'; 

const API_HOST = ENV.api_host;

const Loandetails = forwardRef(({childnavigate, loan, setloandetails, setLoanitems}, ref) => {
  const [username, setUsername] = useState(loan.borrowername)
  const [supervisoremail, setSupervisoremail] = useState(loan.supervisoremail)
  const [email, setEmail] = useState(loan.borroweremail)
  const [phonenumber, setPhonenumber] = useState(loan.phonenumber)
  const [semester, setSemester] = useState(loan.semester)
  const [groupnumber, setGroupnumber] = useState(loan.groupnumber)
  const [loanreason, setLoanreason]= useState(loan.loanreason)
  const [lab, setLab] = useState(loan.lab)
  const [labOptions, setLabOptions] = useState([])
  const [groupmembers, setGroupmembers] = useState(loan.groupmembers)
  
  const { register, handleSubmit, formState: { errors } } = useForm();

  useEffect(()=>{
    //Get all labs
    axios.get(API_HOST+'/lab').then((response)=>{
      setLabOptions(response.data)

    })

  }, [])
  
  const addMember = () =>{
    const text = document.getElementById('new-group-member').value
    setGroupmembers([...groupmembers, text])
   
  }
  useImperativeHandle(
    ref,
    () => ({
      
      submit(){
         
          loan.borrowername = username
          loan.supervisoremail = supervisoremail
          loan.borroweremail = email
          loan.phonenumber = phonenumber
          loan.semester = semester
          loan.groupnumber = groupnumber
          loan.loanreason = loanreason
          loan.lab = lab
          loan.groupmembers = groupmembers
          setloandetails(loan) 
      },
     
    })
    
  )
  const submit = () => {
    const year = new Date().getFullYear().toString()
    childnavigate('2')
    loan.formreference = loanreason + year + semester + "G" + groupnumber
    loan.borrowername = username
    loan.supervisoremail = supervisoremail
    loan.borroweremail = email
    loan.phonenumber = phonenumber
    loan.semester = semester 
    loan.groupnumber = groupnumber
    loan.loanreason = loanreason
    loan.groupmembers = groupmembers
    loan.lab = lab
    setloandetails(loan)
    
  }
  
  const deleteGroupmember = (e) =>{
    const newgroupmembers = groupmembers.filter((value, index, arr)=>{
      return value !== e.target.parentNode.firstChild.textContent.trim()
    })
    setGroupmembers(newgroupmembers)
  

  }
  const onSubmit = (data, e) =>{
    submit()
  }
  const onError = (errors, e) => console.log(errors, e);

  return (
    <div className='modal-sub-page' id = 'loandetail-sub-page'>
      <Form onSubmit={handleSubmit(onSubmit, onError)}> 
        <div className = 'flex-container'> 
          <Form.Group className = 'md md-right'> 
            <Form.Label> Username </Form.Label>
            <Form.Control 
            {...register("username", {required: true})}
             onChange = {(e)=> {setUsername(e.target.value)}} placeholder = {loan.borrowername ==='' ? "Enter leader's username": username}></Form.Control>
            <Form.Text className = "text-muted"> 
            Use NTU username 
            </Form.Text>
            {errors.username && <Form.Text className = "error"><br></br>Required</Form.Text>}
          </Form.Group>
          <Form.Group className = 'md md-left'> 
            <Form.Label> Supervisor's email</Form.Label>
            <Form.Control 
            {...register("supervisoremail", {required: true})}
            type = 'email' onChange = {(e)=> {setSupervisoremail(e.target.value)}}  placeholder = {loan.supervisoremail===''? "Enter supervisor's email": loan.supervisoremail}></Form.Control>
            {errors.supervisoremail && <Form.Text className = "error">Required</Form.Text>}
          </Form.Group>
          
        </div>
        <div className = 'flex-container'> 
          <Form.Group className = 'md md-right'> 
            <Form.Label> Lab </Form.Label>
            <Form.Select {...register("lab", {required: true, 
            validate: {
              selectlab: v=>{
                return v !== "Lab" || "Please select lab."
              }
            }
          })} onChange = {(e)=>{setLab(e.target.value)}} >
              <option>{loan.lab ===""? "Lab": loan.lab}</option> 
              {labOptions.map((lab)=>{
                return(<option value = {lab.lab} key = {lab.lab + "-option"}> {lab.lab} </option> )
                
              })}
            </Form.Select>
            {errors.lab && <Form.Text className = "error">Required</Form.Text>}
          </Form.Group>
          <Form.Group className = 'md md-left'> 
            <Form.Label> Phone Number</Form.Label>
            <Form.Control {...register("phonenumber", {required: true})} onChange = {(e)=> {setPhonenumber(e.target.value)}} placeholder = {loan.phonenumber === ''? "Enter your phone number": loan.phonenumber}></Form.Control>
            {errors.phonenumber && <Form.Text className = "error">Required</Form.Text>}
          </Form.Group>
        </div>
        <div className = 'flex-container'>
          <div className = "smx smx-right"> 
          <Form.Label> Semester </Form.Label> 
          <Form.Select {...register("semester", {required: true})}  onChange = {(e)=>{setSemester(e.target.value)}} > 
            
            <option>{loan.semester ===''? "Semester": loan.semester}</option>
            <option value="1">S1</option>
            <option value="2">S2</option>
            <option value="3">S1S2</option>
          </Form.Select>
          {errors.semester && <Form.Text className = "error">Required</Form.Text>}
          </div>
          <Form.Group className = "smx"> 
            <Form.Label> Group Number </Form.Label>
            <Form.Control {...register("groupnumber", {required: true})}   onChange = {(e)=> {setGroupnumber(e.target.value)}} placeholder = {loan.formreference === ''? "Enter your MDP group number" : loan.groupnumber} ></Form.Control>
            {errors.groupnumber && <Form.Text className = "error">Required</Form.Text>}
          </Form.Group>
          <div className = 'smx smx-left'>
            <Form.Label> Loan reason </Form.Label>
            <Form.Select {...register("loanreason", {required: true})} 
            onChange = {(e)=>{setLoanreason(e.target.value); setLoanitems(e.target.value)}} > 
              <option> {loan.loanreason === ''?  "Loan Reason": loan.loanreason}</option>
              <option value="MDP">MDP</option>
              <option value="FYP">FYP</option>

            </Form.Select>
            {errors.loanreason && <Form.Text className = "error">Required</Form.Text>}
          </div>
        </div>
        <div id = 'groupmembers'> 
          <div> 
          <Form.Group> 
            <Form.Label> Group members </Form.Label>
            <Form.Control  id = 'new-group-member' placeholder = "Enter name of group members"></Form.Control>
            <Button onClick = {addMember} variant = 'outline-secondary'> + Add member</Button>
          </Form.Group>
          </div>
          {groupmembers.length > 0 ? groupmembers.map((value, key)=>{
            
            return(
             
              <div className = 'group-member' key = {key}>
                <p>{value}</p> <a onClick = {deleteGroupmember} className="remove-image" href="#" >&#215;</a>
              </div> 
            )
          }) : null}
        </div>

        <div className = 'form-footer'> 
          <Button  className = "btn-block" variant = "primary" type = "submit"> Next </Button>
        </div>
      </Form>
      
    </div>
  )
}
) 


export default Loandetails