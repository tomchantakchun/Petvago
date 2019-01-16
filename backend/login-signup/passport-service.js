const passport = require('passport');
const FacebookStrategy = require('passport-facebook');
// const LocalStrategy = require('passport-local').Strategy;
const passportJWT = require('passport-jwt');
const ExtractJwt = passportJWT.ExtractJwt;
const temUsers = require('./temUser');
require('dotenv').config();
const knex = require('knex')({
    client: 'pg',
    connection: {
        host:process.env.RDS_ENDPOINT,
        database: process.env.RDS_DB_NAME,
        user: process.env.RDS_USERNAME,
        password: process.env.RDS_PASSWORD
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
    const user = temUsers[payload.id];
    console.log(`Looking for user: ${user}`);
    if (user) {
        return done(null, {id: user.id});
    } else {
        return done(new Error("User not found"), null);
    }
});
passport.use(strategy);

// return {
    // initialize: function() {
    //     return passport.initialize();
    // },
    // authenticate: function() {
    //     return passport.authenticate("jwt", { session: false });
    // }
// };