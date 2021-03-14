import React from 'react';
import ReactDOM from 'react-dom';
import '../../css/app.css';
import '../../dist/css/style.min.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Header from '../templates/Header';
import Sidebar from '../templates/Sidebar';
import Dashboard from '../pages/Dashboard';

function Main() {
    return (
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
        
    );
}

export default Main;

if (document.getElementById('example')) {
    ReactDOM.render(<Main />, document.getElementById('example'));
}
