var express = require('express');
var router = express.Router();
const passport = require('passport');

/* All APIs
1. Get all reviews of one hotel with hotel id as params
2. Get all reviews of one user with user id as params
3. Send review
*/

//1. Get all reviews of one hotel with hotel id as params
router.get('/hotel/:hotelid', function(req, res, next) {
  /* Information you get
  { id,
    userID,
    username,
    hotelID,
    bookingID,
    rating,
    comment,
    create_at,
    updated_at
  }
  */
  var db=req.db;
  let query=db.select("r.*","u.username").from("review as r").innerJoin("users as u","r.userID","u.id").where("hotelID",req.params.hotelid)
  query.then((rows)=>{
      res.send(rows);
  }).catch((error)=>{
    console.log(error);
    res.status(500).send({error:'cannot get review'})
  });
});

//2. Get all reviews of one user with user id as params
router.get('/user', passport.authenticate("jwt", { session: false }), (req, res) => {
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
  let query=db.select().from("review").where("userID",req.user.id)
  query.then((rows)=>{
      res.send(rows);
  }).catch((error)=>{
    console.log(error);
    res.status(500).send({error:'cannot get review'})
  });
});

//3. Send review
router.post('/',passport.authenticate("jwt", { session: false }), (req, res) => {
  /* data this function needs:
    {
      hotelID,
      bookingID,
      rating,
      comment
    }

    on success, sends back {status:'success'}
  */
  
  var db=req.db;
  let query=db.insert({userID:req.user.id,hotelID:req.body.hotelID,bookingID:req.body.bookingID,rating:req.body.rating,comment:req.body.comment}).into('review')

  query.then(()=>{
    db.select('peopleRated','averageRating').from('hotel').where('id',req.body.hotelID).then((result)=>{
      let newRating=((result[0].averageRating*result[0].peopleRated)+req.body.rating)/(result[0].peopleRated+1)
      let newPeople=(result[0].peopleRated+1)

      db('hotel').update({averageRating:newRating, peopleRated:newPeople}).where('id',req.body.hotelID).then(()=>{
        res.send({status:'success'});
      })
    })

      
  }).catch((error)=>{
    console.log(error);
    res.status(500).send({error:'cannot get review'})
  });
});

module.exports = router;
