 
const express = require('express')
const router = express.Router()

const {Items} = require('../models')


//Get all items
router.get('/', async(req, res)=>{
    
    
    const items = await Items.findAll()
    res.json(items)

})

//Post items

router.post('/', async (req, res)=>{
    const item= req.body
    console.log(item)
    await Items.create(item).then(()=>{
        res.json(item)
    }).catch((err)=>{
        res.json(err)
    })
    
})


module.exports = router 