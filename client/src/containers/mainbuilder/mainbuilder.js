import React , { useState } from 'react';
import Dashboard1 from '../MainContent/Requirement/Dashboard1';

//Newly added
import Employee from '../MainContent/Requirement/Employee';
import Users from '../MainContent/Requirement/Users';
import Salary_print from '../MainContent/Requirement/Salary_print';
import AddEmployee from '../MainContent/Requirement/AddEmployee';
import AddSalary from '../MainContent/Requirement/AddSalary';
import AddUser from '../MainContent/Requirement/AddUser';
import loginpage from '../MainContent/Requirement/Pages_login';
import SalaryUpdate from '../MainContent/Requirement/SalaryUpdate';
import AddSalaryUpdate from '../MainContent/Requirement/AddSalaryUpdate';
import Sample from '../MainContent/Requirement/Sample';

import { Route,Switch } from 'react-router-dom';

function mainbuilder(){
        return(
                <Switch> 
{/* <Route path="/" exact  component={Pages_login} /> */}
                  <Route path="/Sample" component={Sample} />
                  <Route path="/Employee" component={Employee} />
                  <Route path="/Users" component={Users} />
                  <Route path="/Salary_print" component={Salary_print} />
                  <Route path="/AddEmployee" component={AddEmployee} />
                  <Route path="/AddSalary" component={AddSalary} />
                  <Route path="/AddUser" component={AddUser} />
                  <Route path="/" exact component={loginpage} />
                  <Route path="/SalaryUpdate" exact component={SalaryUpdate} />
                  <Route path="/AddSalaryUpdate" exact component={AddSalaryUpdate} />

                  <Route path="/Dashboard1" component={Dashboard1} />
                    
                </Switch>
        );
    }


export default mainbuilder;