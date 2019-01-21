var express = require('express');
var router = express.Router();

/* All APIs
1. Get all hotel information with only one icon photo for display in home page/ search result
2. Get information and photo of one hotel based on params.hotelid (redirected from homepage)
3. Post request to get information, photo and availability of one hotel (redirected from search) **
4. Put request to edit information of hotel **
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
  let query=db.select("hotel.*","photo.path").from("hotel").innerJoin("photo","hotel.id","photo.hotelID").whereNull("photo.roomTypeID")
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

// 4. Put request to edit information of hotel 




module.exports = router;