import React , {useEffect, useState } from 'react';
import AUX from '../../../hoc/Aux_';
import { Link } from 'react-router-dom';
import { Dropdown, Button, DropdownToggle, DropdownMenu, DropdownItem, ButtonGroup } from 'reactstrap';
import axios from 'axios';
import ReactTooltip from 'react-tooltip';
import Moment from 'react-moment';
import {getClaimPeriod} from '../Requirement/axios'


function Employee(){
    
const [EmployeeData, setEmployeeData]= useState([]);

useEffect(() => {
    
    axios.get(`http://localhost:4000/Employee`,)
      .then((response) => {
          console.log("test", response.data)
          setEmployeeData( response.data)

      })
   
  }, [])

  console.log("test454",EmployeeData)
 
   
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
                                    <li className="breadcrumb-item active">Employee</li>
                                </ol>
                            </div>
                            <h4 className="page-title">Employee List</h4>
                        </div>
                    </div>
                </div>
                
                         <div className="row">
                        <div className="col-12">
                       
                            <div className="card m-b-20">
                                <div className="card-body">
                                <div className="row">
                                <div className="col-md-2">
                                                                <div className="form-group">
                                                                    <label>Name</label>
                                                                    {/* <input name="month" type="text" className="form-control" maxLength="10" placeholder="Search" onChange={this.Change} /> */}
                                                                    <p id="errprice" className="em no-margin text-danger"></p>
                                                                </div>
                                                            </div>
</div>
                                <Link to="/AddEmployee"   className="btn btn-primary float-right">Add New</Link> 
                                <br></br>
                                <br></br>
                             
                                    <table id="datatable" className="table  dt-responsive nowrap table-vertical" width="100%" cellspacing="0">
                                        <thead className="text-dark">
                                        <tr>
                                            <th>S/no</th>
                                            <th>Photo</th>
                                            <th>Employee Code</th>
                                            <th>Name</th> 
                                            <th>Designation</th>
                                            <th>Mobile</th>
                                            <th>Email</th>
                                            
                                             <th>Action</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                  {
                                                            (
                                                               EmployeeData.length > 0 ?

                                                               EmployeeData.map((Employee, index) =>
                                                                       <tr key={Employee._id}>
                                                                          <td>{index + 1}</td>
                                                                             <td>{!Employee.photo ? <img src={process.env.PUBLIC_URL + `/assets/images/users/boy.png`} width="50px" height="50px" style={{ borderRadius: '30px' }} /> : <img src={process.env.PUBLIC_URL + `/uploads/Employee/${Employee.photo}`} width="50px" height="50px" style={{ borderRadius: '30px' }} />}</td>
                                                                         <td>{Employee.emp_code}</td>
                                                         <td>{Employee.name}</td>
                                                                     <td>{Employee.designation}</td>
                                                                        <td>{Employee.mobile}</td>
                                                                          <td>{Employee.email}</td>
                                                                           <td>
                                                                                 <a data-tip="View" href="" onClick={() => this.viewEmployee(Employee)} data-toggle="modal" data-target="#exampleModal2"> <i className="text-primary fa fa-eye"></i></a>&nbsp;
                                                                             <a data-tip=" Edit" href=""  ><i className=" text-dark fa fa-pencil" aria-hidden="true" onClick={() => this.updateEmployee(Employee)} /></a>
                                                                            <a data-tip="Delete" href=""> <i className="fa fa-times text-danger" onClick={event => { this.del(Employee) }}></i></a>
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
                                                                        {/* <p> <label>  Photo : </label>&nbsp; {this.state.datas.photo}</p>
                                                                        <p> <label>Employee Code  : </label>&nbsp; {this.state.datas.emp_code} </p>
                                                                        <p> <label>Name  : </label>&nbsp;{this.state.datas.name} </p>
                                                                        <p><label>Date of Joining  : </label>&nbsp;{this.state.datas.date_of_joining}</p>
                                                                        <p><label>Date of Birth  : </label>&nbsp; {this.state.datas.dob}</p>
                                                                        <p> <label>Email  : </label>&nbsp;{this.state.datas.email}</p>
                                                                        <p> <label>Grade  : </label>&nbsp; {this.state.datas.grade}</p>
                                                                        <p> <label>Blood Group  : </label>&nbsp;{this.state.datas.blood_group}</p>
                                                                        <p><label>Father's Name  : </label>&nbsp; {this.state.datas.father_name}</p>
                                                                        <p> <label>Mother's Name  : </label>&nbsp;{this.state.datas.mother_name}</p>
                                                                        <p><label>Spouse Name  : </label>&nbsp; {this.state.datas.spouse_name}</p>
                                                                        <p><label>Home Address  : </label>&nbsp; {this.state.datas.home_address}</p>
                                                                        <p> <label>Home Phone  : </label>&nbsp; {this.state.datas.mobile} </p>
                                                                        <p> <label>Designation  : </label>&nbsp; {this.state.datas.designation}</p>
                                                                        <p><label>Passport Number  : </label>&nbsp; {this.state.datas.passport_number}</p>
                                                                        <p> <label>Pan Number  : </label>&nbsp; {this.state.datas.pan_number}</p>
                                                                        <p> <label>Aadhar Number  : </label>&nbsp; {this.state.datas.aadhar}</p> */}
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


export default Employee;   