var express = require('express');
var router = express.Router();

router.post('/', function(req, res, next) {

 var db=req.db;

  let query=db.select("*").from("hotel")
  .where("district",req.body.district) //search by district
  .innerJoin("roomType", 'hotel.id', "roomType.hotelID") //match roomtype with hotel
  .whereRaw("requirement ->> 'pet' = ?", [req.body.petType])
  // .innerJoin('booking', function () {
  //   this
  //     .on("hotel.id", "booking.hotelID")
  //     .on("roomType.id", 'booking.roomTypeID');
  // }) //find booking related
  // .where(function() {
  //   this.where("booking.endDate", '<=', req.body.startDate).orWhere("booking.startDate", '>=', req.body.endDate)
  // })

   query.then((rows)=>{

    res.send(rows);
  })
  
  .catch((error)=>{
    console.log(error);
    res.status(500).send({error:'cannot get hotel'})
});
});


module.exports = router;