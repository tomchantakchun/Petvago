module.exports = {
    knex : require('knex')({
       client: 'postgresql',
       connection: {
          database: "petvago",
          user: "postgres",
          password: "postgres"
       }
    })
 }