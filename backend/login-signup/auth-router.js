const router = require('express').Router();
const passport = require('passport');
const jwt = require('jwt-simple');
require('dotenv').config();
const knex = require('knex')({
    client: 'pg',
    connection: {
        database: process.env.DB_NAME,
        user: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD
    }
});

//auth with facebook

router.get(
    '/facebook', 
    passport.authenticate('facebook', { scope: ['email'] }), 
    (req, res) => { console.log('facebook authenticating') }
);

//callback route for google to redirect to
router.get(
    '/facebook/redirect',
    passport.authenticate('facebook'), 
    (req, res) => {
        console.log('redirecting');
        res.redirect('/lobby')
    }
)

//auth with JWT

router.post("/jwt", function (req, res) {
    console.log(`/jwt called`);
    if (req.body.name && req.body.password) {
        var name = req.body.name;
        var password = req.body.password;
        var user; 
        knex.select("id","username").from("users")
            .where("username",name).andWhere("password",password)
            .then((rows) => {
                user = rows[0];

                if (user) {
                    var payload = {
                        id: user.id,
                        username: user.username
                    };
                    var token = jwt.encode(payload, process.env.JWTSECRET);
                    res.json({
                        token: token
                    });
                } else { res.sendStatus(401) }
            })
    } else { res.sendStatus(401) }
});

router.get('/verifyjwt', passport.authenticate("jwt", { session: false }), (req, res) => {
    console.log(`/verifyjwt called`);

    const responsedInfo = {
        id: req.user.id,
        username: req.user.id
    }

    console.log(`User ID: ${responsedInfo.id}, User username: ${responsedInfo.username}`);
    res.json(responsedInfo);
})

router.post("/signupjwt", function (req, res) {

    if (req.body.name && req.body.password) {
        let name = req.body.name;
        let password = req.body.password;
        let user = users.find((u) => {
            return u.name === name && u.password === password;
        });
        if (user) {
            res.send('user existed')
        } else {
            var payload = {
                id: user.id,
                username: user.name
            };
            var token = jwt.encode(payload, process.env.JWTSECRET);
            res.json({
                token: token
            });
        }
    } else { res.send('user or password not found') }
});

module.exports = router;