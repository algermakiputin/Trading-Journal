import React from 'react'
import { Form, Button, Modal } from "react-bootstrap"
import Transactions from '../../classes/Transactions'
import NumberFormat from 'react-number-format'
import Datetime from 'react-datetime'
import axios from 'axios'
import "react-datetime/css/react-datetime.css";
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
            totalEquity:0,
            transaction_id:0,
            trade_id:0
        }
         
    }

    componentDidMount() {   
        this.setState({
            shares: this.props.trade.shares, 
            stock_code: this.props.trade.stock_code,
            availableCash: this.props.availableCash,
            totalEquity: this.props.totalEquity,
            fees: this.props.trade.fees,
            net: this.props.trade.net,
            price: this.props.trade.price,
            transaction_id: this.props.trade.id,
            trade_id: this.props.trade.trade_id
        })
    }   
 

    formSubmitHandle() {
         
        if ( this.state.shares && this.state.price && this.state.date ) {
 
            axios.patch('/api/transactions/update', this.state)
                .then( res => {
                     
                    if (res.data == "1") {
                        this.props.closeHandle()
                        this.props.setData()
                    }
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
        let fees = 0;
        let net = 0;
       
        if (this.props.trade.type == 'long') {
            fees = Transactions.buy( price , shares );
            net = (price * shares ) + fees;
        }else {
            fees = Transactions.sell( price , shares );
            net = (price * shares ) - fees;
        }
        console.log(net)
        this.setState({fees: fees, net: net,price:price });
 
    }

    netCalculatorSharesHandle(event) {

        let shares = event.target.value;
        let price = this.state.price;
        let fees = 0;
        let net = 0;
        
        if (this.props.trade.type == 'long') {
            fees = Transactions.buy( price , shares );
            net = (price * shares ) + fees;
        }else {
            fees = Transactions.sell( price , shares );
            net = (price * shares ) - fees;
        }
        
        this.setState({fees: fees, net: net,shares: shares});  
    }

 
    render() {
       
        return(

            <React.Fragment>   
                <Modal.Header closeButton>
                <Modal.Title>Edit Transaction</Modal.Title>
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
                                defaultValue={this.props.trade.shares} 
                                onChange={ (event ) => {  this.netCalculatorSharesHandle(event) } }
                            ></Form.Control>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Price</Form.Label>
                            <Form.Control type="text" autoComplete="off"
                                defaultValue={this.props.trade.price}
                                onChange={ (event ) => {  this.netCalculatorPriceHandle(event) } }
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
                                        <td><NumberFormat  decimalScale={2} thousandSeparator={true} displayType='text' value={ this.state.fees } prefix={'₱'} /></td>
                                        <td><NumberFormat  decimalScale={2} thousandSeparator={true} displayType='text' value={ this.state.net } prefix={'₱'} /></td>
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