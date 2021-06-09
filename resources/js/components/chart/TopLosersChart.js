import React from 'react'
import axios from 'axios'
import { BarChart, LabelList, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart } from 'recharts'
import NumberMinify from '../../classes/NumberMinify'
class TopLosersChart extends React.Component {

    constructor(props) {

        super(props) 
    }
 

    label(props) {
 
        const {x, y, value} = props;

             return (
             <text 
                x={x} 
                y={y} 
                // dx={'88%'}
                // dy={-8}  
                fontWeight="bold"
                fill={"fff"} 
                orientation="right"
                textAnchor="right">{NumberMinify.abbreviate(value,2,false,false)}</text>
             )
    }
    
    
    
    
    render() {

        return (
            <div className='row'>
                <div className='col'>  
                    <ResponsiveContainer width="100%" height={this.props.height}>
                        <BarChart   
                            data={this.props.data}
                            layout="vertical"
                            barCategoryGap={1}
                            margin={{top:5}} 
                            >
                                <Tooltip 
                                    formatter={(num) => Number(num).toLocaleString()}
                                    cursor={{fill: '#fff'}}
                                />
                                <XAxis maxBarSize={2} type="number" hide />
                                <YAxis type="category" hide dataKey="stock_code" axisLine={false} dx={-10} tickLine={false} style={{ fill: "#285A64" }}/>
                                <Bar 
                                    dataKey="Loss" 
                                    fill="#dc3545" 
                                    barSize={15}
                                    barCategoryGap={0}
                                    orientation="left"
                                    maxBarSize={1} 
                                    // label={(props) => this.label(props)} 
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

export default TopLosersChart