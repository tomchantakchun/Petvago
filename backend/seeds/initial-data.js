
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  console.log('delete roomAvailability')
  return knex('roomAvailability').del()
    .then(function(){
      console.log('delete roomType')
      return knex('roomType').del()
    })
    .then(function(){
      console.log('delete hotel')
      return knex('hotel').del()
    })
    .then(function(){
      console.log('delete user')
    return knex('user').del()
    }).then(function () {
      console.log('create user')
      return knex('user').insert([
        {username: 'customer1', password: '12345678', telephone:91700000, email:'customer1@demo.com'},
        {username: 'customer2', password: '12345678', telephone:91700001, email:'customer2@demo.com'},

        {username: 'partner1', password: '12345678', telephone:21700000, email:'partner1@demo.com'},
        {username: 'partner2', password: '12345678', telephone:21700001, email:'partner2@demo.com'},
        {username: 'partner3', password: '12345678', telephone:21700002, email:'partner3@demo.com'},
      ]);
    }).then(function () {
      console.log('create hotel')
      return knex('hotel').insert([
        {name:'Dogotel & Spa',address:'G/F. & Cockloft, 21 Yik Yam Street, Happy Valley',description:'It all began with our first shop in 2002 featuring services that were not available elsewhere in HK. This quickly established itself as the leading example in K9 care, raising standards for the whole pet-care industry.', telephone:27110051, username: 'partner1', password: '12345678', email:'partner1@demo.com',vaccineRequirement:{vaccine:['DHPPiL','Rabies','Kennel Cough']}, facilities:{swimmingPool:false, airConditioner:true, blanket:true, playTime:true}, partnershipType:'paid', app:'yes', averageRating:4.2, availablePeriod:6},
        {name:'Pet Pet Planet',address:'Shop 7b, G/f., 211 - 213a Sai Yeung Choi Street North, Prince Edward',description:'Our experienced staff provide expert advice, vet and quarantine assistance & safe international pet moving services. Talk with staff today.', telephone:26095882, username: 'partner2', password: '12345678', email:'partner2@demo.com',vaccineRequirement:{vaccine:['DHPPiL','Rabies']}, facilities:{swimmingPool:false, airConditioner:true, blanket:true, playTime:false}, partnershipType:'paid', app:'no', averageRating:3.9, availablePeriod:2},
        {name:'Posh Paws Resort',address:'No.169B Tai Tong Road, Hung Cho Tin Tsuen, Yuen Long',description:'Safe clean and fun boarding, grooming, and daycare is our mission.', telephone:29474001,  email:'partner3@demo.com',vaccineRequirement:{vaccine:['DHPPiL','Rabies','Kennel Cough']}, facilities:{swimmingPool:true, airConditioner:true, blanket:true, playTime:true}, partnershipType:'nonpaid', app:'no', averageRating:3.3},
      ]);
    }).then(function () {
      console.log('create roomType')
      return knex('roomType').insert([
        {hotelID:1, roomType:'Duluxe Room', price:480, description: 'This room provides our boarding pet guests with the highest quality of comfort and care.', requirement: {minWeight:5, maxWeight:15, numberOfPet:1,pet:'dog'}, additionalPrice:{Christmas:100}},
        {hotelID:1, roomType:'Superior Room', price:680, description: 'This room provides our boarding pet guests with the highest quality of comfort and care.', requirement: {minWeight:15, maxWeight:40, numberOfPet:1,pet:'dog'}, additionalPrice:{Christmas:100}},
        {hotelID:1, roomType:'Family Room', price:880, description: 'This room fits 3 dogs in 100ft room with air-conditioner.', requirement: {minWeight:5, maxWeight:45, numberOfPet:3,pet:'dog'}, additionalPrice:{Christmas:300}},
        {hotelID:2, roomType:'Small cat Room', price:220, description: 'This room fits 1 cat in 100ft room with air-conditioner.', requirement: {minWeight:5, maxWeight:10, numberOfPet:1,pet:'cat'}, additionalPrice:{ChineseNewYear:50}},
        {hotelID:2, roomType:'Big cat Room', price:420, description: 'This room fits 1 cat in 100ft room with air-conditioner.', requirement: {minWeight:10, maxWeight:20, numberOfPet:1,pet:'cat'}, additionalPrice:{ChineseNewYear:100}}
      ]);
    }) .then(function () {
      console.log('create roomAvailability')
      return knex('roomAvailability').insert([
        {roomTypeID:1, bookedDate:'2018-12-16',status:'taken'},
        {roomTypeID:1, bookedDate:'2018-12-17',status:'taken'},
        {roomTypeID:1, bookedDate:'2018-12-18',status:'taken'},


        
      ]);
    })
 
};
