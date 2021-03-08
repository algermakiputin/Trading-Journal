import React from "react";
import { Col, Form, Table, Button, Modal } from "react-bootstrap";

class TradeForm extends React.Component {

    constructor(props) {

        super(props)
        this.state = {
            date: "",
            stock_code: "",
            price: "",
            shares: "",
            fees: "",
            net: "",
            show: false
        }

    }

    handleFormSubmit() {

        console.log(this.state);
    }

    handleModal() {

        this.setState({ show: !this.state.show})
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
                        <Form>
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
                                        <th><Form.Control type="date" name="date" onChange={ event => this.setState({ date: event.target.value }) }></Form.Control> </th>
                                        <th><Form.Control type="text" name="stock_code" onChange={ event => this.setState({ stock_code: event.target.value }) }></Form.Control> </th>
                                        <th><Form.Control type="text" name="price" onChange={ event => this.setState({ price: event.target.value }) }></Form.Control> </th>
                                        <th><Form.Control type="text" name="shares" onChange={ event => this.setState({ shares: event.target.value }) }></Form.Control> </th>
                                        <th><Form.Control type="text" name="fees" onChange={ event => this.setState({ fees: event.target.value }) }></Form.Control> </th>
                                        <th><Form.Control type="text" name="net" onChange={ event => this.setState({ net: event.target.value }) }></Form.Control> </th>
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