var express = require('express');
var router = express.Router();
const passport = require('passport');

/* All APIs
1. Get chatlist of a user
2. Post request to create new conversation by the user
3. Get chatlist of a hotel
4. Get all message of a conversation
5. User get hotel information with active booking (message page)
6. Post request to send new message
7. Get user info in conversation

*/

//1. Get chatlist of a user
router.get('/chatlist/user', passport.authenticate("jwt", { session: false }), (req, res) => {
  /*Information you get from each row - Array:
        [  { conversationID,
            userID,
            hotelID,
            hotelName,
            lastMessageID,
            lastMessage,
            lastMessageType,
            lastMessageTime,
            icon
            } ]
        */

  var db=req.db;
  let query=db.select('c.userID','c.hotelID','c.id as conversationID','m.id as lastMessageID','m.body as lastMessage','m.type as lastMessageType','m.created_at as lastMessageTime','p.path as icon','h.name')
  .from(db.raw('(select "conversationID", max(id) as maxid from message group by "conversationID") as x ')).innerJoin('message as m', function() {
    this.on('m.conversationID', '=', 'x.conversationID').andOn('m.id', '=', 'x.maxid')
  })
  .fullOuterJoin('conversation as c','m.conversationID','c.id')
  .innerJoin('photo as p','p.hotelID','c.hotelID')
  .innerJoin('hotel as h','h.id','c.hotelID')
  .whereNull('p.roomTypeID')
  .where("userID",req.user.id)

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
      res.send({conversationID:rows[0].id})
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
  let query=db.select('c.userID','c.hotelID','c.id as conversationID','m.id as lastMessageID','m.body as lastMessage','m.type as lastMessageType','m.created_at as lastMessageTime','p.path as icon','u.username as name')
  .from(db.raw('(select "conversationID", max(id) as maxid from message group by "conversationID") as x ')).innerJoin('message as m', function() {
    this.on('m.conversationID', '=', 'x.conversationID').andOn('m.id', '=', 'x.maxid')
  })
  .fullOuterJoin('conversation as c','m.conversationID','c.id')
  .innerJoin('photo as p','p.hotelID','c.hotelID')
  .innerJoin('hotel as h','h.id','c.hotelID')
  .innerJoin('users as u', 'c.userID', 'u.id' )
  .whereNull('p.roomTypeID')
  .where("c.hotelID",req.user.id)

  query.then((rows)=>{

      res.send(rows);


  }).catch((error)=>{
    console.log(error);
    res.status(500).send({error:'cannot get chatlist'})
});
});


//4. Get all message of a conversation
router.get('/message/:conversationID', function(req,res){
  /*Information you get from each row - Array:
        [  { id,
            conversationID,
            body,
            type
            created_at,
            updated_at,
            authorID{user:1}
            } ]
        */

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
router.get('/activebooking/:hotelID', passport.authenticate("jwt", { session: false }), (req, res) => {
  /*Information you get from each row:
        { hotelID,
          hotelName,
          address,
          icon,
          activeBooking:[
            {bookingID, roomTypeID, roomType, startDate, endDate, duration, status}
          ]
          }
      */
     
  var db=req.db;
  
  var today = new Date();

  let query=db.select('h.name as hotelName','h.address','h.id as hotelID','b.id as bookingID','b.hotelID','b.roomTypeID','b.userID','b.startDate','b.endDate','b.duration','b.status','r.roomType','p.path as icon')
  .from("users as u")
  .fullOuterJoin('booking as b', 'b.userID','u.id')
  .leftJoin('hotel as h', 'h.id', 'b.hotelID')
  .leftJoin('roomType as r', 'r.id', 'b.roomTypeID')
  .innerJoin('photo as p','p.hotelID','b.hotelID')
  .whereNull('p.roomTypeID')
  .where("h.id",req.params.hotelID)
  
  query.then((rows)=>{

   let newRow=rows.map((current,index,array)=>{
    let booking={}
     if(current.userID==req.user.id){
      booking={
        bookingID:current.bookingID, 
        roomTypeID: current.roomTypeID, 
        roomType: current.roomType, 
        startDate: current.startDate, 
        endDate: current.endDate, 
        duration: current.duration, 
        status: current.status
       }

     }
     
    
     if(index==0){
       if(array[index+1]){
        array[index+1].activeBooking=[]
        if(current.endDate>=today){
          array[index+1].activeBooking=[booking]
        }
       }else{
        current.activeBooking=[booking]
        return current
      }
       
     
     }else if(index<array.length-1 && index>0){
      array[index+1].activeBooking=[]
      if(current.endDate>=today){
        array[index+1].activeBooking=[...current.activeBooking,booking]
      }else{
        array[index+1].activeBooking=[...current.activeBooking]
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

// 6. Post request to send new message
router.post('/sendmessage/:conversationID', passport.authenticate("jwt", { session: false }), (req, res) => {
 /* data this function needs:
    {
      body,
      type,
    }

    on success, sends back {status:'success', conversationID: id}
  */
  var db=req.db;
  let authorType=req.user.isHotel==true?'hotel':'users';
  let id=req.user.id;
  let authorID=JSON.stringify({[authorType]:id})
  let query=db.insert([{body:req.body.body, type:req.body.type, authorID:authorID,conversationID:req.params.conversationID}],['id']).into('message')

  query.then((result)=>{

      res.send({status:'success',messageID:result[0].id})
      
  }).catch((error)=>{
    console.log(error);
    res.status(500).send({error:'cannot send message'})
  });

})

//7. Get user info in conversation
router.get('/userinfo/:conversationID',  passport.authenticate("jwt", { session: false }), (req, res) => {
  /*Information you get from each row - Array:
        [  { userID,
            username,
            telephone,
            email
            } ]
        */

  var db=req.db;
  var today = new Date();
  let query=db.select("u.username","u.telephone","u.email","u.id as userID","b.id as bookingID","b.hotelID","b.startDate","b.endDate","r.roomType")
  .from("users as u")
  .innerJoin('conversation as c','c.userID','u.id')
  .fullOuterJoin('booking as b','c.userID','b.userID')
  .innerJoin('roomType as r','r.id','b.roomTypeID')
  .where("c.id",req.params.conversationID)
  
  query.then((rows)=>{
    let newRow=rows.map((current,index,array)=>{
      let booking=null;
       if(current.hotelID==req.user.id){
        booking={
          bookingID:current.bookingID, 
          roomType: current.roomType, 
          startDate: current.startDate, 
          endDate: current.endDate, 
         }
  
       }
       
      
       if(index==0){
         if(array[index+1]){
          array[index+1].activeBooking=[]
          if(booking && current.endDate>=today){
            array[index+1].activeBooking=[booking]
          }
         }else{
           if(booking){
            current.activeBooking=[booking]
            return current
           }   
        }
         
       
       }else if(index<array.length-1 && index>0){
        array[index+1].activeBooking=[]
        if(booking && current.endDate>=today){
          array[index+1].activeBooking=[...current.activeBooking,booking]
        }else{
          array[index+1].activeBooking=[...current.activeBooking]
        }
       }else if (index==array.length-1){
        if(booking && current.endDate>=today){
          current.activeBooking=[...current.activeBooking,booking]
          return current
        }else{
  
          return current
        }
       }
     }).filter((each)=>{
      if(each!=null){
        delete each.roomType;
        delete each.startDate;
        delete each.endDate;
        delete each.hotelID;
        return true
      }
    })
      res.send(newRow);

  }).catch((error)=>{
    console.log(error);
    res.status(500).send({error:'cannot get chatlist'})
  });

});


module.exports = router;