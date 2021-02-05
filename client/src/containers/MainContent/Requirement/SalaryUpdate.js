import React , {Component } from 'react';
import AUX from '../../../hoc/Aux_';
import { Link } from 'react-router-dom';
import { Dropdown, Button, DropdownToggle, DropdownMenu, DropdownItem, ButtonGroup } from 'reactstrap';
import ReactTooltip from 'react-tooltip';
import axios from 'axios';



var User = localStorage.getItem('user_id')


const initialState = {
    salaryUpdateData: [],
    datas: [],
    editData: [],
    isEdit: false,
    message: ""
}

class SalaryUpdate extends Component {
    state = initialState;
    constructor() {
        super();
    
    }

    componentDidMount() {
        this.getAll();      
    }

    getAll() {

        axios.get("http://localhost:4000/SalaryUpdate").then(res => {
            this.setState({
                salaryUpdateData: res.data,
            })
           console.log("res.data", res.data)
        })
    }

    del = data => {
        var option = window.confirm(`Are you sure Want to Delete ${data.update_salary_id}`)
        if (option) {
            axios.delete(`http://localhost:4000/SalaryUpdate/del/${data._id}`).then(res => {
                this.setState({
                    message: "Deleted Successfully"
                })
            })
        }
    }

    viewSalaryUpdate = data => {
        axios.get(`http://localhost:4000/SalaryUpdate/${data._id}`).then(res => {

            this.setState({
                datas: res.data
            })
            console.log("datas", res.data)
        })

     
        this.getAll();
    }

    
    updateSalary = data => {
        axios.get(`http://localhost:4000/SalaryUpdate/${data._id}`).then(res => {
           localStorage.setItem('SalaryUpdateEdit',data._id);          
           window.location.href = '/AddSalaryUpdate'
         console.log("dddd",data._id)
                
  }) 
}

    //   editProduct = data => {
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
    //         update_salary_id: this.state.update_salary_id,
    //         update_name: this.state.update_name,
    //         update_designation: this.state.update_designation,
    //         update_mobile: this.state.update_mobile,
    //         update_basic: this.state.update_basic,
    //         house_allowance: this.state.house_allowance,
    //         special_allowance: this.state.special_allowance,
    //         grade_allowance: this.state.grade_allowance,
    //         conveyance_allowance: this.state.conveyance_allowance,
    
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

                           <Link to="/AddSalaryUpdate"   className="btn btn-primary float-right">Add New</Link> 
                           <br></br>
                           <br></br>
                        

                               <table id="datatable" className="table  dt-responsive nowrap table-vertical" width="100%" cellspacing="0">
                                   <thead>
                                   <tr>
                                   <th>S/no</th>
                                          
                                          <th>Employee Id</th>
                                          <th>Name</th> 
                                          <th>Designation</th>
                                          <th>Mobile</th>
                                          {/* <th>Basic Allowance</th>
                                          <th>House Rent Allowance</th>
                                          <th>Special Allowance</th>
                                          <th>Conveyance Allowance</th> */}
                                           <th>Action</th>
                                   </tr>
                                   </thead>
                                        <tbody>
                                       

                                       {

                                           (
                                               this.state.salaryUpdateData.length > 0 ?

                                                   this.state.salaryUpdateData.map((SalaryUpdate, index) =>
                                                       <tr key={SalaryUpdate._id}>
                                                           <td>{index + 1}</td>
                                                           <td>{SalaryUpdate.update_salary_id}</td>
                                                           <td>{SalaryUpdate.update_name}</td>
                                                           <td>{SalaryUpdate.update_designation}</td>
                                                           <td>{SalaryUpdate.update_mobile}</td>
                                                           {/* <td>{SalaryUpdate.update_basic}</td>
                                                           <td>{SalaryUpdate.house_allowance}</td>
                                                           <td>{SalaryUpdate.special_allowance}</td>
                                                           <td>{SalaryUpdate.conveyance_allowance}</td> */}
                                                           

                                                           <td>
                                                               <a data-tip="View" href="" onClick={() => this.viewSalaryUpdate(SalaryUpdate)} data-toggle="modal" data-target="#exampleModal2"> <i className="text-primary fa fa-eye"></i></a>&nbsp;
                                                               <a data-tip=" Edit" href=""  ><i className=" text-dark fa fa-pencil" aria-hidden="true" onClick={() => this.updateSalary(SalaryUpdate)} /></a>
                                                               <a data-tip="Delete" href=""> <i className="fa fa-times text-danger" onClick={event => { this.del(SalaryUpdate) }}></i></a>
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
    
    


    {/* view */}


    <div className="modal fade" id="exampleModal2" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel2" aria-hidden="true">
                                                    <div className="modal-dialog" role="document">
                                                        <div className="modal-content">
                                                            <div className="modal-header">
                                                                <h5 className="modal-title" id="exampleModalLabel2">View Details</h5>
                                                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                                                    <span aria-hidden="true">×</span>
                                                                </button>
                                </div>
                                <div className="modal-body">
                                                                        <p> <label> Employee Id : </label>&nbsp; {this.state.datas.update_salary_id}</p>
                                                                        <p> <label>Name : </label>&nbsp; {this.state.datas.update_name} </p>
                                                                        <p> <label>Designation  : </label>&nbsp;{this.state.datas.update_designation} </p>
                                                                        <p><label>Mobile  : </label>&nbsp;{this.state.datas.update_mobile}</p>
                                                                        <p><label>Basic Allowance  : </label>&nbsp; {this.state.datas.update_basic}</p>
                                                                        <p> <label>House Rent Allowance  : </label>&nbsp;{this.state.datas.house_allowance}</p>
                                                                        <p> <label>Special Allowance  : </label>&nbsp; {this.state.datas.special_allowance}</p>
                                                                        <p> <label>Conveyance Allowance  : </label>&nbsp;{this.state.datas.conveyance_allowance}</p>
                                                                        
                                </div>
                            </div>
                            </div></div>



                               {/* password */}
<div className="modal fade" id="exampleModal7" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel7" aria-hidden="true">
                        <div className="modal-dialog" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="exampleModalLabel7">Change password</h5>
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">×</span>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    <form>
                                     
                                        <div className="form-group">
                                            <label htmlFor="recipient-name" className="col-form-label">Password</label>
                                            <input type="text" className="form-control" name="traineName" id="recipient-name" />
                                          
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="recipient-name" className="col-form-label">New Password</label>
                                            <input type="text" className="form-control" name="original_amt" id="recipient-name"   />
                                        </div>
                                        
                                        <div className="form-group">
                                           
                                            <input type="submit" name="submit" defaultValue="Submit" className="form-control btn btn-info" />
                                        </div>
                                    </form>
                                </div>
                            </div>
                            </div></div>
           </AUX>
        );
    }
}

export default SalaryUpdate;   