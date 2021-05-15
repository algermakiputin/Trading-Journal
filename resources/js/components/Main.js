import React from 'react'
import ReactDOM from 'react-dom'
import '../../dist/css/style.min.css'
import '../../css/app.css'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Header from '../templates/Header'
import Sidebar from '../templates/Sidebar'
import Dashboard from '../pages/Dashboard'
import Logs from '../pages/Logs'


class Main extends React.Component {

    constructor(props) {
        super(props) 
       
    } 

    render() { 
     
        return ( 
            <div id="main-wrapper" data-layout="vertical" data-navbarbg="skin5" data-sidebartype="full"
            data-sidebar-position="absolute" data-header-position="absolute" data-boxed-layout="full">
                <BrowserRouter>
                    <Header />
                    <Switch>
                        <Route exact path="/">
                            <Dashboard />
                        </Route>
                        <Route path="/logs">
                            <Logs />
                        </Route>
                    </Switch>
                    <Sidebar />
                </BrowserRouter>
                
            </div>  
        );
    }
}

export default Main;

if (document.getElementById('example')) {
    ReactDOM.render(<Main />, document.getElementById('example'));
}
