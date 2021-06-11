import React from 'react'
import axios from 'axios'
import DatatableHelper from '../../Helper/DatatableHelper'
import BankDatatable from '../datatable/BankDatatable'
import Transactions from '../datatable/Transactions'

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
                {key: 'gain_loss_percentage', title: 'Gain/Loss (%)'} 
            ],
            data:[], 
            totalRecords: 0
        } 
    }

    componentDidMount() {

        this.getClosedTrades()
    }

    winLossFormat(result) {
        let badge = result == 'win' ? 'success' : 'danger';
        return <span className={'badge badge-' + badge}>{result}</span>;
    }
    
    getClosedTrades(page = 0) {

        let currentPage = page ? page : this.state.page
        axios.get('/api/getClosedTrades', {
                params: {
                        recordsPerPage:10,
                        page: currentPage
                    }
                })
                .then(res => {
                    this.setState({ data: res.data.trades, totalRecords: res.data.totalRecords})
                })
                .catch( err => {
                    console.log(err)
                })
    }

    eraseAllLogs() {

        let confirm = window.confirm('This will delete all your trades and bank transactions, are you sure you want to erase all logs?')
        
        if (confirm) {
            axios.delete('eraseAllLogs')
                .then(res => {
                    if (res.data == 1)
                        this.forceUpdate();

                })
                .catch(err => {
                    console.log(err)
                })
        }
    }
    render() {

        return (
            <div className="page-wrapper">   
                <div className="page-breadcrumb">
                    <div className="row align-items-center">
                        <div className="col-5">
                            <h4 className="page-title">Transaction Logs</h4> 
                        </div> 
                    </div>
                </div> 
                <div className="container-fluid"> 
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="card">
                                <div className="card-body" >
                                    <button onClick={() => this.eraseAllLogs()} style={{float:'right',marginTop:'16px'}} className="btn btn-danger pull-right">Erase all logs</button>
                                    <Tabs defaultActiveKey="closed-trades" id="uncontrolled-tab-example">
                                        <Tab eventKey="closed-trades" title="Closed Trades">
                                            <div className='tab-content'> 
                                                <DatatableHelper 
                                                    columns={this.state.columns}
                                                    data={this.state.data}
                                                    onChangePage={(page) => this.getClosedTrades(page)} 
                                                    totalRecords={this.state.totalRecords}
                                                    pagination
                                               /> 
                                            </div>
                                        </Tab>
                                        <Tab eventKey="transactions" title="Trade Transactions">
                                            <Transactions />
                                        </Tab> 
                                        <Tab eventKey="bank" title="Bank Transactions">
                                            <BankDatatable />
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