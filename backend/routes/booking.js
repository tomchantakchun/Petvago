var express = require('express');
var router = express.Router();
const passport = require('passport');

/* All APIs
1. Get booking info based on booking id as params
2. Get all booking of a user
3. Post request to create booking by user
4. Put request to update booking on submit
5. Post request to create offline booking by hotel
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
router.get('/user', passport.authenticate("jwt", { session: false }), (req, res) => {
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
  let query=db.select('b.id as bookingID','b.userID','b.hotelID','h.name as hotelName','b.startDate','b.endDate','p.path').from("booking as b").innerJoin('hotel as h','h.id','b.hotelID').innerJoin('photo as p','h.id','p.hotelID').whereNull('p.roomTypeID').andWhere('b.userID',req.user.id)
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

// 3.Post request to create booking by user
router.post('/create-booking', passport.authenticate("jwt", { session: false }), (req, res) => {
  /* data this function needs:
    {
      hotelID,
      roomTypeID,
      startDate,
      endDate
    }

    on success, sends back {status:'success', bookingID, expiryTime}
  */
  console.log(req.body);
  var db=req.db;
  var now = new Date();
  now.setMinutes( now.getMinutes() + 30 );
  
  var duration=((new Date(req.body.endDate))-(new Date(req.body.startDate))) / (60*60*24*1000)

  let query=db.insert([{userID:req.user.id, hotelID:req.body.hotelID, roomTypeID:req.body.roomTypeID, startDate:req.body.startDate, endDate:req.body.endDate, expiryTime:now, duration: duration}],['id']).into('booking')
  query.then((result)=>{
      res.send({status:'success',bookingID:result[0].id,expiryTime:now});        
  }).catch((error)=>{
    console.log(error);
    res.status(500).send({error:'cannot create booking'})
  });
 
})

// 4. Put request to update booking on submit **
router.put('/update-booking', passport.authenticate("jwt", { session: false }), (req, res) => {
  /* data this function needs:
    {
      id,
      ownerName,
      ownerPhone,
      petName,
      petType,
      petWeight,
      vaccineRequirement,
      service,
      totalPrice,
    }

    on success, sends back {status:'success'}
  */
  var db=req.db;
  
  today=new Date();
  
  let query=db.update({id:req.body.id, ownerName:req.body.ownerName, ownerPhone:req.body.ownerPhone, petName:req.body.petName, petType:req.body.petType, vaccineRequirement:req.body.vaccineRequirement, service:req.body.service, totalPrice:req.body.totalPrice, status:'confirmed'}).into('booking').where('id',req.body.id)

  query.then(()=>{
      res.send({status:'success'});        
  }).catch((error)=>{
    console.log(error);
    res.status(500).send({error:'cannot update booking'})
  });
})

// 5. Post request to create offline booking by hotel
router.post('/offline-booking', passport.authenticate("jwt", { session: false }), (req, res) => {

  /* data this function needs:
    {
        startDate,
        endDate,
        roomTypeID
    }
  */

  var db=req.db;
  let query=db.insert([{hotelID:req.user.id, roomTypeID:req.body.roomTypeID, startDate:req.body.startDate, endDate:req.body.endDate}],['id']).into('booking')

  query.then((result)=>{
      res.send({status:'success',bookingID:result[0].id});        
  }).catch((error)=>{
    console.log(error);
    res.status(500).send({error:'cannot update booking'})
  });
})

// 6. Get all booking of a hotel **
router.get('/hotel', passport.authenticate("jwt", { session: false }), (req, res) => {
  if (req.user.isHotel!=true){
    res.status(500).send({error:'user is not hotel'})
  } else{

    var db=req.db;
    let query=db.select().from('booking').where('hotelID',req.user.id)
  
    query.then((rows)=>{
        res.send(rows);        
    }).catch((error)=>{
      console.log(error);
      res.status(500).send({error:'cannot get booking'})
    });
  }

})


module.exports = router;
