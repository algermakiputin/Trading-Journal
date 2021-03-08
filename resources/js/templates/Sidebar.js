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
                                href="index.html" aria-expanded="false"><i className="mdi mdi-view-dashboard"></i><span
                                    className="hide-menu">Dashboard</span></a></li>
                        <li className="sidebar-item"> <a className="sidebar-link waves-effect waves-dark sidebar-link"
                                href="pages-profile.html" aria-expanded="false"><i
                                    className="mdi mdi-account-network"></i><span className="hide-menu">Profile</span></a></li>
                        <li className="sidebar-item"> <a className="sidebar-link waves-effect waves-dark sidebar-link"
                                href="table-basic.html" aria-expanded="false"><i className="mdi mdi-border-all"></i><span
                                    className="hide-menu">Table</span></a></li>
                        <li className="sidebar-item"> <a className="sidebar-link waves-effect waves-dark sidebar-link"
                                href="icon-material.html" aria-expanded="false"><i className="mdi mdi-face"></i><span
                                    className="hide-menu">Icon</span></a></li>
                        <li className="sidebar-item"> <a className="sidebar-link waves-effect waves-dark sidebar-link"
                                href="starter-kit.html" aria-expanded="false"><i className="mdi mdi-file"></i><span
                                    className="hide-menu">Blank</span></a></li>
                        <li className="sidebar-item"> <a className="sidebar-link waves-effect waves-dark sidebar-link"
                                href="error-404.html" aria-expanded="false"><i className="mdi mdi-alert-outline"></i><span
                                    className="hide-menu">404</span></a></li>
                     
                    </ul>

                </nav> 
            </div> 
        </aside>
    ) 

}