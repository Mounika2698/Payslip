import React, { Component } from 'react';
import AUX from '../../../hoc/Aux_';
import { Link, Redirect, withRouter } from 'react-router-dom';
import { Dropdown, Button, DropdownToggle, DropdownMenu, DropdownItem, ButtonGroup } from 'reactstrap';
import axios from 'axios';
import Employee from './Employee';
import PropTypes from 'prop-types';


let loggedIn = false
const initialState = {
    _id: "",
    email: '',
    email_err: '',
    name: '',
    name_err: '',
    emp_code: '',
    emp_code_err: '',
    photo: '',
    photo_err: '',
    date_of_joining: '',
    date_of_joining_err: '',
    pan_number: '',
    pan_number_err: '',
    aadhar: '',
    aadhar_err: '',
    dob: '', dob_err: '',
    father_name: '',
    father_name_err: '',
    blood_group: '',
    blood_group_err: '',
    mother_name: '',
    mother_name_err: '',
    spouse_name: '',
    spouse_name_err: '',
    mobile: '',
    mobile_err: '',
    home_address: '',
    home_address_err: '',
    designation: '',
    designation_err: '',
    passport_number: '',
    passport_number_err: '',
    value: [],
    isEdit: false,
    data: [],
    loggedIn: "",
    Edit_Id: "",
    message: "",
    msg: "",
    datacode: [],
    datas: [],
    code_msg: "",
    menu: ""

}



class AddEmployee extends Component {

    state = initialState;
    constructor() {
        super();

    }


    // Emailemp = event => {
    //     axios.get(`http://localhost:4000/Employee/SearchEmail/${this.state.email}`).then(res => {
    //         this.setState({
    //             datas: res.data
    //         })
    //         if (this.state.datas.length) {
    //             this.setState({
    //                 msg: "* This Email Id is Already Exist"
    //             })
    //             console.log(this.state.msg);
    //         }
    //         else {
    //             this.setState({
    //                 msg: ""
    //             })
    //         }
    //         return false;
    //     })
    // }


    // code

    // Codeemp = event => {
    //     axios.get(`http://localhost:4000/Employee/SearchCode/${this.state.emp_code}`).then(res => {
    //         this.setState({
    //             datacode: res.data
    //         })
    //         if (this.state.datacode.length) {
    //             this.setState({
    //                 code_msg: "* This Employee Code is Already Exist"
    //             })
    //         }
    //         else {
    //             this.setState({
    //                 code_msg: ""
    //             })
    //         }
    //         return false;

    //     })
    // }

    // validate = () => {
    //     //  let fileError = "";

    //     let email_err = '';
    //     let name_err = '';
    //     let emp_code_err = '';
    //     let photo_err = '';
    //     let date_of_joining_err = '';
    //     let pan_number_err = '';
    //     let aadhar_err = '';
    //     let dob_err = '';
    //     let father_name_err = '';
    //     let blood_group_err = '';
    //     let mother_name_err = '';
    //     let spouse_name_err = '';
    //     let mobile_err = '';
    //     let home_address_err = '';
    //     let designation_err = '';
    //     let passport_number_err = '';

    //     let grade_err = '';


    // if (!this.state.photo) {
    //     fileError = " * This Field is Required "
    // }
    // if (!this.state.name) {
    //     name_err = "* This Field is Required"
    // }

    // if (!this.state.emp_code) {
    //     emp_code_err = "* This Field is Required"
    // }

    // if (!this.state.mobile) {
    //     mobile_err = "* This Field is Required"
    // }

    // if (!this.state.date_of_joining) {
    //     date_of_joining_err = "* This Field is Required"
    // }

    // if (!this.state.dob) {
    //     dob_err = "* This Field is Required"
    // }
    // if (!this.state.designation) {
    //     designation_err = "* This Field is Required"
    // }
    // if (!this.state.father_name) {
    //     father_name_err = "* This Field is Required"
    // }
    // if (!this.state.mother_name) {
    //     mother_name_err = "* This Field is Required"
    // }

