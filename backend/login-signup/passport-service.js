const passport = require('passport');
const FacebookStrategy = require('passport-facebook');
const passportJWT = require('passport-jwt');
const ExtractJwt = passportJWT.ExtractJwt;
const bcrypt = require('./bcrypt');
require('dotenv').config();
const knex = require('knex')({
    client: 'pg',
    connection: {
        database: process.env.DB_NAME,
        user: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD
    }
});

passport.serializeUser((user, done) => {
    console.log('serialize');
    if (user[0].id) {
        done(null, user[0].id);
    } else if (user.id) {
        done(null, user.id)
    } else {
        console.log('problem')
    }
})

passport.deserializeUser((id, done) => {
    console.log('deserialize');
    knex.select('*').from('users').where('id', id).then((user) => {
        done(null, user);
    })
})

// JWT strategy

const strategy = new passportJWT.Strategy({
    secretOrKey: process.env.JWTSECRET,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
},(payload,done)=>{
    knex.select('id','username').from('users').where('id',payload.id).then((rows) => {
        if (rows) {
            console.log(`rows[0]: ${JSON.stringify(rows[0])}`);
            return done(null, rows[0]);
        } else {
            return done(new Error("User not found"), null);
        }
    })
});
passport.use(strategy);
