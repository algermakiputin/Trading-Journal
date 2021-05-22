import React from 'react'
import axios from 'axios'

class MonthlyTracker extends React.Component {

    constructor(props) {

        super(props)
    }

    async setData() {

        await axios.get('/api/monthlyTracker')
                    .then(res => {
                        console.log(res)
                    })
                    .catch(err => {
                        console.log(err)
                    })
    }
    render() {

        return (

            <div className="page-wrapper">   
                <div className="page-breadcrumb">
                    <div className="row align-items-center">
                        <div className="col-5">
                            <h4 className="page-title">Monthly Tracker</h4>
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
                                <div className="card-body" >
                                    <table className="table table-bordered table-striped table-hover">
                                        <thead>
                                            <tr>
                                                <th>Month</th>
                                                <th>Avg Gain</th>
                                                <th>Avg Loss</th>
                                                <th> Win Percentage</th>
                                                <th>Total Trades</th>
                                                <th>Largest Gain</th>
                                                <th>Largest Loss</th>
                                                <th>Win holding days</th>
                                                <th>Loss holding days</th>
                                            </tr>
                                        </thead>
                                        <tbody></tbody>
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

export default MonthlyTracker