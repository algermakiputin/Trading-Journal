import { ceil, floor } from 'lodash-es';
import React, { Fragment } from 'react';
import Pagination from 'react-bootstrap/Pagination'

class DatatableHelper extends React.Component {

    // Accept Props
    // 1. Data
    // 2. Columns
    // 3. Total Records
    constructor(props) {
        super(props) 

        this.state = {
            totalRecords: 20,
            currentPage: 1
        }
 
    }

    onChangePage(page) {

        if ( this.props.onChangePage )
            this.props.onChangePage( page ); 

        this.setState({currentPage: page});
    }

    tbody() {
 
        let columnsLength = this.props.data.length
        
        if ( columnsLength ) {

            let tbody = [];

            for ( let i = 0; i < columnsLength; i++) {

                let row = [];
                for ( let x = 0; x < this.props.columns.length; x++) {
                    
                    let value = this.props.data[i]
                    let cell = this.props.columns[x].cell ? this.props.columns[x].cell(value) : this.props.data[i][this.props.columns[x].key]
                    row.push(<td key={x}>{ cell }</td>)
                }
    
                tbody.push( <tr key={i}>{row}</tr>)
            }

            return tbody
        }

        return <tr><td colSpan={ this.props.columns.length + 1 }>No records to display</td></tr>
        
    }

    pagination() {
       
        if ( !this.props.pagination)
            return
        let totalRecords = this.props.totalRecords;
        let pages = ceil(totalRecords / 10); 
        pages = pages ? pages : 1
         
        let items = [];    
        let isDisabled = pages == 1 ? 'disabled' : null
        let currentPage = this.state.currentPage 
        let prevDisabled = currentPage == 1 || pages == 1
        let nextDisabled = currentPage == pages || pages == 1
   
        return (
            <Pagination>
                <Pagination.Item 
                    disabled={prevDisabled} 
                    onClick={() => { this.onChangePage(currentPage - 1)  }}
                >Prev</Pagination.Item>   
                <Pagination.Item disabled={nextDisabled} onClick={() => { this.onChangePage(currentPage + 1)  }}>Next</Pagination.Item> 
                <small style={{display:'flex',alignItems:'center'}}> &nbsp;Pages: {currentPage}/{pages}</small>
            </Pagination> 
        ) 
    }

    render() {

        return(
            <Fragment>
                <table className="table table-striped table-bordered table-hover">
                    <thead>
                        <tr>
                            {this.props.columns.map((value,index) => {
                                return <th key={index} width={value.width} > {value.title} </th>
                            })}
                        </tr>
                    </thead>
                    <tbody> 
                        { this.tbody() }
                    </tbody>
                </table> 
                { this.pagination() }
            </Fragment>
        )
    }
}

export default DatatableHelper