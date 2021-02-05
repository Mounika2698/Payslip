import React , {Component } from 'react';
import AUX from '../../../hoc/Aux_';
import { Link } from 'react-router-dom';
import axios from 'axios';
import ReactTooltip from 'react-tooltip';
import { saveAs } from 'file-saver';
import logo from './images/logo.png';


const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];
const month = new Date();
var year = new Date().getFullYear();
var data = ""
    var User = localStorage.getItem('user_id')
    const date = new Date();
    const initialState = {
        salaryData: [],
        datas: [],
        editData: [],
        dataEmp:[],
        datasms:[],
        dataViewpdf:[],
        isEdit: false,
        salary:"",
        mail:"",
        message: ""
    }
    
    class Salary_print extends Component {
        state = initialState;
        constructor(props) {
            super(props);
        
        }
    
        componentDidMount() {
            this.getAll();      
        }
    
        
        getAll() {
    
            axios.get("http://localhost:4000/SalaryPrint").then(res => {
                this.setState({
                    salaryData: res.data,
                })
              console.log("dataget", res.data)
            })

            axios.get("http://localhost:4000/Employee").then(res => {

                this.setState({
                    dataEmp: res.data
                })
                console.log("getall", this.state.dataEmp)
    
            })

        }
    

//print
createAndDownloadPdf = data => {
    console.log("aacheck" )
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

 axios.post("http://localhost:4000/SalaryPrint/create-pdf", data).then(res => {   
  
})
 
console.log("aacheck", res.data )
.then(() => axios.get(`http://localhost:4000/SalaryPrint/printID/12`, { responseType: 'blob' }))
.then((res) => {
  window.location.reload(false);
 const pdfBlob = new Blob([res.data], { type: 'application/pdf' });

 saveAs(pdfBlob, `${this.state.dataViewpdf.salary_emp_name}.pdf`);
})
})  
}

        del = data => {
            var option = window.confirm(`Are you sure Want to Delete ${data.salary_emp_id}`)
            if (option) {
                axios.delete(`http://localhost:4000/SalaryPrint/del/${data._id}`).then(res => {
                    this.setState({
                        message: "Deleted Successfully"
                    })
                })
            }
        }
    
        viewSalary = data => {
            axios.get(`http://localhost:4000/SalaryPrint/${data._id}`).then(res => {
                this.setState({
                    datas:res.data
                })
                console.log("data1", this.state.datas)
            })
            console.log("datas2", this.state.datas)
            this.getAll();
        }

sendSalary = data => {
    axios.get(`http://localhost:4000/Employee/${data.emp_code}`).then(res => {
        this.setState({
            mail:res.data
        })
        console.log("mail", res.data)
    })
}

        viewSMS = data => {
            axios.get(`http://localhost:4000/Employee/${data.salary_emp_code}`).then(res => {
                this.setState({
                    datasms:res.data
                })
                console.log("datasms1", this.state.datas)
            })
            console.log("datasms2", this.state.datas)
            this.getAll();
        }
    
        updateSalary = data => {
             axios.get(`http://localhost:4000/SalaryPrint/${data._id}`).then(res => {
                localStorage.setItem('SalaryPrintEdit',data._id);          
                window.location.href = '/Addsalary'
              console.log("dddd",data._id)
                     
       }) 
    }

        // editSalary = data => {
        //     console.log("testting", data)
        //     this.setState({
        //       editData: data
        //     })
            
        //     console.log( "data check for ",this.state.data)
        //     if (this.state._id != null) {
        //       this.setState({
        //         isEdit: true,
        //         _id: this.state._id,
        //         isEdit: this.state.isEdit,
                      
        //         salary_emp_code: this.state.salary_emp_code,
        //                 salary_emp_name: this.state.salary_emp_name,
        //                 salary_print_basic : this.state.salary_print_basic,
        //                 salary_print_house_allowance : this.state.salary_print_house_allowance,
        //                 salary_print_special_allowance : this.state.salary_print_special_allowance,
        //                 salary_print_grade_allowance : this.state.salary_print_grade_allowance,
        //                 salary_print_conveyance_allowance : this.state.salary_print_conveyance_allowance,
        //                 actual_salary: this.state.actual_salary,
        //                 no_of_working_days: this.state.no_of_working_days,
        //                 no_of_present_days: this.state.no_of_present_days
        
        //       })
        //     }
        
        //   }
    
    
