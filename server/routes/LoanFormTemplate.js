 
const express = require('express')
const router = express.Router()



const {LoanFormTemplates, Sequelize} = require('../models')
const sequelize = new Sequelize({
    dialect: "mysql"
})

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

//Delete loanformteampltes 

router.post("/delete/:loanreason", async(req, res)=>{
    const loanreason = req.params.loanreason 

    await LoanFormTemplates.destroy({
        where: {
            loanreason: loanreason
        }
    })
    res.json("Successfully deleted")
})

router.get("/loanreason/distinct", async(req, res)=>{
  await LoanFormTemplates.aggregate('loanreason', 'DISTINCT', {plain:false}).then((response)=>
    {let result = []
    for (let i in response){
        result.push(response[i]['DISTINCT'])
    }
    res.json(result)}
  )
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