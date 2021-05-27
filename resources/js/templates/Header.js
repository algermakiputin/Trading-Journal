import React from "react";
import {Dropdown} from 'react-bootstrap'

export default function Header() {
    
    return (
        <header className="topbar" data-navbarbg="skin5">
            <nav className="navbar top-navbar navbar-expand-md navbar-dark">
                <div className="navbar-header" data-logobg="skin5"> 
                    <a className="navbar-brand" href="index.html">
                      
                        <b className="logo-text" style={{marginLeft:'10px'}}> 
                            HERO JOURNALS
                        </b>
                    </a>  
                </div> 
                
                <div style={{width:"100%",paddingRight:'20px'}}>
                    <ul class="navbar-nav float-end"> 
                        <li class="nav-item dropdown"> 
                            <div class="dropdown ">
                                <a class="nav-link dropdown-toggle text-muted waves-effect waves-dark pro-pic" id="navbarDropdown" data-toggle="dropdown">
                                    Alger Makiputin <i className="mdi mdi-chevron-down"></i>
                                </a>
                                <div class="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
                                    <a class="dropdown-item" href="#">Logout</a> 
                                </div>
                            </div>
                        </li> 
                    </ul>
                </div>
            </nav>
        </header>
    )
}