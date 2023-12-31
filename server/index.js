const express = require('express')

const app = express()
const mysql = require('mysql2')
const cors = require('cors')
const bodyParser = require('body-parser')


app.use(express.json())
app.use(cors())

const db  = require("./models")


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
const activityRouter = require("./routes/Activity")
app.use("/activity", activityRouter)
const stockRouter = require("./routes/Stock")
app.use("/stock", stockRouter)
const imageRouter = require("./routes/Image")
app.use("/image", imageRouter)
const reportRouter = require("./routes/Report")
app.use("/report", reportRouter)
const LoanFormTemplateRouter = require("./routes/LoanFormTemplate")
app.use("/loanformtemplate", LoanFormTemplateRouter)
app.use(bodyParser.urlencoded({extended: true}))

const port = process.env.PORT || 3500;
db.sequelize.sync({alter: true}).then(()=>{
    
    app.listen(port, ()=> {
        console.log("Running on port ", port)
       
    })
})