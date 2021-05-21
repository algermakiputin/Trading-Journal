import React from 'react'
import ChartistGraph from 'react-chartist'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart } from 'recharts'
import axios from 'axios'
import { Fragment } from 'react'
class EquityChart extends React.Component {

    constructor(props) {

        super(props)
        this.state = {
            data:null
        }
    }

    componentDidMount() {

        this.setData();
    }

    setData() {

        axios.get('/api/equitycurve')
                .then(res => {
                    this.setState({ data: res.data })
                    console.log(this.state.data)
                })
                .catch(err => {
                    console.log(err)
                })

    }

    xAxisLabelFormat( value, index) {
        
        return index % 3 == 0 ? value : ''
        
    }
    render() {

        return (
            <Fragment>
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart 
                        data={this.state.data} 
                    >
                    <CartesianGrid stroke="#000000" strokeOpacity="0.1" strokeDasharray="3 3" verticalFill={['#fff', '#f4f4f5']} fillOpacity={0.2}/> 
                    <XAxis tickFormatter={this.xAxisLabelFormat} tickLine={false}  axisLine={false}  dataKey="date" opacity={0.65} tick={{fontSize:'0.9rem', color:'#000'}} dy={10} />
                    <YAxis orientation="left" stroke="black" tickMargin={10} tickLine={false}  axisLine={false} opacity={0.65} tick={{fontSize:'0.9rem', color:"#000"}} />
                    <Tooltip />
                        <Line dot={false} tick={{fontSize:'5px'}} type="monotone" dataKey="amount" stroke="#4fc3f7" strokeWidth={2.5} /> 
                    </LineChart>
                </ResponsiveContainer>
            </Fragment>
        )
    }

}


export default EquityChart;