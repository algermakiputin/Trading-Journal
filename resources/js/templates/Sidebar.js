import React from "react";
import profile_pict from '../profile.jpg';
import { Link} from 'react-router-dom'
import '../global/global'
import axios from "axios";
import UserContext from "../UserContext";
import { Fragment } from "react";

class Sidebar extends React.Component {

    constructor(props) {
        super(props)
        this.logoutForm = React.createRef()
    } 

    render() {

        return (
            <aside className="left-sidebar" data-sidebarbg="skin6"> 
                <div className="scroll-sidebar"> 
                    <nav className="sidebar-nav">
                        <ul id="sidebarnav"> 
                            <li> 
                            <div className="user-profile d-flex no-block dropdown m-t-20">
                                    <div className="user-pic"><img src={ profile_pict } alt="users"
                                            className="rounded-circle" width="40" /></div>
                                    <div className="user-content hide-menu m-l-10">
                                        <a href="#" className="" id="Userdd" role="button"
                                            data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                            
                                            
                                            <UserContext.Consumer>
                                                {
                                                    (value) => (
                                                        <Fragment>
                                                            <h5 className="m-b-0 user-name font-medium">{value.name}</h5>
                                                            <span className="op-5 user-email">{value.email}</span>
                                                        </Fragment>
                                                    )
                                                }
                                            </UserContext.Consumer>
                                        </a> 
                                    </div>
                                </div> 
                            </li>
                        
                            <li className="sidebar-item">
                                <Link to='/dashboard' className='sidebar-link waves-effect waves-dark sidebar-link'> <i className="mdi mdi-view-dashboard"></i><span
                                        className="hide-menu">Dashboard</span> </Link>
                            </li> 
                             
                            <li className="sidebar-item"> 
                                    <Link 
                                        to='/logs' 
                                        className="sidebar-link waves-effect waves-dark sidebar-link"
                                        >
                                        <i className="mdi mdi-history"></i>
                                        <span className="hide-menu">Transactions Logs</span>
                                    </Link>
                            </li>
                           
                            <li className="sidebar-item"> <Link to='/monthly-tracker' className="sidebar-link waves-effect waves-dark sidebar-link"
                                    href="#" aria-expanded="false"><i className="mdi mdi-calendar"></i><span
                                        className="hide-menu">Monthly Tracker</span></Link>
                            </li>
                          
                            <li className="sidebar-item"> 
                                <UserContext.Consumer>
                                    {
                                        (value) => (
                                            <a 
                                                className="sidebar-link waves-effect waves-dark sidebar-link"
                                                onClick={() => value.logout()}
                                            >
                                                <i className="mdi mdi-logout"></i>
                                                <span className="hide-menu">Logout</span>
                                            </a>
                                        )
                                    }
                                </UserContext.Consumer>
                            </li> 
    
                        </ul> 
                    </nav> 
                </div> 
            </aside>
        )
    }
}

export default Sidebar