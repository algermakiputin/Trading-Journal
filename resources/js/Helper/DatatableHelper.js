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

        let pages = ceil(this.props.totalRecords / 10);
        console.log(pages)
        pages = pages ? pages : 1
         
        let items = [];    
        let isDisabled = pages == 1 ? 'disabled' : null
       
        for ( let i = 0; i < pages; i++) {
        
            let isActive = this.state.currentPage == (i + 1) && pages > 1 ? 1 : null; 
            let page = i + 1;
            items.push(<Pagination.Item disabled={isDisabled || isActive} onClick={() => { this.onChangePage(page)  }}  active={isActive} key={i}>{i + 1}</Pagination.Item>)
            
        }
        
        return (
            <Pagination>
                <Pagination.First disabled={isDisabled}/>  
                { items }
                <Pagination.Last disabled={isDisabled}/>  
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
                                return <th key={index}> {value.title} </th>
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