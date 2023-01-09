 
const express = require('express')
const router = express.Router()

const {Labs} = require('../models')


//Get all labs
router.get('/', async(req, res)=>{
    
    
    const labs = await Labs.findAll()
    res.json(labs)

})

//Post loan request 

router.post('/', async (req, res)=>{
    const lab= req.body
    console.log(req.body)
    await Labs.create(lab).then(()=>{
        res.json(lab)
    }).catch((err)=>{
        res.json(err.message)
    })
    
})


//Update lab

router.put("/", async(req, res)=>{
    const lab = req.body 
    const result = await Labs.update({
        staff: lab.staff
    }, {
        where: {
            lab: lab.lab
        }
    }).catch((err)=>{
        res.json(err)
    }) 
    res.json({
        "lab": lab.lab, 
        "staff": lab.staff
    })
})
module.exports = router 