const commission_per = 0.0025;
const vat_per = 0.12;
const trans_fee_per = 0.00005;
const sccp_per = 0.0001;

class Transactions {

    // Each computed charge listed above are rounded to hundredths (2 decimal places) 
    // using Symmetric Arithmetic Rounding* for the calculation of the total fees.

    // EXAMPLES

    // 3.044 rounded to hundredths is 3.04 (because the next digit, 4, is less than 5).
    // 3.046 rounded to hundredths is 3.05 (because the next digit, 6, is 5 or more).
    // 3.045 rounded to hundredths is 3.05 (because the next digit, 5, is 5 or more).

    

    static buy( price = 0, shares = 0) {

        price = parseFloat(price);
        shares = parseFloat(shares);
        // BUYING CALCULATION
        // Commission = ( TOTAL SHARES * PRICE ) * .25% 
        // VAT = Commission * 12%
        // PSE Trans Fee = ( TOTAL SHARES * PRICE ) * 0.005%
        // SCCP = ( TOTAL SHARES * PRICE ) * 0.01%

        var commission = ( shares * price ) * commission_per;
        var vat = commission * vat_per;
        var trans_fee = ( shares * price ) * trans_fee_per;
        var sccp = ( shares * price ) * sccp_per; 

        return (commission + vat + trans_fee + sccp);

    }

    static sell() {

        // SELLING CALCULATION
        // Commission = ( TOTAL SHARE * PRICE ) * .25%
        // VAT = Commission * 12%
        // PSE Trans Fee = ( TOTAL SHARE * PRICE ) * .005%
        // SCCP = ( TOTAL SHARES * PRICE ) * 0.01%
        // Sales Tax = ( TOTAL SHARES * PRICE ) * 0.006


    }

}

export default Transactions