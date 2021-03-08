import React from "react";

export default function Header() {
    
    return (
        <header className="topbar" data-navbarbg="skin5">
            <nav className="navbar top-navbar navbar-expand-md navbar-dark">
                <div className="navbar-header" data-logobg="skin5"> 
                    <a className="navbar-brand" href="index.html">
                     
                        <b className="logo-icon">
                     
                            <img src="../../assets/images/logo-icon.png" alt="homepage" className="dark-logo" />
                        
                            <img src="../../assets/images/logo-light-icon.png" alt="homepage" className="light-logo" />
                        </b> 
                        <span className="logo-text"> 
                            <img src="../../assets/images/logo-text.png" alt="homepage" className="dark-logo" />
                       
                            <img src="../../assets/images/logo-light-text.png" className="light-logo" alt="homepage" />
                        </span>
                    </a> 
                    <a className="nav-toggler waves-effect waves-light d-block d-md-none" href="#"><i
                            className="ti-menu ti-close"></i></a>
                </div> 
                <div className="navbar-collapse collapse" id="navbarSupportedContent" data-navbarbg="skin5"> 
                    <ul className="navbar-nav float-start me-auto"> 
                        <li className="nav-item search-box"> <a className="nav-link waves-effect waves-dark"
                                href="#"><i className="ti-search"></i></a>
                            <form className="app-search position-absolute">
                                <input type="text" className="form-control" placeholder="Search &amp; enter" /> <a
                                    className="srh-btn"><i className="ti-close"></i></a>
                            </form>
                        </li>
                    </ul> 
                    <ul className="navbar-nav float-end"> 
                        <li>
                            <a className="nav-link dropdown-toggle text-muted waves-effect waves-dark pro-pic" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                <img src="../../assets/images/users/1.jpg" alt="user" className="rounded-circle" width="31" />
                            </a>
                            <ul className="dropdown-menu dropdown-menu-end user-dd animated" aria-labelledby="navbarDropdown">
                                <a className="dropdown-item" href="#"><i className="ti-user m-r-5 m-l-5"></i>
                                    My Profile</a>
                                <a className="dropdown-item" href="#"><i className="ti-wallet m-r-5 m-l-5"></i>
                                    My Balance</a>
                                <a className="dropdown-item" href="#"><i className="ti-email m-r-5 m-l-5"></i>
                                    Inbox</a>
                            </ul>
                        </li> 
                    </ul>
                </div>
            </nav>
        </header>
    )
}