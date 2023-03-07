 
const express = require('express')
const router = express.Router()

const {Activities, sequelize} = require('../models')
const { Op } = require("sequelize");



//Post image
router.post('/', async (req, res)=>{
    const activity = req.body
    
    await Activities.create(activity).then((response)=>{
        res.json(response.dataValues)
    }).catch((err)=>{
        res.json(err)
    })
    
})

//Get recent activites, limit 5
router.get("/limit", async(req, res)=>{
    const activity = await Activities.findAll({
        limit: 5, 
        order: [['createdAt', 'DESC']]
    })
    res.json(activity)
})

//Get activities within specified date range
router.get("/date/:startdate/:enddate", async(req, res)=>{
    const startdate = new Date(req.params.startdate)
    const enddate = new Date(req.params.enddate)
    
    const activity = await Activities.findAll({   
        where: {
            
            createdAt: {
                [Op.between]: [startdate, enddate]
            }
            
        }
    })
   if (activity.length ===0){
    res.json("No records found.")
   }else{
    res.json(activity)
   }
})

//Delete activity within specified date range. Start date not included
router.post("/date/:startdate/:enddate", async(req, res)=>{
    const startdate = new Date(req.params.startdate)
    const enddate = new Date(req.params.enddate)
    
    await Activities.destroy({
        where: {
            
            createdAt: {
                [Op.between]: [startdate, enddate]
            }
            
        }
    })
    res.json("Successfully deleted")
})
module.exports = router 