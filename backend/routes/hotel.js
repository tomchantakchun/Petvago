var express = require('express');
var router = express.Router();
const fileUpload = require('express-fileupload');
const firebase = require('firebase');

/* All APIs
1. Get all hotel information with only one icon photo for display in home page/ search result
2. Get information and photo of one hotel based on params.hotelid (redirected from homepage)
3. Post request to get information, photo and availability of one hotel (redirected from search) **
4. Get hotel information for edit
5. Get roomType and photo based on roomTypeID for edit
6. Put request to edit information of hotel **

unaudited addition by Matt
7. Post request to upload photo :: /uploadPhoto
8. Put request to delete photo
*/


// 1. Get all hotel information with only one icon photo for display in home page/ search result
router.get('/', function(req, res, next) {
  /*Information you get from each row:
        { id,
          name,
          address,
          description,
          telephone,
          username,
          email,
          vaccineRequirement,
          facilities,
          partnershipType,
          app,
          averageRating,
          availablePeriod,
          created_at,
          updated_at,
          latitude,
          longitude,
          district,
          path (icon path)}
      */
  var db=req.db;
  let query=db.select("hotel.*","photo.path").from("hotel").innerJoin("photo","hotel.id","photo.hotelID").whereNull("photo.roomTypeID").limit(8)
  query.then((rows)=>{
      rows.map((each)=>{
        delete each.password
      })
      res.send(rows);
      
      
  }).catch((error)=>{
    console.log(error);
    res.status(500).send({error:'cannot get hotel'})
  });
});


// 2. Get information and photo of one hotel based on params.hotelid (redirected from homepage)
router.get('/:hotelID', function(req,res){
  /*Information you get from each row:
        { id,
          name,
          address,
          description,
          telephone,
          username,
          email,
          vaccineRequirement,
          facilities,
          partnershipType,
          app,
          averageRating,
          availablePeriod,
          created_at,
          updated_at,
          latitude,
          longitude,
          district,
          hotelPhoto:[{photoID, path}],
          roomType:{
            [
              {roomTypeID, 
                roomType1, 
                price, 
                description, 
                requirement, 
                additionalPrice,
                icon, 
                photo:[{photoID, path, icon}]}
            ]
          }
          }
      */
  var db=req.db;
  let query=db.select('h.*','t.id as roomTypeID','t.roomType','t.price','t.requirement','t.description','t.additionalPrice','p.id as photoID','p.path','p.icon').from("roomType as t").leftJoin("photo as p","t.id","p.roomTypeID").innerJoin('hotel as h', 'h.id','t.hotelID').where('h.id',req.params.hotelID).orderBy('p.id','asc')
  query.then((rows)=>{

    
    

    if (rows.length==0){
      res.status(500).send({error:'no such hotel'})
    } else {

      let newRow=rows.map((current,index,array)=>{

        let hotelPhoto={
          photoID: current.photoID,
          path: current.path
        }
        if (index==0){
          current.hotelPhoto=[hotelPhoto]
          console.log('aaaa',current.hotelPhoto)
        }else{
          current.hotelPhoto=[...array[index-1].hotelPhoto,hotelPhoto]
          console.log('aaaa',current.hotelPhoto)
        }


        if(index<array.length-1 && current.roomType==array[index+1].roomType){

          let photo={
            photoID: current.photoID,
            path: current.path,
            icon: current.icon
          }
          if (current.photo && typeof current.photo =='object' ){
            array[index+1].photo=[...current.photo,photo]
          }else{
            array[index+1].photo=[photo]
          }

          
        
        }else{
          let photo={
            photoID: current.photoID,
            path: current.path,
            icon: current.icon
          }
          if (index==0 || typeof current.photo !='object'){
            current.photo=photo
          }else{
            current.photo=[...current.photo,photo]
          }
          delete current.password;
          return current
        }
      }).filter((each)=>{
        if(each!=null){
          return true
        }
      })

      let finalRow=newRow.map((current,index,array)=>{
        delete current.icon;
        delete current.photoID;
        current.roomType=[{
          roomTypeID:current.roomTypeID,
          roomType:current.roomType,
          price:current.price,
          description:current.description,
          requirement:current.requirement,
          additionalPrice:current.additionalPrice,
          icon:current.icon,
          photo:current.photo
        }]

        if(index>0){
          current.roomType=[...array[index-1].roomType,...current.roomType]
        }

        if(index==array.length-1){
          return current
        }
        
      }).filter((each)=>{
        if(each!=null){
          return true
        }
      })

      let lastRow=finalRow.map((current)=>{
        delete current.roomTypeID;
        delete current.price;
        delete current.description;
        delete current.requirement;
        delete current.additionalPrice;
        delete current.path;
        return current
      })

      res.send(lastRow);
      
    }

  }).catch((error)=>{
    console.log(error);
    res.status(500).send({error:'cannot get hotel'})
  });
})

