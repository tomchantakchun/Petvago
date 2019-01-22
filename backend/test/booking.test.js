const enzyme = require('enzyme');
const axios = require('axios');
require('dotenv').config();
const knex = require('knex')({
    client: 'pg',
    connection: {
        database: process.env.DB_NAME,
        user: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD
    }
});

describe('Booking backend test', () => {
    it('Hotel add offline booking', async () => {
       //jwt of partner1
         const jwt = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJwYXJ0bmVyMSIsImlzSG90ZWwiOnRydWV9.QtkreWj8q4OD--qbCJNa68jQlZ0vhtZFtl0cOeQzNAk';

         let data={
            startDate:'2019-2-18',
            endDate:'2019-2-20',
            roomTypeID:2
         };

        await axios.post(`http://localhost:8080/api/booking/offline-booking`, data ,{ headers: { Authorization: `Bearer ${jwt}` } })
            .then(response => {
                console.log(response.data.bookingID)
               expect(response.data.status).toBe('success');
            }).catch((err)=>{
                console.log(err)
            })
    });

    it('Get booking by hotel should fail if user is not hotel', async () => {
        //jwt of customer1
        const jwt = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJjdXN0b21lcjEiLCJpc0hvdGVsIjpmYWxzZX0.PUao0czNdfA7ymFcaIEcCnIFoGqhOrH3pm5MsqT_y4M'
 
 
         await axios.get(`http://localhost:8080/api/booking/hotel`, { headers: { Authorization: `Bearer ${jwt}` } })
             .then(response => {
             }).catch((err)=>{
                 expect(err.response.data.error).toBe('user is not hotel');
             })
     });

     it('Get booking by hotel', async () => {
       //jwt of partner1
       const jwt = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJwYXJ0bmVyMSIsImlzSG90ZWwiOnRydWV9.QtkreWj8q4OD--qbCJNa68jQlZ0vhtZFtl0cOeQzNAk';
 
 
         await axios.get(`http://localhost:8080/api/booking/hotel`, { headers: { Authorization: `Bearer ${jwt}` } })
             .then(response => {
                console.log(response.data)
                expect(response.data).not.toBe(null);
             }).catch((err)=>{
                 console.log(err)
             })
     });
 

    

  
});