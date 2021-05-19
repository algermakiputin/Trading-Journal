import React from 'react'
import DatatableHelper from '../../Helper/DatatableHelper'
import NumberFormat from 'react-number-format'

class Transaction extends React.Component {

    constructor(props) {

        super(props)
        this.state = {
            columns: [
                {key: 'date', 'title': 'Date'},
                {key: 'stock_code', title: 'Stock Code'}, 
                {key: 'action', title: 'Action', cell: (row) => this.formatAction(row)},
                {key: 'price', title: 'Avg Price', cell: (row) => this.formatNumber(row.price, 4)},
                {key: 'shares', title: 'Shares'},
                {key: 'fees', title: 'Fees'},
                {key: 'net', title: 'Net'}
            ],
            data: [],
            totalRecords:0,
            page:1
        }
    }

    componentDidMount() {

        this.setData()
    }

    formatNumber(number, scale) {

        return <NumberFormat decimalScale={scale} thousandSeparator={true} displayType='text' value={number} prefix={'₱'} />
    }

    formatAction(row) {

        return row.type == 'long' ? <span className='badge badge-success'>Buy</span> : <span className='badge badge-danger'>sell</span>
    }

    setData(page = 0) {

        let currentPage = page ? page : this.state.page

        axios.get('/api/transactions/datatable', {
            params: {
                recordsPerPage: 10,
                page: currentPage
            }
        })
                .then(res => { 
                    this.setState({ 
                        data: res.data.transactions,
                        totalRecords: res.data.total_records
                    })
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
                totalRecords={this.state.totalRecords}
                onChangePage={(page) => this.setData(page) }
            /> 
        )
    }
    
}

export default Transaction