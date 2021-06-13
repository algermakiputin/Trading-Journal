import React from "react"
import { Form, Table, Button, Modal, Alert } from "react-bootstrap"
import axios from "axios"
import Transactions from '../../classes/Transactions'
import NumberFormat from 'react-number-format'
import Datetime from 'react-datetime' 
import AutowidthInput from "react-autowidth-input";
import "react-datetime/css/react-datetime.css"
import '../../global/global'

class TradeForm extends React.Component {

    
    constructor(props) {

        super(props)

        this.state = {
            date: global.server_date,
            stock_code: "",
            price: "",
            shares: "",
            fees: 0.00,
            net: 0.00,
            error_show: false,
            net:0,
            fees: 0,
            netText:'0.00',
            feesText:'0.00',
            remarks:'',
            isLoading:false
        }
        
        this.baseState = this.state;
        this.input = React.createRef()
 
    }  
   
    handleFormSubmit() { 
        
        this.validateForm() 
        if ( parseFloat(this.state.net) > parseFloat(this.props.availableCash) ) 
            return alert("Not enough available cash")
        
        this.toggleButtonLoading()
        axios.post('/api/transactions/store', {
                    data: this.state,
                    availableCash: this.props.availableCash,
                    totalEquity: this.props.totalEquity
                })
                .then( res => {
                     
                    this.setState( this.baseState )
                    this.props.load_positions()
                    this.props.reloadEquity()
                    this.props.handleModal()
                    this.toggleButtonLoading()
                })
                .catch( err => {
                    console.log( err)
                })

    }

    toggleButtonLoading() {

        this.setState({isLoading:!this.state.isLoading})
    }

    validateForm() {

        if ( this.state.date == "" || this.state.stock_code == "" || this.state.price == "" || this.state.shares == "") {

            return this.setState({error_show: true})
        } 
         
        return this.setState({ error_show: false})
        
    }

    net_calculator_price_handle(value) {
         
        let price = value;
        let shares = this.state.shares;

        let fee = Transactions.buy( price, shares ); 
        let total = Number(( price * shares) + fee).toFixed(2); 

        fee = Number(this.num_nan( fee )).toFixed(2);
        total = Number(this.num_nan ( total )).toFixed(2);
        
        this.setState({ 
            net: total, 
            fees: fee,
            netText: this.numberWithCommas(total),
            feesText: this.numberWithCommas(fee)
        });

    }

    

    net_calculator_shares_handle(event) {
         
        let shares = event.target.value;
        let price = this.state.price;
        let fee = Transactions.buy( price, shares ); 
        let total = Number(( price * shares) + fee).toFixed(2); 

        fee = Number(this.num_nan( fee )).toFixed(2);
        total = Number(this.num_nan ( total )).toFixed(2); 
 
        this.setState({ 
            net: total, 
            fees: fee,
            netText: this.numberWithCommas(total),
            feesText: this.numberWithCommas(fee)
          
        });
 
    }

    numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
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

    resize() {

        console.log(this.input.current)
    }

    render() { 
  
        return (

            <div>
                
                <Modal.Header closeButton>
                <Modal.Title>New Transaction</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    
                    { this.alert_danger() } 
                    <Form noValidate>
                        <Table bordered striped hover className="table-fit">
                            <thead>
                                <tr>
                                    <th>Date</th>
                                    <th>Stock</th>
                                    <th>Shares</th>
                                    <th>Price</th> 
                                    <th>Fees</th>
                                    <th>Net</th> 
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>
                                        <Datetime 
                                            initialValue={new Date()}
                                            timeFormat={false}
                                            onChange={ event=> { this.setState({date: event.format('YYYY-MM-DD') })} }
                                            closeOnSelect
                                        />
                                       
                                    </td>
                                    <td>
                                        <Form.Control type="text" name="stock_code" 
                                        onChange={ event => this.setState({ stock_code: event.target.value }) }
                                        required
                                        value={ this.state.stock_code }
                                        autoComplete="off"></Form.Control> 
                                    </td>
                                    <td>
                                        <Form.Control type="number" name="shares" min="0"
                                        onChange={ event => { this.setState({ shares: event.target.value}); this.net_calculator_shares_handle(event) } } 
                                        value={ this.state.shares }
                                        autoComplete="off"
                                        required></Form.Control> 
                                    </td>
                                    <td>
                                        <NumberFormat 
                                            thousandSeparator={true}
                                            defaultValue={null} 
                                            value={ this.state.price }  
                                            onValueChange={ (values) => { this.setState({ price: values.value}); this.net_calculator_price_handle(values.value) } }
                                            className='form-control'
                                        /> 
                   
                                    </td> 
                                    <td>
                                        <AutowidthInput 
                                            readOnly
                                            value={ this.state.feesText} 
                                            wrapperClassName="auto-width-wrapper"
                                        />
                                    </td>
                                    <td> 
                                        <AutowidthInput 
                                            readOnly
                                            value={ this.state.netText} 
                                            wrapperClassName="auto-width-wrapper"
                                        />
                                    </td> 
                                </tr> 
                                <tr>
                                    <td><label>Remarks(optional)</label></td>
                                    <td colSpan="5"> 
                                        <textarea 
                                            className="form-control"
                                            onChange={ (event) => this.setState({remarks: event.target.value})}
                                            >

                                        </textarea>
                                    </td>
                                </tr>
                            </tbody>
                        </Table>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={() => {this.props.handleModal()}}>
                    Close
                </Button>
                <Button variant="primary" onClick={ () => {this.handleFormSubmit()}}>
                    { this.state.isLoading ? 'Loading...' : 'Submit'}
                </Button>
                </Modal.Footer> 
            </div>
        )
    }
}

export default TradeForm