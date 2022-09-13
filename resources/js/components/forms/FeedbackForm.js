import React from 'react'
import { Button, Modal } from "react-bootstrap"
import axios from "axios"

class FeedbackFrom extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            show:false,
            loading:false,
            rating:null,
            feedback:null,
            details:null
        }
        this.defaultState = this.state
    }

    handleClose() {
        this.setState({show:false})
    }

    handleModal(event) {
        event.preventDefault()
        this.setState({show:!this.state.show})
    }

    handleFormSubmit() {
        
        if (this.state.rating && this.state.feedback && this.state.details) {
            this.setState({loading:true})
            axios.post('/feedback/submit', this.state)
                .then(res => {
                    alert('Feedback submitted successfully')
                    this.setState(this.defaultState)
                    this.setState({loading:false})
                })
                .catch(err => {
                    console.log(err)
                })
        }else {

            alert('Please fill up all the required fields')
        }
    }

    render() {

        return (
            <Modal 
                show={this.state.show} 
                onHide={() => this.handleClose(false) }  
            > 
                <Modal.Header closeButton>
                    <Modal.Title>Provide us Feedback</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <div className="form-group">
                            <label>How do you rate your overall experience? *</label><br/>
                            <div className="form-check form-check-inline">
                                <input 
                                onChange={(event) => this.setState({rating:event.target.value})}
                                className="form-check-input" 
                                name="exp" 
                                type="radio" id="bad" value="bad"/>
                                <label for="bad" >Bad</label>
                            </div> 
                            <div className="form-check form-check-inline">
                                <input 
                                onChange={(event) => this.setState({rating:event.target.value})}
                                className="form-check-input" 
                                name="exp" 
                                type="radio" 
                                id="avg" 
                                value="average"/>
                                <label for="avg" >Average</label>
                            </div> 
                            <div className="form-check form-check-inline">
                                <input 
                                onChange={(event) => this.setState({rating:event.target.value})}
                                className="form-check-input" 
                                name="exp" 
                                type="radio" 
                                id="good" 
                                value="good"/>
                                <label for="good" >Good</label>
                            </div> 
                        </div>
                        <div className="form-group">
                            <label>Your Feedback *</label>
                            <input onChange={(event) => this.setState({feedback:event.target.value})} type="text" placeholder="Summary" className="form-control"/>
                        </div>
                        <div className="form-group">
                            <label>Further Details *</label>
                            <textarea onChange={(event) => this.setState({details:event.target.value})} type="text" rows="4"  className="form-control" placeholder="Add more details here..."></textarea>
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => this.handleClose(false) }>
                        Close
                    </Button>
                    <Button variant="primary" onClick={ () => {this.handleFormSubmit()}}>
                        { this.state.loading ? 'Loading...' : 'Submit'}
                    </Button>
                </Modal.Footer> 
            </Modal>
        )
    }
}

export default FeedbackFrom