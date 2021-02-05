import React, { Component } from 'react';
import AUX from '../../../hoc/Aux_';
import { Link, Redirect, withRouter } from 'react-router-dom';
import { Dropdown, Button, DropdownToggle, DropdownMenu, DropdownItem, ButtonGroup } from 'reactstrap';
import axios from 'axios';
import Users from './Users';
import PropTypes from 'prop-types';


let loggedIn = false
const initialState = {
    _id: "",
    user_id: '',
    user_name: '',
    user_mobile: '',
    user_designation: '',
    user_pass: '',
    user_confirm_pass: '',
    photo: '',
    photo_err: '',
    value: [],
    isEdit: false,
    data: [],
    loggedIn: "",
    Edit_Id: "",
    dataEmployeeCode: "",
    message: "",
    msg: "",
    datacode: [],
    datas: [],
    code_msg: "",
    menu: ""

}


class AddUser extends Component {

    state = initialState;
    constructor() {
        super();

    }
    getEmployeeCode() {
        axios.get("http://localhost:4000/Employee").then(res => {
            // console.log(res.data);
            this.setState({
                dataEmployeeCode: res.data
            })
            console.log("employee", res.data)
        })
    }

    setEmpName = (id) => {
        this.setState({
            user_id: id.target.value,
        });

        this.state.dataEmployeeCode.map((item, key) => {
            if (item.emp_code === id.target.value) {
                this.setState({
                    user_id: item.emp_code,
                });
            }
        });
    }

    setEmployeeData = (id) => {
        this.setState({
            user_id: id.target.value,
        });
        console.log('fee-->', this.state.dataEmployeeCode);
        this.state.dataEmployeeCode.map((item, key) => {
            console.log('item--->', item.emp_code, id.target.value);
            if (item.emp_code === id.target.value) {
                console.log('same--->', id, item.name);
                console.log('same--->', id, item.mobile);
                console.log('same--->', id, item.designation);
                this.setState({
                    user_name: item.name,
                    user_mobile: item.mobile,
                    user_designation: item.designation
                });
            }
        });
    }

    Users = event => {

        if (!this.state.Edit_Id) {
            let data = {
                isEdit: this.state.isEdit,

                user_id: this.state.user_id,
                user_name: this.state.user_name,
                user_mobile: this.state.user_mobile,
                user_designation: this.state.user_designation,
                user_pass: this.state.user_pass,
                user_confirm_pass: this.state.user_confirm_pass,



            }
            console.log("get data", data)

            axios.post("http://localhost:4000/Users", data).then(res => {
                this.props.history.push("/Users")
                this.getAll();

            })
            console.log("checking_2", data)
        }

        else {
            let data = {
                _id: this.state._id,
                user_id: this.state.user_id,
                user_name: this.state.user_name,
                user_mobile: this.state.user_mobile,
                user_designation: this.state.user_designation,
                user_pass: this.state.user_pass,
                user_confirm_pass: this.state.user_confirm_pass,

            }
            axios.put("http://localhost:4000/Users/update", data).then(res => {
                this.props.history.push("/Users")
                localStorage.removeItem('UsersEdit')

                this.getAll();

            })

            console.log("Fdafads", data)
        }
    }


    componentDidMount(props) {
        this.getAll();
        this.getEmployeeCode();
        const Edit_Id = localStorage.getItem('UsersEdit')
        this.setState({
            Edit_Id
        })

        axios.get(`http://localhost:4000/Users/${Edit_Id}`).then(res => {

            this.setState({
                data: res.data,
                _id: res.data._id,
                user_id: res.data.user_id,
                user_name: res.data.user_name,
                user_mobile: res.data.user_mobile,
                user_designation: res.data.user_designation,
                user_pass: res.data.user_pass,
                user_confirm_pass: res.data.user_confirm_pass,

            })
        })
        if (Edit_Id) {
            this.setState({
                menu: 'Edit User'
            })
        }
        else {
            this.setState({
                menu: 'Add User'
            })
        }

    }
    getAll() {
        axios.get("http://localhost:4000/Users").then(res => {

            this.setState({
                data: res.data
            })
            console.log("checking data", res.data);
        })
    }

