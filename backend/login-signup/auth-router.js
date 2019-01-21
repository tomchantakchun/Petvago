const router = require('express').Router();
const passport = require('passport');
const jwt = require('jwt-simple');
const bcrypt = require('./bcrypt');
let request = require("request");
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

router.post('/facebook', async (req, res) => {
    console.log(`/auth/facebook called`);
    if (req.body.name && req.body.password && req.body.email) {
        let name = req.body.name;
        let email = req.body.email;
        let hash = await bcrypt.hashPassword(req.body.password)
        let user;
        await knex.select("id", "username").from("users")
            .where("username", name)
            .then((rows) => {
                user = rows[0];
            })

        if (user) {
            var payload = {
                id: user.id,
                username: user.username,
                isHotel: false
            };
            var token = jwt.encode(payload, process.env.JWTSECRET);
            res.json({
                token: token
            });

        } else {
            await knex.insert({
                username: name,
                password: hash,
                email: email,
                loginMethod: 'facebook'
            })
                .into('users')
                .then(() => { })

            await knex.select("id", "username").from("users")
                .where("username", name)
                .then((rows) => {
                    user = rows[0]

                    var payload = {
                        id: user.id,
                        username: user.username,
                        isHotel: false
                    };
                    var token = jwt.encode(payload, process.env.JWTSECRET);
                    res.json({
                        token: token
                    });
                })
        }
    } else { res.send('User or password not found') }
});


//auth with instagram

router.post('/instagram', async (req, res) => {
    console.log(`/auth/instagram called`);

    if (req.body.accessToken) {
        let accessToken = req.body.accessToken;
        console.log(`Access Token: ${accessToken}`);

        let options = {
            method: 'POST',
            url: 'https://api.instagram.com/oauth/access_token',
            headers:
            {
                'cache-control': 'no-cache',
                'content-type': 'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW'
            },
            formData:
            {
                client_id: process.env.INSTAGRAM_CLIENT_ID,
                client_secret: process.env.INSTAGRAM_CLIENT_SECRET,
                grant_type: 'authorization_code',
                redirect_uri: 'https://localhost:3000/login',
                code: accessToken
            }
        };

        request(options, async (error, response, body) => {
            if (error) throw new Error(error);

            const parsedBody = JSON.parse(body)
            console.log(body);
            let user;
            console.log(`parsedBody["user"]: ${parsedBody["user"]}`);
            console.log(`parsedBody.user: ${parsedBody.user}`);
            let hash = await bcrypt.hashPassword(parsedBody.user.username)        
            await knex.select("id", "username").from("users")
                .where("username", parsedBody.user.username)
                .then((rows) => {
                    user = rows[0];
                })

            if (user) {
                var payload = {
                    id: user.id,
                    username: user.username,
                    isHotel: false
                };
                var token = jwt.encode(payload, process.env.JWTSECRET);
                res.json({
                    token: token
                });

            } else {
                await knex.insert({
                    username: parsedBody.user.username,
                    password: hash,
                    loginMethod: 'instagram'
                })
                    .into('users')
                    .then(() => { })

                await knex.select("id", "username").from("users")
                    .where("username", parsedBody.user.username)
                    .then((rows) => {
                        user = rows[0]

                        var payload = {
                            id: user.id,
                            username: user.username,
                            isHotel: false
                        };
                        var token = jwt.encode(payload, process.env.JWTSECRET);
                        res.json({
                            token: token
                        });
                    })
            }
        });
    } else { res.send('Access token not found') }
});


//auth with JWT

router.post("/jwt", async (req, res) => {
    console.log(`/auth/jwt called`);
    if (req.body.name && req.body.password) {
        let name = req.body.name;
        let password = req.body.password;
        let hashedPassword;
        let table = req.body.isHotel ? 'hotel' : 'users';
        console.log(`Login user type: ${table}`);

        await knex.select("password").from(table).where('username', name).then((rows) => {
            hashedPassword = rows[0].password
        })

        let result = await bcrypt.checkPassword(password, hashedPassword);
        let user;
        if (result) {
            knex.select("id", "username").from(table)
                .where("username", name)
                .then((rows) => {
                    user = rows[0];
                    if (user) {
                        var payload = {
                            id: user.id,
                            username: user.username,
                            isHotel: req.body.isHotel
                        };
                        var token = jwt.encode(payload, process.env.JWTSECRET);
                        res.json({
                            token: token
                        });
                    } else { res.sendStatus(401) }
                })
        } else { res.sendStatus(401) }
    } else { res.sendStatus(401) }
});

router.get('/verifyjwt', passport.authenticate("jwt", { session: false }), (req, res) => {
    console.log(`/auth/verifyjwt called`);

    const responsedInfo = {
        id: req.user.id,
        username: req.user.username
    }

    res.json(responsedInfo);
})


router.post("/signupjwt", async (req, res) => {
    // Will not let hotel user to signup directly from frontend
    console.log(`/auth/signupjwt called`);
    if (req.body.name && req.body.password) {
        let name = req.body.name;
        let hash = await bcrypt.hashPassword(req.body.password)
        let user;
        await knex.select("id", "username").from("users")
            .where("username", name)
            .then((rows) => {
                user = rows[0];
            })

        if (user) {
            res.send('User already existed')
        } else {
            await knex.insert({
                username: name,
                password: hash,
                loginMethod: 'local'
            })
                .into('users')
                .then(() => { })

            await knex.select("id", "username").from("users")
                .where("username", name)
                .then((rows) => {
                    console.log(`Rows: `, rows);
                    user = rows[0]

                    var payload = {
                        id: user.id,
                        username: user.username,
                        isHotel: false
                    };
                    var token = jwt.encode(payload, process.env.JWTSECRET);
                    res.json({
                        token: token
                    });
                })
        }
    } else { res.send('User not found') }
});


module.exports = router;