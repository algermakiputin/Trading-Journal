import React from 'react'
import { Form, Table, Button, Modal, Alert } from "react-bootstrap"

class SellForm extends React.Component {

    constructor(props) {
        super(props) 
 
    }

    

    render() {

        return(

            <React.Fragment>  
               
               <Modal   
                   dialogClassName="modal-lg"   
                   show={ this.props.show } 
                   onHide={ () => this.props.handleModal() }
               >
                   <Modal.Header closeButton>
                   <Modal.Title>Sell Transaction</Modal.Title>
                   </Modal.Header>
                   <Modal.Body>
                         
                       <Form noValidate>
                           <Table bordered striped hover>
                               <thead> 
                               </thead>
                               <tbody> 
                               </tbody>
                           </Table>
                       </Form>
                   </Modal.Body>
                   <Modal.Footer>
                   <Button variant="secondary" onClick={() => {this.props.handleModal()}}>
                       Close
                   </Button>
                   <Button variant="primary" onClick={() => {this.props.handleModal()}}>
                       Submit
                   </Button>
                   </Modal.Footer>
               </Modal>
            </React.Fragment>
        )
    }
}

export default SellForm