import React from 'react'
import axios from 'axios'
import { BarChart, LabelList, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart } from 'recharts'

class TopGainersChart extends React.Component {

    constructor(props) {

        super(props)
        this.state = {
            data: null,
            height:50
        }
    }

    componentDidMount() {

        this.getTopGainersLosers()
    }
    
    async getTopGainersLosers() {

        await axios.get('/api/getTopGainers')
                    .then( res => {
                         
                        this.setState({data: res.data, height: this.state.height * res.data.length})
                    })
                    .catch( err => {
                        console.log(err)
                    })
    }
    
    
    render() {

        return (
            <div className='row'>
                <div className='col'>  
                    <ResponsiveContainer width="100%" height={this.state.height} >
                        <BarChart  
                            data={this.state.data}
                            layout="vertical"
                            barCategoryGap={1}
                            margin={{top:5}} 
                            >
                                <Tooltip 
                                    formatter={(num) => Number(num).toLocaleString()}
                                />
                                <XAxis type="number" hide />
                                <YAxis type="category" hide dataKey="stock_code" axisLine={false} dx={-10} tickLine={false} style={{ fill: "#285A64" }}/>
                                <Bar 
                                    dataKey="Gain" 
                                    fill="#36bea6"  
                                    barSize={15}
                                    barCategoryGap={0}
                                    orientation="left"
                                    maxBarSize={1}
                                >
                                    <LabelList style={{opacity:0.7}} offset={0} dy={-20} fill="ffffff" dataKey="stock_code" position="insideLeft" />
                                </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>  
            </div>
        )
    }

    
}

export default TopGainersChart