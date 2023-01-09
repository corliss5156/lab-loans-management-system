 
const express = require('express')
const router = express.Router()
const { Op } = require("sequelize");
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

//Get stock for date range 

router.get("/:startdate/:enddate", async(req, res)=>{
    const startdate = new Date(req.params.startdate)
    const enddate = new Date(req.params.enddate)

    const stock  = await Stocks.findAll({
        where: {
            
                createdAt: {
                    [Op.between]: [startdate, enddate]
                }
                
            }
        }
    )
    if (stock.length ===0){
        res.json("No records found.")
    }else{
        res.json(stock)
    }
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


//Update stock

router.put("/increment/:lab/:itemname", async(req, res)=>{
    //Minus from available 
    await Stocks.increment(req.body.status, {
        by: req.body.qtyreceived
    , where: {
        lab: req.params.lab, 
        itemname: req.params.itemname
    }}).then(()=>{
        res.json(req.body)
        
    }).catch((err)=>{
        res.json(err)
    })
})

router.put("/decrement/:lab/:itemname", async(req, res)=>{
    //Minus from available 
    await Stocks.decrement(req.body.status, {
        by: req.body.qtyreceived
    , where: {
        lab: req.params.lab, 
        itemname: req.params.itemname
    }}).then(()=>{
        res.json(req.body)
        
    }).catch((err)=>{
        res.json(err)
    })
})