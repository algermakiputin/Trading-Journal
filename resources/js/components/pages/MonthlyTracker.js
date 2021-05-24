import React from 'react'
import axios from 'axios'

class MonthlyTracker extends React.Component {

    constructor(props) {

        super(props)
        this.state = {
            tradesSummary: [],
            netPL: 0,
            averageGain:0,
            averageLoss:0,
            winLossRatio:0
        }
    }

    componentDidMount() {

        this.setData()
        this.fetchMonthlySummary()
    }

    async fetchMonthlySummary() {

        await axios.get('/api/tradeSummary')
                    .then(res => {
                        
                        this.setState({
                            netPL: res.data.netPL,
                            averageGain: res.data.averageGain,
                            averageLoss: res.data.averageLoss,
                            winLossRatio: res.data.winLossRatio
                        })
                    })
                    .catch(err => {
                        console.log(err)
                    })
    }

    async setData() {

        await axios.get('/api/monthlyTracker')
                    .then(res => {
                        console.log(res.data)
                        this.setState({tradesSummary: res.data})
                    })
                    .catch(err => {
                        console.log(err)
                    })
    }

    displayData() {
        
        var data = []
        Object.keys(this.state.tradesSummary).map( (key, index) => (
            data.push(<tr key={index}>
                <td>{key}</td>
                <td>{this.state.tradesSummary[key].avgGain}</td>
                <td>{this.state.tradesSummary[key].avgLoss}</td>
                <td>{this.state.tradesSummary[key].winPercentage}</td>
                <td>{this.state.tradesSummary[key].totalTrades}</td>
                <td>{this.state.tradesSummary[key].largestGain}</td>
                <td>{this.state.tradesSummary[key].largestLoss}</td>
                <td>{this.state.tradesSummary[key].winHoldingDays}</td>
                <td>{this.state.tradesSummary[key].lossHoldingDays}</td>
                
            </tr>)
        ))
        
        return data
         
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
                                        <li className="breadcrumb-item"><a href="#">Dashboard</a></li>
                                        <li className="breadcrumb-item active" aria-current="page">Monthly Tracker</li>
                                    </ol>
                                </nav>
                            </div>
                        </div> 
                    </div>
                </div> 
                <div className="container-fluid">  
                    <div className="row">
                        <div className="col">
                            <div className="card">
                                <div className="card-body">
                                    <div className="summary-widget">
                                        <h5>Net P/L</h5>
                                        <h2>{ this.state.netPL}</h2>
                                        <hr/>
                                        <span>+90% Gain for the past 12 months</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card">
                                <div className="card-body">
                                    <div className="summary-widget">
                                        <h5>Average Win</h5>
                                        <h2>{ this.state.averageGain}</h2>
                                        <hr/>
                                        <span>Greather than your average loss</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card">
                                <div className="card-body">
                                    <div className="summary-widget">
                                        <h5>Average Loss</h5>
                                        <h2>{ this.state.averageLoss}</h2>
                                        <hr/>
                                        <span>Lesser than average gain</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card">
                                <div className="card-body">
                                    <div className="summary-widget">
                                        <h5>Win Loss Ratio</h5>
                                        <h2>{ this.state.winLossRatio}</h2>
                                        <hr/>
                                        <span>Your win/loss ratio is favorable</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
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
                                                <th> Winning Percentage</th>
                                                <th>Total Trades</th>
                                                <th>Largest Gain</th>
                                                <th>Largest Loss</th>
                                                <th>Win holding days</th>
                                                <th>Loss holding days</th>
                                            </tr>
                                        </thead>
                                        <tbody>{ this.displayData() }</tbody>
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