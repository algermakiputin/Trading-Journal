import React from 'react';  
import UserContext from '../../UserContext';

class PositionsTableBody extends React.Component {

    constructor(props) {

        super(props) 
         
    } 

    renderData() {

        return (

            <UserContext.Consumer>
                {
                    ({state}) => (
                  
                        <tbody>
                            { state.positions }
                        </tbody>
                    )

                } 
            </UserContext.Consumer>
        )
    }

    render() {
  
        return this.renderData()
    }

}

export default PositionsTableBody;