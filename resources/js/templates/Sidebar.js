import React from "react";
import profile_pict from '../profile.jpg';

export default function Sidebar() {
    
    return (
        <aside className="left-sidebar" data-sidebarbg="skin6"> 
            <div className="scroll-sidebar"> 
                <nav className="sidebar-nav">
                    <ul id="sidebarnav"> 
                        <li> 
                        <div class="user-profile d-flex no-block dropdown m-t-20">
                                <div class="user-pic"><img src={ profile_pict } alt="users"
                                        class="rounded-circle" width="40" /></div>
                                <div class="user-content hide-menu m-l-10">
                                    <a href="#" class="" id="Userdd" role="button"
                                        data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        <h5 class="m-b-0 user-name font-medium">Hero Trader </h5>
                                        <span class="op-5 user-email">herotrader.net</span>
                                    </a> 
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