    // if (!this.state.home_address) {
    //     home_address_err = "* This Field is Required"
    // }
    // if (this.state.datas.length) {
    //     msg = "* This Email Id is Already Exist"
    // }
    // if (this.state.datacode.length) {
    //     code_msg = "* This Employee Code is Already Exist"
    // }

    //     if (!this.state.passport_number) {
    //         passport_number_err = "* This Field is Required"
    //     }

    //     if (!this.state.pan_number) {
    //         pan_number_err = "* This Field is Required"
    //     }

    //     if (!this.state.grade) {
    //         grade_err = "* This Field is Required"
    //     }

    //     if (!this.state.aadhar) {
    //         aadhar_err = "* This Field is Required"
    //     }
    //     if (!this.state.photo) {
    //         photo_err = "* This Field is Required"
    //     }
    //     if (!this.state.blood_group) {
    //         blood_group_err = "* This Field is Required"
    //     }
    //     if (!this.state.spouse_name) {
    //         spouse_name_err = "* This Field is Required"
    //     }

    //     if (!this.state.home_address) {
    //         home_address_err = "* This Field is Required"
    //     }
    //     if (!this.state.email.includes("@")) {
    //         email_err = "* Invalid Email";
    //     }
    //     if (emp_code_err || pan_number_err || name_err|| mobile_err || email_err || date_of_joining_err|| dob_err || designation_err || home_address_err || passport_number_err || photo_err || aadhar_err || grade_err || blood_group_err || father_name_err || mother_name_err || spouse_name_err ) {
    //         this.setState({ emp_code_err, name_err, pan_number_err, mobile_err, date_of_joining_err, email_err, dob_err, designation_err, home_address_err,aadhar_err, passport_number_err, photo_err, grade_err, father_name_err, blood_group_err,mother_name_err, spouse_name_err });
    //         return false;
    //     }
    //     return true;

    // }


    Employee = event => {

        if (!this.state.Edit_Id) {
            const file = this.state.photo;
            let data = {
                isEdit: this.state.isEdit,
                photo: file,
                emp_code: this.state.emp_code,
                mobile: this.state.mobile,
                email: this.state.email,
                name: this.state.name,
                designation: this.state.designation,
                dob: this.state.dob,
                date_of_joining: this.state.date_of_joining,
                father_name: this.state.father_name,
                mother_name: this.state.mother_name,
                home_address: this.state.home_address,
                pan_number: this.state.pan_number,
                aadhar: this.state.aadhar,
                passport_number: this.state.passport_number,
                blood_group: this.state.blood_group,
                grade: this.state.grade,
                spouse_name: this.state.spouse_name,

            }

            axios.post("http://localhost:4000/Employee", data).then(res => {

                this.getAll();
console.log("checking_2", data)
            })
            console.log("checking_2", data)
        }
        else {
            const file = this.state.photo;
            const old_photo = this.state.data.photo;
            let data = {
                
                _id: this.state._id,
                photo: file,
                old_photo: old_photo,
                emp_code: this.state.emp_code,
                mobile: this.state.mobile,
                email: this.state.email,
                name: this.state.name,
                designation: this.state.designation,
                dob: this.state.dob,
                date_of_joining: this.state.date_of_joining,
                father_name: this.state.father_name,
                mother_name: this.state.mother_name,
                home_address: this.state.home_address,
                pan_number: this.state.pan_number,
                aadhar: this.state.aadhar,
                passport_number: this.state.passport_number,
                blood_group: this.state.blood_group,
                grade: this.state.grade,
               
                spouse_name: this.state.spouse_name,
            }
            axios.put("http://localhost:4000/Employee/update", data).then(res => {
                this.props.history.push("/Employee")
                localStorage.removeItem('EmployeeEdit')
                this.props.history.push("/Employee")
                this.getAll();

            })
            console.log("Fdafads", data)
        }
    }


