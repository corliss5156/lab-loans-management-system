 
const express = require('express')
const router = express.Router()
const bcrypt = require("bcrypt")
const {sign} = require('jsonwebtoken')

const { Op } = require("sequelize");
const validateToken = require('../middlewares/AuthMiddleware')

const {LoanRequests} = require('../models')


//Get loan based on formreference 
router.get('/:email/:formreference', async(req, res)=>{
    const formreference = req.params.formreference
    const loans = await LoanRequests.findAll({where: { formreference: formreference}})
    res.json(loans)

})

//Get loan between time frame
router.get('/date/:startdate/:enddate', async(req, res)=>{
    const startdate = new Date(req.params.startdate)
    const enddate = new Date(req.params.enddate)

    const loan  = await LoanRequests.findAll({
        where: {
            
                createdAt: {
                    [Op.between]: [startdate, enddate]
                }
                
            }
        }
    )
    if (loan.length ===0){
        res.json("No records found.")
    }else{
        res.json(loan)
    }
    

})
//Get distinct loan request names 

router.get("/distinct", async(req, res)=>{
    await LoanRequests.aggregate("formreference", "DISTINCT", {plain:false}).then((response)=>{
        let result = []
        for (let i in response){
            result.push(response[i]['DISTINCT'])
        }
        res.json(result)
    })
})

//Get all loans for student 

router.get('/:email', async(req, res)=>{
    const email = req.params.email
    
    const loans = await LoanRequests.findAll({where: {borroweremail: email}})
    res.json(loans)

})


router.get('/', async(req, res)=>{
    
    
    const loans = await LoanRequests.findAll()
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

//Update loan status

router.put('/status/:formreference', async(req, res)=>{
    const newstatus = req.body.status
    await LoanRequests.update({status: newstatus}, {where: {
        formreference: req.params.formreference
    }})
    res.json({
        "formreference": req.params.formreference, 
        "status": newstatus
    })
})
  
router.put('/returndate/:formreference', async(req, res)=>{
    const newreturndate = req.body.returndate
    await LoanRequests.update({returndate: newreturndate}, {where: {
        formreference: req.params.formreference
    }})
    res.json({
        "formreference": req.params.formreference, 
        "returndate": newreturndate
    })
})

//Update remark 

router.put("/remark/:formreference", async(req, res)=>{
    const loanrequest = await LoanRequests.update({
        remark: req.body.remark
    }, {
        where: {
            formreference: req.params.formreference
        }
    })
    res.json(loanrequest)
})
  
module.exports = router