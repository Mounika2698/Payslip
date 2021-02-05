import React, { Component } from 'react';
import AUX from '../../../hoc/Aux_';
import { Link } from 'react-router-dom';
import { Dropdown, Button, DropdownToggle, DropdownMenu, DropdownItem, ButtonGroup } from 'reactstrap';
import axios from 'axios';
import { timers } from 'jquery';
import { saveAs } from 'file-saver';
import logo from './images/logo.png';


const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];
const month = new Date();
var year = new Date().getFullYear();

let loggedIn = false
const initialState = {
    _id: "",
    salary_emp_code: '',
    salary_emp_name: '',
    salary_print_basic:"",
    salary_print_special_allowance:"",
    salary_print_house_allowance:"",
    salary_print_grade_allowance:"",
    salary_print_conveyance_allowance:"",
    no_of_working_days: '',
    no_of_present_days: '',
    actual_salary: "",
    dataEmployeeCode:"",
    dataUpdateSalary:"",
    total:"",
    value: [],
    isEdit:"",
    data: [],
    dataViewpdf:[],
    loggedIn: "",
    Edit_Id: "",
    result:"",
    message: "",
    msg: "",
    datacode: [],
    dataEmp:"",
    datas: [],
    code_msg: "",
    Actual_salaries:[],

    menu: ""

}

var data ='';

class AddSalary extends Component {
    state= initialState;
    constructor(props) {
        super(props);
    

}


ActualSalary =()=>{
    var total_salary = (Number(this.state.salary_print_basic) + Number(this.state.salary_print_conveyance_allowance) + Number(this.state.salary_print_grade_allowance) + Number(this.state.salary_print_house_allowance) + Number(this.state.salary_print_special_allowance));
    var oneday_salary = (total_salary) / Number(this.state.no_of_working_days);
    var actual_salarys = oneday_salary * Number(this.state.no_of_present_days);
    this.setState({
        Actual_salaries: actual_salarys.toFixed(2)
        
    })
   

}


//print
createAndDownloadPdf = data => {
 
    axios.get(`http://localhost:4000/SalaryPrint/${data._id}`).then(res => {
        this.setState({
          dataViewpdf :res.data
        
      }) 

      console.log("aacheck", res.data )

    data = 
    {         
             
       salary_emp_code : this.state.dataViewpdf.salary_emp_code,
                           salary_emp_name : this.state.dataViewpdf.salary_emp_name,
                           no_of_present_days : this.state.dataViewpdf.no_of_present_days,
                           no_of_working_days : this.state.dataViewpdf.no_of_working_days,
                           salary_print_basic : this.state.dataViewpdf.salary_print_basic,
                           salary_print_house_allowance : this.state.dataViewpdf.salary_print_house_allowance,
                           salary_print_special_allowance : this.state.dataViewpdf.salary_print_special_allowance,
                           salary_print_grade_allowance : this.state.dataViewpdf.salary_print_grade_allowance,
                           salary_print_conveyance_allowance : this.state.dataViewpdf.salary_print_conveyance_allowance,
                           actual_salary : this.state.dataViewpdf.actual_salary,
                           logo : logo,
   
    } 
    console.log("getValues", data)

 axios.post("http://localhost:4000/SalaryPrint/create-pdf", data).then(res => {   
  
})
 

.then(() => axios.get(`http://localhost:4000/SalaryPrint/printID/12`, { responseType: 'blob' }))
.then((res) => {
  window.location.reload(false);
 const pdfBlob = new Blob([res.data], { type: 'application/pdf' });

 saveAs(pdfBlob, `${this.state.dataViewpdf.salary_emp_name}.pdf`);
})
})  
}


//print
// createAndDownloadPdf = () => {
//     data = 
//     {               
//        salary_emp_code: this.state.data.salary_emp_code,
//                            salary_emp_name: this.state.data.salary_emp_name,
//                            salary_print_basic : this.state.data.salary_print_basic,
//                            salary_print_house_allowance : this.state.data.salary_print_house_allowance,
//                            salary_print_special_allowance : this.state.data.salary_print_special_allowance,
//                            salary_print_grade_allowance : this.state.data.salary_print_grade_allowance,
//                            salary_print_conveyance_allowance : this.state.data.salary_print_conveyance_allowance,
//                            actual_salary : this.state.data.Actual_salaries,
   
//     } 
//     console.log("getValues", data)

//  axios.post("http://localhost:4000/SalaryPrint/create-pdf", data).then(res => {   
  
// })
 

// .then(() => axios.get(`http://localhost:4000/SalaryPrint/printID/12`, { responseType: 'blob' }))
// .then((res) => {
//   window.location.reload(false);
//  const pdfBlob = new Blob([res.data], { type: 'application/pdf' });

//  saveAs(pdfBlob, `${this.state.data.salary_emp_name}.pdf`);
// })


// }


