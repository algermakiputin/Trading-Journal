import React from 'react' 
import { BarChart, LabelList, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart } from 'recharts'
import NumberFormat from 'react-number-format'

class TopGainersChart extends React.Component {

    constructor(props) {

        super(props) 
    } 

    label(props) {
        const {x, y, value} = props;

             return (
             <text 
                x={x} 
                y={y} 
                dx={'90%'}
                dy={10}  
                fontWeight="bold"
                fill={"#181818"}
                textAnchor="middle">{value}</text>
             )
    } 
    
    render() {

        return (
            <div className='row'>
                <div className='col'>  
                    <ResponsiveContainer width="100%" height={this.props.height} >
                        <BarChart  
                            data={this.props.data}
                            layout="vertical"
                            barCategoryGap={1}
                            margin={{top:5}} 
                            >
                                <Tooltip 
                                    formatter={(num) => <NumberFormat decimalScale={2} thousandSeparator={true} displayType='text' value={num} />}
                                    cursor={{fill: '#fff'}}
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