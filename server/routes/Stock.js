 
const express = require('express')
const router = express.Router()

const {Stocks} = require('../models')

router.get("/", async(req,res)=>{
    const stocks = await Stocks.findAll({
    })
    res.json(stocks)
})


//Get all stock for item 
router.get('/itemname/:itemname', async(req, res)=>{

    const stocks = await Stocks.findAll({
        where: {itemname: req.params.itemname}, 
        order: ['lab']})
    res.json(stocks)

})

//Get all stock for lab
router.get("/lab/:labname", async(req, res)=>{
    const stocks = await Stocks.findAll({
        where: {lab: req.params.labname}, 
        order: ['itemid']
    })
    res.json(stocks)
})

//Get stock for item in particular lab 

router.get("/lab/itemname/:lab/:itemname", async(req, res)=>{
    const stock = await Stocks.findAll({
        where: {
            lab: req.params.lab, 
            itemname: req.params.itemname
        }
    })
    res.json(stock)
})

router.post('/', async (req, res)=>{
    const stock= req.body
    await Stocks.create(stock).then(()=>{
        res.json(stock)
    }).catch((err)=>{
        res.json(stock)
    })
    
})

router.put('/:lab/:itemname', async(req, res)=>{

    const stock = req.body 
    await Stocks.update(stock, {
        where: {
            lab: req.params.lab, 
            itemname: req.params.itemname
        }
    }).then(()=>{
        res.json(stock)
    }).catch((err)=>{
        res.json(err)
    })
})
module.exports = router 