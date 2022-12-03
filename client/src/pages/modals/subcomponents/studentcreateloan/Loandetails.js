import React, {useState, forwardRef, useImperativeHandle} from 'react'
import Button from 'react-bootstrap/esm/Button'
import Form from 'react-bootstrap/Form'

const Loandetails = forwardRef(({childnavigate, loan, setloandetails, setLoanitems}, ref) => {
  const [username, setUsername] = useState(loan.borrowername)
  const [supervisoremail, setSupervisoremail] = useState(loan.supervisoremail)
  const [email, setEmail] = useState(loan.borroweremail)
  const [phonenumber, setPhonenumber] = useState(loan.phonenumber)
  const [semester, setSemester] = useState(loan.semester)
  const [groupnumber, setGroupnumber] = useState(loan.groupnumber)
  const [loanreason, setLoanreason]= useState(loan.loanreason)
  const [groupmembers, setGroupmembers] = useState(loan.groupmembers)
  
  
  
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
    setloandetails(loan)
    
  }
  
  const deleteGroupmember = (e) =>{
    console.log(e.target.parentNode.firstChild.textContent.trim())
    const newgroupmembers = groupmembers.filter((value, index, arr)=>{
      return value !== e.target.parentNode.firstChild.textContent.trim()
    })
    setGroupmembers(newgroupmembers)
  

  }

  return (
    <div className='modal-sub-page' id = 'loandetail-sub-page'>
      <Form> 
        <div className = 'flex-container'> 
          <Form.Group className = 'md md-right'> 
            <Form.Label> Username </Form.Label>
            <Form.Control onChange = {(e)=> {setUsername(e.target.value)}} placeholder = {loan.borrowername ==='' ? "Enter leader's username": username}></Form.Control>
            <Form.Text className = "text-muted"> 
            Use NTU username 
            </Form.Text>
          </Form.Group>
          <Form.Group className = 'md md-left'> 
            <Form.Label> Supervisor's email</Form.Label>
            <Form.Control type = 'email' onChange = {(e)=> {setSupervisoremail(e.target.value)}}  placeholder = {loan.supervisoremail===''? "Enter supervisor's email": loan.supervisoremail}></Form.Control>
          </Form.Group>
        </div>
        <div className = 'flex-container'> 
          <Form.Group className = 'md md-right'> 
            <Form.Label> Email</Form.Label>
            <Form.Control type = 'email' onChange = {(e)=> {setEmail(e.target.value)}} placeholder = {loan.borroweremail === ''? "Enter your email": loan.borroweremail}></Form.Control>
          </Form.Group>
          <Form.Group className = 'md md-left'> 
            <Form.Label> Phone Number</Form.Label>
            <Form.Control onChange = {(e)=> {setPhonenumber(e.target.value)}} placeholder = {loan.phonenumber === ''? "Enter your phone number": loan.phonenumber}></Form.Control>
          </Form.Group>
        </div>
        <div className = 'flex-container'>
          <div className = "smx smx-right"> 
          <Form.Label> Semester </Form.Label> 
          <Form.Select onChange = {(e)=>{setSemester(e.target.value)}} > 
            
            <option>{loan.semester ===''? "Semester": loan.semester}</option>
            <option value="1">S1</option>
            <option value="2">S2</option>
            <option value="3">S1S2</option>
          </Form.Select>
          </div>
          <Form.Group className = "smx"> 
            <Form.Label> Group Number </Form.Label>
            <Form.Control onChange = {(e)=> {setGroupnumber(e.target.value)}} placeholder = {loan.formreference === ''? "Enter your MDP group number" : loan.groupnumber} ></Form.Control>
          </Form.Group>
          <div className = 'smx smx-left'>
            <Form.Label> Loan reason </Form.Label>
            <Form.Select onChange = {(e)=>{setLoanreason(e.target.value); setLoanitems(e.target.value)}} > 
              <option> {loan.loanreason === ''?  "Loan Reason": loan.loanreason}</option>
              <option value="MDP">MDP</option>
              <option value="FYP">FYP</option>
            </Form.Select>
          </div>
        </div>
        <div id = 'groupmembers'> 
          <div> 
          <Form.Group> 
            <Form.Label> Group members </Form.Label>
            <Form.Control id = 'new-group-member' placeholder = "Enter name of group members"></Form.Control>
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

        
      </Form>
      <div className = 'form-footer'> 
        <Button onClick = {submit} className = "btn-block" variant = "primary" type = "submit"> Next </Button>
      </div>
    </div>
  )
}
) 


export default Loandetails