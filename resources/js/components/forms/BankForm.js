import React from "react";
import { Form, Table, Button, Modal, Alert } from "react-bootstrap";
import axios from "axios"; 
import Datetime from 'react-datetime';
import "react-datetime/css/react-datetime.css";
import NumberFormat from 'react-number-format'
import '../../global/global'

class BankForm extends React.Component {
    
    constructor( props) {
        super(props)
        this.state = {
            show: false,
            date: global.server_date,
            action: 'deposit',
            amount: null,
            alert_danger: false
        }

        this.defaultState = this.state;
    }

    toggleModal() {
        
        this.setState( {show: !this.state.show})
    }

    handleFormSubmit() {
         
        if ( this.state.date && this.state.action && this.state.amount ) {

            this.setState({alert_danger:false})

            axios.post('api/bank/create', {
                        data: this.state,
                        totalEquity: this.props.totalEquity,
                        availableCash: this.props.availableCash,
                        action: this.state.action
                    })
                    .then( res => {
                        
                        if ( res.data == 1) { 
                            this.setState(this.defaultState)
                            this.props.setEquity()
                            this.props.setEquityCurve()
                        }

                    })
                    .catch ( err => {
                        console.log(err)
                    }) 
                    
        }else {

            this.setState({alert_danger:true})
        }
    }

    alert_danger() {

        if ( this.state.alert_danger ) { 

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
                <button 
                    onClick={ () => { this.toggleModal() }}
                    className="btn btn-default"
                    style={ {backgroundColor: '#4fc3f7'} }
                    >
                    Deposit / Withdraw Funds
                </button> 
                <Modal
                    show={this.state.show}
                    onHide={ ()=> { this.toggleModal(false)} }
                >
                    <Modal.Header closeButton>
                        <Modal.Title>Withdraw / Deposit Funds</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        { this.alert_danger() }
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
                                <Form.Label>Action</Form.Label>
                                <Form.Control as="select" 
                                    defaultValue="deposit" 
                                    onChange={ event=> { this.setState({action: event.target.value }) } }
                                >
                                    <option value="deposit">Deposit</option>
                                    <option value="withdraw">Withdraw</option>
                                </Form.Control>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Amount</Form.Label>
                                <NumberFormat 
                                    thousandSeparator={true} 
                                    value={ this.state.amount }  
                                    onValueChange={ (values) => this.setState({amount: values.value }) }
                                    className='form-control'
                                    /> 
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={ ()=> { this.toggleModal() }}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={ () => { this.handleFormSubmit() }}>Submit</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}

export default BankForm