    salaryprint_Add = event => {
        event.preventDefault();
        // this.setState({
        //     total: parseInt(this.state.salary_print_basic)+ parseInt(this.state.salary_print_grade_allowance)
        //  })
        
        if (!this.state.Edit_Id) 
        {
            console.log("inside_2")
            let data = {
                                
                        salary_emp_code: this.state.salary_emp_code,
                        salary_emp_name: this.state.salary_emp_name,
                        salary_print_basic : this.state.salary_print_basic,
                        salary_print_house_allowance : this.state.salary_print_house_allowance,
                        salary_print_special_allowance : this.state.salary_print_special_allowance,
                        salary_print_grade_allowance : this.state.salary_print_grade_allowance,
                        salary_print_conveyance_allowance : this.state.salary_print_conveyance_allowance,
                        actual_salary : this.state.Actual_salaries,
                        no_of_working_days: this.state.no_of_working_days,
                        no_of_present_days: this.state.no_of_present_days
        
            } 
            console.log("get data salary", this.state.Actual_salaries)
            console.log("get data", data)
            axios.post("http://localhost:4000/SalaryPrint", data).then(res => {
                 this.props.history.push("/Salary_print") 
                this.getAll();
                
            })
            console.log("checking_2",data )
        }

        else {
            let data = {
                _id: this.state._id,
                salary_emp_code: this.state.salary_emp_code,
                        salary_emp_name: this.state.salary_emp_name,
                        salary_print_basic : this.state.salary_print_basic,
                        salary_print_house_allowance : this.state.salary_print_house_allowance,
                        salary_print_special_allowance : this.state.salary_print_special_allowance,
                        salary_print_grade_allowance : this.state.salary_print_grade_allowance,
                        salary_print_conveyance_allowance : this.state.salary_print_conveyance_allowance,
                        actual_salary : this.state.Actual_salaries,
                        no_of_working_days: this.state.no_of_working_days,
                        no_of_present_days: this.state.no_of_present_days
        
            }                 
            axios.put("http://localhost:4000/SalaryPrint/update", data).then(res => {
                this.props.history.push("/Salary_print")
                localStorage.removeItem('SalaryPrintEdit') 
                this.props.history.push("/Salary_print")
                this.getAll();
               
            })

          
        }
    }

    getUpdateSalary(){
         axios.get("http://localhost:4000/SalaryUpdate").then(res => {
            // console.log(res.data);
            this.setState({
                dataUpdateSalary: res.data
            })
            
        })
    }
    
    setSalaryData = (id) => {
        this.setState({
            salary_emp_code: id.target.value,
        });
        console.log('fee-->', this.state.dataUpdateSalary);
        this.state.dataUpdateSalary.map((item, key) => {
            console.log('item--->', item.update_salary_id, id.target.value);
            if (item.update_salary_id === id.target.value) {
                // console.log('same--->', id, item.update_name);
                // console.log('same--->', id, item.update_basic);
                // console.log('same--->', id, item.house_allowance);
                // console.log('same--->', id, item.special_allowance);
                // console.log('same--->', id, item.grade_allowance);
                // console.log('same--->', id, item.conveyance_allowance);
                this.setState({
                    salary_emp_name: item.update_name,
                    salary_print_basic: item.update_basic,
                    salary_print_house_allowance: item.house_allowance,
                    salary_print_special_allowance: item.special_allowance,
                    salary_print_grade_allowance: item.grade_allowance,
                    salary_print_conveyance_allowance: item.conveyance_allowance,
                });
            }
        });
    }

    // setActualSalary = (id) => {
    //     this.setState({
    //         actual_salary: id.target.value,
    //     });
        
    //     this.state.Actual_salary.map((item, key) => {
    //         if (item.update_salary_id === id.target.value) {
    //             // console.log('same--->', id, item.update_name);
    //             // console.log('same--->', id, item.update_basic);
    //             // console.log('same--->', id, item.house_allowance);
    //             // console.log('same--->', id, item.special_allowance);
    //             // console.log('same--->', id, item.grade_allowance);
    //             // console.log('same--->', id, item.conveyance_allowance);
    //             this.setState({
    //                 actual_salary: item.Actual_salary,
                  
    //             });
    //         }
    //     });
    // }



