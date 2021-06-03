import React from "react"
import TradeForm from '../forms/TradeForm'
import BankForm from '../forms/BankForm'
import EquityChart from '../chart/EquityChart'  
import PositionsTable from '../positions_table/PositionsTable' 
import { Button, Modal } from "react-bootstrap"
import NumberFormat from 'react-number-format'
import axios from "axios"
import SellForm from '../forms/SellForm' 
import TopGainersChart from '../chart/TopGainersChart'
import TopLosersChart from '../chart/TopLosersChart'
import AccountPerformanceTable from '../tables/AccountPerformanceTable'
import { Fragment } from "react"

var positions = [];

class Dashboard extends React.Component {

    constructor(props) {
        super(props) 
        this.state = {
            totalEquity:0,
            availableCash:0,
            gainLossPercentage:0,
            gainLossAmount:0,
            show: false,
            positions:null,
            showSellModal: false,
            toSell: []
        }

        this.setEquity()
        this.load_positions()
        this.handleModal = this.handleModal.bind(this)
        this.setEquity = this.setEquity.bind(this)
        this.load_positions = this.load_positions.bind(this)
        this.setEquity = this.setEquity.bind(this)
        this.handleModal = this.handleModal.bind(this)
        this.closeSellModal = this.closeSellModal.bind(this)
    }  

    handleSellModal(trade) { 
        this.setState({toSell: trade})
        this.setState({showSellModal: !this.state.showSellModal})
    }

    closeSellModal() {

        this.setState({showSellModal: !this.state.showSellModal})
    }

    async setEquity() {

        await axios.get('get_equities')
                .then( res => { 
                    if ( res.data ) {

                        return this.setState({
                            totalEquity: res.data.total_equity,
                            availableCash: res.data.remaining_cash,
                            gainLossAmount: res.data.gainLossAmount,
                            gainLossPercentage: res.data.gainLossPercentage
                         })
                    }
                })
                .catch( err => {
                    console.log(err)
                })
    }

    handleModal() {

        this.setState({ show: !this.state.show})
 
    }

    async load_positions() {
        
        const res = await axios.get('/positions');
        let position;

        if ( Object.keys(res.data).length ) {

            position = res.data.map( (trade, index) => {
                return <tr key={trade.stock_code + index }>
                    <td> {trade.stock_code }</td>
                    <td> <span className='badge badge-success'>Long</span> </td>
                    <td> <NumberFormat decimalScale={4} thousandSeparator={true} displayType='text' value={trade.ave_price} prefix={'₱'} /></td>
                    <td> {trade.total_shares }</td>
                    <td> <NumberFormat decimalScale={4} thousandSeparator={true} displayType='text' value={trade.total_cost} prefix={'₱'} /> </td>
                    <td> 
                        <div className="dropdown show">
                        <i className="fa fa-cog dropdown-toggle" href="#" role="button" id="portfolioActions" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        </i> 
                            <div className="dropdown-menu" aria-labelledby="portfolioActions">
                                <a onClick={ () => this.handleSellModal(trade) } className="dropdown-item" href="#">Sell</a> 
                            </div>
                        </div>    
                    </td>
                </tr>
            })
        }else {
            
            position = <tr>
                <td colSpan="4">No Open Position. To add new trade, Click the New Trade button above.</td>
            </tr>
        }  
        
        this.setState({positions: position})
    }  

    formatGainLoss() {

        let color = this.state.gainLossAmount > 0 ? 'text-success' : 'text-danger'

        return  (
            <Fragment>
                <span><NumberFormat decimalScale={2} thousandSeparator={true} displayType='text' value={this.state.gainLossAmount.toFixed(2)} prefix={'₱'} /></span> &nbsp;
                <small className={color}>{this.state.gainLossPercentage}%</small>
            </Fragment>
        )
    }
 
