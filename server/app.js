const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const mongoogse = require('mongoose')
require('./Employee')

//route handler
app.use(bodyParser.json())

const Employee = mongoogse.model("employee")
//mongodb : dbuser -> cnq ,password -> ctWcEicu8EzdmhlY

const mongoUri = "mongodb+srv://cnq:ctWcEicu8EzdmhlY@cluster0-md8be.mongodb.net/test?retryWrites=true&w=majority"

mongoogse.connect(mongoUri, {
    useNewUrlParser:true,
    useUnifiedTopology:true
})

mongoogse.connection.on("connected", () =>{
    console.log("Connnected to mongo Yeah!!")
})

mongoogse.connection.on("error", (err) =>{
    console.log("Error!!", err)
})

app.get('/',(req,res) => {
    Employee.find({}).then(data => {
        console.log(data)
        res.send(data)
    }).catch(err => {
        console.log(err)
    })
})

app.post('/send-data',(req,res) => {
    // console.log(req.body)
    const employee = new Employee({
        name:req.body.name,
        email:req.body.email,
        phone:req.body.phone,
        picture:req.body.picture,
        salary:req.body.salary,
        position:req.body.position
    })

    employee.save()
    .then(data => {
        console.log(data)
        res.send(data)
    }).catch(err => {
        console.log(err)
    })
})

app.post('/delete',(req,res) => {
    Employee.findByIdAndRemove(req.body.id)
    .then(data => {
        console.log(data)
        res.send(data)
    }).catch(err => {
        console.log(err)
    })
})

app.post('/update', (req,res) => {
    Employee.findByIdAndUpdate(req.body.id, {
        name:req.body.name,
        email:req.body.email,
        phone:req.body.phone,
        picture:req.body.picture,
        salary:req.body.salary,
        position:req.body.position
    }).then(data => {
        console.log(data)
        res.send(data)
    }).catch(err => {
        console.log(err)
    })
})


app.listen(3000, () => {
    console.log("server running")
})