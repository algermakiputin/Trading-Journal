import React from 'react'

class PositionsTableHeader extends React.Component {

    render () {

        return (

            <thead>
                <tr className="bg-light">
                    <th className="border-top-0">Stock</th>
                    <th className="border-top-0">Ave. Price</th>
                    <th className="border-top-0">Shares</th>
                    <th className="border-top-0">Total Cost</th> 
                </tr>
            </thead>
        )
    }
}

export default PositionsTableHeader