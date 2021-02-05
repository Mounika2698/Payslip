const mongoose =require("mongoose");

 
const UsersSchema = new mongoose.Schema({
 
    user_id :
    {
        type: String,
      
    },
    user_name :
    {
        type: String,
        required : true
    },
  
    user_mobile :
    {
        type: String,
        required : true
    },
    user_designation :
    {
        type : String,
        required :true
    },
    user_pass :
    {
        type: String,
        required : true
    },
    user_confirm_pass :
    {
        type : String,
        required :true
    },
  

    createdTime : {
        type : Date,
        default : Date.now
    }    
})
module.exports = mongoose.model ("Users",UsersSchema);