    sendEmail = data => {
       axios.get(`http://localhost:4000/Employee/${data._id}`).then(res => {
           this.setState({
               dataEmp:res.data
           })
           console.log("dataEMP", this.state.dataEmp)
           this.getAll();
       })
    }



componentDidMount(props) {
    this.getAll();
    this.getUpdateSalary()
    const Edit_Id = localStorage.getItem('SalaryPrintEdit')
    this.setState({
      Edit_Id
    })

    axios.get(`http://localhost:4000/SalaryPrint/${Edit_Id}`).then(res => {
    
      this.setState({
                data : res.data,
                _id : res.data._id, 
                salary_emp_code : res.data.salary_emp_code, 
                salary_emp_name : res.data.salary_emp_name, 
                salary_print_basic : res.data.salary_print_basic, 
                salary_print_house_allowance : res.data.salary_print_house_allowance, 
                salary_print_special_allowance : res.data.salary_print_special_allowance, 
                salary_print_grade_allowance : res.data.salary_print_grade_allowance,
                salary_print_conveyance_allowance : res.data.salary_print_conveyance_allowance,
                actual_salary : res.data.Actual_salaries,
                no_of_working_days : res.data.no_of_working_days,
                no_of_present_days : res.data.no_of_present_days,
               
      })
    }) 
    if(Edit_Id)
    {
         this.setState({
          menu :'Edit User'
        })
    }
    else
    {
        this.setState({
          menu :'Add User'
        })
    }
}
getAll() {
    axios.get("http://localhost:4000/SalaryPrint").then(res => {
        
        this.setState({
            data: res.data
        })
        console.log("getall",this.state.data)
        
    })
    
  axios.get(`http://localhost:4000/Employee`).then(res => {
      this.setState({
          dataEmp:res.data
      })
      console.log("dataemployee", this.state.dataEmp)
  })
}

change = event => {
    const { name, value } = event.target;
    this.setState({
        [name]: value
    })
    console.log("names", this.state.no_of_working_days)
}

