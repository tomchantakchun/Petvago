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
    console.log(`/auth/jwt called...`);
    if (req.body.name && req.body.password) {
        var name = req.body.name;
        var password = req.body.password;
        var user = users.find((u) => {
            return u.name === name && u.password === password;
        });
        console.log(user);
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
    res.json(users);
})


module.exports = router;