var express = require('express');
var router = express.Router();
const passport = require('passport');

/* All APIs
1. Get user profile information
2. Get user profile information with active booking
*/

//1. Get user profile information
router.get('/', passport.authenticate("jwt", { session: false }), (req, res) => {

  /*Information you get from each row:
        { id,
          username,
          telephone,
          email,
          loginMethod.
          created_at,
          updated_at,
          }
      */
     

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
