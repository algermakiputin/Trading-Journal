import React from 'react'; 
import axios from 'axios';
import UserContext from '../../UserContext';

class PositionsTableBody extends React.Component {

    constructor(props) {

        super(props) 
         
    } 

    render() {
  
        return (
            <UserContext.Consumer>
                {
                    ({state, load_positions}) => (
                        <tbody>
                            { state.positions }
                        </tbody>
                    )

                } 
            </UserContext.Consumer>
        )
    }

}

export default PositionsTableBody;