    componentDidMount(props) {
        this.getAll();
        const Edit_Id = localStorage.getItem('EmployeeEdit')
        this.setState({
            Edit_Id
        })

        axios.get(`http://localhost:4000/Employee/${Edit_Id}`).then(res => {
            this.setState({
                data: res.data,
                _id: res.data._id,
                photo: res.data.photo,
                emp_code: res.data.emp_code,
                mobile: res.data.mobile,
                email: res.data.email,
                name: res.data.name,
                designation: res.data.designation,
                dob: res.data.dob,
                date_of_joining: res.data.date_of_joining,
                father_name: res.data.father_name,
                mother_name: res.data.mother_name,
                home_address: res.data.home_address,
                pan_number: res.data.pan_number,
                aadhar: res.data.aadhar,
                passport_number: res.data.passport_number,
                blood_group: res.data.blood_group,
                grade: res.data.grade,
               
                spouse_name: res.data.spouse_name,
            })
        })
        if (Edit_Id) {
            this.setState({
                menu: 'Edit Employee'
            })
        }
        else {
            this.setState({
                menu: 'Add Employee'
            })
        }

    }

    getAll() {
        axios.get("http://localhost:4000/Employee").then(res => {

            this.setState({
                data: res.data
            })
            console.log("checking data", res.data);
        })
    }

