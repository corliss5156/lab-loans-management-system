 
const express = require('express')
const router = express.Router()

const {Reports, sequelize} = require('../models')


//Get all reports
router.get('/', async(req, res)=>{
    
    
    const reports = await Reports.findAll()
    res.json(reports)

})

//Get report by form reference 
router.get('/:formreference', async(req, res) =>{
    const formreference = req.params.formreference
    const reports = await Reports.findAll({where: {formreference: formreference}}) 
    res.json(reports)
})

//Get count of report by status 

router.get('/status/:status', async(req, res)=>{
    const status = req.params.status 
    const query = `SELECT count(*) as count from Reports where status = '${status}';`
    const reports = await sequelize.query(query)
    res.json(reports[0])
    
})

//Post report

router.post('/', async (req, res)=>{
    const report= req.body
    console.log(req.body)
    await Reports.create(report).then(()=>{
        res.json(report)
    }).catch((err)=>{
        res.json(err)
    })
    
})


module.exports = router 