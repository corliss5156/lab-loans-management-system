 
const express = require('express')
const router = express.Router()

const {Stocks} = require('../models')

router.get('/:item', async(req, res)=>{
    
    const item = req.params.item
    const stocks = await Stocks.findAll({where: {
        item: item
    }})
    res.json(stocks)

})

router.post('/', async (req, res)=>{
    const stock= req.body
    console.log(req.body)
    await Stocks.create(stock).then(()=>{
        res.json(stock)
    }).catch((err)=>{
        res.json(stock)
    })
    
})


module.exports = router 