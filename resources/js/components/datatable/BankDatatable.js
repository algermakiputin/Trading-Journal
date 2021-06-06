import React from 'react'
import DatatableHelper from '../../Helper/DatatableHelper'
import axios from 'axios'
import NumberFormat from 'react-number-format'
import { Fragment } from 'react'

class BankDatatable extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            columns: [
                {key:'date', title:'Date'},
                {key:'action', title:'Action'},
                {key:'amount', title:'Amount', cell: (row) => this.formatNumber(row.amount,2)},
                {key:'action', title:'Actions', cell:(row) => this.deleteAction(row)}  
            ],
            data: []
        }
    }

    componentDidMount() {

        this.setData()
    }

    deleteAction(row) {

        return <button onClick={() => this.destroy(row)} className="btn btn-danger">Delete</button>
    }

    formatNumber(number, scale) {

        return <NumberFormat decimalScale={scale} thousandSeparator={true} displayType='text' value={number}  />
    }

    destroy(row) {

        let confirm = window.confirm("Are you sure you want to delete that transaction?")

        if (confirm) {

            axios.delete('/api/bank/destroy', {
                    params: {
                        id: row.id,
                        amount: row.amount
                    }
                })
                .then(res => {
                    alert('Bank transaction deleted successfully')
                    this.setData()
                })
                .catch(err => {
                    console.log(err)
                })
        }
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
                    pagination
                    
                /> 
            </Fragment>
        )
    }
}

export default BankDatatable