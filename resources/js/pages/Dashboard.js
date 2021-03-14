import React from "react"
import TradeForm from '../components/TradeForm'
import Trades from '../model/Trades'
import BankForm from '../components/BankForm'

var positions = [];

class Dashboard extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            positions: []
        }
 
        this.open_positions()
      
    } 

    open_positions() {

        Trades.position()
            .then( res => {

                var position;
                 
                if ( Object.keys(res).length ) {
 
                    position = res.map(function(key) {
 
                        return <tr>
                            <td> {key.stock_code }</td>
                            <td> {key.ave_price }</td>
                            <td> {key.total_shares }</td>
                            <td> {key.total_cost }</td>
                        </tr>
                    })
                }else {
                    
                    position = <tr>
                        <td colSpan="4">No Open Position. To add new trade, Click the New Trade button above.</td>
                    </tr>
                }
 
  
               this.setState({positions: position}) 

            })
      
    }
 
    render() {       

        return (
            <div className="page-wrapper">  
            
                <div className="page-breadcrumb">
                    <div className="row align-items-center">
                        <div className="col-5">
                            <h4 className="page-title">Dashboard</h4>
                            <div className="d-flex align-items-center">
                                <nav aria-label="breadcrumb">
                                    <ol className="breadcrumb">
                                        <li className="breadcrumb-item"><a href="#">Home</a></li>
                                        <li className="breadcrumb-item active" aria-current="page">Dashboard</li>
                                    </ol>
                                </nav>
                            </div>
                        </div>
                        <div className="col-7">
                            <div className="text-end upgrade-btn"> 
                                <TradeForm /> 
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
                                            <h5 className="card-subtitle">Overview of Latest 12 Months </h5>
                                        </div> 
                                    </div>
                                    <div className="row"> 
                                        <div className="col-lg-12">
                                            <div className="campaign ct-charts"></div>
                                        </div> 
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="card">
                                <div className="card-body">
                                    <h4 className="card-title">Account Summary (PHP)</h4>
                                    <div className="feed-widget">
                                        <ul className="list-style-none feed-body m-0 p-b-20">
                                            <li className="feed-item">
                                                <div className="feed-icon bg-info"><i className="mdi mdi-chart-timeline"></i></div> Total Equity<span className="ms-auto font-13">125,000</span>
                                            </li>
                                            <li className="feed-item">
                                                <div className="feed-icon bg-success"><i className="mdi mdi-chart-pie"></i></div> Available Cash
                                                <span className="ms-auto font-13">100,000</span>
                                            </li>
                                            <li className="feed-item">
                                                <div className="feed-icon bg-warning"><i className="mdi mdi-chart-line"></i></div>Gain / Loss<span className="ms-auto font-13">25,000 <small>25%</small></span>
                                            </li>  
                                        </ul>
                                        <hr></hr>
                                        <div>
                                            <BankForm /> 
                                        </div>
                                    </div>
                                    <div> 
                                        
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
                                        <div className="ms-auto">
                                            <div className="dl">
                                                <select className="form-select shadow-none">
                                                    <option value="0">Monthly</option>
                                                    <option value="1">Daily</option>
                                                    <option value="2">Weekly</option>
                                                    <option value="3">Yearly</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div> 
                                </div>
                                <div className="table-responsive">
                                     
                                    <table className="table v-middle">
                                        <thead>
                                            <tr className="bg-light">
                                                <th className="border-top-0">Stock</th>
                                                <th className="border-top-0">Ave. Price</th>
                                                <th className="border-top-0">Shares</th>
                                                <th className="border-top-0">Total Cost</th> 
                                            </tr>
                                        </thead>
                                        <tbody> 
                                            { this.state.positions }
                                        </tbody>
                                    </table> 
                                </div>
                            </div>
                        </div>
                    </div>  
                </div>
                <footer className="footer text-center">
                    All Rights Reserved by Xtreme Admin. Designed and Developed by <a
                    href="https://www.wrappixel.com">WrapPixel</a>.
                </footer> 
            </div>    
        )
    }


}

export default Dashboard;

