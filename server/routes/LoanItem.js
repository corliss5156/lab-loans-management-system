 
const express = require('express')
const router = express.Router()

const {LoanItems} = require('../models')


//Get all loan items
router.get('/:formreference', async(req, res)=>{
    const formreference = req.params.formreference
    const loanitems = await LoanItems.findAll({where: {
        formreference: formreference
    }})
    res.json(loanitems)
})

//Post loan request 

router.post('/', async (req, res)=>{
    const loanitem= req.body
    console.log(req.body)
    await LoanItems.create(loanitem).then(()=>{
        res.json(loanitem)
    }).catch((err)=>{
        res.json(err)
    })
    
})

//Update quantity received for item
router.put('/:formreference/item', async (req, res)=>{
    const qtyreceived = req.body.qtyreceived
    const item = req.body.item
    await LoanItems.update({qtyreceived: qtyreceived}, {where: {
        formreference: req.params.formreference, 
        item: item
    }})
    res.json(
        {
            "formreference": req.params.formreference, 
            "item": item, 
            "qtyreceived": req.body.qtyreceived
        }
    )
})


module.exports = router 