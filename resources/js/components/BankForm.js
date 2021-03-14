import React from "react";
import { Form, Table, Button, Modal, Alert } from "react-bootstrap";
import axios from "axios"; 

class BankForm extends React.Component {
    
    constructor( props) {
        super(props)
        this.state = {
            show: false,
            date: '',
            action: '',
            amount: 0,
        }
    }

    toggleModal() {
        
        this.setState( {show: !this.state.show})
    }

    handleFormSubmit() {
 
        if ( this.state.date && this.state.action && this.state.amount ) {

            axios.post('api/bank/create', this.state)
                    .then( res => {

                    })
                    .catch ( err => {
                        console.log(err)
                    })
        }
    }
 
    render() {

        return (
            <div> 
                 <Button  onClick={ () => { this.toggleModal() }} className="btn btn-default" style={ {backgroundColor: '#4fc3f7', border: 'none'} }>
                    Deposit / Withdraw Funds
                </Button>
                <Modal
                    show={this.state.show}
                    onHide={ ()=> { this.toggleModal(false)} }
                >
                    <Modal.Header closeButton>
                        <Modal.Title>Withdraw / Deposit Funds</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form noValidate>
                            <Form.Group>
                                <Form.Label>Date</Form.Label>
                                <Form.Control type="date" 
                                    onChange={ event=> { this.setState({date: event.target.value })} }
                                />  
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Action</Form.Label>
                                <Form.Control as="select"
                                    onChange={ event=> { this.setState({action: event.target.value })} }
                                    defaultValue="deposit"
                                >
                                    <option value="deposit">Deposit</option>
                                    <option value="withdraw">Withdraw</option>
                                </Form.Control>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Amount</Form.Label>
                                <Form.Control type="text" 
                                    onChange={ event=> { this.setState({amount: event.target.value })} }
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