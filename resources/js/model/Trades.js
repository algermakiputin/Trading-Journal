import axios from 'axios'

class Trades {

    static position() {

        return axios.get('/positions')
            .then(  res => { 
                return res.data
            })
            .catch( err => {

                console.log(err)
            })
    }
}


export default Trades;