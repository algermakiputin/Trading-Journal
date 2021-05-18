import React from 'react'
import DatatableHelper from '../../Helper/DatatableHelper'

class Transaction extends React.Component {

    constructor(props) {

        super(props)
        this.state = {
            columns: [
                {key: 'date', 'title': 'Date'},
                {key: 'stock_code', title: 'Stock Code'},
                {key: 'type', title: 'Side'},
                {key: 'action', title: 'Action', cell: (row) => row.type == 'long' ? 'Buy' : row.type },
                {key: 'price', title: 'Price'},
                {key: 'shares', title: 'Shares'},
                {key: 'fees', title: 'Fees'},
                {key: 'net', title: 'Net'}
            ],
            data: []
        }
    }

    componentDidMount() {

        this.setData()
    }

    setData() {

        axios.get('/api/transactions/datatable')
                .then(res => {
                    this.setState({ data: res.data})
                })
                .catch( err => {
                    console.log(err)
                })
    }
    render() {

        return (
            
            <DatatableHelper 
                columns={this.state.columns}
                data={this.state.data}
                onChangePage={(page) => { console.log(page) }} 
                pagination
            /> 
        )
    }
    
}

export default Transaction