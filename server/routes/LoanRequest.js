 
const express = require('express')
const router = express.Router()
const bcrypt = require("bcrypt")
const {sign} = require('jsonwebtoken')
const validateToken = require('../middlewares/AuthMiddleware')

const {LoanRequests} = require('../models')


//Get all loans 

//Get all loans for student 

router.get('/:email', async(req, res)=>{
    const email = req.params.email
    
    const loans = await LoanRequests.findAll({where: {borroweremail: email}})
    res.json(loans)

})

//Post loan request 

router.post('/', async (req, res)=>{
    const loanrequest = req.body
    console.log(req.body)
    await LoanRequests.create(loanrequest).then(()=>{
        res.json(loanrequest)
    }).catch((err)=>{
        res.json(err)
    })
    
})


module.exports = router