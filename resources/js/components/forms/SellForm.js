import React from 'react'
import { Form, Button, Modal } from "react-bootstrap"
import Transactions from '../../classes/Transactions'
import NumberFormat from 'react-number-format'
import Datetime from 'react-datetime';
import "react-datetime/css/react-datetime.css";
import axios from 'axios'
import '../../global/global'

class SellForm extends React.Component {

    
    constructor(props) {
        super(props) 
         
        this.state = {
            shares: 0,
            price:0,
            stock_code:'',
            date: global.server_date, 
            net:0,
            fees:0,
            availableCash:0,
            totalEquity:0
        }
         
    }

    componentDidMount() { 
      
        this.setState({
            shares: this.props.trade.total_shares, 
            stock_code: this.props.trade.stock_code,
            availableCash: this.props.availableCash,
            totalEquity: this.props.totalEquity
        })
    }   
 

    formSubmitHandle() {
 
        if ( this.state.shares && this.state.price && this.state.date ) {
 
            axios.post('/api/transactions/sell', this.state)
                .then( res => {
                    
                    this.props.closeHandle()
                    this.props.setEquity()
                    this.props.load_positions()
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
                <Modal.Header closeButton>
                <Modal.Title>Sell Transaction</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                        
                    <Form noValidate>
                    <Form.Group>
                            <Form.Label>Date</Form.Label> 
                            <Datetime 
                                initialValue={new Date()}
                                timeFormat={false}
                                onChange={ event=> { this.setState({date: event.format('YYYY-MM-DD') }) } }
                                closeOnSelect
                            /> 
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
                                        <td><NumberFormat decimalScale={2} thousandSeparator={true} displayType='text' value={ this.state.fees } prefix={'₱'} /></td>
                                        <td><NumberFormat decimalScale={2} thousandSeparator={true} displayType='text' value={ this.state.net } prefix={'₱'} /></td>
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
              
            </React.Fragment>
        )
    }
}

export default SellForm