import React from 'react';
import ReactDOM from 'react-dom'; 
import '../../dist/css/style.min.css';
import '../../css/app.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Header from '../templates/Header';
import Sidebar from '../templates/Sidebar';
import Dashboard from '../pages/Dashboard';
import UserContext from '../UserContext'


class Main extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            fname: 'Alger',
            lname: 'Makiputin',
            positions: null
        }

        this.load_positions = this.load_positions.bind(this)
        
        this.load_positions();
       
    }

    async load_positions() {
        
        const res = await axios.get('/positions');
        let position;

        if ( Object.keys(res.data).length ) {

            position = res.data.map(function(key) {

                return <tr key={Math.random()}>
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
    }  

    render() { 
     
        return (
        
            <UserContext.Provider value={ { state: this.state, load_positions: this.load_positions } }> 
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
            </UserContext.Provider>
            
        );
    }
}

export default Main;

if (document.getElementById('example')) {
    ReactDOM.render(<Main />, document.getElementById('example'));
}
