var express = require('express');
var router = express.Router();

//1. Get all reviews of one hotel with hotel id as params
router.get('/hotel/:hotelid', function(req, res, next) {
  /* Information you get
  { id,
    userID,
    hotelID,
    bookingID,
    rating,
    comment,
    create_at,
    updated_at
  }
  */
  var db=req.db;
  let query=db.select().from("review").where("hotelID",req.params.hotelid)
  query.then((rows)=>{
      res.send(rows);
  }).catch((error)=>{
    console.log(error);
    res.status(500).send({error:'cannot get review'})
  });
});

//2. Get all reviews of one user with user id as params
router.get('/user/:userid', function(req, res, next) {
  /* Information you get
  { id,
    userID,
    hotelID,
    bookingID,
    rating,
    comment,
    create_at,
    updated_at
  }
  */
  var db=req.db;
  let query=db.select().from("review").where("userID",req.params.userID)
  query.then((rows)=>{
      res.send(rows);
  }).catch((error)=>{
    console.log(error);
    res.status(500).send({error:'cannot get review'})
  });
});

//3. Send review
router.post('/',function(req, res, next) {
  /* data this function needs:
    {
      userID,
      hotelID,
      bookingID,
      rating,
      comment
    }

    on success, sends back {status:'success'}
  */
  
  var db=req.db;
  let query=db.insert([{userID:req.body.userID},{hotelID:req.body.hotelID}, {bookingID:req.body.bookingID},{rating:req.body.rating},{comment:req.body.comment}]).into('review')

  query.then(()=>{
      res.send({status:'success'});
  }).catch((error)=>{
    console.log(error);
    res.status(500).send({error:'cannot get review'})
  });
});

module.exports = router;
