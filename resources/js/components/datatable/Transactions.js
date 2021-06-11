import React from 'react'
import { Modal } from 'react-bootstrap'
import DatatableHelper from '../../Helper/DatatableHelper'
import NumberFormat from 'react-number-format'
import EditForm from '../forms/EditForm'
import { Fragment } from 'react'
import axios from 'axios'


class Transaction extends React.Component {

    constructor(props) {

        super(props)
        this.state = {
            columns: [
                {key: 'date', 'title': 'Date'},
                {key: 'stock_code', title: 'Stock Code'}, 
                {key: 'action', title: 'Action', cell: (row) => this.formatAction(row)},
                {key: 'price', title: 'Price', cell: (row) => this.formatNumber(row.price, 4)},
                {key: 'shares', title: 'Shares'},
                {key: 'fees', title: 'Fees', cell: (row) => this.formatNumber(row.fees, 2)},
                {key: 'net', title: 'Net', cell: (row) => this.formatNumber(row.net, 2)},
                {key: 'remarks', title: 'Remarks'},
                {key: 'actions', title: 'Actions', cell: (row) => this.buttons(row) }
            ],
            data: [],
            totalRecords:0,
            page:1,
            show: false,
            availableCash: 0,
            totalEquity: 0,
            trade: []
        }

        this.closeModal = this.closeModal.bind(this) 
        this.setData = this.setData.bind(this)
    }

    componentDidMount() {

        this.setData()
        this.setEquity()
    }

    formHandler(row) { 
        this.setState({
            trade:row,
            show: true
        })
    }

    formatNumber(number, scale) {

        return <NumberFormat decimalScale={scale} thousandSeparator={true} displayType='text' value={number}  />
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

    toggleModal() {
        this.setState({show: !this.state.show})
    }   

    closeModal() {
        this.setState({show: false})
    }

    async setEquity() {

        await axios.get('get_equities')
                .then( res => { 
                    if ( res.data ) { 
                        return this.setState({
                            totalEquity: res.data.total_equity,
                            availableCash: res.data.remaining_cash
                         })
                    }
                })
                .catch( err => {
                    console.log(err)
                })
    }

    buttons(row) {

        return(
            <Fragment>
                <span onClick={() => this.formHandler(row)} className="mdi mdi-pencil action"></span> &nbsp;
                <span onClick={() => this.delete(row)} className="mdi mdi-delete action"></span>
            </Fragment>
        )
    }

    delete(row) {
        
        let confirm = window.confirm('Are you sure you want to delete that transaction?')

        if (!confirm)
            return false
            
        row.availableCash = this.state.availableCash
        row.totalEquity = this.state.totalEquity
        
        axios.delete('/api/transactions/destroy', {
                    params: row
                })
                .then(res => {
                    if (res.data == 1) {
                        this.setData()
                        alert("Transaction deleted successfully")
                    }
                        
                }) 
                .catch(err => {
                    console.log(err)
                })
                
    } 
    
    render() {

        return (
            
            <React.Fragment> 
                <DatatableHelper 
                    columns={this.state.columns}
                    data={this.state.data} 
                    pagination
                    totalRecords={this.state.totalRecords}
                    onChangePage={(page) => this.setData(page) }
                /> 
                <Modal     
                    show={ this.state.show } 
                    onHide={ () => this.closeModal() }
                    > 
                    <EditForm 
                        show={this.state.show }  
                        toggleModal= { this.toggleModal }
                        trade= {this.state.trade}
                        closeHandle = { this.closeModal }
                        availableCash={this.state.availableCash}
                        totalEquity={this.state.totalEquity}
                        totalEquity={this.state.totalEquity}
                        availableCash={this.state.availableCash}
                        setData={this.setData}
                        />
                </Modal>
            </React.Fragment>
        )
    }
    
}

export default Transaction