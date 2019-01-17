var express = require('express');
var router = express.Router();

// Get user profile information: rows = an array with an object
router.get('/:id', async function(req, res, next) {
  console.log(req.user)



  var db=req.db;
  let query=db.select("*").from("users").where("id",req.params.id)
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
