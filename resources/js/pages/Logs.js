import React from 'react'
import axios from 'axios'
import DatatableHelper from '../Helper/DatatableHelper'
import Transactions from '../components/datatable/Transactions'

import { Tabs, Tab } from 'react-bootstrap'

class Logs extends React.Component {

    constructor(props) {

        super(props)

        this.state = {
            columns: [
                {key: 'date', title: "Date"},
                {key: 'stock_code', title: "Stock Code"},
                {key: 'avg_buy', title: "Avg Buy"},
                {key: 'avg_sell', title: "Avg Sell"},
                {key: 'side', title: "Side"},
                {key: 'result', title: "Result", cell: (row) => this.winLossFormat(row.result)  },
                {key: 'profit_loss', title: 'Profit Loss'},
                {key: 'gain_loss_percentage', title: 'Gain/Loss (%)'},
                {key:'action', title:'action'}
            ],
            data:[], 
            recordsTotal: 0 
        } 
    }

    componentDidMount() {

        this.getClosedTrades()
    }

    winLossFormat(result) {
        let badge = result == 'win' ? 'success' : 'danger';
        return <span className={'result badge-' + badge}>{result}</span>;
    }
    
    getClosedTrades() {

        axios.get('/api/getClosedTrades')
                .then(res => {
                    this.setState({ data: res.data})
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
                                <div className="card-body" >
                                    <Tabs defaultActiveKey="closed-trades" id="uncontrolled-tab-example">
                                        <Tab eventKey="closed-trades" title="Closed Trades">
                                            <div className='tab-content'> 
                                                <DatatableHelper 
                                                    columns={this.state.columns}
                                                    data={this.state.data}
                                                    onChangePage={(page) => { console.log(page) }} 
                                                /> 
                                            </div>
                                        </Tab>
                                        <Tab eventKey="transactions" title="Transactions">
                                            <Transactions />
                                        </Tab> 
                                    </Tabs>
                                    

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