import React from 'react';
import ReactDOM from 'react-dom';
import '../../css/app.css';
import '../../dist/css/style.min.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Header from './templates/Header';
import Sidebar from './templates/Sidebar';
import Dashboard from './pages/Dashboard';
import PortfolioContext from '../context/PortfolioContext'

class Main extends React.Component {
  
    constructor(props) {
        super(props);

        this.state = {
            totalDeposit: 100000,
            availableCash:50000,
            totalWithdrawal:0
        }
 
    } 

    render() { 
        return (
            <PortfolioContext.Provider value={this.state}>
                <div id="main-wrapper" data-layout="vertical" data-navbarbg="skin5" data-sidebartype="full"
                data-sidebar-position="absolute" data-header-position="absolute" data-boxed-layout="full">
                    <Header />
                        <BrowserRouter>
                            <Switch>
                                <Route path="/">
                                    <Dashboard />
                                </Route>
                            </Switch>
                        </BrowserRouter>
                    <Sidebar />
                </div>
            </PortfolioContext.Provider> 
        );
    }
}

export default Main;

if (document.getElementById('example')) {
    ReactDOM.render(<Main />, document.getElementById('example'));
}
