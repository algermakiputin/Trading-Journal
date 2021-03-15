import React from 'react';
import PositionsTableBody from './PositionsTableBody';
import PositionsTableHeader from './PositionsTableHeader'

class PositionsTable extends React.Component {

    constructor(props) {

        super(props)
        
        
    }

    render() {

        return (

            <table className="table v-middle">
                <PositionsTableHeader />
                <PositionsTableBody />
            </table> 
        )
    }
}

export default PositionsTable