const mongoose = require("mongoose");


const SalaryPrintSchema = new mongoose.Schema({

    salary_emp_code:
    {
        type: String,

    },

    salary_emp_name:
    {
        type: String,
        required: true
    },
    
    salary_print_basic:
    {
        type: Number,
        required: true
    },

    salary_print_house_allowance:
    {
        type: Number,
        required: true
    },

    salary_print_special_allowance:
    {
        type: Number,
        required: true
    },

    salary_print_grade_allowance:
    {
        type: Number,
        required: true
    },

    salary_print_conveyance_allowance:
    {

        type: Number,
        required: true
    },

    no_of_working_days:
    {
        type: Number,
        required: true
    },

    no_of_present_days:
    {
        type: Number,
        required: true
    },

    actual_salary:
    {
        type: Number,
        required: true
    },

    createdTime: {
        type: Date,
        default: Date.now
    }
})
module.exports = mongoose.model("SalaryPrint", SalaryPrintSchema);