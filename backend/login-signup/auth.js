const passport = require('passport');
const passportJWT = require('passport-jwt');
const users = require('./temUser');
const ExtractJwt = passportJWT.ExtractJwt;
require('dotenv').config()

module.exports = () => {
    const strategy = new passportJWT.Strategy({
        secretOrKey: process.env.JWTSECRET,
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
    },(payload,done)=>{
        console.log(users);
        const user = users[payload.id];
        console.log(`Looking for user: ${user}`);
        if (user) {
            return done(null, {id: user.id});
        } else {
            return done(new Error("User not found"), null);
        }
    });
    passport.use(strategy);

    return {
        initialize: function() {
            return passport.initialize();
        },
        authenticate: function() {
            return passport.authenticate("jwt", { session: false });
        }
    };
}