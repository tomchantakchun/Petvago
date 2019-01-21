var express = require('express');
var router = express.Router();
const passport = require('passport');

/* All APIs
1. Get chatlist of a user
2. Post request to create new conversation by the user
3. Get chatlist of a hotel
4. Get all message of a conversation
5. User get hotel information with active booking (message page)
6. Post request to send new message **
*/

//1. Get chatlist of a user
router.get('/chatlist/user', passport.authenticate("jwt", { session: false }), (req, res) => {
  /*Information you get from each row - Array:
        [  { id,
            userID,
            hotelID
            created_at,
            updated_at,
            } ]
        */

  var db=req.db;
  let query=db.select("*").from("conversation").where("userID",req.user.id)
  query.then((rows)=>{

      res.send(rows);


  }).catch((error)=>{
    console.log(error);
    res.status(500).send({error:'cannot get chatlist'})
});
});


//2. Create new conversation by the user
router.post('/addchat', passport.authenticate("jwt", { session: false }), (req, res) => {
  // **** Requires frontend to check whether the conversation already exists
  /* data this function needs:
    {
      hotelID,
    }

    on success, sends back {status:'success', conversationID: id}
  */

 var db=req.db;
 let query=db.select("*").from("conversation").where({userID:req.user.id, hotelID:req.body.hotelID})
  query.then((rows)=>{
    if(rows.length==0){
      db.insert([{userID:req.user.id, hotelID:req.body.hotelID}],['id']).into('conversation').then((result)=>{
        res.send({status:'success',conversationID:result[0].id})
      }).catch((error)=>{
        console.log(error);
        res.status(500).send({error:'cannot create new chat'})
      })
    }else{
      res.status(500).send({error:'conversation already exist'})
    }


  }).catch((error)=>{
    console.log(error);
    res.status(500).send({error:'cannot check chatlist'})
  });
});


//3. Get chatlist of a hotel
router.get('/chatlist/hotel', passport.authenticate("jwt", { session: false }), (req, res) => {
   /*Information you get from each row - Array:
        [  { id,
            userID,
            hotelID
            created_at,
            updated_at,
            } ]
        */

  var db=req.db;
  let query=db.select("*").from("conversation").where("hotelID",req.user.id)
  query.then((rows)=>{

      res.send(rows);


  }).catch((error)=>{
    console.log(error);
    res.status(500).send({error:'cannot get chatlist'})
});
});


//4. Get all message of a conversation
router.get('/message/:conversationID', function(req,res){
  var db=req.db;
  let query=db.select().from("message").where("conversationID",req.params.conversationID)
  query.then((rows)=>{

      res.send(rows);

  }).catch((error)=>{
    console.log(error);
    res.status(500).send({error:'cannot get chatlist'})
  });


});


//5. User get hotel information with active booking (message page)
router.get('/activebooking/:hotelid', passport.authenticate("jwt", { session: false }), (req, res) => {

  /*Information you get from each row:
        { hotelID,
          hotelName,
          address,
          activeBooking:[
            {bookingID, roomTypeID, roomType, startDate, endDate, duration, status}
          ]
          }
      */
     
  var db=req.db;
  
  var today = new Date();

  let query=db.select('h.name as hotelName','h.address','h.id as hotelID','b.id as bookingID','b.hotelID','b.roomTypeID','b.startDate','b.endDate','b.duration','b.status','r.roomType').from("users as u").leftJoin('booking as b', 'b.userID','u.id').leftJoin('hotel as h', 'h.id', 'b.hotelID').leftJoin('roomType as r', 'r.id', 'b.roomTypeID').where("u.id",req.user.id).andWhere("h.id",req.params.hotelID)
  
  query.then((rows)=>{

   let newRow=rows.map((current,index,array)=>{
     let booking={
      bookingID:current.bookingID, 
      roomTypeID: current.roomTypeID, 
      roomType: current.roomType, 
      startDate: current.startDate, 
      endDate: current.endDate, 
      duration: current.duration, 
      status: current.status
     }
    
     if(index==0){
        array[index+1].activeBooking=[]
        if(current.endDate>=today){
          array[index+1].activeBooking=[booking]
        }
     
     }else if(index<array.length-1 && index>0){
      array[index+1].activeBooking=[]
      if(current.endDate>=today){
        array[index+1].activeBooking=[...current.activeBooking,booking]
      }else{
      }
     }else if (index==array.length-1){
      if(current.endDate>=today){
        current.activeBooking=[...current.activeBooking,booking]
        return current
      }else{
        return current
      }
     }
   }).filter((each)=>{
    if(each!=null){
      return true
    }
  })

      res.send(newRow);

  }).catch((error)=>{
    console.log(error);
    res.status(500).send({error:'cannot get hotel info'})
  });
});



module.exports = router;