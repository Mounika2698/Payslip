import React, {Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Link, } from 'react-router-dom';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem  } from 'reactstrap';
import { Scrollbars } from 'react-custom-scrollbars';
import $ from 'jquery';


class topbar extends Component {

   constructor(props) {
        super(props);
        this.state = {
            Tab: 'index', SubTab: '', MoreTab: '',
            dashboard_menu : false ,  emp_menu : false, user_menu : false, print_menu : false,  eco_menu: false,
            dropdownOpen: false,
            dropdownOpen1: false,
            dropdownOpenprofile: false,
            dropdownOpenbadge: false,
            toggleEmail : false, 
            toggleForm: false,
            toggleChart: false,
            toggleTable: false,
            toggleIcon: false,
            toggleMap: false,
            toggleEmailTemp: false,
        };

        this.toggle = this.toggle.bind(this);
        this.toggle1 = this.toggle1.bind(this);
        this.toggleprofile = this.toggleprofile.bind(this);
        this.togglebadge = this.togglebadge.bind(this);
    }

    toggle() {
        this.setState(prevState => ({
          dropdownOpen: !prevState.dropdownOpen
        }));
      }
      toggle1() {
        this.setState(prevState => ({
          dropdownOpen1: !prevState.dropdownOpen1
        }));
      }
      toggleprofile() {
        this.setState(prevState => ({
          dropdownOpenprofile: !prevState.dropdownOpenprofile
        }));
      }
      togglebadge() {
        this.setState(prevState => ({
          dropdownOpenbadge: !prevState.dropdownOpenbadge
        }));
      }
      
    setActiveTab = (tab,subtab,moretab,toggleTab, e)=> {
        this.setState({Tab: tab,SubTab: subtab,MoreTab: moretab});
         if(subtab === 'email') { this.setState({ toggleEmail : toggleTab }) } 
         else if(subtab === 'form') { this.setState({ toggleForm : toggleTab })  }
         else if(subtab === 'chart') { this.setState({ toggleChart : toggleTab })  }
         else if(subtab === 'table') { this.setState({ toggleTable : toggleTab })  }
         else if(subtab === 'icon') { this.setState({ toggleIcon : toggleTab })  }
         else if(subtab === 'map') { this.setState({ toggleMap : toggleTab })  }
         else if(subtab === 'emt') { this.setState({ toggleEmailTemp : toggleTab })  }
         else{ }
    }

    componentDidMount() 
    {
        $('.navbar-toggle').on('click', function (event) {
            $(this).toggleClass('open');
            $('#navigation').slideToggle(400);
        });

        $('li.has-submenu #dest_id').on('click', function (event) {
            if ($(window).width() < 992) 
            {
                $('.navbar-toggle').toggleClass('open');
                $('#navigation').slideToggle(400);
            }
        });

        $('.navigation-menu>li').slice(-1).addClass('last-elements');

        $('.navigation-menu li.has-submenu a[href="#"]').on('click', function (e) {
            if ($(window).width() < 992) {
                e.preventDefault();
                $(this).parent('li').toggleClass('open').find('.submenu:first').toggleClass('open');
            }
        });

        $('.toggle-search').on('click', function () {
            var targetId = $(this).data('target');
            var $searchBar;
            if (targetId) {
                $searchBar = $(targetId);
                $searchBar.toggleClass('open');
            }
        });
    }

    togglescreen(e)
    {
        if (!document.fullscreenElement && !document.mozFullScreenElement && !document.webkitFullscreenElement) {  // current working methods
            if (document.documentElement.requestFullscreen) {
                document.documentElement.requestFullscreen();
            } else if (document.documentElement.mozRequestFullScreen) {
                document.documentElement.mozRequestFullScreen();
            } else if (document.documentElement.webkitRequestFullscreen) {
                document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
            }
        } else {
            if (document.cancelFullScreen) {
                document.cancelFullScreen();
            } else if (document.mozCancelFullScreen) {
                document.mozCancelFullScreen();
            } else if (document.webkitCancelFullScreen) {
                document.webkitCancelFullScreen();
            }
        }
    }