    users = event => {
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
                                    <h4 className="page-title">Add Users</h4>
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-lg-12">
                                <div className="card m-b-20">
                                    <div className="card-body">
                                        <div style={{ marginTop: "-5px" }} >

                                            <Link to="/Users" onClick={() => localStorage.removeItem('UsersEdit')} className="btn btn-primary float-right">View List</Link>
                                        </div>
                                        <br></br>
                                        <br></br>
                                        <br></br>

                                        <form onSubmit={this.Users} >
                                            <div class="row">

                                                <div class="col-3">
                                                <label>Employee Id <span style={star}><b>*</b></span> </label>
                                                    <select name="user_id" value={this.state.user_id} onChange={this.setEmployeeData} className="form-control" >

                                                        <option selected>Select</option>
                                                        {
                                                            (
                                                                this.state.dataEmployeeCode.length > 0 ?

                                                                    this.state.dataEmployeeCode.map((Employee, index) =>

                                                                        <option value={Employee.emp_code}>{Employee.emp_code}</option>
                                                                    ) :
                                                                    (
                                                                        <option value="1">No</option>
                                                                    )
                                                            )
                                                        }

                                                    </select>

                                                </div>
                                                <div class="col-3">
                                                    <div className="form-group">
                                                        <label>Name</label>
                                                        <input type="text"
                                                            className="form-control"
                                                            value={this.state.user_name} 
                                                            onChange={this.users}
                                                            name="user_name"
                                                            disabled
                                                            placeholder="Enter Name" />
                                                        {/* <span id="err" style={{ color: "red" }}>{this.state.name_err}</span> */}
                                                    </div>
                                                </div>
                                                <div class="col-3">
                                                    <div className="form-group">
                                                        <label>Mobile</label>
                                                        <input type="text"
                                                            className="form-control"
                                                            value={this.state.user_mobile}
                                                            onChange={this.users}
                                                            name="user_mobile"
                                                            disabled
                                                            placeholder="Enter Mobile" />
                                                        {/* <span id="err" style={{ color: "red" }}>{this.state.date_of_joining_err}</span> */}
                                                    </div>
                                                </div>


                                                <div class="col-3">
                                                    <div className="form-group">
                                                        <label>Designation</label>
                                                        <input type="text"
                                                            className="form-control"
                                                            value={this.state.user_designation}
                                                            onChange={this.users}
                                                            name="user_designation"
                                                            disabled
                                                            placeholder="Enter Designation" />
                                                        {/* <span id="err" style={{ color: "red" }}>{this.state.dob_err}</span> */}
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="row">

                                                <div class="col-3">
                                                    <div className="form-group">
                                                        <label>Password<span style={{ color: "red" }}>*</span></label>
                                                        <input type="text"
                                                            className="form-control"
                                                            value={this.state.user_pass}
                                                            onChange={this.users}
                                                            name="user_pass"
                                                            placeholder="Enter Password" />
                                                        {/* <span id="err" style={{ color: "red" }}>{this.state.email_err}</span> */}
                                                    </div>
                                                </div>
                                                <div class="col-3">
                                                    <div className="form-group">
                                                        <label>Confirm Password<span style={{ color: "red" }}>*</span></label>
                                                        <input type="text"
                                                            className="form-control"
                                                            value={this.state.user_confirm_pass}
                                                            onChange={this.users}
                                                            name="user_confirm_pass"
                                                            placeholder="Enter Confirm Password" />
                                                        {/* <span id="err" style={{ color: "red" }}>{this.state.blood_group_err}</span> */}
                                                    </div>
                                                </div>
                                                <div class="col-2">
                                                    <div className="form-group">
                                                        <br></br>

                                                        <button type="submit" onChange={this.users} className="btn btn-primary waves-effect waves-light float-right" style={{ width: "130px" }}>
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

export default AddUser;   