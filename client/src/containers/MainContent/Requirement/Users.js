import React , {Component, useEffect, useState } from 'react';
import AUX from '../../../hoc/Aux_';
import { Link } from 'react-router-dom';
import { Dropdown, Button, DropdownToggle, DropdownMenu, DropdownItem, ButtonGroup } from 'reactstrap';
import axios from 'axios';
import ReactTooltip from 'react-tooltip';
import Moment from 'react-moment';



let loggedIn = false
var User = localStorage.getItem('user_id')

function Users(){

const [UserData, setUserData] = useState([]);

useEffect(() => {
    axios.get('http://localhost:4000/Users').then(
        res => {
            console.log("dada",res.data)
            setUserData(res.data)
        }
    )

}, [])
console.log("test", UserData)


//     del = data => {
//         var option = window.confirm(`Are you sure Want to Delete ${data.user_name}`)
//         if (option) {
//             axios.delete(`http://localhost:4000/Users/del/${data._id}`).then(res => {
//                 this.setState({
//                     message: "Deleted Successfully"
//                 })
//             })
//         }
//     }

    

//  Password  Coding

// Password = data =>{
//     axios.get(`http://localhost:4000/Users/${data._id}`).then(res => {
//          this.setState({
//              datapass :res.data
//             })            
//      })    
// }

// addPassword = event => {
//     const {name,value}=event.target;
//     this.setState({
//         [name] : value
//     })
// } 

// passwordSubmit = event =>
// {
//         event.preventDefault();
//         let data = 
//             {               
//                 user_pass : this.state.user_pass,
//                 user_confirm_pass : this.state.user_confirm_pass,
//                 passID : this.state.datapass._id               
//             } 
//             console.log(data)   
//             axios.put("http://localhost:4000/Users/update",data).then(res => {
//                     this.getAll();
//                 }) 
//                 window.location.reload('true')                 
// }


//     viewUsers = data => {
//         axios.get(`http://localhost:4000/Users/${data._id}`).then(res => {

//             this.setState({
//                 datas: res.data
//             })
//             console.log("datas", res.data)
//         })

     
//         this.getAll();
//     }

//     updateUsers = data => {
//          axios.get(`http://localhost:4000/Users/${data._id}`).then(res => {
//             localStorage.setItem('UsersEdit',data._id);          
//             window.location.href = '/AddUser'
//           console.log("dddd",data._id)
                 
//    }) 
// }

//     editUser = data => {
//         console.log("testting", data)
//         this.setState({
//           editData: data
//         })
        
//         console.log( "data check for ",this.state.data)
//         if (this.state._id != null) {
//           this.setState({
//             isEdit: true,
//             _id: this.state._id,
//             isEdit: this.state.isEdit,
                  
//                     user_id: this.state.user_id,
//                     user_mobile: this.state.user_mobile,
//                      user_name: this.state.user_name,
//                     user_designation: this.state.user_designation,
//                     user_pass : this.state.user_pass,
//                     user_confirm_pass: this.state.user_confirm_pass
    
//           })
//         }
    
//       }

 
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
                                    <li className="breadcrumb-item active">Users</li>
                                </ol>
                            </div>
                            <h4 className="page-title">Users List</h4>
                        </div>
                    </div>
                </div>
                
                         <div className="row">
                        <div className="col-12">
                       
                            <div className="card m-b-20">
                                <div className="card-body">
                              
                                <Link to="/AddUser"   className="btn btn-primary float-right">Add New</Link> 
                                <br></br>
                                <br></br>
                             
                                    <table id="datatable" className="table  dt-responsive nowrap table-vertical" width="100%" cellspacing="0">
                                        <thead className="text-dark">
                                        <tr>
                                            <th>S/no</th>
                                            <th>Employee ID</th>
                                            <th>Name</th>
                                            <th>Mobile</th> 
                                            <th>Designation</th>
                                             <th>Action</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                       
                                                        {

                                                            (
                                                                UserData.length > 0 ?

                                                                UserData.map((Users, index) =>
                                                                        <tr key={Users._id}>
                                                                            <td>{index + 1}</td>
                                                                            <td>{Users.user_id}</td>
                                                                            <td>{Users.user_name}</td>
                                                                            <td>{Users.user_mobile}</td>
                                                                            <td>{Users.user_designation}</td>
                                                                            
                                                                            <td>
                                                                                <a data-tip="Password" href="" onClick={() => this.viewUsers(Users)} data-toggle="modal" data-target="#exampleModal7"> <i className="text-primary fa fa-unlock-alt"></i></a>&nbsp;
                                                                                <a data-tip="Delete" href=""> <i className="fa fa-times text-danger" onClick={event => { this.del(Users) }}></i></a>
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
                            
                            </div>
                            </div></div>
           </AUX>
        );
    }

export default Users;   