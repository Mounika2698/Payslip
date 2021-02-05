import React, { Component } from 'react';
import AUX from '../../../hoc/Aux_';
import { Sparklines, SparklinesLine } from 'react-sparklines';
import { Scrollbars } from 'react-custom-scrollbars';
import { Link } from 'react-router-dom';
import axios from 'axios'


var Emp = localStorage.getItem('user_id')
var total = 0;
var recentemployee;
var recentpayslip;
var admin = localStorage.getItem('admin')

class dashboard1 extends Component {

    constructor(props) {
        super(props);
        const token = localStorage.getItem("token")

        let loggedIn = true
        if (token == null) {
            loggedIn = false
        }

        this.state = {

            data: [],
            payslip:[],
            total: "",
            datas:"",
            dataValue: [],
        };
    }


    getAll() {
        axios.get("http://localhost:4000/Employee").then(res => {

            this.setState({
                data: res.data
            })
            console.log("getall", this.state.data)

        })

        axios.get("http://localhost:4000/Users").then(res => {

            this.setState({
                datas: res.data
            })
            console.log("getall", this.state.data)

        })

        axios.get("http://localhost:4000/Employee/recentemployee/12").then(res => {
            // console.log(res.data);
            this.setState({
                dataValue: res.data
            })
        })

        axios.get("http://localhost:4000/SalaryPrint/recentpayslip/12").then(res => {
            // console.log(res.data);
            this.setState({
                payslip: res.data
            })
            console.log("shfyuf", res.data)
        })
        console.log("shfyuf", this.state.payslip)
      
    }




    componentDidMount() {
        this.getAll();
    }


    render() {

        recentemployee =   this.state.dataValue.map((Employee, index) =>{
            if(Emp == Employee.emp_id){
                return(
                    <tr key={Employee._id}>
                    {/* <td>{index+1}</td> */}
                    <td>{Employee.photo}</td>
                    <td>{Employee.name}</td>
                   

                </tr>
                )
            }

            else if(admin == '"superadmin"'){
                return(
                    <tr key={Employee._id}>
                    {/* <td>{index+1}</td> */}
                    <td>{!Employee.photo ? <img src={process.env.PUBLIC_URL + `/assets/images/users/boy.png`} width="30px" height="30px" style={{ borderRadius: '20px' }} /> : <img src={process.env.PUBLIC_URL + `/uploads/Employee/${Employee.photo}`} width="30px" height="30px" style={{ borderRadius: '0px' }} />}</td>
                    <td>{Employee.name}</td>
                    

                </tr>
                )
            }

        })


        recentpayslip =   this.state.payslip.map((SalaryPrint, index) =>{
            if(Emp == SalaryPrint.salary_emp_code){
                return(
                    <tr key={SalaryPrint._id}>
                    <td>{index+1}</td>
                    <td>{SalaryPrint.salary_emp_code}</td>
                    <td>{SalaryPrint.salary_emp_name}</td>
                    <td>{SalaryPrint.no_of_working_days}</td>
                    <td>{SalaryPrint.no_of_present_days}</td>

                </tr>
                )
            }

            else if(admin == '"superadmin"'){
                return(
                    <tr key={SalaryPrint._id}>
                    <td>{index+1}</td>
                    <td>{SalaryPrint.salary_emp_code}</td>
                    <td>{SalaryPrint.salary_emp_name}</td>
                    <td>{SalaryPrint.no_of_working_days}</td>
                    <td>{SalaryPrint.no_of_present_days}</td>
                    
                </tr>
                )
            }
        })
        return (
            <AUX>
                <div className="wrapper">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-sm-12">
                                <div className="page-title-box">
                                    <div className="btn-group pull-right">
                                        <ol className="breadcrumb hide-phone p-0 m-0">
                                            <li className="breadcrumb-item"><Link to="#">Macbro</Link></li>
                                            <li className="breadcrumb-item active">Dashboard</li>
                                        </ol>
                                    </div>
                                    <h4 className="page-title">Dashboard</h4>
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-md-6 col-xl-3">
                                <div className="mini-stat clearfix bg-white">
                                    <span className="mini-stat-icon bg-purple mr-0 float-right"><i className="mdi mdi-basket"></i></span>
                                    <div className="mini-stat-info">
                                        <span className="counter text-purple">
                                            {
                                                this.state.data.length
                                            }
                                        </span>
                                No of Employees
                            </div>
                                    <div className="clearfix"></div>
                                </div>
                            </div>
                            <div className="col-md-6 col-xl-3">
                                <div className="mini-stat clearfix bg-white">
                                    <span className="mini-stat-icon bg-blue-grey mr-0 float-right"><i className="mdi mdi-black-mesa"></i></span>
                                    <div className="mini-stat-info">
                                        <span className="counter text-purple">{this.state.datas.length}</span>
                                No of Users
                            </div>
                                    <div className="clearfix"></div>
                                </div>
                            </div>
                            <div className="col-md-6 col-xl-3">
                                <div className="mini-stat clearfix bg-white">
                                    <span className="mini-stat-icon bg-brown mr-0 float-right"><i className="mdi mdi-buffer"></i></span>
                                    <div className="mini-stat-info">
                                        <span className="counter text-brown"></span>

                                    </div>
                                    <div className="clearfix"></div>
                                </div>
                            </div>
                            <div className="col-md-6 col-xl-3">
                                <div className="mini-stat clearfix bg-white">
                                    <span className="mini-stat-icon bg-teal mr-0 float-right"><i className="mdi mdi-coffee"></i></span>
                                    <div className="mini-stat-info">
                                        <span className="counter text-teal"></span>

                                    </div>
                                    <div className="clearfix"></div>
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-xl-3">
                                <div className="card m-b-20">
                                    <div className="card-body">
                                        <h4 className="mt-0 m-b-30 header-title">Recent Employees</h4>

                                        <div className="table-responsive">
                                            <table className="table table-vertical mb-0">
                                            <thead>
                                                    <tr>
                                                        <th>Photo</th>
                                                        <th>Name</th>
                                                      
                                                    </tr> 
                                                </thead>
                                                <tbody>
                                                    { 
                                                    recentemployee}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-xl-9">
                                <div className="card m-b-20">
                                    <div className="card-body">
                                        <h4 className="mt-0 m-b-30 header-title">Recent Payslips</h4>

                                        <div className="table-responsive">
                                            <table className="table table-vertical mb-0">
                                            <thead>
                                                    <tr>
                                                        <th>S/no</th>
                                                        <th>Employee Code</th>
                                                        <th>Employee Name</th>
                                                        <th>Working Days</th>
                                                        <th>Present Days</th>
                                                      
                                                    </tr> 
                                                </thead>
                                                <tbody>
                                                    { 
                                                    recentpayslip}
                                                </tbody>
                                               
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </AUX>
        );
    }
}

export default dashboard1;   