const enzyme = require('enzyme');
const axios = require('axios');
require('dotenv').config();

describe('Review backend test', () => {
    it('Get hotel edit info', async () => {
      //jwt of customer1
      const jwt = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJjdXN0b21lcjEiLCJpc0hvdGVsIjpmYWxzZX0.PUao0czNdfA7ymFcaIEcCnIFoGqhOrH3pm5MsqT_y4M'
      
      let data={
        hotelID:1,
        bookingID:3,
        rating:4,
        comment:'hello'
      }
        await axios.post(`http://localhost:8080/api/review/` ,data,{ headers: { Authorization: `Bearer ${jwt}` } })
        .then(response => {
            console.log(response.data)
            expect(response.data).not.toBe(null);
        }).catch((err)=>{
            console.log(err)
        })

    });
})