    render() {
        return (
            <header id="topnav">
            <div className="topbar-main">
                <div className="container-fluid">

                    <div className="logo">
                        <Link to="/" className="logo"></Link>
                        <Link to="/Dashboard1" className="logo">
                            <img src="assets/images/logo.png" alt="" height="30" />
                        </Link>
                    </div>

                    <div className="menu-extras topbar-custom">
                        <div className="search-wrap" id="search-wrap">
                            <div className="search-bar">
                                <input className="search-input" type="search" placeholder="Search" />
                                <Link to="#" className="close-search toggle-search" data-target="#search-wrap">
                                    <i className="mdi mdi-close-circle"></i>
                                </Link>
                            </div>
                        </div>

                        <ul className="list-inline float-right mb-0">
                            <li className="list-inline-item dropdown notification-list">
                                <Link className="nav-link waves-effect toggle-search" to="#"  data-target="#search-wrap">
                                    <i className="mdi mdi-magnify noti-icon"></i>
                                </Link>
                            </li>
                            <li className="list-inline-item dropdown notification-list hide-phone">
                                <Link  onClick={() => this.togglescreen()}  className="nav-link waves-effect" to="#" id="btn-fullscreen">
                                    <i className="mdi mdi-fullscreen noti-icon"></i>
                                </Link>
                            </li>
                            <li className="list-inline-item dropdown notification-list hide-phone">

                              <Dropdown isOpen={this.state.dropdownOpen1}  toggle={this.toggle1}>
                              <DropdownToggle  className="nav-link dropdown-toggle arrow-none waves-effect text-muted" tag="a">
                                        <span style={{color:"#fff"}}>English</span> <img src="assets/images/flags/us_flag.jpg" className="ml-2" height="16" alt="" />
                                    </DropdownToggle>
                                    <DropdownMenu className='dropdown-menu dropdown-menu-right language-switch'>
                                    <a className="dropdown-item" href="#"><img src="assets/images/flags/germany_flag.jpg" alt="" height="16"/><span> German </span></a>
                                    <a className="dropdown-item" href="#"><img src="assets/images/flags/italy_flag.jpg" alt="" height="16"/><span> Italian </span></a>
                                    <a className="dropdown-item" href="#"><img src="assets/images/flags/french_flag.jpg" alt="" height="16"/><span> French </span></a>
                                    <a className="dropdown-item" href="#"><img src="assets/images/flags/spain_flag.jpg" alt="" height="16"/><span> Spanish </span></a>
                                    <a className="dropdown-item" href="#"><img src="assets/images/flags/russia_flag.jpg" alt="" height="16"/><span> Russian </span></a>
                                   </DropdownMenu>
                                </Dropdown>
                            </li>
                            <li className="list-inline-item dropdown notification-list">

                            <Dropdown isOpen={this.state.dropdownOpenbadge}  toggle={this.togglebadge}>
                                    <DropdownToggle className="nav-link dropdown-toggle droptest arrow-none waves-effect" tag="a">
                                        <i className="ion-ios7-bell noti-icon"></i>
                                        <span className="badge badge-pill badge-danger noti-icon-badge">3</span>
                                    </DropdownToggle>
                                    <DropdownMenu className="dropdown-menu dropdown-menu-right dropdown-menu-lg">
                                    <h6 className="dropdown-item-text">
                                            Notifications (258)
                                        </h6>
                                    <DropdownItem >
                                    <Scrollbars style={{ height: "200px" }} className="notification-item-list" >
                                       <Link id="ex" to="#" className="dropdown-item notify-item active">
                                         <div className="notify-icon bg-success"><i className="mdi mdi-cart-outline"></i></div>
                                         <p className="notify-details">Your order is placed<span className="text-muted">Dummy text of the printing and typesetting industry.</span></p>
                                       </Link>

                                       <Link id="ex" to="#" className="dropdown-item notify-item">
                                            <div className="notify-icon bg-warning"><i className="mdi mdi-message-text-outline"></i></div>
                                            <p className="notify-details">New Message received<span className="text-muted">You have 87 unread messages</span></p>
                                        </Link>
                                        
                                        <Link id="ex" to="#" className="dropdown-item notify-item">
                                            <div className="notify-icon bg-info"><i className="mdi mdi-martini"></i></div>
                                            <p className="notify-details">Your item is shipped<span className="text-muted">It is a long established fact that a reader will</span></p>
                                        </Link>
                                       
                                        </Scrollbars>
                                        <Link id="ex" to="#" className="dropdown-item text-center text-primary">
                                            View all <i className="fi-arrow-right"></i>
                                        </Link>
                                    </DropdownItem>
                                    </DropdownMenu>                                
                                </Dropdown>   

                            </li>
                            <li className="list-inline-item dropdown notification-list">

                             <Dropdown isOpen={this.state.dropdownOpenprofile}  toggle={this.toggleprofile}>
                                    <DropdownToggle className="nav-link dropdown-toggle droptest arrow-none waves-effect nav-user" tag="a">
                                    <img src="assets/images/users/avatar-4.jpg" alt="user" className="rounded-circle" />
                                    </DropdownToggle>
                                    <DropdownMenu>
                                    <DropdownItem><i className="mdi mdi-account-circle m-r-5"></i> Profile</DropdownItem>
                                    <DropdownItem><i className="mdi mdi-wallet m-r-5"></i> My Wallet</DropdownItem>
                                    <DropdownItem><span className="badge badge-success float-right">11</span><i className="mdi mdi-settings m-r-5"></i> Settings</DropdownItem>
                                    <DropdownItem><i className="mdi mdi-lock-open-outline m-r-5"></i> Lock screen</DropdownItem>
                                <Link to="" >  <DropdownItem><i className="mdi mdi-power text-danger"></i> Logout</DropdownItem></Link> 
                                    </DropdownMenu>
                                </Dropdown>

                            </li>
                            <li className="menu-item list-inline-item">
                                <Link to="#"  className="navbar-toggle nav-link">
                                    <div className="lines">
                                        <span></span>
                                        <span></span>
                                        <span></span>
                                    </div>
                                </Link>
                            </li>

                        </ul>
                    </div>
                    <div className="clearfix"></div>
                </div>
            </div>

            <div className="navbar-custom">
                <div className="container-fluid">
                    <div id="navigation">
                        <ul className="navigation-menu">
                       
                        <li className={this.state.Tab === 'index' ? 'has-submenu ' : 'has-submenu'}>
                                <Link to="/Dashboard1"   onClick={()=> this.setState({ dashboard_menu: !this.state.dashboard_menu }) } ><i className="mdi mdi-view-dashboard"></i>Dashboard</Link>
                                {/* <ul className={this.state.dashboard_menu ? "submenu open" : "submenu" } >
                                    <li><Link className={this.state.SubTab === 'dashboard1' ? 'active-menu':''} onClick={this.setActiveTab.bind(this, 'index','dashboard1','')}  to="/">Dashboard 1</Link></li>
                                    <li> <Link className={this.state.SubTab === 'dashboard2' ? 'active-menu' : ''} onClick={this.setActiveTab.bind(this, 'index','dashboard2','')}   to="dashboard2">Dashboard 2</Link></li>
                                </ul> */}
                            </li>

                            <li className={this.state.Tab === 'ui' ? 'has-submenu active' : 'has-submenu'}>
                                <Link to="/Employee" onClick={()=> this.setState({ emp_menu: !this.state.emp_menu }) } to="/Employee"><i className="mdi mdi-buffer"></i>Employees</Link>
                             
                           </li>
                           
                           <li className={this.state.Tab === 'ui' ? 'has-submenu active' : 'has-submenu'}>
                                <Link to="/SalaryUpdate" onClick={()=> this.setState({ emp_menu: !this.state.emp_menu }) } to="/SalaryUpdate"><i className="mdi mdi-book"></i>Salary Update</Link>
                             
                           </li>
                           
                           <li className={this.state.Tab === 'comp' ? "has-submenu active" :  "has-submenu"}>
                                <Link to="/Users" onClick={()=> this.setState({ user_menu: !this.state.user_menu }) }><i className="mdi mdi-cube-outline"></i>Users</Link>
                                {/* <ul className={this.state.user_menu ? "submenu open" : "submenu" }>
                                    <li className="has-submenu" >
                                        <Link to="/" className={this.state.SubTab === 'email' ? 'active-menu':''} onClick={this.setActiveTab.bind(this,'comp', 'email','',!this.state.toggleEmail)}>Email</Link>
                                        {/* <ul className={this.state.toggleEmail  ? "submenu open" : "submenu" }>
                                            <li id="dest_id"><Link className={this.state.MoreTab === 'email_inbox' ? 'active-menu':''} onClick={this.setActiveTab.bind(this,'comp', 'email','email_inbox')} to="email_inbox">Inbox</Link></li>
                                            <li id="dest_id"><Link className={this.state.MoreTab === 'email_read' ? 'active-menu':''} onClick={this.setActiveTab.bind(this,'comp', 'email','email_read')} to="email_read">Email Read</Link></li>
                                            <li id="dest_id"><Link className={this.state.MoreTab === 'email_compose' ? 'active-menu':''} onClick={this.setActiveTab.bind(this, 'comp','email','email_compose')} to="email_compose">Email Compose</Link></li>
                                        </ul> */}
                                    {/* </li>  */}
                                    {/* <li>
                                        <Link className={this.state.Tab === 'wid' ? 'active-menu':''} onClick={this.setActiveTab.bind(this,'comp', 'wid','')} to="widgets">Widgets</Link>
                                    </li>
                                    <li>
                                        <Link to="calendar">Calendar</Link>
                                    </li>
                                    <li className="has-submenu">
                                        <Link className={this.state.SubTab === 'form' ? 'active-menu':''} onClick={this.setActiveTab.bind(this,'comp', 'form','',!this.state.toggleForm)} to="#">Forms</Link>
                                        <ul className={this.state.toggleForm  ? "submenu open" : "submenu" }>
                                            <li id="dest_id"><Link className={this.state.MoreTab === 'form_elements' ? 'active-menu':''} onClick={this.setActiveTab.bind(this,'comp', 'form','form_elements')} to="form_elements">Form Elements</Link></li>
                                            <li id="dest_id"><Link className={this.state.MoreTab === 'form_validation' ? 'active-menu':''} onClick={this.setActiveTab.bind(this,'comp', 'form','form_validation')} to="form_validation">Form Validation</Link></li>
                                            <li id="dest_id"><Link className={this.state.MoreTab === 'form_advanced' ? 'active-menu':''} onClick={this.setActiveTab.bind(this,'comp', 'form','form_advanced')} to="form_advanced">Form Advanced</Link></li>
                                            <li id="dest_id"><Link className={this.state.MoreTab === 'form_wizard' ? 'active-menu':''} onClick={this.setActiveTab.bind(this,'comp', 'form','form_wizard')} to="form_wizard">Form Wizard</Link></li>
                                            <li id="dest_id"><Link className={this.state.MoreTab === 'form_editors' ? 'active-menu':''} onClick={this.setActiveTab.bind(this,'comp', 'form','form_editors')} to="form_editors">Form Editors</Link></li>
                                            <li id="dest_id"><Link className={this.state.MoreTab === 'form_uploads' ? 'active-menu':''} onClick={this.setActiveTab.bind(this,'comp', 'form','form_uploads')} to="form_uploads">Form File Upload</Link></li>
                                            <li id="dest_id"><Link className={this.state.MoreTab === 'form_mask' ? 'active-menu':''} onClick={this.setActiveTab.bind(this,'comp', 'form','form_mask')} to="form_mask">Form Mask</Link></li>
                                            <li id="dest_id"><Link className={this.state.MoreTab === 'form_summernote' ? 'active-menu':''} onClick={this.setActiveTab.bind(this,'comp', 'form','form_summernote')} to="form_summernote">Summernote</Link></li>
                                            <li id="dest_id"><Link className={this.state.MoreTab === 'form_xeditable' ? 'active-menu':''} onClick={this.setActiveTab.bind(this,'comp', 'form','form_xeditable')} to="form_xeditable">Form Xeditable</Link></li>
                                        </ul>
                                    </li>
                                    <li className="has-submenu">
                                        <Link to="#" className={this.state.SubTab === 'chart' ? 'active-menu':''} onClick={this.setActiveTab.bind(this, 'comp','chart','',!this.state.toggleChart)} >Charts</Link>
                                        <ul className={this.state.toggleChart  ? "submenu open" : "submenu" }>
                                          <li id="dest_id"><Link className={this.state.MoreTab === 'charts_easy' ? 'active-menu':''} onClick={this.setActiveTab.bind(this,'comp', 'chart','charts_easy')} to="charts_easy">Easy Chart</Link></li>
                                          <li id="dest_id"><Link className={this.state.MoreTab === 'chartjs' ? 'active-menu':''} onClick={this.setActiveTab.bind(this,'comp', 'chart','chartjs')} to="chartjs">ChartJs Chart</Link></li>
                                          <li id="dest_id"><Link className={this.state.MoreTab === 'apexchart' ? 'active-menu':''} onClick={this.setActiveTab.bind(this,'comp', 'chart','apexchart')} to="apexchart">Apex Chart</Link></li>
                                          <li id="dest_id"><Link className={this.state.MoreTab === 'sparkline' ? 'active-menu':''} onClick={this.setActiveTab.bind(this, 'comp','chart','sparkline')} to="sparkline">SparkLine Chart</Link></li>

                                        </ul>
                                    </li>
                                    <li className="has-submenu">
                                        <Link to="#" className={this.state.SubTab === 'table' ? 'active-menu':''} onClick={this.setActiveTab.bind(this,'comp', 'table','',!this.state.toggleTable)}>Tables</Link>
                                        <ul className={this.state.toggleTable  ? "submenu open" : "submenu" }>
                                            <li id="dest_id"><Link className={this.state.MoreTab === 'tables_basic' ? 'active-menu':''} onClick={this.setActiveTab.bind(this, 'comp','table','tables_basic')}  to="tables_basic">Basic Tables</Link></li>
                                            <li id="dest_id"><Link className={this.state.MoreTab === 'tables_datatable' ? 'active-menu':''} onClick={this.setActiveTab.bind(this, 'comp','table','tables_datatable')}  to="tables_datatable">Data Table</Link></li>
                                            <li id="dest_id"><Link className={this.state.MoreTab === 'tables_responsive' ? 'active-menu':''} onClick={this.setActiveTab.bind(this, 'comp','table','tables_responsive')}  to="tables_responsive">Responsive Table</Link></li>
                                            <li id="dest_id"><Link className={this.state.MoreTab === 'tables_editable' ? 'active-menu':''} onClick={this.setActiveTab.bind(this,'comp', 'table','tables_editable')}  to="tables_editable">Editable Table</Link></li>
                                        </ul>
                                    </li>
                                    <li className="has-submenu">
                                        <Link to="#" className={this.state.SubTab === 'icon' ? 'active-menu':''} onClick={this.setActiveTab.bind(this,'comp', 'icon','',!this.state.toggleIcon)}>Icons</Link>
                                        <ul className={this.state.toggleIcon  ? "submenu open" : "submenu" }>
                                            <li id="dest_id"><Link className={this.state.MoreTab === 'icons_material' ? 'active-menu':''} onClick={this.setActiveTab.bind(this,'comp', 'icon','icons_material')} to="icons_material">Material Design</Link></li>
                                            <li id="dest_id"><Link className={this.state.MoreTab === 'icons_ion' ? 'active-menu':''} onClick={this.setActiveTab.bind(this,'comp', 'icon','icons_ion')} to="icons_ion">Ion Icons</Link></li>
                                            <li id="dest_id"><Link className={this.state.MoreTab === 'icons_fontawesome' ? 'active-menu':''} onClick={this.setActiveTab.bind(this,'comp', 'icon','icons_fontawesome')} to="icons_fontawesome">Font Awesome</Link></li>
                                            <li id="dest_id"><Link className={this.state.MoreTab === 'icons_themify' ? 'active-menu':''} onClick={this.setActiveTab.bind(this,'comp', 'icon','icons_themify')} to="icons_themify">Themify Icons</Link></li>
                                            <li id="dest_id"><Link className={this.state.MoreTab === 'icons_dripicons' ? 'active-menu':''} onClick={this.setActiveTab.bind(this, 'comp','icon','icons_dripicons')} to="icons_dripicons">Dripicons</Link></li>
                                            <li id="dest_id"><Link className={this.state.MoreTab === 'icons_typicons' ? 'active-menu':''} onClick={this.setActiveTab.bind(this,'comp', 'icon','icons_typicons')} to="icons_typicons">Typicons Icons</Link></li>
                                            <li id="dest_id"><Link className={this.state.MoreTab === 'icons_weather' ? 'active-menu':''} onClick={this.setActiveTab.bind(this, 'comp','icon','icons_weather')} to="icons_weather">Weather Icons</Link></li>
                                            <li id="dest_id"><Link className={this.state.MoreTab === 'icons_mobirise' ? 'active-menu':''} onClick={this.setActiveTab.bind(this,'comp', 'icon','icons_mobirise')} to="icons_mobirise">Mobirise Icons</Link></li>
                                        </ul>
                                    </li>
                                    <li className="has-submenu">
                                        <Link  className={this.state.SubTab === 'map' ? 'active-menu':''} onClick={this.setActiveTab.bind(this,'comp', 'map','',!this.state.toggleMap)} to="#">Maps</Link>
                                        <ul className={this.state.toggleMap  ? "submenu open" : "submenu" }>
                                            <li id="dest_id"><Link  className={this.state.MoreTab === 'maps_google' ? 'active-menu':''} onClick={this.setActiveTab.bind(this, 'comp','map','maps_google')}  to="maps_google"> Google Map</Link></li>
                                            <li id="dest_id"><Link  className={this.state.MoreTab === 'maps_vector' ? 'active-menu':''} onClick={this.setActiveTab.bind(this, 'comp','map','maps_vector')}  to="maps_vector"> Vector Map</Link></li>
                                        </ul>
                                    </li>
                                    <li className="has-submenu">
                                        <Link to="#" className={this.state.SubTab === 'emt' ? 'active-menu':''} onClick={this.setActiveTab.bind(this,'comp', 'emt','',!this.state.toggleEmailTemp)} >Email Templates</Link>
                                        <ul className={this.state.toggleEmailTemp  ? "submenu open" : "submenu" }>
                                            <li id="dest_id"><Link className={this.state.MoreTab === 'email_templates_basic' ? 'active-menu':''} onClick={this.setActiveTab.bind(this, 'comp','emt','email_templates_basic')} to="email_templates_basic">Basic Action Email</Link></li>
                                            <li id="dest_id"><Link className={this.state.MoreTab === 'email_templates_alert' ? 'active-menu':''} onClick={this.setActiveTab.bind(this,'comp', 'emt','email_templates_alert')} to="email_templates_alert">Alert Email</Link></li>
                                            <li id="dest_id"><Link className={this.state.MoreTab === 'email_templates_billing' ? 'active-menu':''} onClick={this.setActiveTab.bind(this,'comp', 'emt','email_templates_billing')} to="email_templates_billing">Billing Email</Link></li>
                                        </ul>
                                    </li> */}
                                {/* </ul> */}
                          </li>

                          <li  className={this.state.Tab === 'pages' ? 'has-submenu active':'has-submenu'}>
                                <Link to="/Salary_print" className={this.state.Tab === 'pages' ? 'active-menu':''} onClick={()=> this.setState({ print_menu: !this.state.print_menu }) }><i className="mdi mdi-google-pages"></i>Salary Print</Link>
                                {/* <ul  className={this.state.print_menu ? "submenu megamenu open" : "submenu megamenu" } >
                                    <li>
                                        <ul>
                                            <li id="dest_id"><Link className={this.state.SubTab === 'pages_login' ? 'active-menu':''} onClick={this.setActiveTab.bind(this, 'pages','pages_login','')} to="pages_login">Login</Link></li>
                                            <li id="dest_id"><Link className={this.state.SubTab === 'pages_register' ? 'active-menu':''} onClick={this.setActiveTab.bind(this, 'pages','pages_register','')} to="pages_register">Register</Link></li>
                                            <li id="dest_id"><Link className={this.state.SubTab === 'pages_recoverpw' ? 'active-menu':''} onClick={this.setActiveTab.bind(this, 'pages','pages_recoverpw','')} to="pages_recoverpw">Recover Password</Link></li>
                                            <li id="dest_id"><Link className={this.state.SubTab === 'pages_lock_screen' ? 'active-menu':''} onClick={this.setActiveTab.bind(this, 'pages','pages_lock_screen','')} to="pages_lock_screen">Lock Screen</Link></li>
                                            <li id="dest_id"><Link className={this.state.SubTab === 'pages_login_2' ? 'active-menu':''} onClick={this.setActiveTab.bind(this, 'pages','pages_login_2','')} to="pages_login_2">Login 2</Link></li>
                                            <li id="dest_id"><Link className={this.state.SubTab === 'pages_register_2' ? 'active-menu':''} onClick={this.setActiveTab.bind(this, 'pages','pages_register_2','')} to="pages_register_2">Register 2</Link></li>
                                            <li id="dest_id"><Link className={this.state.SubTab === 'pages_recoverpw_2' ? 'active-menu':''} onClick={this.setActiveTab.bind(this, 'pages','pages_recoverpw_2','')} to="pages_recoverpw_2">Recover Password 2</Link></li>
                                        </ul>
                                    </li>
                                    <li>
                                        <ul>
                                            <li id="dest_id"><Link className={this.state.SubTab === 'pages_lock_screen_2' ? 'active-menu':''} onClick={this.setActiveTab.bind(this, 'pages','pages_lock_screen_2','')} to="pages_lock_screen_2">Lock Screen 2</Link></li>
                                            <li id="dest_id"><Link className={this.state.SubTab === 'pages_timeline' ? 'active-menu':''} onClick={this.setActiveTab.bind(this, 'pages','pages_timeline','')} to="pages_timeline">Timeline</Link></li>
                                            <li id="dest_id"><Link className={this.state.SubTab === 'pages_invoice' ? 'active-menu':''} onClick={this.setActiveTab.bind(this, 'pages','pages_invoice','')} to="pages_invoice">Invoice</Link></li>
                                            <li id="dest_id"><Link className={this.state.SubTab === 'pages_directory' ? 'active-menu':''} onClick={this.setActiveTab.bind(this, 'pages','pages_directory','')} to="pages_directory">Directory</Link></li>
                                            <li id="dest_id"><Link className={this.state.SubTab === 'pages_blank' ? 'active-menu':''} onClick={this.setActiveTab.bind(this, 'pages','pages_blank','')} to="pages_blank">Blank Page</Link></li>
                                            <li id="dest_id"><Link className={this.state.SubTab === 'pages_400' ? 'active-menu':''} onClick={this.setActiveTab.bind(this, 'pages','pages_400','')} to="pages_400">Error 404</Link></li>
                                            <li id="dest_id"><Link className={this.state.SubTab === 'pages_500' ? 'active-menu':''} onClick={this.setActiveTab.bind(this, 'pages','pages_500','')} to="pages_500">Error 500</Link></li>
                                        </ul>
                                    </li>
                                    <li>
                                        <ul>
                                            <li id="dest_id"><Link className={this.state.SubTab === 'pages_pricing' ? 'active-menu':''} onClick={this.setActiveTab.bind(this, 'pages','pages_pricing','')} to="pages_pricing">Pricing</Link></li>
                                            <li id="dest_id"><Link className={this.state.SubTab === 'pages_gallery' ? 'active-menu':''} onClick={this.setActiveTab.bind(this, 'pages','pages_gallery','')} to="pages_gallery">Gallery</Link></li>
                                            <li id="dest_id"><Link className={this.state.SubTab === 'pages_maintenance' ? 'active-menu':''} onClick={this.setActiveTab.bind(this, 'pages','pages_maintenance','')} to="pages_maintenance">Maintenance</Link></li>
                                            <li id="dest_id"><Link className={this.state.SubTab === 'pages_coming_soon' ? 'active-menu':''} onClick={this.setActiveTab.bind(this, 'pages','pages_coming_soon','')} to="pages_coming_soon">Coming Soon</Link></li>
                                            <li id="dest_id"><Link className={this.state.SubTab === 'pages_faq' ? 'active-menu':''} onClick={this.setActiveTab.bind(this, 'pages','pages_faq','')} to="pages_faq">FAQ</Link></li>
                                            <li id="dest_id"><Link className={this.state.SubTab === 'pages_contact' ? 'active-menu':''} onClick={this.setActiveTab.bind(this, 'pages','pages_contact','')} to="pages_contact">Contact</Link></li>
                                        </ul>
                                    </li>
                                </ul> */}
                            </li>

                            {/* <li className={this.state.Tab === 'eco' ? 'has-submenu active':'has-submenu'}>
                                <Link to="#"  onClick={()=> this.setState({ eco_menu: !this.state.eco_menu }) }><i className="mdi mdi-cart-outline"></i>Ecommerce</Link>
                                <ul className={this.state.eco_menu ? "submenu megamenu open" : "submenu megamenu" }>
                                    <li id="dest_id"><Link className={this.state.SubTab === 'ecommerce_product_list' ? 'active-menu':''} onClick={this.setActiveTab.bind(this, 'eco','ecommerce_product_list','')} to="ecommerce_product_list">Product List</Link></li><br></br>
                                    <li id="dest_id"><Link className={this.state.SubTab === 'ecommerce_product_grid' ? 'active-menu':''} onClick={this.setActiveTab.bind(this, 'eco','ecommerce_product_grid','')} to="ecommerce_product_grid">Product Grid</Link></li><br></br>
                                    <li id="dest_id"><Link className={this.state.SubTab === 'ecommerce_order_history' ? 'active-menu':''} onClick={this.setActiveTab.bind(this, 'eco','ecommerce_order_history','')} to="ecommerce_order_history">Order History</Link></li><br></br>
                                    <li id="dest_id"><Link className={this.state.SubTab === 'ecommerce_customers' ? 'active-menu':''} onClick={this.setActiveTab.bind(this, 'eco','ecommerce_customers','')} to="ecommerce_customers">Customers</Link></li><br></br>
                                    <li id="dest_id"><Link className={this.state.SubTab === 'ecommerce_product_edit' ? 'active-menu':''} onClick={this.setActiveTab.bind(this, 'eco','ecommerce_product_edit','')} to="ecommerce_product_edit">Product Edit</Link></li>
                                </ul>
                            </li> */}
{/* 
                            <li>
                                <Link to="/"><i className="mdi mdi-airplane"></i>Front End</Link>
                            </li> */}
                        </ul>
                    </div>
                </div>
            </div>
        </header>
        );
    }
}

export default withRouter(topbar);