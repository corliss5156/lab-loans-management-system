 
const express = require('express')
const router = express.Router()

const {Items} = require('../models')


//Get all items
router.get('/', async(req, res)=>{
    
    
    const items = await Items.findAll()
    res.json(items)

})

router.get('/:itemname', async(req, res)=>{
    const item = await Items.findAll({
        where: {
            name: req.params.itemname
        }
    })
    res.json(item)
})

router.get('/id/:id', async(req, res)=>{
    const item = await Items.findAll({
        where: {
            id: req.params.id
        }
    })
    res.json(item)
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

//Update item 

//Update loan status

router.put('/:itemname', async(req, res)=>{
    const newitem = req.body 
    await Items.update({description: newitem.description, 
        subitems: newitem.subitems, 
        remark: newitem.remark}, {where: {
        name: req.params.itemname
    }}).catch((err)=>{
        res.json(err)
    })
    res.json({
        "name": req.params.itemname, 
        "description": newitem.description, 
        "remark": newitem.remark, 
        "subitems": newitem.subitems
    })
})

module.exports = router 