// 3. Post request to get information, photo and availability of one hotel (redirected from search) **



// 4. Get hotel information for edit
router.get('/edit/hotel/:hotelID', function(req,res){
  /* Information you get:
  {
      name,
      telephone,
      address,
      description,  
      vaccineRequirement (type:object),
      rooms: [
        {roomTypeID, roomType, price}
      ]
    }
  */

  var db=req.db;
  let query=db.select('h.name','h.telephone','h.address', 'h.description','t.id as roomTypeID','t.roomType','t.price').from("roomType as t").innerJoin('hotel as h', 'h.id','t.hotelID').where('h.id',req.params.hotelID)
  query.then((rows)=>{

    let newRow=rows.map((current,index,array)=>{
      let room={
       roomTypeID: current.roomTypeID, 
       roomType: current.roomType, 
       price: current.price
      }
     
      if(index==0){
        if(array[index+1]){
          array[index+1].rooms=[room]
        }
      }else if(index<array.length-1 && index>0){
         array[index+1].rooms=[...current.rooms,room]
      }else if (index==array.length-1){
         current.rooms=[...current.rooms,room];
         delete current.roomTypeID;
         delete current.roomType;
         delete current.price;
         return current
      }
    }).filter((each)=>{
     if(each!=null){
       return true
     }
   })
    res.send(newRow)
  }).catch((error)=>{
    console.log(error);
    res.status(500).send({error:'cannot get hotel'})
  });

})

// 5. Get roomType and photo based on roomTypeID for edit
router.get('/edit/roomtype/:roomTypeID', function(req,res){

  /* Information you get:
  {
      roomTypeID,
      roomType,
      description,
      photos:[
        {photoID, path, icon(t/f)}
      ]
    }
  */

 var db=req.db;
 let query=db.select('r.id as roomTypeID','r.roomType','r.description', 'p.id as photoID','p.path','p.icon').from("roomType as r").leftJoin('photo as p', 'r.id','p.roomTypeID').where('r.id',req.params.roomTypeID)
 query.then((rows)=>{

  let newRow=rows.map((current,index,array)=>{
    let photo={
     photoID: current.photoID, 
     path: current.path, 
     icon: current.icon
    }
    if(index==0){
      if(array[index+1]){
        array[index+1].photos=[photo]
      }
    }else if(index<array.length-1 && index>0){
       array[index+1].photos=[...current.photos,photo]
    }else if (index==array.length-1){
       current.photos=[...current.photos,photo];
       delete current.photoID;
       delete current.path;
       delete current.icon;
       return current
    }
  }).filter((each)=>{
   if(each!=null){
     return true
   }
 })

 console.log(newRow)
  res.send(newRow)
}).catch((error)=>{
  console.log(error);
  res.status(500).send({error:'cannot get roomtype photo'})
});

})


// 6. Put request to edit information of hotel 
router.put('/edit/:hotelID', function(req,res){

    /* data this function needs:
    {
      name,
      telephone,
      address,
      description,  
      vaccineRequirement (type:object)
    }

    on success, sends back {status:'success', conversationID: id}
  */

  var db=req.db;
  let query=db.update({
    name: req.body.name,
    telephone: req.body.telephone,
    address: req.body.address,
    description: req.body.description,
    vaccineRequirement:JSON.stringify(req.body.vaccineRequirement),
  }).where('id',req.params.hotelID)
  query.then((rows)=>{
    
      res.send({status:'success'});
      
      
  }).catch((error)=>{
    console.log(error);
    res.status(500).send({error:'cannot edit hotel info'})
  });


})


// 7. Post request to upload photo

var config = {
  apiKey: "AIzaSyDLp869ppBsfXM7ZMT0lG7j6R28OTgYX8I",
  authDomain: "petvago-6b2c9.firebaseapp.com",
  databaseURL: "https://petvago-6b2c9.firebaseio.com",
  projectId: "petvago-6b2c9",
  storageBucket: "petvago-6b2c9.appspot.com",
  messagingSenderId: "778919346097"
};
firebase.initializeApp(config);

// Create a root reference
// var storageRef = firebase.storage().ref();

// Create a reference to 'mountains.jpg'
// var mountainsRef = storageRef.child('mountains.jpg');

// Create a reference to 'images/mountains.jpg'
// var mountainImagesRef = storageRef.child('images/mountains.jpg');

// While the file names are the same, the references point to different files
// mountainsRef.name === mountainImagesRef.name            // true
// mountainsRef.fullPath === mountainImagesRef.fullPath    // false

router.use(fileUpload())
router.post('/uploadPhoto', (req,res) => {
  let uploadFile = req.files.file
  const fileName = req.files.file.name
  uploadFile.mv(
    `${__dirname}/../uploadTest/${fileName}`,
    (err) => {
      if (err) {
        return res.status(500).send(err)
      }

      res.json({
        file: `uploadTest/${fileName}`,
      })
    },
  )
})



module.exports = router;