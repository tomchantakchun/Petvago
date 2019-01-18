var express = require('express');
var router = express.Router();
const passport = require('passport');

// Get user profile information: rows = an array with an object
router.get('/', passport.authenticate("jwt", { session: false }), (req, res) => {


  var db=req.db;
  let query=db.select("*").from("users").where("id",req.user.id)
  query.then((rows)=>{

    if (rows.length==0){
      res.status(500).send({error:'no such user'})
    } else {
      delete rows[0].password;
      res.send(rows);
    }

  }).catch((error)=>{
    console.log(error);
    res.status(500).send({error:'cannot get user'})
});
});

module.exports = router;
