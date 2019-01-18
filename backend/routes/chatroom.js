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




module.exports = router;