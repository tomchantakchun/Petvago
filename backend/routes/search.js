var express = require('express');
var router = express.Router();

router.post('/', function(req, res, next) {

 var db=req.db;

  let query=db.select("*").from("hotel")
  .where("district",req.body.district) //search by district
  .innerJoin("roomType", 'hotel.id', "roomType.hotelID") //match roomtype with hotel
  .innerJoin('booking', function () {
    this
      .on("hotel.id", "booking.hotelID")
      .on("roomType.id", 'booking.roomTypeID');
  }) //find booking related
  // .where(function() {
  //   this.where("booking.endDate", '<=', req.body.startDate).orWhere("booking.startDate", '>=', req.body.endDate)
  // }) 
  .whereRaw("requirement ->> 'pet' = ?", [req.body.petType]) //search by petType
  
   query.then((rows)=>{
     res.send(rows)
    // rows.map((row, index) => {
    //   let hotelID = row.hotelID;
    //   let roomTypeID = row.roomTypeID;
    //   let query2=db.select("quantity").from("roomType").where('hotelID', hotelID).andWhere('id', roomTypeID)
    //   query2.then((results)=>{res.send(results)})
    // })
  })
  
  .catch((error)=>{
    console.log(error);
    res.status(500).send({error:'cannot get hotel'})
});
});


module.exports = router;