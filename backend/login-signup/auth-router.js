const router = require('express').Router();
const passport = require('passport');
const users = require('./temUser');
const jwt = require('jwt-simple');

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
    if (req.body.name && req.body.password) {
        var name = req.body.name;
        var password = req.body.password;
        var user = users.find((u) => {
            return u.name === name && u.password === password;
        });
        if (user) {
            var payload = {
                id: user.id,
                username: user.name
            };
            var token = jwt.encode(payload, process.env.JWTSECRET);
            res.json({
                token: token
            });
        } else { res.sendStatus(401) }
    } else { res.sendStatus(401) }
});

router.get('/verifyjwt', passport.authenticate("jwt", { session: false }), (req, res) => {
    
    const responsedInfo = {
        id: users[req.user.id].id,
        username: users[req.user.id].name
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