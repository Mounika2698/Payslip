const express = require("express");
const router = express.Router();
const SalaryPrintRouters = require("./SalaryPrintSchema");
const pdf = require('html-pdf');


const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];
const month = new Date();
var year = new Date().getFullYear();

//const pdfTemplate = require( __dirname ,'/documents/module');
const pdfTemplate= ({salary_emp_code,salary_emp_name,salary_print_basic,logo,salary_print_conveyance_allowance, salary_print_grade_allowance, salary_print_special_allowance, salary_print_house_allowance,actual_salary, no_of_present_days,  no_of_working_days }) => {

    const today = new Date();
    
   //  PaymentDetails.map(AmtPay=>
    
   //  //amount.push({
   //    date = AmtPay.PaymentDates,
   //    amt = AmtPay.PaymentAmts 
   // // }),

   //  )
   //  console.log(amt);
    
return table=`
<!doctype html
<html>
   <head>
      <meta charset="utf-8">
      <title>PDF Result Template</title>
      <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
      <style>
         .invoice-box {
         max-width: 800px;
         padding: 30px;
         font-size: 16px;
         line-height: 24px;
         font-family: 'Helvetica Neue', 'Helvetica',
         color: #555;
         height: 300px;
         }
         .logo{
             align: center;
         }
          .date{
            float: right;
         }
        .detail{
         padding-top: 50px;
        }
     
        table , tr, td{
            text-align: left;
         
        }
         
        .text{
            text-align: center;
        }
        .txt1{
            font
        }
        
      </style>
   </head>
   <body>
      <div class="invoice-box">
         <div class="logo">
         <img src=${logo} alt="logo">
         <br>
         <br>
         <h5 class="text">PAYSLIP FOR THE MONTH  ${monthNames[month.getMonth()] + '-' + year} </h5>
         </div>
       
       <div class="detail">
            <h6><span> <strong>Date:</strong> </span>  ${`${today.getDate()}-${today.getMonth() + 1}-${today.getFullYear()}`}</h6>
            <h6><span> <strong>Employee Name :</strong> </span> ${salary_emp_name}</h6>
            
         </div>
         </div>
         <div class="table">
            <table class="table table-bordered center">
            <thead>
                <div class="col-6">
                <th> EARNING </th>
                <th> AMOUNT </th>
                <tr>
            <th>SPECIAL ALLOWANCE</th>
            <td> ${salary_print_special_allowance}</td>
          </tr>
          <tr>
            <th>HOUSE ALLOWANCE</th>
            <td>${salary_print_house_allowance}</td>
          </tr>
          
            </tr>
            <tr>
            <th>GRADE ALLOWANCE</th>
            <td>${salary_print_grade_allowance}</td>
          </tr>
          <tr>
          <th>CONVEYANCE ALLOWANCE</th>
          <td>${salary_print_conveyance_allowance}</td>
          </tr>
          <tr>
         <th>WORKING DAYS</th>
            <td>${no_of_working_days}</td>
         </tr>
         <tr>
         <th>PRESENT DAYS</th>
         <td>${no_of_present_days}</td> 
           </tr>

           <tr>
           <th>TOTAL EARNINGS </th>
         <td >${actual_salary}</td>
         
           </tr>
         </div>
        
      </thead>
      
         </div>
       
      </div>
   </body>
</html>
    `;
};


//print post 

router.post('/create-pdf', (req, res) => {
    pdf.create(pdfTemplate(req.body), {}).toFile(`${__dirname}/result.pdf`, (err) => {
        if(err) {
            res.send(Promise.reject());
        }
        res.send(Promise.resolve());
    });
});

//print
router.get("/:id", async(req,res)=>{
    var getData  = await SalaryPrintRouters.findById(req.params.id);  
     res.json(getData);  
 })

 router.get("/printID/:id", async(req,res)=>{
   //  var getData  = await PaymentRouter.find({traineID: req.params.id});
    res.sendFile(`${__dirname}/result.pdf`);
 })
 router.get("/:id", async(req,res)=>{
    var getData  = await PaymentRouter.findById(req.params.id);
    res.json(getData);      
 })

//Create 
router.post("/", async(req,res) => {
    console.log(req.body)
   
    var data = new SalaryPrintRouters({
        
        salary_emp_code : req.body.salary_emp_code,
        salary_emp_name : req.body.salary_emp_name,
        salary_print_basic : req.body.salary_print_basic,
        salary_print_house_allowance : req.body.salary_print_house_allowance,
        salary_print_special_allowance : req.body.salary_print_special_allowance,
        salary_print_grade_allowance : req.body.salary_print_grade_allowance,
        salary_print_conveyance_allowance : req.body.salary_print_conveyance_allowance,
        actual_salary : req.body.actual_salary,
        no_of_working_days : req.body.no_of_working_days,
        no_of_present_days : req.body.no_of_present_days
        
    });
    await data.save();
    res.json(data);
}
)

//   router.get("/",async(req,res)=>{
//         var  data = await EmployeeRouter.find();
//         res.json(data);
//   })
  
//View
router.get("/:id", async(req,res)=>{
    var getData  = await SalaryPrintRouters.findById(req.params.id);
    res.json(getData);
      
 })  
 
  //Search Email
router.get("/SearchEmail/:email", async(req,res)=>{
    var getData  = await SalaryPrintRouters.find({email:req.params.email });
    res.json(getData);      
 })

//getAll
router.get("/",async(req,res) => {
    var findData = await SalaryPrintRouters.find();
    res.json(findData);
})

//Update

router.put("/update",async(req,res) => {
    var update = await SalaryPrintRouters.update({_id:req.body._id}, {$set:{

        salary_emp_code : req.body.salary_emp_code,
        salary_emp_name : req.body.salary_emp_name,
        salary_print_basic : req.body.salary_print_basic,
        salary_print_house_allowance : req.body.salary_print_house_allowance,
        salary_print_special_allowance : req.body.salary_print_special_allowance,
        salary_print_grade_allowance : req.body.salary_print_grade_allowance,
        salary_print_conveyance_allowance : req.body.salary_print_conveyance_allowance,
        actual_salary : req.body.actual_salary,
        no_of_working_days : req.body.no_of_working_days,
        no_of_present_days : req.body.no_of_present_days
    }});

    res.json(update);
})

//delete

router.delete("/del/:id", async(req,res)=>{
    var deleteData  = await SalaryPrintRouters.findByIdAndRemove(req.params.id).then(e => {
        res.json({message : "Deleted Successfully"});
    })
})

 //Get All dashboard
 router.get("/recentpayslip/:id",async(req,res)=>{
    console.log(req.body)
  var  getAllData = await SalaryPrintRouters.find().sort({_id:-1}).limit(5);
  res.json(getAllData);
  console.log(getAllData)
})


router.get("/", (req,res) => {
    res.json("Hi i m frm router")
})

module.exports = router;