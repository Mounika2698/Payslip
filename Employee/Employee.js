const express = require("express");
const router = express.Router();
const EmployeeRouters = require("./EmployeeSchema");
const fileUpload = require('express-fileupload'); 


router.use(fileUpload());
//Create 
router.post("/", async(req,res) => {
  console.log("value")
    var filename 
  var files =req.files;      
      if(!files)
      {       
          filename = ''
      }  
      else
      {
        var datetimestamp = Date.now();        
        const file = req.files.photo;
        file.mv(`${__dirname}/../client/public/uploads/Employee/${datetimestamp + '.' + file.name.split('.')[file.name.split('.').length -1]}`, err => {
            if (err) {
              console.error(err);
              return res.status(500).send(err);
            } 
          })   
          filename = datetimestamp + '.' + file.name.split('.')[file.name.split('.').length -1]
      } 
     // console.log(req.body)
     try{

    var data = new EmployeeRouters({
        photo : filename,
        emp_code : req.body.emp_code,
        name : req.body.name,
        mobile : req.body.mobile,
        email : req.body.email,
        designation : req.body.designation,
        dob : req.body.dob,
        blood_group : req.body.blood_group,
        date_of_joining : req.body.date_of_joining,
        father_name : req.body.father_name,
        mother_name : req.body.mother_name,
        spouse_name : req.body.spouse_name,
        passport_number : req.body.passport_number,
        pan_number : req.body.pan_number,
        aadhar : req.body.aadhar,
        grade : req.body.grade,
        home_address : req.body.home_address
    });
    
    await data.save();
    res.json(data);
}
catch(err){
    res.status(400).json(err)

  }

})

//   router.get("/",async(req,res)=>{
//         var  data = await EmployeeRouter.find();
//         res.json(data);
//   }

//View
router.get("/:id", async(req,res)=>{
    var getData  = await EmployeeRouters.findById(req.params.id);
    res.json(getData);
      
 })  

//getAll
router.get("/",async(req,res) => {
    var findData = await EmployeeRouters.find();
    console.log("testing",  findData)
    res.json(findData);
})

//Update
router.put("/update",async(req,res) => {
    console.log(req.body)
    console.log(req)
    var filename 
    var files =req.files;
        
        if(!files)
        {
          console.log("if")
          filename = req.body.old_photo;
        }  
        else
        {
          console.log("else")
          const file = req.files.file;
          var datetimestamp = Date.now();
          file.mv(`${__dirname}/../client/public/uploads/Employee/${datetimestamp + '.' + file.name.split('.')[file.name.split('.').length -1]}`, err => {
              if (err) {
                console.error(err);
                return res.status(500).send(err);
              } 
            })   
            filename = datetimestamp + '.' + file.name.split('.')[file.name.split('.').length -1]
           // filename = file.name
        }
    var update = await EmployeeRouters.updateMany({_id:req.body._id}, {$set:{
        photo : filename,
        emp_code : req.body.emp_code,
        name : req.body.name,
        mobile : req.body.mobile,
        email : req.body.email,
        designation : req.body.designation,
        dob : req.body.dob,
        blood_group : req.body.blood_group,
        date_of_joining : req.body.date_of_joining,
        father_name : req.body.father_name,
        mother_name : req.body.mother_name,
        spouse_name : req.body.spouse_name,
        passport_number : req.body.passport_number,
        pan_number : req.body.pan_number,
        aadhar : req.body.aadhar,
        grade : req.body.grade,
        home_address : req.body.home_address
    }});

    res.json(update);
})


//delete

router.delete("/del/:id", async(req,res)=>{
    var deleteData  = await EmployeeRouters.findByIdAndRemove(req.params.id).then(e => {
        res.json({message : "Deleted Successfully"});
    })
})

  //Get All dashboard
  router.get("/recentemployee/:id",async(req,res)=>{
      console.log(req.body)
    var  GetAllData = await EmployeeRouters.find().sort({_id:-1}).limit(5);
    res.json(GetAllData);
    // console.log(GetAllData)
})

// router.get("/", (req,res) => {
//     res.json("Hi i m frm router")
// })

module.exports = router;