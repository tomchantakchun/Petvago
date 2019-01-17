const passport = require('passport');
const FacebookStrategy = require('passport-facebook');
// const LocalStrategy = require('passport-local').Strategy;
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


//facebook strategy
// passport.use(
//     new FacebookStrategy({
//         //option for facebook strategy
//         callbackURL: '/auth/facebook/redirect',
//         clientID: process.env.FACEBOOK_ID,
//         clientSecret: process.env.FACEBOOK_SECRET,
//         profileFields: ['email', 'name', 'picture.type(large)'],
//     }, (accessToken, refreshToken, profile, done) => {
//         //passport callback function
//         this.query = knex.select('*').from('users').where('SocialLoginID', profile.id)
//         this.query.then((user) => {
//             //check availability 
//             if (user.length === 1) {
//                 console.log('returning user');
//                 done(null, user)
//             } else {
//                 //add user
//                 console.log('adding user')
//                 knex("users").insert(
//                     {
//                         userName: (profile.name.givenName + ' ' + profile.name.familyName),
//                         displayName: (profile.name.givenName + ' ' + profile.name.familyName),
//                         password: "NA",
//                         email: profile.emails[0].value,
//                         loginMethod: "Facebook",
//                         SocialLoginID: profile.id,
//                         profilePic: profile.photos[0].value,
//                         recentSearch: "NA",
//                     }
//                 ).then(() => {
//                     this.query2 = knex.select('*').from('users').where('SocialLoginID', profile.id).then((newUser) => done(null, newUser))
//                 }
//                 ).catch((err) => console.log(err))
//             }
//             //end of add user
//         }).catch((err) => console.log(err))
//     }
//         // end of passpor callback
//     )
// )


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
