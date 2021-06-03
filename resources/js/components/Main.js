import React from 'react'
import ReactDOM from 'react-dom'
import '../../dist/css/style.min.css'
import '../../css/app.css'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Header from '../templates/Header'
import Sidebar from '../templates/Sidebar'
import Dashboard from '../components/pages/Dashboard'
import Analytics from '../components/pages/Analytics'
import MonthlyTracker from '../components/pages/MonthlyTracker'
import Logs from '../components/pages/Logs'
import axios from 'axios'
import UserContext from '../UserContext'
import '../global/global'

axios.defaults.headers.common['X-CSRF-TOKEN'] = global.csrf_token
class Main extends React.Component {

    constructor(props) {
        super(props) 
        
        this.user = {
            name: global.user_name,
            email: global.user_email,
            logout: this.logout
        }

        
    } 

    componentDidMount() {
        console.log(global.server_date)
    }

    logout() { 
        axios.post('/logout')
            .then( res => {
                window.location.href = '/login'
            })
    }

    render() { 
     
        return ( 
            <UserContext.Provider value={this.user}>
                <div id="main-wrapper" data-layout="vertical" data-navbarbg="skin5" data-sidebartype="full"
            data-sidebar-position="absolute" data-header-position="absolute" data-boxed-layout="full">
                    <BrowserRouter>
                        <Header />
                        <Switch>
                            <Route exact path="/dashboard">
                                <Dashboard />
                            </Route>
                            <Route path="/monthly-tracker">
                                <MonthlyTracker />
                            </Route>
                            <Route path="/analytics">
                                <Analytics />
                            </Route>
                            <Route path="/logs">
                                <Logs />
                            </Route>
                        </Switch>
                        <Sidebar />
                    </BrowserRouter> 
                </div>  
            </UserContext.Provider>
        );
    }
}

export default Main;

if (document.getElementById('example')) {
    ReactDOM.render(<Main />, document.getElementById('example'));
}
