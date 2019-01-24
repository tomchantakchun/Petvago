const express = require('express');
const router = express.Router();

router.post('/', function (req, res, next) {

  let db = req.db;

  let dayArray = [];

  let startDay = new Date(req.body.startDate);
  let endDay = new Date(req.body.endDate);

  //get all room
  let query2 = db.select("id", "quantity", "hotelID").from("roomType")
  query2.then((rows) => {
    allRoom = [...rows]
  })

  //get days between searched start day and end day, pushed in an array 
  while (startDay.getDate() <= endDay.getDate()) {
    dayArray.push(new Date(startDay));
    startDay.setDate(startDay.getDate() + 1)
  }

  //get occupied room for each day
  var promise1 = dayArray.map((day) => {
    let formattedDay = day.toISOString().split('T')[0];
    let query = db.select("*").from("hotel")
      .where("district", req.body.district)
      .innerJoin("roomType", 'hotel.id', "roomType.hotelID") //match roomtype with hotel
      .innerJoin('booking', function () {
        this
          .on("hotel.id", "booking.hotelID").on("roomType.id", 'booking.roomTypeID')
      })
      .where(function () {
        this.where("booking.endDate", '>=', formattedDay)
          .andWhere("booking.startDate", '<=', formattedDay)
      })

    query.then((rows) => {
      let eachDayBookingArray = []

      rows.map((row) => {
        eachDayBookingArray.push(row)
      })

      allRoom.map((room) => {
        let count = 0;
        for (let i = 0; i < eachDayBookingArray.length; i++) {
          if (room.id == eachDayBookingArray[i].roomTypeID) {
            console.log('add count' + room.id)
            count++
          }
        } // end of count loop      
        if (count >= room.quantity) {
          allRoom = allRoom.filter(checkRoom => checkRoom.id !== room.id)
        }

      })//end of all Room
      

    }) //end of query.then
   
  }) //end of dayArray Map

  Promise.all([promise1]).then(console.log(allRoom))

}); //end of all req.post


module.exports = router;