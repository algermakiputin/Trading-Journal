import React from 'react' 
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart } from 'recharts'
import axios from 'axios'
import { Fragment } from 'react'
import NumberFormat from 'react-number-format'
class EquityChart extends React.Component {

    constructor(props) {

        super(props) 
    }
 

    yTickFormat(val) {

        return this.abbreviate(val, 3,false,false)
    }

    abbreviate(number, maxPlaces, forcePlaces, forceLetter) {
        number = Number(number)
        forceLetter = forceLetter || false
        if(forceLetter !== false) {
          return annotate(number, maxPlaces, forcePlaces, forceLetter)
        }
        var abbr
        if(number >= 1e12) {
          abbr = 'T'
        }
        else if(number >= 1e9) {
          abbr = 'B'
        }
        else if(number >= 1e6) {
          abbr = 'M'
        }
        else if(number >= 1e3) {
          abbr = 'K'
        }
        else {
          abbr = ''
        }
        return this.annotate(number, maxPlaces, forcePlaces, abbr)
    }

    annotate(number, maxPlaces, forcePlaces, abbr) {
        // set places to false to not round
        var rounded = 0
        switch(abbr) {
          case 'T':
            rounded = number / 1e12
            break
          case 'B':
            rounded = number / 1e9
            break
          case 'M':
            rounded = number / 1e6
            break
          case 'K':
            rounded = number / 1e3
            break
          case '':
            rounded = number
            break
        }
        if(maxPlaces !== false) {
          var test = new RegExp('\\.\\d{' + (maxPlaces + 1) + ',}$')
          if(test.test(('' + rounded))) {
            rounded = rounded.toFixed(maxPlaces)
          }
        }
        if(forcePlaces !== false) {
          rounded = Number(rounded).toFixed(forcePlaces)
        }
        return rounded + abbr
    }

    xAxisLabelFormat( value, index) {
        
        return index % 3 == 0 ? value : ''
        
    }
    render() {

        return (
            <Fragment> 
                <ResponsiveContainer width="100%" height="100%" minWidth="300px">
                   
                      <LineChart 
                          data={this.props.equityCurve} 
                      >
                      <CartesianGrid stroke="#000000" strokeOpacity="0.1" strokeDasharray="3 3" verticalFill={['#fff', '#f4f4f5']} fillOpacity={0.2}/> 
                      <XAxis tickFormatter={this.xAxisLabelFormat} tickLine={false}  axisLine={false}  dataKey="date" opacity={0.65} tick={{fontSize:'0.9rem', color:'#000'}} dy={10} />
                      <YAxis 
                          orientation="left" 
                          stroke="black" 
                          tickMargin={0} 
                          tickLine={false}  
                          axisLine={false} 
                          opacity={0.65} 
                          tickFormatter={(num) => this.yTickFormat(num)}
                      />
                      <Tooltip 
                        formatter={(num) => <NumberFormat decimalScale={2} thousandSeparator={true} displayType='text' value={num}  />}
                      />
                        <Line 
                            dot={false} tick={{fontSize:'5px'}} type="monotone" dataKey="amount" stroke="#4fc3f7" strokeWidth={2.5} /> 
                      </LineChart>
             
                </ResponsiveContainer> 
            </Fragment>
        )
    }

}


export default EquityChart;