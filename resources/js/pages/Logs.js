import React from 'react'
import axios from 'axios'

class Logs extends React.Component {

    constructor(props) {

        super(props)
    }

    componentDidMount() {

        this.getClosedTrades()
    }
    
    getClosedTrades() {

        axios.get('/api/getClosedTrades')
                .then(res => {
                    console.log(res)
                })
                .catch( err => {
                    console.log(err)
                })
    }
    render() {

        return (
            <div className="page-wrapper">   
                <div className="page-breadcrumb">
                    <div className="row align-items-center">
                        <div className="col-5">
                            <h4 className="page-title">Trade Logs</h4>
                            <div className="d-flex align-items-center">
                                <nav aria-label="breadcrumb">
                                    <ol className="breadcrumb">
                                        <li className="breadcrumb-item"><a href="#">Home</a></li>
                                        <li className="breadcrumb-item active" aria-current="page">Trade Logs</li>
                                    </ol>
                                </nav>
                            </div>
                        </div> 
                    </div>
                </div> 
                <div className="container-fluid"> 
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="card">
                                <div className="card-body">
                                    <div>
                                        <h4 className="card-title">Equity Curve</h4>
                                        <h5 className="card-subtitle">Overview of the last 12 Months </h5>
                                    </div> 
                                    <table className="table table-striped table-bordered table-hover">
                                        <thead>
                                            <tr>
                                                <th>Date</th>
                                                <th>Stock Code</th>
                                                <th>Ave Buy</th>
                                                <th>Ave Sell</th>
                                                <th>Side</th>
                                                <th>Result</th>
                                                <th>Gain / Loss</th>
                                            </tr>
                                        </thead>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div> 
                     
                </div>
                <footer className="footer text-center">
                    Trading Journal PH
                </footer> 
            </div>    
        )
    }
}

export default Logs