var express = require('express');
var router = express.Router();
const fileUpload = require('express-fileupload');
const firebase = require('firebase');
const { Storage } = require('@google-cloud/storage');
const fs = require('fs');
const passport = require('passport');

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
        }else{
          current.hotelPhoto=[...array[index-1].hotelPhoto,hotelPhoto]
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
router.get('/edit/info', passport.authenticate("jwt", { session: false }), (req, res) => {
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

 if (req.user.isHotel!=true){
  res.status(500).send({error:'user is not hotel'})
  } else{

    var db=req.db;
    let query=db.select('h.name','h.telephone','h.address','h.vaccineRequirement', 'h.description','t.id as roomTypeID','t.roomType','t.price').from("roomType as t").innerJoin('hotel as h', 'h.id','t.hotelID').where('h.id',req.user.id)
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
  }

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
router.put('/edit/submit', passport.authenticate("jwt", { session: false }), (req, res) => {

    /* data this function needs:
    {
      name,
      telephone,
      address,
      description,  
      vaccineRequirement (type:object),
      deletePhotos:[id],
      addPhotos:[{roomTypeID,path,icon(t/f)}]
    }

    on success, sends back {status:'success', conversationID: id}
  */

  var db=req.db;

  //update hotel table
  let query=db('hotel').update({ 
    name: req.body.name,
    telephone: req.body.telephone, 
    address: req.body.address, 
    description: req.body.description,
    vaccineRequirement:JSON.stringify(req.body.vaccineRequirement)
  }).where('id',req.user.id)

  
  //update hotel table
  query.then((rows)=>{

    if((!req.body.addPhotos || req.body.addPhotos.length==0) && (!req.body.deletePhotos || req.body.deletePhotos.length==0)){

      res.send({status:'success, updated hotel table'});

    }else{

      //only add photos to table  
      if (req.body.addPhotos && req.body.addPhotos.length>0 && (!req.body.deletePhotos || req.body.deletePhotos.length==0)){
        let photoArray=req.body.addPhotos.map((current,index,array)=>{
          current.hotelID=req.user.id;
          return current
          })
        let query2=db.insert(photoArray).into('photo')
        query2.then(()=>{
  
          res.send({status:'success, updated hotel table, added photos'});
  
        //catch add photo error
        }).catch((error)=>{
          console.log(error);
          res.status(500).send({error:'cannot add hotel photo'})
        });
      }

      //only delete photo
      if (req.body.deletePhotos && req.body.deletePhotos.length>0 && (!req.body.addPhotos || req.body.addPhotos.length==0)){
        let query3=db('photo').whereIn('id', req.body.deletePhotos).delete() ;      
        query3.then(()=>{
  
        res.send({status:'success, updated hotel table, deleted photos'});
  
        //catch add photo error
        }).catch((error)=>{
          console.log(error);
          res.status(500).send({error:'cannot delete hotel photo'})
        });
      }

      //both delete and add
      if(req.body.addPhotos && req.body.addPhotos.length>0 && req.body.deletePhotos && req.body.deletePhotos.length>0){
        let photoArray=req.body.addPhotos.map((current,index,array)=>{
          current.hotelID=req.user.id;
          return current
          })
        let query2=db.insert(photoArray).into('photo')
        query2.then(()=>{
          let query3=db('photo').whereIn('id', req.body.deletePhotos).delete() ;      
          query3.then(()=>{
  
            res.send({status:'success, updated hotel table, added photos and deleted photos'});
      
            //catch add photo error
            }).catch((error)=>{
              console.log(error);
              res.status(500).send({error:'cannot delete hotel photo'})
            });
  
  
        //catch add photo error
        }).catch((error)=>{
          console.log(error);
          res.status(500).send({error:'cannot add hotel photo'})
        });

      }

  }
            
  //catch hotel table error
  }).catch((error)=>{
    console.log(error);
    res.status(500).send({error:'cannot update hotel table'})
  });


})


// 7. Post request to upload photo

// Firebase setup
const keyFilename=`./routes/${process.env.FIREBASE_PROJECT_ID}-firebase-adminsdk-sv26r-58c3eb3fa2.json`;
const projectId = process.env.FIREBASE_PROJECT_ID
const bucketName = `${projectId}.appspot.com`;

const storage = new Storage({
  projectId: projectId,
  keyFilename: keyFilename
});

router.use(fileUpload())

// handle post request
router.post('/uploadPhoto', async (req, res) => {
  let uploadFile = req.files.file
  const fileName = req.files.file.name

  uploadFile.mv(
    `${__dirname}/../uploadTem/${fileName}`,
    (err) => {
      if (err) {
        return res.status(500).send(err)
      }
      res.json({
        file: `uploadTem/${fileName}`,
      })
    },
  )

  await storage.bucket(bucketName).upload(`${__dirname}/../uploadTem/${fileName}`, {
      gzip: true,
      metadata: {
      // Enable long-lived HTTP caching headers
      // Use only if the contents of the file will never change
      // (If the contents will change, use cacheControl: 'no-cache')
      cacheControl: 'public, max-age=31536000',
      },
    })
    .then((data) => {
      console.log(`fileName: `,fileName);
      console.log(`media link: https://firebasestorage.googleapis.com/v0/b/${projectId}.appspot.com/o/${fileName}?alt=media`);
    })

  fs.unlinkSync(`${__dirname}/../uploadTem/${fileName}`)
  
  console.log(`${fileName} uploaded to ${bucketName}.`);
})


// 8. Post request to upload photo

router.put('/deletePhoto', async (req, res) => {
  const file = storage.bucket(bucketName).file(req.body.fileName);
  file.delete((err, response) => {
    if (err) { 
      console.log(`Error: `,err); 
      res.sendStatus(500);
    }
    res.sendStatus(200)
  })
})



module.exports = router;