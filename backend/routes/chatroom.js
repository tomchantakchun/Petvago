var express = require('express');
var router = express.Router();
const passport = require('passport');

/* All APIs
1. Get chatlist of a user
2. Create new conversation by the user
3. Get chatlist of a hotel
4.
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
    console.log(rows)

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
    console.log(rows)

      res.send(rows);


  }).catch((error)=>{
    console.log(error);
    res.status(500).send({error:'cannot get chatlist'})
});
});

//4. Get all message of a conversation
router.get('/message/:conversationID', function(req,res){
  console.log('11111111');
  var db=req.db;
  let query=db.select().from("message").where("conversationID",req.params.conversationID)
  query.then((rows)=>{
    console.log(rows)

      res.send(rows);


  }).catch((error)=>{
    console.log(error);
    res.status(500).send({error:'cannot get chatlist'})
  });


});

//5. User get hotel information with active booking
router.get('/activebooking/user', passport.authenticate("jwt", { session: false }), (req, res) => {

  /*Information you get from each row:
        { id,
          username,
          telephone,
          email,
          loginMethod.
          created_at,
          updated_at,
          }
      */
     

  var db=req.db;
  
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth() + 1; 
  var yyyy = today.getFullYear();
  if (dd < 10) {
    dd = '0' + dd;
  } 
  if (mm < 10) {
    mm = '0' + mm;
  } 
  var today = yyyy + '-' + mm + '-' + dd;

  console.log(today)

  let query=db.select('h.name','h.address','h.id as hotelID','b.id as bookingID','b.hotelID','b.roomTypeID','b.startDate','b.endDate','b.duration','b.status').from("users as u").leftJoin('booking as b', 'b.userID','u.id').leftJoin('hotel as h', 'h.id', 'b.hotelID').where("u.id",req.user.id).andWhere('b.startDate','<=',today).andWhere('b.endDate','>=',today)
  
  query.then((rows)=>{

   console.log('rows',rows)
    if(rows.length>0){
      delete rows[0].password;
    }
      res.send(rows);
    

    //select u."username", b."startDate", b."endDate", b.id as bookingID from users as u inner join booking as b on b."userID"=u.id where b."startDate"<=getdate() and b."endDate">='2018-02-06';


  }).catch((error)=>{
    console.log(error);
    res.status(500).send({error:'cannot get user'})
  });
});



module.exports = router;