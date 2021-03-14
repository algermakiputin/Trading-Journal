import React from 'react'; 
import ChartistGraph from 'react-chartist';

class EquityChart extends React.Component {


    render() {

        var data = {
            labels: ['January', 'May', 'August', 'December'],
            series: [
                [100000,200000,400000,500000,600000]
            ]
        };

        var options = {
            fullWidth: true
        };

        var type = 'Line'

        return (
            <div>
            <ChartistGraph data={data} options={options} type={type} />
            </div>
        )
    }

}


export default EquityChart;