const express = require('express');
const router = express.Router();

router.post('/', async (req, res, next) => {

  let db = req.db;

  let dayArray = [];
  let allRoom = [];
  let eachDayBookingArray = []

  let startDay = new Date(req.body.startDate);
  let endDay = new Date(req.body.endDate);

  console.log('searchReceived')

  //get all room
  await db.select("	additionalPrice	"	,
  "	address	"	,
  "	app	"	,
  "	availablePeriod	"	,
  "	averageRating	"	,
  "	hotel.description	"	,
  "	district	"	,
  "	email	"	,
  "	facilities	"	,
  "	hotel.id AS hotelID	"	,
  "	roomType.id AS roomTypeID	"	,
  "	latitude	"	,
  "	longitude	"	,
  "	name	"	,
  "	partnershipType	"	,
  "	password	"	,
  "	price	"	,
  "	quantity	"	,
  "	requirement	"	,
  "	roomType	"	,
  "	telephone	"	,
  "	vaccineRequirement	"	,
  "photo.path AS photo"
  )
  .from("roomType")
  .innerJoin("hotel", "roomType.hotelID","hotel.id")
  .innerJoin("photo","photo.hotelID", "hotel.id").whereNull("photo.roomTypeID")
  .where((queryBuilder)=>{
    if (req.body.district != "all"){
      queryBuilder.where("district", req.body.district)
    }
  })
  .where((queryBuilder2)=>{
    if (req.body.petType != "all"){
      queryBuilder2.whereRaw("requirement ->> 'pet' = ?", [req.body.petType]) 
    }
  })
  .then((rows) => {
    allRoom = [...rows]
    console.log('First allRoom: ',allRoom.length)
  })

  //get days between searched start day and end day, pushed in an array 
  while (startDay.getDate() <= endDay.getDate()) {
    dayArray.push(new Date(startDay));
    startDay.setDate(startDay.getDate() + 1)
  }

  //get occupied room for each day
let promise = new Promise((resolve,reject)=>{
 dayArray.map((day) => {
    let formattedDay = day.toISOString().split('T')[0];
    let query2 = db.select("*").from("hotel")
      .where("district", req.body.district)
      .innerJoin("roomType", 'hotel.id', "roomType.hotelID") //match roomtype with hotel
      .innerJoin('booking', function () {
        this.on("booking.hotelID", "hotel.id").on('booking.roomTypeID', "roomType.id")
      })
      .where(function () {
        this.where("booking.endDate", '>=', formattedDay)
          .andWhere("booking.startDate", '<=', formattedDay)
      })
      .then((rows) => {
      rows.map((row) => {
        eachDayBookingArray.push(row)
      })

      if (allRoom.length > 0){
      allRoom.some((room, index) => {
        let count = 0;
        for (let i = 0; i < eachDayBookingArray.length; i++) {
          if (room.roomTypeID == eachDayBookingArray[i].roomTypeID) {
            console.log('add count' + room.roomTypeID)
            count++
          }
        } // end of count loop      
        if (count >= room.quantity) {
          allRoom = allRoom.filter(checkRoom => checkRoom.roomTypeID !== room.roomTypeID) //filter all unavilable room
        }
        if (
          (day == dayArray[dayArray.length -1] && index +1 == allRoom.length)
          || (allRoom.length == 0)
          )
        {
          resolve('success');
          return true
         }   
      })//end of all Room
    } else {resolve('no room')}
            
    }) //end of query.then 
  }) //end of dayArray Map filterJob
    
}) //promise

promise.then((result)=>{console.log(result)
  res.send(allRoom)})
 
}); //end of all req.post


module.exports = router;