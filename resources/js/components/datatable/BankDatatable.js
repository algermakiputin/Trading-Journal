import React from 'react'
import DatatableHelper from '../../Helper/DatatableHelper'
import axios from 'axios'
import { Fragment } from 'react'

class BankDatatable extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            columns: [
                {key:'date', title:'Date'},
                {key:'action', title:'Action'},
                {key:'amount', title:'Amount'},
                {key:'action', title:'Actions'}  
            ],
            data: []
        }
    }

    componentDidMount() {

        this.setData()
    }

    setData() {

        axios.get('/api/bank/datatable')
                .then(res => {
                    this.setState({data: res.data.transactions})
                    console.log(res.data.data)
                })
                .catch(err => {
                    console.log(err)
                })
    }

    render() {

        return (
            <Fragment>
                <DatatableHelper 
                    columns={this.state.columns}
                    data={this.state.data}
                    onChangePage={(page) => { console.log(page) }} 
                /> 
            </Fragment>
        )
    }
}

export default BankDatatable