    render() {
        const star = {
            color: "red"
        }
     
        // const ram = this.state.data.length;
        // trainingcon = this.state.data.map((SalaryPrint, index) =>{
        //     totalSalary = 0
        //     return(
               
             
        //              <div key={SalaryPrint._id}>
        //              {total = 0, 
        //                  SalaryPrint.amount.map(part => {
        //                      total += part.PaymentAmt;
        //                  }
        //                  )}
        //               <div style={{display:'none'}}>  {total += SalaryPrint.salary_print_conveyance_allowance}</div>
        //            <div style={{display:'none'}}>  {totalSalary += (total)} </div>
 
        //          </div>
        //     )
        // })


        // Amounts_Acut = this.state.data.map((Amout)=>{
        //     if(Amout){
        //         return(
        //             <div>
        //                 <p>{Amout.salary_print_grade_allowance}</p>
        //             </div>
        //         )
        //     }
        // })

        return (
            <AUX>
                <div className="wrapper">
                    <div className="container-fluid">

                        <div className="row">
                            <div className="col-sm-12">
                                <div className="page-title-box">

                                    <h4 className="page-title">Add Salary</h4>
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-lg-12">
                                <div className="card m-b-20">
                                    <div className="card-body">
                                    <div style={{ marginTop: "-5px" }} >
                               
                               <Link to="/Salary_print" onClick={ ()=>localStorage.removeItem('SalaryPrintEdit') } className="btn btn-primary float-right">View List</Link>
                           </div>
                           <br/><br/>
                                    <form  onSubmit={this.salaryprint_Add} >
                                            <div class="row">

                                                <div class="col-3">
                                                    <div className="form-group">
                                                        <label>Employee Code<span style={{ color: "red" }}>*</span></label>
                                                        <select name="user_id" value={this.state.user_id} onChange={this.setSalaryData} className="form-control" >

<option selected>Select</option>
{
    (
        this.state.dataUpdateSalary.length > 0 ?

            this.state.dataUpdateSalary.map((SalaryUpdate, index) =>

                <option value={SalaryUpdate.update_salary_id}>{SalaryUpdate.update_salary_id}</option>
            ) :
            (
                <option value="1">No</option>
            )
    )
}

</select>
                                                        {/* <span id="err" style={{ color: "red" }}>{this.state.emp_code_err}</span> */}
                                                    </div>
                                                </div>
                                                <div class="col-3">
                                                    <div className="form-group">
                                                        <label>Name</label>
                                                        <input type="text" className="form-control"
                                                         value={this.state.salary_emp_name}
                                                         disabled
                                                          onChange={this.change} 
                                                          name="salary_emp_name"
                                                          placeholder="Enter Mobile" />
                                                        {/* <span id="err" style={{ color: "red" }}>{this.state.mobile_err}</span> */}
                                                    </div>
                                                </div>

                                                <div class="col-3">
                                                    <div className="form-group">
                                                        <label>Basic</label>
                                                        <input type="text" className="form-control"
                                                         value={this.state.salary_print_basic}
                                                         disabled
                                                          onChange={this.change} 
                                                          name="salary_print_basic"
                                                          placeholder="Enter Mobile" />
                                                        {/* <span id="err" style={{ color: "red" }}>{this.state.mobile_err}</span> */}
                                                    </div>
                                                </div>
                                                <div class="col-3">
                                                    <div className="form-group">
                                                        <label>House Rent Allowance</label>
                                                        <input type="text" className="form-control"
                                                         value={this.state.salary_print_house_allowance}
                                                         disabled
                                                          onChange={this.change} 
                                                          name="salary_print_house_allowance"
                                                          placeholder="Enter Mobile" />
                                                        {/* <span id="err" style={{ color: "red" }}>{this.state.mobile_err}</span> */}
                                                    </div>
                                                </div>
                                                </div>
                                                
                                            <div class="row">
                                                <div class="col-3">
                                                    <div className="form-group">
                                                        <label>Special Allowance</label>
                                                        <input type="text" className="form-control" 
                                                        value={this.state.salary_print_special_allowance} 
                                                        disabled
                                                        onChange={this.change}
                                                        name="salary_print_special_allowance"
                                                        placeholder="Enter Mobile" />
                                                        {/* <span id="err" style={{ color: "red" }}>{this.state.mobile_err}</span> */}
                                                    </div>
                                                </div>
                                            

                                                <div class="col-3">
                                                
                                                    <div className="form-group">
                                                        <label>Grade Allowance</label>
                                                        <input type="text" className="form-control"
                                                        value={this.state.salary_print_grade_allowance} 
                                                        disabled
                                                        name="salary_print_grade_allowance"
                                                        onChange={this.change} placeholder="Enter Mobile" />
                                                        {/* <span id="err" style={{ color: "red" }}>{this.state.mobile_err}</span> */}
                                                    </div>
                                                

                                                </div>
                                                <div class="col-3">
                                                
                                                    <div className="form-group">
                                                        <label>Conveyance Allowance</label>
                                                        <input type="text" className="form-control"
                                                        value={this.state.salary_print_conveyance_allowance} 
                                                        disabled
                                                        name="salary_print_conveyance_allowance"
                                                        onChange={this.change} placeholder="Enter Mobile" />
                                                        {/* <span id="err" style={{ color: "red" }}>{this.state.mobile_err}</span> */}
                                                    </div>
                                                
                                                </div>

                                                <div class="col-3">
                                                    <div className="form-group">
                                                        <label>No of Working Days</label>
                                                        <input type="text" className="form-control"
                                                         value={this.state.no_of_working_days}
                                                          onChange={this.change}
                                                          name="no_of_working_days"
                                                           placeholder="Enter working days" />
                                                        {/* <span id="err" style={{ color: "red" }}>{this.state.working_days_err}</span> */}
                                                    </div>
                                                </div>
                                                </div>
                                                <div class="row">
                                                <div class="col-4">
                                                    <div className="form-group">
                                                        <label>No of Present Days</label>
                                                        <input type="text" className="form-control" 
                                                        value={this.state.no_of_present_days}
                                                         onChange={this.change}
                                                         name="no_of_present_days"
                                                          placeholder="Enter present days" />
                                                        {/* <span id="err" style={{ color: "red" }}>{this.state.present_days_err}</span> */}
                                                    </div>
                                                </div>
                                                <div class="col-3">
                                                    <div className="form-group">
                                                    <button type="button" onClick={this.ActualSalary} className="btn btn-primary waves-effect waves-light center" style={{marginTop:"30px", marginLeft:"50px", width:"150px", }}>
                                                Submit
                                            </button>
                                                        {/* <span id="err" style={{ color: "red" }}>{this.state.present_days_err}</span> */}
                                                    </div>
                                                </div>
                                                
                                                </div>

                                                <div class="row">
                                                <div class="col-4">
                                                    <div className="form-group">
                                                        <label>Actual Sallary</label>
                                                        <br></br>
                                                        <input 
                                                        value={this.state.Actual_salaries}
                                                        
                                                         name="actual_salary" 
                                                         disabled
                                                          placeholder="Enter present days" />
                                                        {/* <span id="err" style={{ color: "red" }}>{this.state.present_days_err}</span> */}
                                                    </div>
                                                </div>
                                                <div class="col-2">
                                                    <div className="form-group">
                                                    <button type="submit"  className="btn btn-primary waves-effect waves-light center" style={{marginTop:"30px", marginLeft:"50px", width:"150px", }}>
                                                Save
                                            </button>
                                                        {/* <span id="err" style={{ color: "red" }}>{this.state.present_days_err}</span> */}
                                                    </div>
                                                </div>
                                                <div class="col-2">
                                                    <div className="form-group">
                                                    <button type="button"   className="btn btn-primary buttons-pdf buttons-html5 waves-effect waves-light center" style={{marginTop:"30px", marginLeft:"50px", width:"150px", }}>
                                                Print
                                            </button>
                                                        {/* <span id="err" style={{ color: "red" }}>{this.state.present_days_err}</span> */}
                                                    </div>
                                                </div>
                                                <div class="col-2">
                                                    <div className="form-group">
                                                    <button type="button" onClick={this.sendEmail}  data-toggle="modal" data-target="#exampleModal" className="btn btn-primary waves-effect waves-light center" style={{marginTop:"30px", marginLeft:"50px", width:"150px", }}>
                                                Send
                                            </button>
                                                        {/* <span id="err" style={{ color: "red" }}>{this.state.present_days_err}</span> */}
                                                    </div>
                                                </div>
                                                
                                                </div>
                                               
                                            


<br>
</br>
                                            {/* <div className="row">
                                                <div className="col-md-6 col-xl-3">
                                                    <div className="mini-stat clearfix bg-white">
                                                        <span className="mini-stat-icon mr-0 float-right"><i className="mdi mdi-buffer"></i></span>
                                                        <div className="mini-stat-info">
                                                            <h5 style={{ color: "grey" }}>{totalSalary} </h5>

                                                        </div>
                                                        <div className="clearfix"></div>
                                                    </div>
                                                </div>

                                                <div className="col-md-6 col-xl-3">
                                                    <div >
                                                        <br>
                                                        </br>
                                                    <div className="btn-group btn-group-toggle bg-primary" data-toggle="buttons">
                                            <label className="btn">
                                            <Link to="/AddSalary"   className="btn btn-primary">Save</Link>
                                    </label>
                                            <label className="btn">
                                            <Link to="/AddSalary"   className="btn btn-primary">Print</Link>
                                    </label>
                                            <label className="btn">
                                            <Link to="" data-toggle="modal" data-target="#exampleModal"  className="btn btn-primary">Send</Link>
                                    </label>
                                     </div>
                                                        <div className="clearfix"></div>
                                                    </div>
                                                </div>
                                              
                                               
                        </div>
                                        */}
                                        




                                            {/* <div className="col-4 align-center">
                                                <button  type="button" className="btn btn-primary waves-effect waves-light float-right">
                                                Save
                                            </button>
                                                </div> */}
                                            {/* <div className="col-4">
                                                <button  type="button" className="btn btn-primary waves-effect waves-light float-right">
                                                Submit
                                            </button>
                                                </div> */}


                                        
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="modal fade" id="exampleModal" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="exampleModalLabel">Send Email</h5>
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">×</span>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    <form >
                                        <div className="form-group">
                                            <label htmlFor="recipient-name" className="col-form-label">From</label>
                                            <input type="text" className="form-control" name="traineName" id="recipient-name" value= "hr@macbrotech.com"  disabled />
                                        </div>
                                        <div className="form-group">
                                        <label htmlFor="recipient-name" className="col-form-label">To</label>
                                            <input type="text" className="form-control" name="mail" id="mail"  onKeyUp={this.Emailemp}  defaultValue="mounika@macbrotech.com" disabled />
                                        
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="recipient-name" className="col-form-label">Subject</label>
                                            <input type="text" className="form-control" name="original_amt" id="recipient-name"  value={"Macbro Payslip " + "("+ monthNames[month.getMonth()] + '-' + year + ")"}/>
                                        </div>
                                        
                                        <div className="form-group">
                                            <label htmlFor="recipient-name" className="col-form-label">Message</label>
                                            <textarea type="text" className="form-control" name="original_amt" id="recipient-name"  />
                                        </div>
                                        <div className="form-group">
                                           
                                        <button type="submit" onChange={this.change} className="btn btn-primary waves-effect waves-light float-right" style={{ width: "130px" }}>
                                                            Submit
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                            </div></div>
            </AUX>
        );
    }
}




export default AddSalary;   
