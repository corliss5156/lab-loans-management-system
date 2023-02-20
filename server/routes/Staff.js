 
const express = require('express')
const router = express.Router()
const bcrypt = require("bcrypt")
const path = require('path')
const {sign} = require('jsonwebtoken')
const validateToken = require('../middlewares/AuthMiddleware')
const {sendEmail, createAccountEmail}= require("../middlewares/EmailContext")

require("dotenv").config({path: path.resolve(__dirname,'../.env')})
//Models 

const {Staffs} = require("../models")


router.post("/", async (req, res)=>{
   
    const {email, password, priviledge}= req.body; 
    
    bcrypt.hash(password, 10).then((hash)=>{
    
        const staff =  Staffs.create({
            email: email, 
            password: hash, 
            priviledge: priviledge
        })
        .then((result)=>{
                
                createAccountEmail(process.env.EMAIL, email, password)
                res.json("Success")
        }).catch((err)=>{
            res.json(err)
        })
        // console.log(staff)
    })

})
//Reset password is used when user forgets password, an email will be sent to user's email
router.put("/resetpassword", async (req, res)=>{
    const {email, password} = req.body
   
console.log(email, password)
    
    bcrypt.hash(password, 10).then((hash)=>{
        const staff = Staffs.update({password: hash}, {where: {
            email: email
        }}).then((result)=>{  
            if(result[0]){
                res.json("Success")
                sendEmail(process.env.EMAIL, email, password)
            } else{
                res.json("Error")
            }
            
        }).catch((error)=>{
            res.json("Error")
        })
    })
})

//Change password is used to change password solely, email will not be sent to user's email 
router.put("/changepassword", async(req, res)=>{
    const {email, password} = req.body
    bcrypt.hash(password, 10).then((hash)=>{
        const staff = Staffs.update({password: hash}, {where: {
            email: email
        }}).then((result)=>{
            
            res.json(result)
        }).catch((error)=>{
            res.json(error)
        })
    })
})
router.post("/delete", async(req,res)=>{
    const {email} = req.body
    await Staffs.destroy({
        where:{
            email: email
        }
    }).then((result)=>{
        res.json(result)
    }).catch((error)=>{
        res.json(error)
    })
})
router.post("/login", async (req, res) => {
    const { email, password } = req.body;
  
    const staff = await Staffs.findOne({ where: { email:email} });
    
    if (!staff) res.json({ error: "User Doesn't Exist" });
    else{
       bcrypt.compare(password, staff.password).then((match) => {
        if (!match) res.json({ error: "Wrong Username And Password Combination" });
        else{
            const accessToken = sign({username: staff.email, id: staff.id}, "secret")
            res.json({
                accessToken:accessToken, 
                user: staff.email, 
                userType: "Staff"
            });
        }
      
    });  
    }
});


router.get("/auth", validateToken, (req, res) => {
    console.log(req.user)
    res.json(req.user)   
    
});

router.get("/", async (req, res)=>{
    const staff = await Staffs.findAll()
    res.json(staff)
})

router.get("/:username", async(req, res)=>{
    const staff = await Staffs.findAll({
        where: {
            email: req.params.username
        }
    })
    res.json(staff)
})
router.put("/:staff", async(req, res)=>{
    const {labs, priviledge} = req.body
    await Staffs.update({
        labs: labs, 
        priviledge: priviledge
    }, {
        where:{
            email: req.params.staff
        }
    })
    res.json({
        email: req.params.staff, 
        labs: labs, 
        priviledge: priviledge
    })
    
})
module.exports = router