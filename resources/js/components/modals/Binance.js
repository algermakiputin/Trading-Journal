import React from 'react'
import { Form, Button, Modal } from "react-bootstrap" 
import "react-datetime/css/react-datetime.css";
import axios from 'axios'
import logo from '../../../../public/images/binance.png'
import '../../global/global'

class Binance extends React.Component {

    
    constructor(props) {
        super(props)  

        this.state = {
            show: false
        }
         
    }

    handleClose() {
        this.setState({show:false});
    }
     
    componentDidMount() {
      
        setTimeout(() => {
            this.setState({show:true});
        }, 30000);
    }
 
    render() {
       
        return(

            <React.Fragment>   
                <Modal show={this.state.show} onHide={() => this.handleClose()}>
                     
                    <Modal.Body style={{position:'relative',padding:'40px'}}>
                    <img src={logo} style={{margin:'auto', display:'block', marginBottom:'25px'}} width={180} /> 
                    <button style={{marginTop:'14px',display:'block', borderRadius:'15px',margin:'auto'}} onClick={() => window.open('https://accounts.binance.com/en/register?ref=191321938')} className="btn btn-primary"><i className="mdi mdi-youtube"></i> Trade Global Markets Now!</button>&nbsp;
                    </Modal.Body>
                    {/* <Modal.Footer>
                    <a href="https://www.facebook.com/groups/4085551641521353" target="__blank" className="btn btn-primary" style={{color:'#fff'}}>
                        <i className="mdi mdi-link"></i> Join Now
                    </a> 
                    <Button variant="secondary" onClick={() => this.handleClose()}>
                        Close
                    </Button> 
                    </Modal.Footer> */}
                </Modal>
              
            </React.Fragment>
        )
    }
}

export default Binance