var express = require('express');
var router = express.Router();

// 1. Get all hotel information with only one icon photo for display in front page/ search result
router.get('/', function(req, res, next) {
  var db=req.db;
  let query=db.select("hotel.*","photo.path").from("hotel").innerJoin("photo","hotel.id","photo.hotelID").whereNull("photo.roomTypeID")
  query.then((rows)=>{
      rows.map((each)=>{
        delete each.password
      })
      res.send(rows);
      /*Information you get from each row:
      { id,
        name,
        address,
        description,
        telephone,
        username,
        email,
        vaccineRequirement,
        facilities,
        partnershipType,
        app,
        averageRating,
        availablePeriod,
        created_at,
        updated_at,
        latitude,
        longitude,
        district,
        path (icon path)}
      */
      
  }).catch((error)=>{
    console.log(error);
    res.status(500).send({error:'cannot get hotel'})
  });
});


// 2. Get information and photo of one hotel based on params.hotelid
// router.get('/:hotelid', function(req,res){
//   var db=req.db;
//   let query=db.select("h.*","p.photo").from("hotel as h").where('id',req.params.hotelid).innerJoin("photo as p","h.id","p.hotelID").
//   query.then((rows)=>{

//     if (rows.length==0){
//       res.status(500).send({error:'no such hotel'})
//     } else {
//       res.send(rows);
//     }

//   }).catch((error)=>{
//     console.log(error);
//     res.status(500).send({error:'cannot get hotel'})
//   });
// })



module.exports = router;