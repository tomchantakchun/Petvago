var express = require('express');
var router = express.Router();

/* All APIs
1. Get booking info based on booking id as params
2. Get all booking of a user
3. Post request to create booking by user
4. Put request to update booking on submit
5. Post request to create offline booking by hotel
6. Get all booking of a hotel
*/


//1. Get booking info based on booking id as params
router.get('/:bookingID', function(req, res, next) {
  /*Information you get from each row:
    { id,
      ownerName,
      ownerPhone,
      petName,
      petType,
      petWeight,
      vaccineRequirement,
      userID,
      hotelID,
      hotelName,
      roomTypeID,
      roomType,
      startDate,
      endDate,
      duration,
      service,
      totalPrice,
      status,
      created_at,
      updated_at,
      order_date,
      expiryTime   
    }
  */
  var db=req.db;
  let query=db.select('b.*','r.roomType','h.name as hotelName').from("booking as b").innerJoin("roomType as r","r.id","b.roomTypeID").innerJoin("hotel as h","h.id","b.hotelID").where("b.id",req.params.bookingID)
  query.then((rows)=>{
      
      res.send(rows);
           
  }).catch((error)=>{
    console.log(error);
    res.status(500).send({error:'cannot get booking'})
  });
});

// 2. Get all booking of a user
router.get('/user/:userID', function(req, res, next) {
  /*Information you get from each row:
    { upcomingBooking:[
        {bookingID, userID, hotelID, hotelName, startDate, endDate, hotelIconPath}
      ],
      pastBooking:[
        {}
      ] 
    }
  */
  var db=req.db;
  let query=db.select().from("booking").where("id",req.params.userID)
  query.then((rows)=>{
      
      res.send(rows);
           
  }).catch((error)=>{
    console.log(error);
    res.status(500).send({error:'cannot get booking'})
  });
});


module.exports = router;
