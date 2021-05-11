import React from 'react'; 
import ChartistGraph from 'react-chartist';

class EquityChart extends React.Component {


    render() {

        var data = {
            labels: ['January', 'May', 'August', 'December'],
            series: [
                [
                    {meta:'100', value:100},
                    {meta:'200', value:200},
                    {meta:'300', value:300},
                    {meta:'500', value:500}
                ]
            ] 
        };

        var options = {
            fullWidth: true,
            height:230,
            low:0,
            showArea: true,
            scaleMinSpace: 20,
            stretch:true,
            chartPadding: { 
            }

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