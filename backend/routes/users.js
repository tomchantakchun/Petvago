var express = require('express');
var router = express.Router();

// Get user profile information: rows = an array with an object
router.get('/', async function(req, res, next) {
  console.log('111111',req.user)



  var db=req.db;
  let query=db.select("*").from("users").where("id",1)
  query.then((rows)=>{

    if (rows.length==0){
      res.status(500).send({error:'no such user'})
    } else {
      res.send(rows);
    }

  }).catch((error)=>{
    console.log(error);
    res.status(500).send({error:'cannot get user'})
});
});

module.exports = router;
