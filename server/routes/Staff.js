 
const express = require('express')
const router = express.Router()
const bcrypt = require("bcrypt")
const {sign} = require('jsonwebtoken')
const validateToken = require('../middlewares/AuthMiddleware')

//Models 

const {Staffs} = require("../models")


router.post("/", async (req, res)=>{
   
    const {email, password}= req.body; 
    bcrypt.hash(password, 10).then((hash)=>{
        Staffs.create({
            email: email, 
            password: hash
        })
    })
    res.json("Success")

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
            });
        }
      
    });  
    }
   
  });

router.get("/auth", validateToken, (req, res) => {
    console.log(req.user)
    res.json(req.user)   
    
});

module.exports = router