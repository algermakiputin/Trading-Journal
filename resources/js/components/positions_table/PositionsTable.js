import React from 'react'; 

class PositionsTable extends React.Component {

    constructor(props) {

        super(props)
         
    }

    render() {

        return (

            <table className="table v-middle" id="positions-table">
                <thead>
                    <tr className="bg-light">
                        <th className="border-top-0">Stock</th>
                        <th className="border-top-0">Side</th>
                        <th className="border-top-0">Ave. Price</th>
                        <th className="border-top-0">Shares</th>
                        <th className="border-top-0">Total Cost</th> 
                        <th> </th>
                    </tr>
                </thead>
                <tbody>
                    { this.props.positions }
                </tbody>
            </table> 
        )
    }
}

export default PositionsTable