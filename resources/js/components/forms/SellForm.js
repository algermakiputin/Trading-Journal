import React from 'react'
import { Form, Table, Button, Modal, Alert } from "react-bootstrap"
import Transactions from '../../classes/Transactions'
import axios from 'axios'

class SellForm extends React.Component {

    
    constructor(props) {
        super(props) 
         
        this.state = {
            shares: 0,
            price:0,
            stock_code:'',
            date:'', 
            net:0,
            fees:0
        }
         
    }
 

    formSubmitHandle() {

        if ( this.state.shares && this.state.price && this.state.date ) {
 
            axios.post('/api/transactions/sell', {
                    shares: this.state.shares,
                    price: this.state.price,
                    stock_code: this.props.trade.stock_code,
                    date: this.state.date,
                    net: this.state.net,
                    fees: this.state.fees
                })
                .then( res => {
                    console.log(res)
                })
                .catch( err => {
                    console.log(err)
                })
        }else {
            alert('not valid')
        }
    }

    netCalculatorPriceHandle(event) {
  
        let price = event.target.value;
        let shares = this.state.shares;

        let fees = Transactions.sell( price , shares );
        let net = (price * shares ) - fees;
        this.setState({fees: fees, net: net });
 
    }

    netCalculatorSharesHandle(event) {

        let shares = event.target.value;
        let price = this.state.price;

        let fees = Transactions.sell( price , shares );
        let net = (price * shares ) - fees;
        
        this.setState({fees: fees, net: net });
    }

 
    render() {
       
        return(

            <React.Fragment>  
               
               <Modal     
                   show={ this.props.show } 
                   onHide={ () => this.props.closeHandle() }
               >
                   <Modal.Header closeButton>
                   <Modal.Title>Sell Transaction</Modal.Title>
                   </Modal.Header>
                   <Modal.Body>
                         
                       <Form noValidate>
                       <Form.Group>
                               <Form.Label>Date</Form.Label>
                               <Form.Control 
                                    type="date" 
                                    autoComplete="off" 
                                    onChange={ (event )=> { this.setState({date: event.target.value })}}   
                                
                                ></Form.Control>
                           </Form.Group>
                           <Form.Group>
                               <Form.Label>Stock Code</Form.Label>
                               <Form.Control  type="text" autoComplete="off" name="stock_code"
                                    readOnly
                                    defaultValue={this.props.trade.stock_code}
                               ></Form.Control>
                           </Form.Group>
                           <Form.Group>
                               <Form.Label>Shares</Form.Label>
                               <Form.Control type="text" name="shares"
                                    defaultValue={this.props.trade.total_shares} 
                                    onChange={ (event ) => { this.setState({shares: event.target.value }); this.netCalculatorSharesHandle(event) } }
                               ></Form.Control>
                           </Form.Group>
                           <Form.Group>
                               <Form.Label>Price</Form.Label>
                               <Form.Control type="text" autoComplete="off"
                                    defaultValue={this.props.trade.price}
                                    onChange={ (event ) => { this.setState({price: event.target.value }); this.netCalculatorPriceHandle(event) } }
                               ></Form.Control>
                           </Form.Group>
                           <Form.Group>
                               <table width="100%">
                                   <thead>
                                        <tr>
                                            <th>Fees</th>
                                            <th>Net</th>
                                        </tr>
                                   </thead>
                                   <tbody>
                                        <tr>
                                            <td>{this.state.fees}</td>
                                            <td>{this.state.net}</td>
                                        </tr>
                                   </tbody>
                               </table> 
                           </Form.Group>
                       </Form>
                   </Modal.Body>
                   <Modal.Footer>
                   <Button variant="secondary" onClick={() => {this.props.closeHandle()}}>
                       Close
                   </Button>
                   <Button variant="primary" onClick={() => {this.formSubmitHandle()}}>
                       Submit
                   </Button>
                   </Modal.Footer>
               </Modal>
            </React.Fragment>
        )
    }
}

export default SellForm