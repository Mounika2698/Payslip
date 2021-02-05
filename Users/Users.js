const express = require("express");
const router = express.Router();
const UsersRouter = require("./UsersShema");


var bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const app = express();

JSON.stringify()

//Create 
router.post("/", async(req,res) => {
    try{
    var hash =  await bcrypt.hash(req.body.user_pass,10);
    var data = new UsersRouter({
        
        user_id : req.body.user_id,
        user_name : req.body.user_name,
        user_mobile : req.body.user_mobile,
        user_designation : req.body.user_designation,
        user_pass : hash,
        user_confirm_pass : req.body.user_confirm_pass,
        
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
//   })
  

router.get("/Pages_login/:user_id/:user_pass",async(req,res)=>{
    try{
     // var   validPassword =await bcrypt.compare( req.params.password)  
      
      var userData=await UsersRouter.findOne({user_id:req.params.user_id});
     // console.log(userData)
      
      if(userData === 'null' || !userData)
      {      
         return   res.status(400).json("Email Id is not Valid")
      }
      var  password = req.params.user_pass;

    //   console.log("passwordchecking",password)
      var validPassword= await bcrypt.compare(password, userData.password)
      if(validPassword=== 'null' || !validPassword) {
        return res.status(400).json("Password is not Matched")      
      } 
      var userToken =await jwt.sign({user_id:userData.user_id},'test'); 
     //  console.log("token",userToken)
   
     
     res.header('auth',userToken).json(userToken);
      
    }
    catch(err){
      res.status(400).json(err) 
    }
  })

//View
router.get("/:id", async(req,res)=>{
    var getData  = await UsersRouter.findById(req.params.id);
    res.json(getData);
      
 })  

//getAll
router.get("/",async(req,res) => {
    var findData = await UsersRouter.find();
    res.json(findData);
})

//Update

router.put("/",async(req,res) => {
    var PassID =req.body.passID;
    var ID = req.body._id;
    console.log(PassID);
    console.log(ID);
    if(ID!=='undefined')
    {
        var hash =  await bcrypt.hash(req.body.user_pass,10);
    var update = await UsersRouter.update({id:req.body._id}, {$set:{
        user_id : req.body.user_id,
        user_name : req.body.user_name,
        user_mobile : req.body.user_mobile,
        user_designation : req.body.user_designation,
        user_pass : hash,
        user_confirm_pass : req.body.user_confirm_pass,
    }});
}

if(PassID!='')
{
    console.log("hello i am else")
    var update = await UsersRouter.updateOne({_id:PassID}, { $set :{
    status :  req.body.status      
}});
}

console.log(update)
    res.json(update);
})

const validUser =(req,res,next) =>{
    var token = req.header('auth');
    console.log("token",token)
    req.token = token;
   
    next();
  }
  
router.get("/",async(req,res)=>{
    var  data = await UsersRouter.find();
    res.json(data);
})

//get details
router.get("/GetEmployeeDetails/:user_id/:user_pass",async(req,res)=>{
    var userData=await UsersRouter.findOne({user_id:req.params.user_id});
    var  password = req.params.user_pass;
    var validPassword= await bcrypt.compare(password, userData.password)
    console.log(validPassword)
    if(validPassword)
    {
      console.log(userData._id)
      res.json(userData._id );
    }
   
  })
//advance status
router.put("/advanceupdate", async(req,res) => {    
    
    var PassID =req.body.PassID;
    var update = await UsersRouter.updateOne({_id:PassID}, { $set :{
        advance_status :  req.body.advance_status      
}}); 
    res.json(update);
})

 
//delete

router.delete("/del/:id", async(req,res)=>{
    var deleteData  = await UsersRouter.findByIdAndRemove(req.params.id).then(e => {
        res.json({message : "Deleted Successfully"});
    })
})

router.get("/", (req,res) => {
    res.json("Hi i m frm router")
})

module.exports = router;