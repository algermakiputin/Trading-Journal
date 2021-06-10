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
            toSell: [],
            equityCurve:null,
            accountPerformance:[],
            topLossers:[],
            topGainers:[],
            winBarHeight:50,
            lossBarHeight:50,
        }

        this.setEquity()
        this.load_positions()
        this.handleModal = this.handleModal.bind(this)
        this.setEquity = this.setEquity.bind(this)
        this.load_positions = this.load_positions.bind(this)
        this.setEquity = this.setEquity.bind(this)
        this.handleModal = this.handleModal.bind(this)
        this.closeSellModal = this.closeSellModal.bind(this) 
        this.setEquityCurve = this.setEquityCurve.bind(this)
        this.setAccountPerformance = this.setAccountPerformance.bind(this)
        this.setTopLossers = this.setTopLossers.bind(this)
        this.setTopGainers = this.setTopGainers.bind(this)
    }  

    componentDidMount() {
        this.setEquityCurve()
        this.setAccountPerformance()
        this.setTopLossers()
        this.setTopGainers()
    }

    handleSellModal(trade) { 
        this.setState({toSell: trade})
        this.setState({showSellModal: !this.state.showSellModal})
    }

    closeSellModal() {

        this.setState({showSellModal: !this.state.showSellModal})
    }

    async setAccountPerformance() {

        await axios.get('/api/getAccountPerformanceSummary')
                    .then(res => { 
                        this.setState({
                            accountPerformance:res.data
                        }) 
                    })
                    .catch( err => {
                        console.log(err)
                    })
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

    setEquityCurve() {
        axios.get('/api/equitycurve')
                    .then(res => {
                        this.setState({ equityCurve: res.data }) 
                    })
                    .catch(err => {
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
                <span><NumberFormat decimalScale={2} thousandSeparator={true} displayType='text' value={this.state.gainLossAmount} prefix={'₱'} /></span> &nbsp;
                <small className={color}>{this.state.gainLossPercentage}%</small>
            </Fragment>
        )
    }

    async setTopLossers() {

        await axios.get('/api/getTopLosers')
                    .then( res => { 
                        this.setState({
                            topLossers: res.data,
                            lossBarHeight: 50 * res.data.length
                        })
                    })
                    .catch( err => {
                        console.log(err)
                    })
    }

    async setTopGainers() {

        await axios.get('/api/getTopGainers')
                    .then( res => { 
                        this.setState({
                            topGainers: res.data, 
                            winBarHeight: 50 * res.data.length
                        })
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
                                                <EquityChart 
                                                    equityCurve={this.state.equityCurve}
                                                    setEquityCurve={this.setEquityCurve}
                                                />
                                            </div>
                                        </div> 
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="card">
                                <div className="card-body equity-card">
                                    <h4 className="card-title">Account Summary(PHP)</h4>
                                    <h5 className="card-subtitle">Account summary for the last 12 months</h5>
                                    <div className="feed-widget">
                                        <ul className="list-style-none feed-body m-0 p-b-20">
                                            <li className="feed-item">
                                                <div className="feed-icon bg-info">
                                                    <i className="mdi mdi-chart-timeline"></i>
                                                </div> Total Equity
                                                <span className="ms-auto font-13">
                                                    <NumberFormat decimalScale={2} thousandSeparator={true} displayType='text' value={parseFloat(this.state.totalEquity).toFixed(2)}/>
                                                </span>
                                            </li>
                                            <li className="feed-item">
                                                <div className="feed-icon bg-success"><i className="mdi mdi-chart-pie"></i></div> Available Cash
                                                <span className="ms-auto font-13">
                                                    <NumberFormat decimalScale={2} thousandSeparator={true} displayType='text' value={parseFloat(this.state.availableCash).toFixed(2)}  />
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
                                                setEquityCurve={this.setEquityCurve}
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
                                            setEquityCurve={this.setEquityCurve}
                                            setAccountPerformance={this.setAccountPerformance}
                                            setTopGainers={this.setTopGainers}
                                            setTopLossers={this.setTopLossers}
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
                                       
                                        <AccountPerformanceTable 
                                            accountPerformance={this.state.accountPerformance}
                                            setAccountPerformance={this.setAccountPerformance}
                                        />
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
                                    <div style={{height:'235px'}}>
                                        <TopGainersChart 
                                            height={this.state.winBarHeight}
                                            data={this.state.topGainers}
                                        />
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
                                    <div style={{height:'235px'}}>
                                        <TopLosersChart
                                            height={this.state.lossBarHeight}
                                            data={this.state.topLossers}
                                        />
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

