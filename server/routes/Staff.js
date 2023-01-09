 
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
router.put("/labs/:staff", async(req, res)=>{
    const labs = req.body.labs
    await Staffs.update({
        labs: labs
    }, {
        where:{
            email: req.params.staff
        }
    })
    res.json({
        email: req.params.staff, 
        labs: labs
    })
    
})
module.exports = router