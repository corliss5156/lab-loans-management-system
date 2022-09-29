const express = require('express')
const app = express()
const mysql = require('mysql2')
const cors = require('cors')
const bodyParser = require('body-parser')


app.use(express.json())
app.use(cors())

const db  = require("./models")

db.sequelize.sync({alter: true}).then(()=>{
    app.listen(3001, ()=> {
        console.log("Running on port 3001")
    })
})
//Routes 
const studentRouter = require("./routes/Student")
app.use("/student", studentRouter)
const loanrequestRouter = require("./routes/LoanRequest")
app.use("/loanrequest", loanrequestRouter)
const staffRouter = require("./routes/Staff")
app.use("/staff", staffRouter)
const labRouter = require("./routes/Lab")
app.use("/lab", labRouter)
const itemRouter = require("./routes/Item")
app.use("/item", itemRouter)
const loanitemRouter = require("./routes/LoanItem")
app.use("/loanitem", loanitemRouter)
app.use(bodyParser.urlencoded({extended: true}))




