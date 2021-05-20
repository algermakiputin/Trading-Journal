import React from "react";

export default function Header() {
    
    return (
        <header className="topbar" data-navbarbg="skin5">
            <nav className="navbar top-navbar navbar-expand-md navbar-dark">
                <div className="navbar-header" data-logobg="skin5"> 
                    <a className="navbar-brand" href="index.html">
                      
                        <b className="logo-text" style={{marginLeft:'10px'}}> 
                            PSE Trader Journal
                        </b>
                    </a>  
                </div> 
                 
            </nav>
        </header>
    )
}