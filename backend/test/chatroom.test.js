const enzyme = require('enzyme');
const chatRouter = require('../routes/chatroom');
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

describe('Chatroom backend test', () => {
    it('Get chatlist with jwt', async () => {
       //jwt of customer1
         const jwt = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJjdXN0b21lcjEifQ._9Y9LKN8Ht_Kiq0srdi8PhpdBUzeclIUoPewJUnXavQ'

        await axios.get(`http://localhost:8080/api/chatroom/chatlist/user`, { headers: { Authorization: `Bearer ${jwt}` } })
            .then(response => {
               //expects to have more that one chat
               expect(response.data.length).toBeGreaterThan(1);
            })  
    });

    it('Send a message by a user', async () => {
      //jwt of customer1
        const jwt = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJjdXN0b21lcjEiLCJpc0hvdGVsIjpmYWxzZX0.PUao0czNdfA7ymFcaIEcCnIFoGqhOrH3pm5MsqT_y4M'
      
      //send new message

      let data={
         body:'Test1',
         type:'text'
      }
       await axios.post(`http://localhost:8080/api/chatroom/sendmessage/1`,data, {headers: { Authorization: `Bearer ${jwt}` }})
           .then(response => {
              console.log(response.data)
              //expects to have more that one chat
              expect(response.data).not.toBe(null);
           }).catch(err=>{
              console.log(err)
           })
   });

  
});