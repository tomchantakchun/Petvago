const enzyme = require('enzyme');
const authRouter = require('./auth-router');
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

describe('Auth-router module: ', () => {
   it('JWT login', async () => {
        let resUsername;

        await axios.post(`http://localhost:8080/auth/jwt`,
            {
                name: 'admin1',
                password: '12345678',
                isHotel: false
            })
            .then(response => {
                const token = response.data.token;
                console.log(JSON.parse(window.atob(token.split('.')[1])));
                resUsername = JSON.parse(window.atob(token.split('.')[1])).username;
            })

        expect(resUsername).toEqual('admin1');
   }); 

    it('JWT signup', async () => {
        let resUsername;

        await axios.post('http://localhost:8080/auth/signupjwt',
            {
                name: 'adminJest',
                password: 'abcdef',
                isHotel: false
            })
            .then(response => {
                const token = response.data.token;
                resUsername = JSON.parse(window.atob(token.split('.')[1])).username;
            })

        expect(resUsername).toEqual('adminJest');

        await knex('users').where('username','adminJest').delete().then(() => {})
    });

    it('JWT signup with existing username', async () => {
        let res;

        await axios.post('http://localhost:8080/auth/signupjwt',
            {
                name: 'admin1',
                password: 'abcdef',
                isHotel: false
            })
            .then(response => {
                // console.log('response: ',response.data);
                res = response.data
            })

        expect(res).toEqual('User already existed');
    });
});