render(){
    return(
           <AUX>
		     <div className="wrapper">
                <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-12">
                        <div className="page-title-box">
                            <div className="btn-group pull-right">
                                <ol className="breadcrumb hide-phone p-0 m-0">
                                    <li className="breadcrumb-item"><Link to="#">Macbro</Link></li>
                                    <li className="breadcrumb-item active">Salary List</li>
                                </ol>
                            </div>
                            <h4 className="page-title">Salary List</h4>
                        </div>
                    </div>
                </div>
                         <div className="row">
                        <div className="col-12">
                       
                            <div className="card m-b-20">
                                <div className="card-body">

                                <Link to="/AddSalary"   className="btn btn-primary float-right">Add New</Link> 
                                <br></br>
                                <br></br>
                             

                                    <table id="datatable" className="table  dt-responsive nowrap table-vertical" width="100%" cellspacing="0">
                                        <thead>
                                        <tr> 
                                            <th>S/no</th>
                                            <th>Photo</th>
                                            <th>Employee Code</th>
                                            <th>Employee Name</th>
                                            <th>No of Working Days</th>
                                            <th>No of Present Days</th>
                                            <th>Actual Salary</th>
                                             <th>Action</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                       
                                       

                                                        {

                                                            (
                                                                this.state.salaryData.length > 0 ?

                                                                    this.state.salaryData.map((SalaryPrint, index) =>
                                                                        <tr key={SalaryPrint._id}>
                                                                            <td>{index + 1}</td>
                                                                            <td>{!SalaryPrint.photo ? <img src={process.env.PUBLIC_URL + `/assets/images/users/boy.png`} width="50px" height="50px" style={{ borderRadius: '30px' }} /> : <img src={process.env.PUBLIC_URL + `/uploads/Employee/${SalaryPrint.photo}`} width="50px" height="50px" style={{ borderRadius: '30px' }} />}</td>

                                                                            <td>{SalaryPrint.salary_emp_code}</td>
                                                                            <td>{SalaryPrint.salary_emp_name}</td>
                                                                            <td>{SalaryPrint.no_of_working_days}</td>
                                                                            <td>{SalaryPrint.no_of_present_days}</td>
                                                                            <td>{SalaryPrint.actual_salary}</td>

                                                                            <td>
                                                                                <a data-tip="View" href="" onClick={() => this.viewSalary(SalaryPrint)} data-toggle="modal" data-target="#exampleModal3"> <i className="text-primary fa fa-eye"></i></a>&nbsp;

                                                                                <a data-tip="Notification" href="" onClick={() => this.viewSMS(SalaryPrint)} data-toggle="modal" data-target="#exampleModal4"> <i className="text-primary fa fa-bell"></i></a>&nbsp;
                                                                                <a data-tip=" Print" href="#" onClick={() => this.createAndDownloadPdf(SalaryPrint) } ><i className=" text-info fa fa-print" aria-hidden="true" /></a>&nbsp;&nbsp;
                                                                                <a data-tip="Send" href="" onClick={() => this.viewSalary(SalaryPrint)} data-toggle="modal" data-target="#exampleModal5"> <i className="text-primary fa fa-paper-plane"></i></a>&nbsp;
                                                                                <a data-tip=" Edit" href=""  ><i className=" text-dark fa fa-pencil" aria-hidden="true" onClick={() => this.updateSalary(SalaryPrint)} /></a>&nbsp;
                                                                                <a data-tip="Delete" href=""> <i className="fa fa-times text-danger" onClick={event => { this.del(SalaryPrint) }}></i></a>
                                                                                <ReactTooltip />
                                                                            </td>
                                                                        </tr>
                                                                    )
                                                                    :
                                                                    (
                                                                        <tr><td colSpan={9}> No Data Found</td></tr>
                                                                    )
                                                            )}
                                                    </tbody>
                                       
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div> 
            </div>


{/* View salary */}
<div className="modal fade" id="exampleModal3" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel3" aria-hidden="true">
                        <div className="modal-dialog" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="exampleModalLabel3">View Salary</h5>
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">×</span>
                                    </button>
                                </div>
                                <div className="modal-body">
                                <p> <label>  Photo : </label>&nbsp; </p>
                                                                        <p> <label>Employee Code  : </label>&nbsp; {this.state.datas.salary_emp_code} </p>
                                                                        <p> <label>Name  : </label>&nbsp; {this.state.datas.salary_emp_name} </p>
                                                                        <p><label>Basic Allowance : </label>&nbsp; {this.state.datas.salary_print_basic}</p>
                                                                        <p><label>House Rent Allowance  : </label>&nbsp;  {this.state.datas.salary_print_house_allowance}</p>
                                                                        <p> <label>Special Allowance  : </label>&nbsp; {this.state.datas.salary_print_special_allowance}</p>
                                                                        <p> <label>Grade Allowance : </label>&nbsp; {this.state.datas.salary_print_grade_allowance}</p>
                                                                        <p><label>Conveyance Allowance : </label>&nbsp;  {this.state.datas.salary_print_conveyance_allowance}</p>
                                                                        <p> <label>No of Working Days  : </label>&nbsp; {this.state.datas.no_of_working_days}</p>
                                                                        <p><label>No of Present Days : </label>&nbsp;  {this.state.datas.no_of_present_days}</p>
                                                                        <p><label>Actual Salary : </label>&nbsp;  {this.state.datas.actual_salary}</p>
                                                                    
                            </div>
                            </div>
                            </div>
                            </div>
{/* Notification */}
<div className="modal fade" id="exampleModal4" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel4" aria-hidden="true">
                        <div className="modal-dialog" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="exampleModalLabel4">Send Message</h5>
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">×</span>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    <form>
                                     
                                        <div className="form-group">
                                            <label htmlFor="recipient-name" className="col-form-label">To</label>
                                            <input type="text" className="form-control" name="traineName" id="recipient-name"  value="8220651382" disabled />
                                          
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="recipient-name" className="col-form-label">Message</label>
                                            <input type="text" className="form-control" name="original_amt" id="recipient-name"   />
                                        </div>
                                        
                                        <div className="form-group">
                                           
                                            <input type="submit" name="submit" defaultValue="Submit" className="form-control btn btn-info" />
                                        </div>
                                    </form>
                                </div>
                            </div>
                            </div></div>
                            {/* Email */}

                            <div className="modal fade" id="exampleModal5" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
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

export default Salary_print;   