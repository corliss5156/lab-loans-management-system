 
const express = require('express')
const router = express.Router()

const {LoanFormTemplates} = require('../models')


//Get all loantemplate
router.get('/', async(req, res)=>{
    const LoanFormTemplate = await LoanFormTemplates.findAll()
    res.json(LoanFormTemplate)

})

//Get specific loantemplate
router.get('/:loanreason', async(req, res)=>{
    const loanreason = req.params.loanreason
    const LoanFormTemplate = await LoanFormTemplates.findAll({where: {
        loanreason: loanreason
    }})
    res.json(LoanFormTemplate)

})

router.post('/', async (req, res)=>{
    const loanformtemplate= req.body
    await LoanFormTemplates.create(loanformtemplate).then(()=>{
        res.json(loanformtemplate)
    }).catch((err)=>{
        res.json(err)
    })
    
})


module.exports = router 