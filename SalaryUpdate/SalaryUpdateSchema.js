const mongoose =require("mongoose");

 
const SalaryUpdateSchema = new mongoose.Schema({
 
    update_salary_id :
    {
        type: String,
        required : true
    },
    update_name :
    {
        type: String,
        required : true
    },
  
    update_designation :
    {
        type: String,
        required : true
    },
    update_mobile :
    {
        type : String,
        required :true
    },
    update_basic :
    {
        type : String,
        required :true
    },
    house_allowance :
    {
        type: String,
        required : true
    },
    special_allowance :
    {
        type : String,
        required :true
    },
    grade_allowance :
    {
        type : String,
        required :true
    },
    conveyance_allowance  :
    {
        type : String,
        required :true
    },
  
  

    createdTime : {
        type : Date,
        default : Date.now
    }    
})
module.exports = mongoose.model ("SalaryUpdate",SalaryUpdateSchema);