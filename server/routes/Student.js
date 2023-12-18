 
const express = require('express')
const router = express.Router()
const bcrypt = require("bcrypt")
const {sign} = require('jsonwebtoken')
const validateToken = require('../middlewares/AuthMiddleware')
const {resetPasswordEmail, createAccountEmail}= require("../middlewares/EmailContext")


//Models 

const {Students} = require("../models")
const {Staffs} = require("../models")

router.post("/", async (req, res)=>{
   
    const {email, password}= req.body; 
    bcrypt.hash(password, 10).then((hash)=>{
        Students.create({
            email: email, 
            password: hash
        })
    })
    res.json("Success")

})


router.post("/login", async (req, res) => {
    const { email, password } = req.body;
  
    const student = await Students.findOne({ where: { email:email} });
    
    if (!student) res.json({ error: "User Doesn't Exist" });
    else{
       bcrypt.compare(password, student.password).then((match) => {
        if (!match) res.json({ error: "Wrong Username And Password Combination" });
        else{
            const accessToken = sign({username: student.email, id: student.id}, "secret")
            res.json({
                accessToken:accessToken, 
                user: student.email, 
                userType: "Student"
            });
        }
      
    });  
    }
   
  });

router.get("/auth", validateToken, (req, res) => {
    console.log(req.user)
    res.json(req.user)   
    
});

//Get distinct usernames 

router.get("/distinct", async(req, res)=>{
    await Students.aggregate("email", 'DISTINCT', {plain:false}).then((response)=>{
        let result =[]
        for (let i in response){
            result.push(String(response[i]['DISTINCT']).split("@")[0])
        }
        res.json(result)
    })
})


//Reset password is used when user forgets password, an email will be sent to user's email
router.put("/resetpassword", async (req, res)=>{
    const {email, password} = req.body
   
console.log(email, password)
    
    bcrypt.hash(password, 10).then((hash)=>{
        const student = Students.update({password: hash}, {where: {
            email: email
        }}).then((result)=>{  
            if(result[0]){
                res.json("Success")
                resetPasswordEmail(process.env.EMAIL, email, password)
            } else{
                res.json("Error")
            }
            
        }).catch((error)=>{
            console.log(error)
        })
    })
})

//Change password is used to change password solely, email will not be sent to user's email 
router.put("/changepassword", async(req, res)=>{
    const {email, password} = req.body
    bcrypt.hash(password, 10).then((hash)=>{
        const student = Students.update({password: hash}, {where: {
            email: email
        }}).then((result)=>{
            
            res.json(result)
        }).catch((error)=>{
            res.json(error)
        })
    })
})
module.exports = router