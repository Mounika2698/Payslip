import React , {Component } from 'react';

import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actionTypes from '../../../store/action';

import axios from 'axios';
import { Redirect } from "react-router-dom";

class loginpage extends Component{
 
    constructor(props){
        
        super(props)

        const token = localStorage.getItem("token")

        let loggedIn = true
        if(token == null){
            loggedIn = false
        }
        
        this.state={
            data : [],
            user :"",
            password : "",
            error : "",
            loggedIn
        }

        this.onChange = this.onChange.bind(this)
        this.submitForm = this.submitForm.bind(this)
}

    componentDidMount() {
        if(this.props.loginpage === false)
        {
          this.props.UpdateLogin();
        }

        window.onpopstate  = (e) => {
          this.props.UpdateLoginAgain();
        }
       }

       onChange(e){
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    componentDidMount() {
        this.getAll();
    }
    
    getAll() {
        axios.get("http://localhost:4000/Users").then(res => {
             // console.log(res.data);
            this.setState({
                data: res.data
            })
        })
    }
    
    submitForm(event){
    event.preventDefault()
        const { user, password,  } = this.state
        //login magic
      const  userId = this.state.user;
      const  passwords = this.state.password;
      const  aduse = this.state.emai;
      const  adpass = this.state.pass;
    
      if(user == 'head@macbrotech.com' && password =='123456')
      {
          console.log("4")
          this.props.history.push('./Dashboard') 
          localStorage.setItem('auth', JSON.stringify("ff")); 
      
      }
      if(user !== '' && password !==''){
        console.log("1")
        axios.get(`http://localhost:4000/Users/Pages_login/${userId}/${passwords}`,)
        .then(res => {
            
            axios.get(`http://localhost:4000/Users/GetUsersDetails/${userId}/${passwords}`).then(res => { 
                console.log("login",res.data)   
                localStorage.setItem('User_ID', JSON.stringify(res.data)); 
            
            })
            
            localStorage.setItem('auth', JSON.stringify(res.data)); 
            this.props.history.push('./Dashboard1')
            
         })                            
           .catch(err => { 
                    console.log("err",err)
                    this.setState({
                        error : err.response.data
                    }) 
            })
    
    } 
    
       
        else if(user=='' && password ==''){
            console.log("2")
           this.setState({
               error :"Please Enter Email ID and Password"
           })
        }
        else  if(user != loginpage.user && password != loginpage.password) 
        {
            console.log("3")
            this.setState({
                error :"Invalid Email ID and Password"
            })  
        }
    
    }
    
render(){
    return(
           <div>
		   <div className="accountbg"></div>
           <div className="wrapper-page">
            <div className="card">
                <div className="card-body">
                    <h3 className="text-center m-0">
                        <Link to="/" onClick={()=> this.props.UpdateLoginAgain()} className="logo logo-admin"><img src="assets/images/logo.png" height="30" alt="logo" /></Link>
                    </h3>

                    <div className="p-3">
                        <h4 className="font-18 m-b-5 text-center">Welcome Back !</h4>
                        <p className="text-muted text-center">Sign in</p>

                        <form className="form-horizontal m-t-30" action="/Dashboard1">

                            <div className="form-group">
                                <label for="username">Username</label>
                                <input type="text" className="form-control" value={this.state.user} onChange={this.onChange} required=""  placeholder="Enter username" />
                            </div>

                            <div className="form-group">
                                <label for="userpassword">Password</label>
                                <input type="password" className="form-control" name="password" value={this.state.password} required="" onChange={this.onChange} placeholder="Enter password" />
                            </div>

                            <div className="form-group row m-t-20">
                                
                                <div className="col-sm-12 text-right">
                                    <button className="btn btn-primary w-md waves-effect waves-light" style={{marginRight:"120px"}} type="submit">Log In</button>
                                </div>
                            </div>

                        </form>
                    </div>
                </div>
            </div>

            </div>
        </div>
           
        );
    }
}

const mapStatetoProps = state => {
    return {
        loginpage: state.ui_red.loginpage
    };
}
const mapDispatchtoProps = dispatch => {
    return {
        UpdateLogin: () => dispatch({ type: actionTypes.LOGINPAGE, value: true }),
        UpdateLoginAgain: () => dispatch({ type: actionTypes.LOGINPAGE, value: false })
    };
}
export default connect(mapStatetoProps, mapDispatchtoProps)(loginpage);
