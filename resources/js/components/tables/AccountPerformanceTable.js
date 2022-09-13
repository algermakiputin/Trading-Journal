import React from 'react'
import axios from 'axios'

class AccountPerformanceTable extends React.Component {

    constructor(props) {

        super(props) 
        console.log(this.props)
    }  

    render() {

        return (
            <table className="table account-performance">
                <tbody>
                    <tr>
                        <td>Total Trades Taken</td>
                        <td className="text-right">{this.props.accountPerformance.totalTrades}</td>
                    </tr>
                    <tr>
                        <td>Winning Percentage</td>
                        <td className="text-right">{Number(this.props.accountPerformance.winningPercentage).toLocaleString()}%</td>
                    </tr>
                    <tr>
                        <td>Average Gain</td>
                        <td className="text-right">{this.props.accountPerformance.averageWins}%</td>
                    </tr>
                    <tr>
                        <td>Average Loss</td>
                        <td className="text-right">{this.props.accountPerformance.averageLosses}%</td>
                    </tr>
                    <tr>
                        <td>Win / Loss Ratio</td>
                        <td className="text-right">{this.props.accountPerformance.winLossRatio}</td>
                    </tr>
                    <tr>
                        <td>Avg Profitability Per Trade</td>
                        <td className="text-right">{this.props.accountPerformance.adjustedWinLossRatio}</td>
                    </tr>
                </tbody>
            </table>
        )
    }
}

export default AccountPerformanceTable