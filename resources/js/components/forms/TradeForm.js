import React, { useContext } from "react";
import { Form, Table, Button, Modal, Alert } from "react-bootstrap";
import axios from "axios"; 
import Transactions from '../../classes/Transactions'; 
import UserContext from '../../UserContext'


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

        this.baseState = this.state;
 
    }

    handleFormSubmit() {


        if ( this.state.date == "" || this.state.stock_code == "" || this.state.price == "" || this.state.shares == "") {
            console.log(this.state)
            return this.setState({error_show: true})
        } 
        else {
            this.setState({ error_show: false})
        } 
            
        axios.post('/api/transactions/store', this.state)
                .then( res => {
                    
                    if ( res.data == 1) {
                       
                        this.setState( this.baseState ); 
                    }

                    return res
                })
                .catch( err => {
                    console.log( err)
                })

    }

    handleModal() {

        this.setState({ show: !this.state.show})
 
    }

    net_calculator_price_handle(event) {
         
        let price = event.target.value;
        let shares = this.state.shares;

        let fee = Transactions.buy( price, shares ); 
        let total = Number(( price * shares) + fee).toFixed(2); 

        fee = Number(this.num_nan( fee )).toFixed(2);
        total = Number(this.num_nan ( total )).toFixed(2);
        
        this.setState({ net: total, fees: fee});

    }

    net_calculator_shares_handle(event) {
         
        let shares = event.target.value;
        let price = this.state.price;
        let fee = Transactions.buy( price, shares ); 
        let total = Number(( price * shares) + fee).toFixed(2); 

        fee = Number(this.num_nan( fee )).toFixed(2);
        total = Number(this.num_nan ( total )).toFixed(2);
        
        this.setState({ net: total, fees: fee});
 
    }

    num_nan( number ) {

        return isNaN(number) ? 0 : number;
    }

    alert_danger() {

        if ( this.state.error_show ) { 

            return ( 
                <Alert variant="danger">
                    Empty fields are required    
                </Alert>
            )
        }
    }

    alert_success() {

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
                        
                        { this.alert_danger() } 
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
                                            onChange={ event => { this.setState({ price: event.target.value}); this.net_calculator_price_handle(event) } }
                                            autoComplete="off"
                                            required></Form.Control> 
                                        </th>
                                        <th>
                                            <Form.Control type="number" name="shares" min="0"
                                            onChange={ event => { this.setState({ shares: event.target.value}); this.net_calculator_shares_handle(event) } } 
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