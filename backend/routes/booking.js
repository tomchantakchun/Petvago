var express = require('express');
var router = express.Router();

/* All APIs
1. Get booking info based on booking id as params
2. Get all booking of a user
3. Post request to create booking by user **
4. Put request to update booking on submit **
5. Post request to create offline booking by hotel **
6. Get all booking of a hotel **
*/


//1. Get booking info based on booking id as params
router.get('/info/:bookingID', function(req, res, next) {
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
router.get('/user/', function(req, res, next) {
  /*Information you get from each row:
    { upcomingBooking:[
        {bookingID, userID, hotelID, hotelName, startDate, endDate, hotelIconPath}
      ],
      pastBooking:[
        {bookingID, userID, hotelID, hotelName, startDate, endDate, hotelIconPath}
      ] 
    }
  */
  var today = new Date();

  var db=req.db;
  let query=db.select('b.id as bookingID','b.userID','b.hotelID','h.name as hotelName','b.startDate','b.endDate','p.path').from("booking as b").innerJoin('hotel as h','h.id','b.hotelID').innerJoin('photo as p','h.id','p.hotelID').whereNull('p.roomTypeID').andWhere('b.userID',1)
  query.then((rows)=>{
      let newRow=rows.map((current,index,array)=>{
        let booking={
          bookingID:current.bookingID, 
          userID:current.userID, 
          hotelID:current.hotelID, 
          hotelName:current.hotelName, 
          startDate:current.startDate, 
          endDate:current.endDate, 
          hotelIconPath:current.path
        };

        if(index==0){
          array[index+1].upcomingBooking=[]
          array[index+1].pastBooking=[]
          if(today>current.endDate){
            //past
            array[index+1].pastBooking=[booking]
          }else{
            //upcoming
            array[index+1].upcomingBooking=[booking]
          }
       
        }else if(index<array.length-1 && index>0){
          array[index+1].upcomingBooking=[]
          array[index+1].pastBooking=[]
          if(today>current.endDate){
            //past
            array[index+1].pastBooking=[...current.pastBooking, booking]
          }else{
            //upcoming
            array[index+1].upcomingBooking=[...current.upcomingBooking, booking]
          }
        }else if (index==array.length-1){
          if(today>current.endDate){
            current.pastBooking=[...current.pastBooking,booking]
          }else{
            current.upcomingBooking=[...current.pastBooking,booking]
          }
          delete current.bookingID;
          delete current.userID;
          delete current.hotelID; 
          delete current.hotelName;
          delete current.startDate; 
          delete current.endDate;
          delete current.path;
          return current
        }
        console.log('0000',array[index+1].upcomingBooking,array[index+1].pastBooking)
      }).filter((each)=>{
        if(each!=null){
          return true
        }
      })
      res.send(newRow);
           
  }).catch((error)=>{
    console.log(error);
    res.status(500).send({error:'cannot get booking of user'})
  });
});


module.exports = router;
