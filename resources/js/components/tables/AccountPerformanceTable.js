import React from 'react'
import axios from 'axios'

class AccountPerformanceTable extends React.Component {

    constructor(props) {

        super(props)
        this.state = {
            totalTrades:0,
            winningPercentage:0,
            averageWins:0,
            averageLosses:0,
            winLossRatio:0,
            adjustedWinLossRatio:0
        }
    }

    componentDidMount() {

        this.setData()
    }

    async setData() {

        await axios.get('/api/getAccountPerformanceSummary')
                    .then(res => {
                        console.log(res.data)
                        this.setState({
                            totalTrades: res.data.totalTrades,
                            winningPercentage: res.data.winningPercentage,
                            averageWins: res.data.averageWins,
                            averageLosses: res.data.averageLosses,
                            winLossRatio: res.data.winLossRatio,
                            adjustedWinLossRatio: res.data.adjustedWinLossRatio
                        })
                    })
                    .catch( err => {
                        console.log(err)
                    })
    }

    render() {

        return (
            <table className="table account-performance">
                <tbody>
                    <tr>
                        <td>Total Trades Taken</td>
                        <td className="text-right">{this.state.totalTrades}</td>
                    </tr>
                    <tr>
                        <td>Winning Percentage</td>
                        <td className="text-right">{this.state.winningPercentage}%</td>
                    </tr>
                    <tr>
                        <td>Average Gain</td>
                        <td className="text-right">{this.state.averageWins}%</td>
                    </tr>
                    <tr>
                        <td>Average Loss</td>
                        <td className="text-right">{this.state.averageLosses}%</td>
                    </tr>
                    <tr>
                        <td>Win / Loss Ratio</td>
                        <td className="text-right">{this.state.winLossRatio}</td>
                    </tr>
                    <tr>
                        <td>Avg Profitability Per Trade</td>
                        <td className="text-right">{this.state.adjustedWinLossRatio}</td>
                    </tr>
                </tbody>
            </table>
        )
    }
}

export default AccountPerformanceTable