    change = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        })
        console.log("names", this.state.name)
    }

    render() {
        const star = {
            color: "red"
        }
        return (
            <AUX>
                <div className="wrapper">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-sm-12">
                                <div className="page-title-box">
                                    <h4 className="page-title">Add Employee</h4>
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-lg-12">
                                <div className="card m-b-20">
                                    <div className="card-body">
                                        <div style={{ marginTop: "-5px" }} >

                                            <Link to="/Employee" onClick={() => localStorage.removeItem('EmployeeEdit')} className="btn btn-primary float-right">View List</Link>
                                        </div>
                                        <br></br>
                                        <br></br>
                                        <br></br>

                                        <form onSubmit={this.Employee} >
                                            <div class="row">
                                            {/* <input type="hidden" name="_token" />
                                                                        <div className="form-element margin-bottom-20">

                                                                            <label htmlFor="" className="sec-txt">Photo <b><span style={{ color: "red" }}>*</span></b>
                                                                    </label>
                                                                            <div className="">
                                                                               {this.state.Edit_Id ? <table className="table table-striped" id="imgtable">
                                                                                {this.state.photo ?  <img src={process.env.PUBLIC_URL + `/uploads/Employee/${this.state.data.photo}`} width="50px" height="50px" style={{ borderRadius:'30px' }} /> : ''} 
                                                                               
                                                                                </table> : "" }
                                                                            </div>
                                                                            <div className="form-group">
                                                                                <input type="file" name="photo" className="" onChange={this.Empphoto} value={this.state.file} />
                                                                            </div>

                                                                        </div> */}
                                                                        <div class="col-3">
                                                    <div className="form-group">
                                                        <label>Photo</label>
                                                        <input

                                                            value={this.state.photo}
                                                            onChange={this.change}
                                                            name="photo"
                                                            type="file" placeholder="Enter employee code" />
                                                    </div>
                                                </div>
 

                                                <div class="col-3">
                                                    <div className="form-group">
                                                        <label>Employee Code<span style={{ color: "red" }}>*</span></label>
                                                        <input
                                                            className="form-control"
                                                            value={this.state.emp_code}
                                                            onChange={this.change}
                                                            name="emp_code"
                                                            type="text" placeholder="Enter employee code" />
                                                    </div>
                                                </div>
                                                <div class="col-3">
                                                    <div className="form-group">
                                                        <label>Name<span style={{ color: "red" }}>*</span></label>
                                                        <input type="text"
                                                            className="form-control"
                                                            value={this.state.name}
                                                            onChange={this.change}
                                                            name="name"
                                                            placeholder="Enter Name" />
                                                        {/* <span id="err" style={{ color: "red" }}>{this.state.name_err}</span> */}
                                                    </div>
                                                </div>
                                                <div class="col-3">
                                                    <div className="form-group">
                                                        <label>Date of Joining<span style={{ color: "red" }}>*</span></label>
                                                        <input type="text"
                                                            className="form-control"
                                                            value={this.state.date_of_joining}
                                                            onChange={this.change}
                                                            name="date_of_joining"
                                                            placeholder="Enter date of joining" />
                                                        {/* <span id="err" style={{ color: "red" }}>{this.state.date_of_joining_err}</span> */}
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="col-3">
                                                    <div className="form-group">
                                                        <label>DOB<span style={{ color: "red" }}>*</span></label>
                                                        <input type="number"
                                                            className="form-control"
                                                            value={this.state.dob}
                                                            onChange={this.change}
                                                            name="dob"
                                                            placeholder="Enter DOB" />
                                                        {/* <span id="err" style={{ color: "red" }}>{this.state.dob_err}</span> */}
                                                    </div>
                                                </div>

                                                <div class="col-3">
                                                    <div className="form-group">
                                                        <label>Email<span style={{ color: "red" }}>*</span></label>
                                                        <input type="text"
                                                            className="form-control"
                                                            value={this.state.email}
                                                            onChange={this.change}
                                                            name="email"
                                                            placeholder="Enter Email" />
                                                        {/* <span id="err" style={{ color: "red" }}>{this.state.email_err}</span> */}
                                                    </div>
                                                </div>
                                                <div class="col-3">
                                                    <div className="form-group">
                                                        <label>Blood Group<span style={{ color: "red" }}>*</span></label>
                                                        <input type="text"
                                                            className="form-control"
                                                            value={this.state.blood_group}
                                                            onChange={this.change}
                                                            name="blood_group"
                                                            placeholder="Enter Blood Group" />
                                                        {/* <span id="err" style={{ color: "red" }}>{this.state.blood_group_err}</span> */}
                                                    </div>
                                                </div>

                                                <div class="col-3">
                                                    <div className="form-group">
                                                        <label>Father's Name<span style={{ color: "red" }}>*</span></label>
                                                        <input type="text"
                                                            className="form-control"
                                                            value={this.state.father_name}
                                                            onChange={this.change}
                                                            name="father_name"
                                                            placeholder="Enter Father's name" />
                                                        {/* <span id="err" style={{ color: "red" }}>{this.state.father_name_err}</span> */}
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="col-3">
                                                    <div className="form-group">
                                                        <label>Mother's Name<span style={{ color: "red" }}>*</span></label>
                                                        <input type="text"

                                                            className="form-control"
                                                            value={this.state.mother_name}
                                                            onChange={this.change}
                                                            name="mother_name"
                                                            placeholder="Enter Mother's name" />
                                                        {/* <span id="err" style={{ color: "red" }}>{this.state.mother_name_err}</span> */}
                                                    </div>
                                                </div>

                                                <div class="col-3">
                                                    <div className="form-group">
                                                        <label>Spouse Name<span style={{ color: "red" }}>*</span></label>
                                                        <input type="text"
                                                            className="form-control"
                                                            value={this.state.spouse_name}
                                                            onChange={this.change}
                                                            name="spouse_name"
                                                            placeholder="Enter Spouse name" />
                                                        {/* <span id="err" style={{ color: "red" }}>{this.state.spouse_name_err}</span> */}
                                                    </div>
                                                </div>

                                                <div class="col-3">
                                                    <div className="form-group">
                                                        <label>Home Phone<span style={{ color: "red" }}>*</span></label>
                                                        <input type="number"
                                                            className="form-control"
                                                            value={this.state.mobile}
                                                            onChange={this.change}
                                                            name="mobile"
                                                            placeholder="Enter Phone Number" />
                                                        {/* <span id="err" style={{ color: "red" }} >{this.state.mobile_err}</span> */}
                                                    </div>
                                                </div>
                                                <div class="col-3">
                                                    <div className="form-group">
                                                        <label>Designation<span style={{ color: "red" }}>*</span></label>
                                                        <input type="text"
                                                            className="form-control"
                                                            value={this.state.designation}
                                                            onChange={this.change}
                                                            name="designation"
                                                            placeholder="Enter Designation" />
                                                        {/* <span id="err" style={{ color: "red" }}>{this.state.designation_err}</span> */}
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="row">

                                                <div class="col-3">
                                                    <div className="form-group">
                                                        <label>Passport Number<span style={{ color: "red" }}>*</span></label>
                                                        <input type="text"
                                                            className="form-control"

                                                            value={this.state.passport_number}
                                                            onChange={this.change}
                                                            name="passport_number"
                                                            placeholder="Enter Passport Number" />
                                                        <span id="err" style={{ color: "red" }}>{this.state.passport_number_err}</span>
                                                    </div>
                                                </div>
                                                <div class="col-3">
                                                    <div className="form-group">
                                                        <label>Pan Number<span style={{ color: "red" }}>*</span></label>
                                                        <input type="text"
                                                            className="form-control"
                                                            value={this.state.pan_number}
                                                            onChange={this.change}
                                                            name="pan_number"
                                                            placeholder="Enter Pan Number" />
                                                        <span id="err" style={{ color: "red" }}>{this.state.pan_number_err}</span>
                                                    </div>
                                                </div>
                                                <div class="col-3">
                                                    <div className="form-group">
                                                        <label>Aadhar Number<span style={{ color: "red" }}>*</span> </label>
                                                        <input type="number"
                                                            className="form-control"
                                                            value={this.state.aadhar}
                                                            onChange={this.change}
                                                            name="aadhar"
                                                            placeholder="Enter Aadhar Number" />
                                                        <span id="err" style={{ color: "red" }}>{this.state.aadhar_err}</span>
                                                    </div>
                                                </div>
                                                <div class="col-3">
                                                    <div className="form-group">
                                                        <label>Grade<span style={{ color: "red" }}>*</span></label>
                                                        <input type="text"
                                                            className="form-control"
                                                            value={this.state.grade}
                                                            onChange={this.change}
                                                            name="grade"
                                                            placeholder="Enter Grade" />
                                                        {/* <span id="err" style={{ color: "red" }}>{this.state.grade_err}</span> */}
                                                    </div>
                                                </div>
                                                <div class="col-3">
                                                    <div className="form-group">
                                                        <label>Home Address<span style={{ color: "red" }}>*</span></label>
                                                        <textarea type="text" className="form-control" name="home_address"
                                                            value={this.state.home_address}
                                                            onChange={this.change}
                                                            placeholder="Enter Home Address" />
                                                        {/* <span id="err" style={{ color: "red" }}>{this.state.home_address_err}</span> */}
                                                    </div>
                                                </div>
                                                <div class="col-2">
                                                    <div className="form-group">
                                                        <br></br> <br></br>

                                                        <button type="submit" onChange={this.change} className="btn btn-primary waves-effect waves-light float-right" style={{ width: "130px" }}>
                                                            Submit
                                            </button>
                                                    </div>
                                                </div>
                                            </div>



                                        </form>




                                        {/* <form onSubmit={this.submit}>
    <label>
        Name:
    </label>
    <input type="text" name="name" value={this.state.name} onChange={this.change} ></input>
    <label>
        Email:
    </label>
    <input type="text" name="email" value={this.state.email} onChange={this.change} ></input> 
    <label>
        Phone:
    </label>
    <input type="text" name="mobile" value={this.state.mobile} onChange={this.change} ></input>
    <button type="submit">Submit</button>
</form> */}

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

export default AddEmployee;   