import React from "react"; 
import { Fragment } from "react";
import logo from '../../../public/images/logo.png'
import UserContext from '../UserContext'

class Header extends React.Component { 

    render() {

        return ( 
            <header className="topbar" data-navbarbg="skin5">
                <nav className="navbar top-navbar navbar-expand-md navbar-dark">
                    <div className="navbar-header" data-logobg="skin5"> 
                        <a className="navbar-brand" href="index.html">
                        
                            <b className="logo-text" style={{marginLeft:'10px'}}> 
                                <img src={logo} width={34} /> Hero Journals
                            </b>
                        </a>  
                    </div> 
                    
                    <div style={{width:"100%",paddingRight:'20px'}}>
                        <ul className="navbar-nav float-end"> 
                            <li className="nav-item dropdown"> 
                                <div className="dropdown ">
                                    <UserContext.Consumer>
                                        {
                                            (value) => (
                                                <Fragment>
                                                    <a className="nav-link dropdown-toggle text-muted waves-effect waves-dark pro-pic" id="navbarDropdown" data-toggle="dropdown">
                                                            {value.name} <i className="mdi mdi-chevron-down"></i>
                                                        </a>
                                                        <div className="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
                                                            <a className="dropdown-item" href="" onClick={(event) => value.logout()}>Sign Out</a> 
                                                        </div>
                                                </Fragment>
                                            )
                                        }
                                    </UserContext.Consumer>
                                </div>
                            </li> 
                        </ul>
                    </div>
                </nav>
            </header>
        )
    }
} 

export default Header