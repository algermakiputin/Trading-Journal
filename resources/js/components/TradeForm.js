import React from "react";
import { Col, Form, Table, Button, Modal, Alert } from "react-bootstrap";
import axios from "axios"; 
import Transactions from '../classes/Transactions'

const base_url = "http://localhost:8000/";

class TradeForm extends React.Component {

    
    constructor(props) {

        super(props)

        this.state = {
            date: "",
            stock_code: "",
            price: "",
            shares: "",
            fees: 0.00,
            net: 0.00,
            show: false,
            error_show: false,
            net:0,
            fees: 0
        }
 
         
    }

    handleFormSubmit() {

        if ( this.state.date == "" || this.state.stock_code == "" || this.state.price == "" || this.state.shares == "") {
            console.log(this.state)
            return this.setState({error_show: true})
        }
            
        else 
            this.setState({ error_show: false})

         
            
        axios.post('/api/transactions/store', this.state)
                .then( res => {
                    console.log( res.data )
                })
                .catch( err => {
                    console.log( err)
                })

    }

    handleModal() {

        this.setState({ show: !this.state.show})
 
    }

    net_calculator(event) {
         
        let shares = event.target.value
        this.setState({shares: shares}) 

        let fee = Transactions.buy( this.state.price, shares ); 
        let total = (this.state.price * shares) + fee; 
        
        this.setState({ net: total, fees: fee});

    }

    alert() {

        if ( this.state.error_show ) { 

            return ( 
                <Alert variant="danger">
                    Empty fields are required    
                </Alert>
            )
        }
    }

    render() { 

        return (

            <div>
                <Button onClick={() => {this.handleModal()}} className="btn btn-danger text-white">New Trade</Button> 
    
                <Modal 
                    show={this.state.show} 
                    onHide={() => this.handleModal(false) } 
                    dialogClassName="modal-lg"   
                >
                    <Modal.Header closeButton>
                    <Modal.Title>New Trade</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        
                        { this.alert() }

                        <Form noValidate>
                            <Table bordered striped hover>
                                <thead>
                                    <tr>
                                        <th>Date</th>
                                        <th>Stock Code</th>
                                        <th>Price</th>
                                        <th>Shares</th>
                                        <th>Fees</th>
                                        <th>Net</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <th>
                                            <Form.Control type="date" name="date" 
                                            onChange={ event => this.setState({ date: event.target.value }) }
                                            autoComplete="off"></Form.Control> 
                                        </th>
                                        <th>
                                            <Form.Control type="text" name="stock_code" 
                                            onChange={ event => this.setState({ stock_code: event.target.value }) }
                                            required
                                            autoComplete="off"></Form.Control> 
                                        </th>
                                        <th>
                                            <Form.Control type="number" name="price" min="0"
                                            onChange={ event => {this.setState({ price: event.target.value }); } }
                                            autoComplete="off"
                                            required></Form.Control> 
                                        </th>
                                        <th>
                                            <Form.Control type="number" name="shares" min="0"
                                            onChange={ event => {this.net_calculator(event)} } 
                                            autoComplete="off"
                                            required></Form.Control> 
                                        </th>
                                        <th>
                                            <Form.Control type="text" name="fees" readOnly  
                                            value= { this.state.fees }
                                            autoComplete="off"
                                            required></Form.Control> 
                                        </th>
                                        <th>
                                            <Form.Control type="text" name="net" readOnly 
                                            value= { this.state.net }
                                            autoComplete="off"
                                            required></Form.Control> 
                                        </th>
                                    </tr>
                                </tbody>
                            </Table>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                    <Button variant="secondary" onClick={() => {this.handleModal()}}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={ () => {this.handleFormSubmit()}}>
                        Submit
                    </Button>
                    </Modal.Footer>
                </Modal>
    
            </div>
        )
    }
}

export default TradeForm