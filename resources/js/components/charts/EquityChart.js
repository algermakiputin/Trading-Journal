import React from 'react'; 
import ChartistGraph from 'react-chartist';
import Chartist from 'chartist';

class EquityChart extends React.Component {


    render() {

        var data = {
            labels: ['January', 'May', 'August', 'December'],
            series: [
                [100000,200000,400000,500000,600000]
            ]
        };

        var options = {
            lineSmooth: Chartist.Interpolation.none(),
            fullWidth: true,
            height:240, 
            showArea: true,
            showPoint: false
        };

        var type = 'Line'

        return (
             
                <ChartistGraph className="campaign ct-charts" data={data} options={options} type={type} />
             
        )
    }

}


export default EquityChart;