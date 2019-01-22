const express = require('express');
const router = express.Router();

router.post('/', function(req, res, next) {

let db=req.db;

let dayArray = [];
let result=[];
let startDay = new Date(req.body.startDate);
let endDay = new Date(req.body.endDate);

//get days between searched start day and end day, pushed in an array 
while (startDay.getDate() <= endDay.getDate()){
  dayArray.push(new Date(startDay));
  startDay.setDate(startDay.getDate()+1)
}

dayArray.map((day)=>{
  let formattedDay = day.toISOString().split('T')[0];
  let query = db.select("*").from("hotel")
  .where("district", req.body.district)
  .innerJoin("roomType", 'hotel.id', "roomType.hotelID") //match roomtype with hotel
  .innerJoin('booking', function () {
     this
       .on("hotel.id", "booking.hotelID").on("roomType.id", 'booking.roomTypeID')})
  .where(function() {
     this.where("booking.endDate", '>=', formattedDay)
    .andWhere("booking.startDate", '<=', formattedDay)
    })

  query.then((rows)=>{
    result.push(rows)
  })
})

res.send(result)

// res.send(dayArray)

//  var db=req.db;

//   let query=db.select("*").from("hotel")
//   .where("district",req.body.district) //search by district
//   .innerJoin("roomType", 'hotel.id', "roomType.hotelID") //match roomtype with hotel
//   .innerJoin('booking', function () {
//     this
//       .on("hotel.id", "booking.hotelID")
//       .on("roomType.id", 'booking.roomTypeID');
//   }) //find booking related
//   // .where(function() {
//   //   this.where("booking.endDate", '<=', req.body.startDate).orWhere("booking.startDate", '>=', req.body.endDate)
//   // }) 
//   .whereRaw("requirement ->> 'pet' = ?", [req.body.petType]) //search by petType
  
//    query.then((rows)=>{
//      res.send(rows)
//     // rows.map((row, index) => {
//     //   let hotelID = row.hotelID;
//     //   let roomTypeID = row.roomTypeID;
//     //   let query2=db.select("quantity").from("roomType").where('hotelID', hotelID).andWhere('id', roomTypeID)
//     //   query2.then((results)=>{res.send(results)})
//     // })
//   })
  
//   .catch((error)=>{
//     console.log(error);
//     res.status(500).send({error:'cannot get hotel'})
// });
});


module.exports = router;