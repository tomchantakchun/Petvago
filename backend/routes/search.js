const express = require('express');
const router = express.Router();

router.post('/', async (req, res, next) => {

  let db = req.db;

  let dayArray = [];
  let allRoom = [];
  let eachDayBookingArray = []

  let startDay = new Date(req.body.startDate);
  let endDay = new Date(req.body.endDate);



  //get all room
  await db.select("roomType.id", "quantity", "hotelID")
  .from("roomType")
  .leftJoin("hotel", "roomType.hotelID","hotel.id")
  .where("district", req.body.district)
  .then((rows) => {
    allRoom = [...rows]
  })

  // console.log('First allRoom: ',allRoom)

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
        this.on("hotel.id", "booking.hotelID").on("roomType.id", 'booking.roomTypeID')
      })
      .where(function () {
        this.where("booking.endDate", '>=', formattedDay)
          .andWhere("booking.startDate", '<=', formattedDay)
      })
      .then( (rows) => {

      rows.map((row) => {
        eachDayBookingArray.push(row)
      })

      allRoom.map((room, index) => {
        let count = 0;
        for (let i = 0; i < eachDayBookingArray.length; i++) {
          if (room.id == eachDayBookingArray[i].roomTypeID) {
            console.log('add count' + room.id)
            count++
          }
        } // end of count loop      
        if (count >= room.quantity) {
          allRoom = allRoom.filter(checkRoom => checkRoom.id !== room.id) //filter all unavilable room
        }
        console.log('index',index)
        console.log('room',allRoom.length)
        console.log('day', day)
        console.log('dayArray',  dayArray[dayArray.length -1])
        if (
          (day == dayArray[dayArray.length -1] && index +1 == allRoom.length)
          || (allRoom.length == 0)
          )
        {
          resolve('success');
         }   
      })//end of all Room
            console.log('allRoomfilter',allRoom, day)
    }) //end of query.then 
  }) //end of dayArray Map filterJob
    
}) //promise

promise.then((result)=>{console.log(result)
  res.send(allRoom)})
 
}); //end of all req.post


module.exports = router;