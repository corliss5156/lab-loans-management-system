 
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
        res.json(err)
    })
    
})


module.exports = router 