import React, { Component } from 'react';
import AUX from '../../../hoc/Aux_';
import { Link } from 'react-router-dom';
import { Dropdown, Button, DropdownToggle, DropdownMenu, DropdownItem, ButtonGroup } from 'reactstrap';
import axios from 'axios';





let loggedIn = false
const initialState = {
    _id: "",
    update_salary_id: '',
    update_name: '',
    update_designation: '',
    update_mobile: '',
    update_basic: '',
    house_allowance: '',
    special_allowance: '',
    grade_allowance: '',
    conveyance_allowance: '',
    dataEmployeeCode:"",
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
class AddSalaryUpdate extends Component {
    state= initialState;
    constructor() {
        super();
    
    }


    salaryupdate = event => {
        event.preventDefault();
        if (!this.state.Edit_Id) 
        {
            let data = {
                isEdit: this.state.isEdit,
                update_salary_id: this.state.update_salary_id,
                update_name: this.state.update_name,
                update_designation: this.state.update_designation,
                update_mobile: this.state.update_mobile,
                update_basic: this.state.update_basic,
                house_allowance: this.state.house_allowance,
                special_allowance: this.state.special_allowance,
                grade_allowance: this.state.grade_allowance,
                conveyance_allowance: this.state.conveyance_allowance,
        
            } 

            
            axios.post("http://localhost:4000/SalaryUpdate", data).then(res => {
                // this.props.history.push("/SalaryUpdate") 
                this.getAll();
                
            })
            console.log("checking_2",data )
        }

        else {
            let data = {
                _id: this.state._id,
               
                update_salary_id: this.state.update_salary_id,
                update_name: this.state.update_name,
                update_designation: this.state.update_designation,
                update_mobile: this.state.update_mobile,
                update_basic: this.state.update_basic,
                house_allowance: this.state.house_allowance,
                special_allowance: this.state.special_allowance,
                grade_allowance: this.state.grade_allowance,
                conveyance_allowance: this.state.conveyance_allowance,
               
            }                 
            axios.put("http://localhost:4000/SalaryUpdate/update", data).then(res => {
                this.props.history.push("/SalaryUpdate")
                localStorage.removeItem('SalaryUpdateEdit') 
                this.props.history.push("/SalaryUpdate")
                this.getAll();
              
            })

            console.log("Fdafads", data)
        }
    }

    getEmployeeCode() {
        axios.get("http://localhost:4000/Employee").then(res => {
            // console.log(res.data);
            this.setState({
                dataEmployeeCode: res.data
            })
            // console.log("employee", res.data)
        })
    }

    setEmployeeData = (id) => {
        this.setState({
            update_salary_id: id.target.value,
        });
        console.log('fee-->', this.state.dataEmployeeCode);
        this.state.dataEmployeeCode.map((item, key) => {
            console.log('item--->', item.emp_code, id.target.value);
            if (item.emp_code === id.target.value) {
                // console.log('same--->', id, item.name);
                // console.log('same--->', id, item.mobile);
                // console.log('same--->', id, item.designation);
                this.setState({
                    update_name: item.name,
                    update_mobile: item.mobile,
                    update_designation: item.designation
                });
            }
        });
    }


componentDidMount(props) {
    this.getAll();
    this.getEmployeeCode();
    const Edit_Id = localStorage.getItem('SalaryUpdateEdit')
    this.setState({
      Edit_Id
    })

    axios.get(`http://localhost:4000/SalaryUpdate/${Edit_Id}`).then(res => {
    
      this.setState({
                data : res.data,
                _id : res.data._id, 
                
                update_salary_id: this.state.update_salary_id,
                update_name: this.state.update_name,
                update_designation: this.state.update_designation,
                update_mobile: this.state.update_mobile,
                update_basic: this.state.update_basic,
                house_allowance: this.state.house_allowance,
                special_allowance: this.state.special_allowance,
                grade_allowance: this.state.grade_allowance,
                conveyance_allowance: this.state.conveyance_allowance,
               
      })
    }) 
    if(Edit_Id)
    {
         this.setState({
          menu :'Edit SalaryUpdate'
        })
    }
    else
    {
        this.setState({
          menu :'Add SalaryUpdate'
        })
    }

}
getAll() {
    axios.get("http://localhost:4000/SalaryUpdate").then(res => {
        
        this.setState({
            data: res.data
        })
        console.log("checking data",res.data);
    })
}

change = event => {
const {name,value} = event.target;
this.setState({
[name] : value
})
console.log("names", this.state.update_basic)
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

                                    <h4 className="page-title">Add Salary</h4>
                                </div>
                            </div>
                        </div>


                        <div className="row">
                            <div className="col-lg-12">
                                <div className="card m-b-20">
                                    
                                    <div className="card-body">
                                    <div style={{ marginTop: "-5px" }} >
                               
                               <Link to="/SalaryUpdate" onClick={ ()=>localStorage.removeItem('SalaryUpdateEdit') } className="btn btn-primary float-right">View List</Link>
                           </div>
                           <br>
                           </br>
                           <br>
                           </br>
                                        <form onSubmit={this.salaryupdate}>
                                            <div class="row">
                                              
                                                <div class="col-3">
                                                    <div className="form-group">
                                                        <label>Employee Id<span style={{ color: "red" }}>*</span></label>
                                                        <select name="update_salary_id" value={this.state.update_salary_id} onChange={this.setEmployeeData} className="form-control" >

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
                                                        {/* <span id="err" style={{ color: "red" }}>{this.state.user_id_err}</span> */}
                                                    </div>
                                                </div>
                                                <div class="col-3">
                                                    <div className="form-group">
                                                        <label>Name</label>
                                                        <input type="text" className="form-control" 
                                                        value={this.state.update_name} disabled
                                                         onChange={this.change} 
                                                         name="update_name"
                                                         placeholder="Enter Name" />
                                                        {/* <span id="err" style={{ color: "red" }}>{this.state.name_err}</span> */}
                                                    </div>
                                                </div>
                                                <div class="col-3">
                                                    <div className="form-group">
                                                        <label>Designation</label>
                                                        <input type="text" className="form-control" 
                                                        value={this.state.update_designation}
                                                         disabled 
                                                         name="update_designation"
                                                         onChange={this.change} placeholder="Enter Designation" />
                                                        {/* <span id="err" style={{ color: "red" }}>{this.state.designation_err}</span> */}
                                                    </div>
                                                </div>
                                                <div class="col-3">
                                                    <div className="form-group">
                                                        <label>Mobile</label>
                                                        <input type="text" className="form-control" 
                                                        value={this.state.update_mobile} disabled
                                                         onChange={this.change} placeholder="Enter Mobile" />
                                                        {/* <span id="err" style={{ color: "red" }}>{this.state.mobile_err}</span> */}
                                                    </div>
                                                </div>
                                              
                                            </div>
                                            <div class="row">
                                            <div class="col-3">
                                                    <div className="form-group">
                                                        <label>Basic<span style={{ color: "red" }}>*</span></label>
                                                        <input type="text" className="form-control"
                                                         value={this.state.update_basic}
                                                          onChange={this.change} 
                                                          name="update_basic"
                                                          placeholder="Enter Mobile" />
                                                        {/* <span id="err" style={{ color: "red" }}>{this.state.mobile_err}</span> */}
                                                    </div>
                                                </div>
                                                <div class="col-3">
                                                    <div className="form-group">
                                                        <label>House Rent Allowance<span style={{ color: "red" }}>*</span></label>
                                                        <input type="text" className="form-control"
                                                         value={this.state.house_allowance}
                                                          onChange={this.change} 
                                                          name="house_allowance"
                                                          placeholder="Enter Mobile" />
                                                        {/* <span id="err" style={{ color: "red" }}>{this.state.mobile_err}</span> */}
                                                    </div>
                                                </div>
                                                <div class="col-3">
                                                    <div className="form-group">
                                                        <label>Special Allowance<span style={{ color: "red" }}>*</span></label>
                                                        <input type="text" className="form-control" 
                                                        value={this.state.special_allowance} 
                                                        onChange={this.change}
                                                        name="special_allowance"
                                                        placeholder="Enter Mobile" />
                                                        {/* <span id="err" style={{ color: "red" }}>{this.state.mobile_err}</span> */}
                                                    </div>
                                                </div>
                                                <div class="col-3">
                                                    <div className="form-group">
                                                        <label>Grade Allowance<span style={{ color: "red" }}>*</span></label>
                                                        <input type="text" className="form-control"
                                                        value={this.state.grade_allowance} 
                                                        name="grade_allowance"
                                                        onChange={this.change} placeholder="Enter Mobile" />
                                                        {/* <span id="err" style={{ color: "red" }}>{this.state.mobile_err}</span> */}
                                                    </div>
                                                </div>

</div>
<div class="row">
<div class="col-3">
                                                    <div className="form-group">
                                                        <label>Conveyance Allowance<span style={{ color: "red" }}>*</span></label>
                                                        <input type="text" className="form-control" 
                                                        value={this.state.conveyance_allowance} 
                                                        onChange={this.change}
                                                        name="conveyance_allowance"
                                                        placeholder="Enter Mobile" />
                                                        {/* <span id="err" style={{ color: "red" }}>{this.state.mobile_err}</span> */}
                                                    </div>
                                                </div>
                                                <div class="col-2">
                                                    <div className="form-group">
                                                        <br></br>

                                                        <button type="submit" onChange={this.change} className="btn btn-primary waves-effect waves-light float-right" style={{ width: "130px" }}>
                                                            Submit
                                            </button>
                                                    </div>
                                                </div>
                                               
                                                </div>

                                               
                                         

                                        </form>
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

export default AddSalaryUpdate;   