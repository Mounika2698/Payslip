const mongoose =require("mongoose");

 
const EmployeeSchema = new mongoose.Schema({
    photo : 
    {
        type : String,        
    },
    emp_code :
    {
        type: String,
        required : true
      
    },
    name :
    {
        type: String,
        required : true
    },
    
    date_of_joining :
    {
        type : String,
        required :true
    },
    dob :
    {
        type: String,
        required : true
    },
    mobile :
    {
        type: Number,
        required : true
    },
    email :
    {
        type : String,
        required :true
    },
    blood_group :
    {
        type : String,
        required :true
    },
   
    father_name :
    {
        type: String,
        required : true         
    } ,    
    mother_name :
    {
        type : String,
        required :true
    }, 
  
    spouse_name :
    {
        type : String,
        required :true
    },

    designation :
    {
        type : String,
        required :true
    }, 
  
 
    passport_number :
    {
        type : String,
        required :true
    }, 
  
    pan_number :
    {
        type : String,
        required :true
    },
    aadhar :
    {
        type : String,
        required :true
    }, 
  
    grade :
    {
        type : String,
        required :true
    },
     
    home_address :
    {
        type : String,
        required :true
    },

    createdTime : {
        type : Date,
        default : Date.now
    }    
})
module.exports = mongoose.model ("Employee",EmployeeSchema);