import React from "react";

export default function Sidebar() {
    
    return (
        <aside className="left-sidebar" data-sidebarbg="skin6"> 
            <div className="scroll-sidebar"> 
                <nav className="sidebar-nav">
                    <ul id="sidebarnav"> 
                        <li> 
                            <div className="user-profile d-flex no-block dropdown m-t-20">
                                <div className="user-pic"><img src="../../assets/images/users/1.jpg" alt="users"
                                        className="rounded-circle" width="40" /></div>
                                <div className="user-content hide-menu m-l-10">
                                    <a href="#" className="" id="Userdd" role="button"
                                        data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        <h5 className="m-b-0 user-name font-medium">Steave Jobs <i
                                                className="fa fa-angle-down"></i></h5>
                                        <span className="op-5 user-email">varun@gmail.com</span>
                                    </a>
                                    <div className="dropdown-menu dropdown-menu-end" aria-labelledby="Userdd">
                                        <a className="dropdown-item" href="#"><i
                                                className="ti-user m-r-5 m-l-5"></i> My Profile</a>
                                        <a className="dropdown-item" href="#"><i
                                                className="ti-wallet m-r-5 m-l-5"></i> My Balance</a>
                                        <a className="dropdown-item" href="#"><i
                                                className="ti-email m-r-5 m-l-5"></i> Inbox</a>
                                        <div className="dropdown-divider"></div>
                                        <a className="dropdown-item" href="#"><i
                                                className="ti-settings m-r-5 m-l-5"></i> Account Setting</a>
                                        <div className="dropdown-divider"></div>
                                        <a className="dropdown-item" href="#"><i
                                                className="fa fa-power-off m-r-5 m-l-5"></i> Logout</a>
                                    </div>
                                </div>
                            </div> 
                        </li>
                    
                        <li className="sidebar-item"> <a className="sidebar-link waves-effect waves-dark sidebar-link"
                                href="#" aria-expanded="false"><i className="mdi mdi-view-dashboard"></i><span
                                    className="hide-menu">Dashboard</span></a></li>
                        <li className="sidebar-item"> <a className="sidebar-link waves-effect waves-dark sidebar-link"
                                href="#" aria-expanded="false"><i
                                    className="mdi mdi-chart-bar"></i><span className="hide-menu">Analytics</span></a></li>
                        <li className="sidebar-item"> <a className="sidebar-link waves-effect waves-dark sidebar-link"
                                href="#" aria-expanded="false"><i className="mdi mdi-history"></i><span
                                    className="hide-menu">Trade Logs</span></a></li>
                        <li className="sidebar-item"> <a className="sidebar-link waves-effect waves-dark sidebar-link"
                                href="#" aria-expanded="false"><i className="mdi mdi-logout"></i><span
                                    className="hide-menu">Logout</span></a></li> 
                     
                    </ul>

                </nav> 
            </div> 
        </aside>
    ) 

}