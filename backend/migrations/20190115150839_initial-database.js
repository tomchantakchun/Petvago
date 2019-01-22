
exports.up = function(knex, Promise) {
    return knex.schema

      .createTable('users',(table)=>{
        table.increments();
        table.string('username');
        table.string('password');
        table.integer('telephone');
        table.string('email');
        table.string('loginMethod');
        table.unique(['username' , 'email', 'telephone']);
        table.timestamps(false,true);
      })

      .createTable('hotel',(table)=>{
        table.increments();
        table.string('name');
        table.string('address');
        table.string('description');
        table.integer('telephone');
        table.string('username');
        table.string('password');
        table.string('email');
        table.json('vaccineRequirement');
        table.json('facilities');
        table.enu('partnershipType',['paid','nonpaid']);
        table.enu('app',['yes','no']);
        table.decimal('averageRating');
        table.integer('availablePeriod');
        table.unique(['name','username' , 'email', 'telephone','address']);
        table.timestamps(false,true);
      })

      .createTable('roomType',(table)=>{
        table.increments();
        table.integer('hotelID');
        table.foreign('hotelID').references('hotel.id');
        table.string('roomType');
        table.decimal('price');
        table.string('description');
        table.json('requirement');
        table.json('additionalPrice');
        // table.json('availabilityStatusTable');
        table.timestamps(false,true);
      })

      // .createTable('roomAvailability',(table)=>{
      //   table.increments();
      //   table.integer('roomTypeID');
      //   table.foreign('roomTypeID').references('roomType.id');
      //   table.date('bookedDate');
      //   table.enu('status',['taken','available','hold']);
      //   table.timestamps(false,true);
      // })

      .createTable('photo',(table)=>{
        table.increments();
        table.integer('hotelID');
        table.foreign('hotelID').references('hotel.id');
        table.integer('roomTypeID');
        table.foreign('roomTypeID').references('roomType.id');
        table.boolean('icon');
        table.string('path');
        table.timestamps(false,true);
      })

      .createTable('service',(table)=>{
        table.increments();
        table.integer('hotelID');
        table.foreign('hotelID').references('hotel.id');
        table.string('serviceType');
        table.decimal('price');
        table.string('description');
        table.enu('petType',['cat','dog']);
        table.timestamps(false,true);
      })

      .createTable('booking',(table)=>{
        table.increments();
        table.integer('userID');
        table.foreign('userID').references('users.id');
        table.integer('hotelID');
        table.foreign('hotelID').references('hotel.id');
        table.integer('roomTypeID');
        table.foreign('roomTypeID').references('roomType.id');
        table.date('expiryTime');
        table.date('startDate');
        table.date('endDate');
        table.integer('duration');
        table.json('service');
        table.decimal('totalPrice');
        table.enu('status',['confirming','expired','confirmed','past','requested','cancelled']);
        table.timestamps(false,true);
      })

      .createTable('review',(table)=>{
        table.increments();
        table.integer('userID');
        table.foreign('userID').references('users.id');
        table.integer('hotelID');
        table.foreign('hotelID').references('hotel.id');
        table.integer('bookingID');
        table.foreign('bookingID').references('booking.id');
        table.integer('rating');
        table.string('comment');
        table.timestamps(false,true);
      })

      .createTable('conversation',(table)=>{
        table.increments();
        table.integer('userID');
        table.foreign('userID').references('users.id');
        table.integer('hotelID');
        table.foreign('hotelID').references('hotel.id');
        table.timestamps(false,true);
      })

      .createTable('message',(table)=>{
        table.increments();
        table.integer('conversationID');
        table.foreign('conversationID').references('conversation.id');
        table.integer('authorID');
        table.string('body');
        table.enu('type',['text','photo']);
        table.timestamps(false,true);
      })
  
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('message').dropTable('conversation').dropTable('review').dropTable('booking').dropTable('service').dropTable('photo').dropTable('roomType').dropTable('hotel').dropTable('users');
};
