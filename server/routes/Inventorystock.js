 
const express = require('express')
const router = express.Router()
const { sequelize } = require('../models');

router.get("/", async(req, res)=>{
    const query = "SELECT * FROM inventorystock;"
    const inventorystock = await sequelize.query(query)
    res.json(inventorystock[0])

})
router.get("/:item", async(req, res)=>{
    const item = req.params.item
    const query = `SELECT * FROM inventorystock where name = '${item}';`
    const inventorystock = await sequelize.query(query)
    res.json(inventorystock[0])

})

module.exports = router