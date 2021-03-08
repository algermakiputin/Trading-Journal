import React from "react";
import TradeForm from '../components/TradeForm';

class Dashboard extends React.Component {

    constructor(props) {
        super(props);
      
    } 

    render() { 

        return (
            <div class="page-wrapper"> 
                <div class="page-breadcrumb">
                    <div class="row align-items-center">
                        <div class="col-5">
                            <h4 class="page-title">Dashboard</h4>
                            <div class="d-flex align-items-center">
                                <nav aria-label="breadcrumb">
                                    <ol class="breadcrumb">
                                        <li class="breadcrumb-item"><a href="#">Home</a></li>
                                        <li class="breadcrumb-item active" aria-current="page">Library</li>
                                    </ol>
                                </nav>
                            </div>
                        </div>
                        <div class="col-7">
                            <div class="text-end upgrade-btn"> 
                                <TradeForm />
                            </div>
                        </div>
                    </div>
                </div> 
                <div class="container-fluid"> 
                    <div class="row">
                        <div class="col-md-8">
                            <div class="card">
                                <div class="card-body">
                                    <div class="d-md-flex align-items-center">
                                        <div>
                                            <h4 class="card-title">Equity Curve</h4>
                                            <h5 class="card-subtitle">Overview of Latest 12 Months</h5>
                                        </div> 
                                    </div>
                                    <div class="row"> 
                                        <div class="col-lg-12">
                                            <div class="campaign ct-charts"></div>
                                        </div> 
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="card">
                                <div class="card-body">
                                    <h4 class="card-title">Performance</h4>
                                    <div class="feed-widget">
                                        <ul class="list-style-none feed-body m-0 p-b-20">
                                            <li class="feed-item">
                                                <div class="feed-icon bg-info"><i class="far fa-bell"></i></div> Total Trades<span class="ms-auto font-13">28</span>
                                            </li>
                                            <li class="feed-item">
                                                <div class="feed-icon bg-success"><i class="ti-server"></i></div> Net Gain Loss
                                                <span class="ms-auto font-13">208,000</span>
                                            </li>
                                            <li class="feed-item">
                                                <div class="feed-icon bg-warning"><i class="ti-shopping-cart"></i></div>Accuracy<span class="ms-auto font-13">25%</span>
                                            </li>
                                            <li class="feed-item">
                                                <div class="feed-icon bg-danger"><i class="ti-user"></i></div>Edge Ratio<span class="ms-auto font-13 ">0.80</span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div> 
                    <div class="row"> 
                        <div class="col-12">
                            <div class="card">
                                <div class="card-body"> 
                                    <div class="d-md-flex">
                                        <div>
                                            <h4 class="card-title">Rcent Trades</h4>
                                            <h5 class="card-subtitle">Overview of latest trades</h5>
                                        </div>
                                        <div class="ms-auto">
                                            <div class="dl">
                                                <select class="form-select shadow-none">
                                                    <option value="0" selected>Monthly</option>
                                                    <option value="1">Daily</option>
                                                    <option value="2">Weekly</option>
                                                    <option value="3">Yearly</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div> 
                                </div>
                                <div class="table-responsive">
                                    <table class="table v-middle">
                                        <thead>
                                            <tr class="bg-light">
                                                <th class="border-top-0">Products</th>
                                                <th class="border-top-0">License</th>
                                                <th class="border-top-0">Support Agent</th>
                                                <th class="border-top-0">Technology</th>
                                                <th class="border-top-0">Tickets</th>
                                                <th class="border-top-0">Sales</th>
                                                <th class="border-top-0">Earnings</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>
                                                    <div class="d-flex align-items-center">
                                                        <div class="m-r-10"><a
                                                            class="btn btn-circle d-flex btn-info text-white">EA</a>
                                                        </div>
                                                        <div class="">
                                                            <h4 class="m-b-0 font-16">Elite Admin</h4>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>Single Use</td>
                                                <td>John Doe</td>
                                                <td>
                                                    <label class="label label-danger">Angular</label>
                                                </td>
                                                <td>46</td>
                                                <td>356</td>
                                                <td>
                                                    <h5 class="m-b-0">$2850.06</h5>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <div class="d-flex align-items-center">
                                                        <div class="m-r-10"><a
                                                            class="btn btn-circle d-flex btn-orange text-white">MA</a>
                                                        </div>
                                                        <div class="">
                                                            <h4 class="m-b-0 font-16">Monster Admin</h4>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>Single Use</td>
                                                <td>Venessa Fern</td>
                                                <td>
                                                    <label class="label label-info">Vue Js</label>
                                                </td>
                                                <td>46</td>
                                                <td>356</td>
                                                <td>
                                                    <h5 class="m-b-0">$2850.06</h5>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <div class="d-flex align-items-center">
                                                        <div class="m-r-10"><a
                                                            class="btn btn-circle d-flex btn-success text-white">MP</a>
                                                        </div>
                                                        <div class="">
                                                            <h4 class="m-b-0 font-16">Material Pro Admin</h4>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>Single Use</td>
                                                <td>John Doe</td>
                                                <td>
                                                    <label class="label label-success">Bootstrap</label>
                                                </td>
                                                <td>46</td>
                                                <td>356</td>
                                                <td>
                                                    <h5 class="m-b-0">$2850.06</h5>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <div class="d-flex align-items-center">
                                                        <div class="m-r-10"><a
                                                            class="btn btn-circle d-flex btn-purple text-white">AA</a>
                                                        </div>
                                                        <div class="">
                                                            <h4 class="m-b-0 font-16">Ample Admin</h4>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>Single Use</td>
                                                <td>John Doe</td>
                                                <td>
                                                    <label class="label label-purple">React</label>
                                                </td>
                                                <td>46</td>
                                                <td>356</td>
                                                <td>
                                                    <h5 class="m-b-0">$2850.06</h5>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div> 
                    <div class="row"> 
                        <div class="col-lg-6">
                            <div class="card">
                                <div class="card-body">
                                    <h4 class="card-title">Recent Comments</h4>
                                </div>
                                <div class="comment-widgets scrollable"> 
                                    <div class="d-flex flex-row comment-row m-t-0">
                                        <div class="p-2"><img src="../../assets/images/users/1.jpg" alt="user" width="50"
                                            class="rounded-circle"/>
                                            <div class="comment-text w-100">
                                                <h6 class="font-medium">James Anderson</h6>
                                                <span class="m-b-15 d-block">Lorem Ipsum is simply dummy text of the printing
                                                and type setting industry. </span>
                                                <div class="comment-footer">
                                                    <span class="text-muted float-end">April 14, 2021</span> <span
                                                    class="label label-rounded label-primary">Pending</span> <span
                                                    class="action-icons">
                                                    <a href="javascript:void(0)"><i class="ti-pencil-alt"></i></a>
                                                    <a href="javascript:void(0)"><i class="ti-check"></i></a>
                                                    <a href="javascript:void(0)"><i class="ti-heart"></i></a>
                                                </span>
                                            </div>
                                        </div>
                                    </div> 
                                    <div class="d-flex flex-row comment-row">
                                        <div class="p-2"><img src="../../assets/images/users/4.jpg" alt="user" width="50"
                                            class="rounded-circle" /></div>
                                            <div class="comment-text active w-100">
                                                <h6 class="font-medium">Michael Jorden</h6>
                                                <span class="m-b-15 d-block">Lorem Ipsum is simply dummy text of the printing
                                                and type setting industry. </span>
                                                <div class="comment-footer ">
                                                    <span class="text-muted float-end">April 14, 2021</span>
                                                    <span class="label label-success label-rounded">Approved</span>
                                                    <span class="action-icons active">
                                                        <a href="javascript:void(0)"><i class="ti-pencil-alt"></i></a>
                                                        <a href="javascript:void(0)"><i class="icon-close"></i></a>
                                                        <a href="javascript:void(0)"><i class="ti-heart text-danger"></i></a>
                                                    </span>
                                                </div>
                                            </div>
                                        </div> 
                                        <div class="d-flex flex-row comment-row">
                                            <div class="p-2"><img src="../../assets/images/users/5.jpg" alt="user" width="50"
                                                class="rounded-circle" /></div>
                                                <div class="comment-text w-100">
                                                    <h6 class="font-medium">Johnathan Doeting</h6>
                                                    <span class="m-b-15 d-block">Lorem Ipsum is simply dummy text of the printing
                                                    and type setting industry. </span>
                                                    <div class="comment-footer">
                                                        <span class="text-muted float-end">April 14, 2021</span>
                                                        <span class="label label-rounded label-danger">Rejected</span>
                                                        <span class="action-icons">
                                                            <a href="javascript:void(0)"><i class="ti-pencil-alt"></i></a>
                                                            <a href="javascript:void(0)"><i class="ti-check"></i></a>
                                                            <a href="javascript:void(0)"><i class="ti-heart"></i></a>
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div> 
                                <div class="col-lg-6">
                                    <div class="card">
                                        <div class="card-body">
                                            <h4 class="card-title">Temp Guide</h4>
                                            <div class="d-flex align-items-center flex-row m-t-30">
                                                <div class="display-5 text-info"><i class="wi wi-day-showers"></i>
                                                    <span>73<sup>°</sup></span></div>
                                                    <div class="m-l-10">
                                                        <h3 class="m-b-0">Saturday</h3><small>Ahmedabad, India</small>
                                                    </div>
                                                </div>
                                                <table class="table no-border mini-table m-t-20">
                                                    <tbody>
                                                        <tr>
                                                            <td class="text-muted">Wind</td>
                                                            <td class="font-medium">ESE 17 mph</td>
                                                        </tr>
                                                        <tr>
                                                            <td class="text-muted">Humidity</td>
                                                            <td class="font-medium">83%</td>
                                                        </tr>
                                                        <tr>
                                                            <td class="text-muted">Pressure</td>
                                                            <td class="font-medium">28.56 in</td>
                                                        </tr>
                                                        <tr>
                                                            <td class="text-muted">Cloud Cover</td>
                                                            <td class="font-medium">78%</td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                                <ul class="row list-style-none text-center m-t-30">
                                                    <li class="col-3">
                                                        <h4 class="text-info"><i class="wi wi-day-sunny"></i></h4>
                                                        <span class="d-block text-muted">09:30</span>
                                                        <h3 class="m-t-5">70<sup>°</sup></h3>
                                                    </li>
                                                    <li class="col-3">
                                                        <h4 class="text-info"><i class="wi wi-day-cloudy"></i></h4>
                                                        <span class="d-block text-muted">11:30</span>
                                                        <h3 class="m-t-5">72<sup>°</sup></h3>
                                                    </li>
                                                    <li class="col-3">
                                                        <h4 class="text-info"><i class="wi wi-day-hail"></i></h4>
                                                        <span class="d-block text-muted">13:30</span>
                                                        <h3 class="m-t-5">75<sup>°</sup></h3>
                                                    </li>
                                                    <li class="col-3">
                                                        <h4 class="text-info"><i class="wi wi-day-sprinkle"></i></h4>
                                                        <span class="d-block text-muted">15:30</span>
                                                        <h3 class="m-t-5">76<sup>°</sup></h3>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div> 
                            </div> 
                        </div>
                <footer class="footer text-center">
                    All Rights Reserved by Xtreme Admin. Designed and Developed by <a
                    href="https://www.wrappixel.com">WrapPixel</a>.
                </footer> 
            </div>    
        )
    }


}

export default Dashboard;

