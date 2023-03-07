 
const express = require('express')
const router = express.Router()

const {Images} = require('../models')



//Post image
router.post('/', async (req, res)=>{
    const image = req.body
    
    await Images.create(image).then((response)=>{
        res.json(response.dataValues)
    }).catch((err)=>{
        res.json(err)
    })
    
})
//Update image based on image id 
router.put("/", async(req, res)=>{
    const image = req.body

    await Images.update({
        image: image.image}, {
            where: {
                id: image.id
            }
        }
    ).catch((err)=>{
        res.json(err)
    })
    res.json({
        image
    })
})

//Get image based on image id
router.get("/:id", async(req, res)=>{
    const image = await Images.findByPk(req.params.id)
    

    res.json(image)
})
module.exports = router 