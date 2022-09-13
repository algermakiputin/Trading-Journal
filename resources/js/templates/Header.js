import React from "react"; 
import { Fragment } from "react";
import logo from '../../../public/images/logo.png'
import UserContext from '../UserContext'
import { Link} from 'react-router-dom'
import { Button, Modal } from "react-bootstrap"

class Header extends React.Component { 

    constructor(props){
        super(props)
        this.state = {
            show:false
        }
    }
    handleClose() {

        this.setState({show:false})
    }

    handleOpen() {
        this.setState({show:true})
    } 
    render() {

        return ( 
            <header className="topbar" data-navbarbg="skin5">
                <button className="navbar-toggler" onClick={() => {this.props.toggleSidebar();this.handleSidebar()}} type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className={'mdi mdi-menu ' + (this.props.show ? 'd-none' : '')}></span>
                    <span className={'mdi mdi-close ' + (this.props.show ? '' : 'd-none') } id="close-nav"></span>
                </button>
                <nav className="navbar top-navbar navbar-expand-md navbar-dark">
                    <div className="navbar-header" data-logobg="skin5"> 

                        <Link 
                            to='/dashboard' 
                            className="navbar-brand"
                            >
                            <b className="logo-text" style={{marginLeft:'10px'}}> 
                                <img src={logo} width={180} /> 
                            </b>
                        </Link> 
                    </div>  
                    <div style={{width:"100%",paddingRight:'20px'}}>
                        <ul className="navbar-nav float-end"> 
                            <li className="nav-item">
                                <button style={{marginTop:'14px', borderRadius:'15px'}} onClick={() => this.handleOpen()} className="btn btn-primary"><i className="mdi mdi-facebook"></i> Join our Community</button>&nbsp;
                            </li>
     
                            <li className="nav-item dropdown"> 
                                <div className="dropdown ">
                                    <UserContext.Consumer>
                                        {
                                            (value) => (
                                                <Fragment>
                                                    <a href="#!" className="nav-link dropdown-toggle text-muted waves-effect waves-dark pro-pic" id="navbarDropdown" data-toggle="dropdown">
                                                            {value.name} <i className="mdi mdi-chevron-down"></i>
                                                        </a>
                                                        <div className="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
                                                            <a className="dropdown-item" href="#!" onClick={(event) => {event.preventDefault();  value.logout()}}>Sign Out</a> 
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
                <Modal show={this.state.show} onHide={() => this.handleClose()}>
                    <Modal.Header closeButton>
                    <Modal.Title>Join our Facebook Community</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p style={{fontWeight:'normal'}}>Woohoo, Hero Journals just recently launch. We love to hear your opinions and suggestions on how we can improve Hero Journals. Join our Facebook community now and start interacting with us!</p>
                    </Modal.Body>
                    <Modal.Footer>
                    <a href="https://www.facebook.com/groups/4085551641521353" target="__blank" className="btn btn-primary" style={{color:'#fff'}}>
                        <i className="mdi mdi-link"></i> Join Now
                    </a> 
                    <Button variant="secondary" onClick={() => this.handleClose()}>
                        Close
                    </Button> 
                    </Modal.Footer>
                </Modal>
            </header>
        )
    }
} 

export default Header