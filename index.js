const express = require("express");
const app = express();
const mongoose = require("mongoose");
const morgan =require('morgan');
const cors =require('cors');
const bodyParser = require("body-parser");
const pdf = require("html-pdf");

//Router 
const Employee = require('./Employee/Employee');
const Users = require('./Users/Users');
const SalaryPrint = require('./SalaryPrint/SalaryPrint');
const SalaryUpdate = require('./SalaryUpdate/SalaryUpdate');

//middlewares
app.use(morgan("dev"));
app.use(express.json());
app.use(cors());

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use("/Employee",Employee);
app.use("/Users",Users);
app.use("/SalaryPrint",SalaryPrint);
app.use("/SalaryUpdate",SalaryUpdate);

//Listen port 

app.listen(4000, () => {
    console.log("Server started on 4000");
})

//db connection 
mongoose.connect("mongodb://localhost/payslip",
{ useNewUrlParser: true, useUnifiedTopology: true}, (err) => {
    if(!err)
    {
        console.log("Db connected successfully");
    }
})
