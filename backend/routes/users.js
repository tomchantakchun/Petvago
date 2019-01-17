var express = require('express');
var router = express.Router();

async function jwtVerify(req, res){
  return new Promise((resolve,reject)=>{
      var auth_header = req.headers.authorization.split(" ");

      if(auth_header[0] == "Bearer"){
         jwt.verify(auth_header[1],process.env.SECRET,function(err, decoded) {
              if (err) return res.status(500).send({ status: "failed", error: "System error!"})
              resolve(decoded);
          });
      }else{
          resolve(null);
      }
  });     // End of new Promise
}

// Get user profile information: rows = an array with an object
router.get('/:id', function(req, res, next) {
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
