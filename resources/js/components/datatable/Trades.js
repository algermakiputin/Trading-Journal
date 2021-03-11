import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import axios from 'axios';

const columns = [
    {
        name: 'Stock',
        selector: 'stock', 
    },
    {
        name: 'Average Price',
        selector: 'ave_price'
    },
    {
        name: 'Shares',
        selector: 'shares'
    },
    {
        name: 'Total Cost',
        selector: 'total_cost'
    },
    {
        name: 'Market Value',
        selector: 'market_value',

    } 
]

const data = [
    {
        stock:'JFC',
        ave_price: '250',
        shares:'10,000',
        total_cost: '50,000',
        market_value: '250000'
    }
]

function Trades() {
 
    return (

        <div>
            <DataTable 
                className=" v-middle"
                columns={columns}
                highlightOnHover
                pagination
                data={data}
            >

            </DataTable>
        </div>
    )

}

export default Trades;