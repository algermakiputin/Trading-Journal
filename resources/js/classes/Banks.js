import axios from 'axios';

class Banks {

    static getTotalDeposit() {

        axios.get('/api/bank/getTotalDeposits')
            .then( res => {
                console.log(res)
            })
            .catch( err => {
                console.log(err)
            })
    }
}