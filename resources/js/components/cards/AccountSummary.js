import React, { useContext } from 'react'
import BankForm from '../forms/BankForm'
import PortfolioContext from '../../context/PortfolioContext'
 


class AccountSummary extends React.Component {
     
    render() {
        
     
        return(

            <PortfolioContext.Consumer>
                
                { val => (
                    <div className="card">
                    <div className="card-body">
                        <h4 className="card-title">Account Summary (PHP)</h4>
                        <div className="feed-widget">
                            <ul className="list-style-none feed-body m-0 p-b-20">
                                <li className="feed-item">
                                    <div className="feed-icon bg-info"><i className="mdi mdi-chart-timeline"></i></div> Total Equity<span className="ms-auto font-13">{ val.totalDeposit}</span>
                                </li>
                                <li className="feed-item">
                                    <div className="feed-icon bg-success"><i className="mdi mdi-chart-pie"></i></div> Available Cash
                                    <span className="ms-auto font-13">{val.availableCash}</span>
                                </li>
                                <li className="feed-item">
                                    <div className="feed-icon bg-warning"><i className="mdi mdi-chart-line"></i></div>Gain / Loss<span className="ms-auto font-13">{val.gainLoss} <small>25%</small></span>
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
                )}
            </PortfolioContext.Consumer>
        )
    }
}

export default AccountSummary