    render() {      
        return (
            
            <div className="page-wrapper">   
                <div className="page-breadcrumb">
                    <div className="row align-items-center">
                        <div className="col-5">
                            <h4 className="page-title">Dashboard</h4> 
                        </div>
                        <div className="col-7">
                            <div className="text-end upgrade-btn"> 
                            <Button onClick={() => {this.handleModal()}} className="btn btn-danger text-white">New Trade</Button> 
               
                                <Modal 
                                    show={this.state.show} 
                                    onHide={() => this.handleModal(false) } 
                                    dialogClassName="modal-xl"   
                                >
                                    <TradeForm
                                        availableCash={this.state.availableCash}
                                        totalEquity={this.state.totalEquity}
                                        handleModal={this.handleModal}
                                        load_positions={this.load_positions}
                                        reloadEquity={this.setEquity}
                                    /> 
                                </Modal>
                            </div>
                        </div>
                    </div>
                </div> 
                <div className="container-fluid"> 
                    <div className="row">
                        <div className="col-md-8">
                            <div className="card">
                                <div className="card-body">
                                    <div className="d-md-flex align-items-center">
                                        <div>
                                            <h4 className="card-title">Equity Curve</h4>
                                            <h5 className="card-subtitle">Overview of the last 12 Months </h5>
                                        </div> 
                                    </div>
                                    <div className="row"> 
                                        <div className="col-lg-12">
                                            <div className="campaign ct-charts">
                                                <EquityChart />
                                            </div>
                                        </div> 
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="card">
                                <div className="card-body equity-card">
                                    <h4 className="card-title">Account Summary (PHP)</h4>
                                    <h5 className="card-subtitle">Summary for the last 12s months</h5>
                                    <div className="feed-widget">
                                        <ul className="list-style-none feed-body m-0 p-b-20">
                                            <li className="feed-item">
                                                <div className="feed-icon bg-info">
                                                    <i className="mdi mdi-chart-timeline"></i>
                                                </div> Total Equity
                                                <span className="ms-auto font-13">
                                                    <NumberFormat decimalScale={2} thousandSeparator={true} displayType='text' value={this.state.totalEquity.toFixed(2)} prefix={'₱'} />
                                                </span>
                                            </li>
                                            <li className="feed-item">
                                                <div className="feed-icon bg-success"><i className="mdi mdi-chart-pie"></i></div> Available Cash
                                                <span className="ms-auto font-13">
                                                    <NumberFormat decimalScale={2} thousandSeparator={true} displayType='text' value={ this.state.availableCash.toFixed(2) } prefix={'₱'} />
                                                </span>
                                            </li>  
                                            <li className="feed-item">
                                                <div className="feed-icon bg-warning"><i className="mdi mdi-chart-line"></i></div>Gain / Loss
                                                <span className="ms-auto font-13">
                                                    {this.formatGainLoss()}
                                                </span>
                                            </li>  
                                        </ul>
                                        <hr></hr>
                                        <div>
                                            <BankForm
                                                setEquity={this.setEquity}
                                                availableCash={this.state.availableCash}
                                                totalEquity={this.state.totalEquity}
                                            />   
                                        </div>
                                    </div> 
                                </div>
                            </div>
                        </div>
                    </div> 
                    <div className="row"> 
                        <div className="col-12">
                            <div className="card">
                                <div className="card-body"> 
                                    <div className="d-md-flex">
                                        <div>
                                        <h4 className="card-title">Stock Position</h4>
                                        <h5 className="card-subtitle">Overview of my open trades</h5>
                                        </div> 
                                    </div>  
                                   <PositionsTable positions={this.state.positions} />
                                   <Modal     
                                        show={ this.state.showSellModal } 
                                        onHide={ () => this.closeSellModal() }
                                        >
                                            
                                        <SellForm 
                                            show={this.state.showSellModal }  
                                            handleModal= { this.handleSellModal }
                                            trade= {this.state.toSell}
                                            closeHandle = { this.closeSellModal }
                                            availableCash={this.state.availableCash}
                                            totalEquity={this.state.totalEquity}
                                            setEquity={this.setEquity}
                                            load_positions={this.load_positions}
                                            />
                                    </Modal>
                                   
                                </div>
                                
                            </div>
                        </div>
                        
                        <div className='col-md-4'>
                            <div className='card'>
                                <div className='card-body'>
                                    <div> 
                                        <h4 className="card-title">Account Performance</h4>
                                        <h5 className="card-subtitle">Summary of my trade metrics</h5>
                                        {/* 
                                            Metrics
                                            1. Win Rate
                                            2. Reward:Risk Ratio
                                            3. Expectancy
                                            4. Maximum Consecutive Loss
                                            5. Maximum Drawdown
                                            6. Number of Trades
                                            7. Profitability 

                                        */}
                                        {/* <div className="row">
                                            <div className="col-6">
                                                <div className="trade-overview-widget">
                                                    <div className="text-center circle-wrapper">
                                                        <span>105</span>
                                                    </div>
                                                    <div className="text-center text">Total Trades Taken</div>
                                                </div>
                                            </div>
                                            <div className="col-6">
                                                <div className="trade-overview-widget">
                                                    <div className="text-center circle-wrapper">
                                                        <span>45%</span>
                                                    </div>
                                                    <div className="text-center text">Winning Percentage</div>
                                                </div>
                                            </div>
                                            <div className="col-6">
                                                <div className="trade-overview-widget">
                                                    <div className="text-center circle-wrapper">
                                                        <span>21%</span>
                                                    </div>
                                                    <div className="text-center text">Avg Gain</div>
                                                </div>
                                            </div>
                                            <div className="col-6">
                                                <div className="trade-overview-widget">
                                                    <div className="text-center circle-wrapper">
                                                        <span>6%</span>
                                                    </div>
                                                    <div className="text-center text">Avg Loss</div>
                                                </div>
                                            </div>
                                            <div className="col-6">
                                                <div className="trade-overview-widget">
                                                    <div className="text-center circle-wrapper">
                                                        <span>2:3</span>
                                                    </div>
                                                    <div className="text-center text">Win Loss Ratio</div>
                                                </div>
                                            </div>
                                            <div className="col-6">
                                                <div className="trade-overview-widget">
                                                    <div className="text-center circle-wrapper">
                                                        <span>1:3</span>
                                                    </div>
                                                    <div className="text-center text">Adjusted Win Loss Ratio</div>
                                                </div>
                                            </div>
                                        </div> */}
                                        <AccountPerformanceTable />
                                    </div> 
                                </div>
                            </div>
                        </div>
                        <div className='col-md-4'>
                            <div className='card'>
                                <div className='card-body'>
                                    <div> 
                                        <h4 className="card-title">Top Gainers</h4>
                                        <h5 className="card-subtitle">Commulative of my top gainers trades</h5>

                                    </div> 
                                    <div style={{height:'230px'}}>
                                        <TopGainersChart />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='col-md-4'>
                            <div className='card'>
                                <div className='card-body'>
                                    <div> 
                                        <h4 className="card-title">Top Losers</h4>
                                        <h5 className="card-subtitle">Commulative of my top lossers trades</h5>
                                        
                                    </div> 
                                    <div style={{height:'230px'}}>
                                        <TopLosersChart />
                                    </div>
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

export default Dashboard;

