const enzyme = require('enzyme');
const chatRouter = require('../routes/chatroom');
const db = require('knex')({
    client: 'postgresql',
    connection: {
       database: "petvago",
       user: "postgres",
       password: "postgres"
    }
 })

 test('two plus two is four', () => {
    expect(2 + 2).toBe(4);
  });