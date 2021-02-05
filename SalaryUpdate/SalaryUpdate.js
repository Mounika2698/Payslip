const express = require("express");
const router = express.Router();
const SalaryUpdateRouters = require("./SalaryUpdateSchema");


//Create 
router.post("/", async(req,res) => {
   
    var data = new SalaryUpdateRouters({
        
        update_salary_id : req.body.update_salary_id,
        update_name : req.body.update_name, 
        update_designation : req.body.update_designation,
        update_mobile : req.body.update_mobile,
        update_basic : req.body.update_basic,
        house_allowance : req.body.house_allowance,
        special_allowance : req.body.special_allowance,
        grade_allowance : req.body.grade_allowance,
        conveyance_allowance : req.body.conveyance_allowance
    
        
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
    var getData  = await SalaryUpdateRouters.findById(req.params.id);
    res.json(getData);
      
 })  

//getAll
router.get("/",async(req,res) => {
    var findData = await SalaryUpdateRouters.find();
    res.json(findData);
})

//Update

router.put("/update",async(req,res) => {
    // console.log(req.body)

    var updates = await SalaryUpdateRouters.updateMany({_id:req.body._id}, {$set:{
      
        update_salary_id : req.body.update_salary_id,
        update_name : req.body.update_name,
        update_designation : req.body.update_designation,
        update_mobile : req.body.update_mobile,
        update_basic : req.body.update_basic,
        house_allowance : req.body.house_allowance,
        special_allowance : req.body.special_allowance,
        grade_allowance : req.body.grade_allowance,
        conveyance_allowance : req.body.conveyance_allowance
    }});

    res.json(updates);
})

//delete

router.delete("/del/:id", async(req,res)=>{
    var deleteData  = await SalaryUpdateRouters.findByIdAndRemove(req.params.id).then(e => {
        res.json({message : "Deleted Successfully"});
    })
})

router.get("/", (req,res) => {
    res.json("Hi i m frm router")
})

module.exports = router;