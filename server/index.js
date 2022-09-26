const express = require('express')
const app = express()
const mysql = require('mysql2')
const cors = require('cors')
const bodyParser = require('body-parser')


app.use(express.json())
app.use(cors())

const db  = require("./models")

db.sequelize.sync().then(()=>{
    app.listen(3001, ()=> {
        console.log("Running on port 3001")
    })
})
//Routes 
const studentRouter = require("./routes/Student")
app.use("/student", studentRouter)


app.use(bodyParser.urlencoded({extended: true}))




