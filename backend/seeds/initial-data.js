
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  console.log('delete photo')
  return knex('photo').del()
  .then(function(){
    console.log('delete conversation')
    knex('conversation').del()
  })
  .then(function(){
    console.log('delete review')
    knex('review').del()
  })
  .then(function(){
    console.log('delete booking')
    knex('booking').del()
  })
  .then(function(){
    console.log('delete service')
    knex('service').del()
  })
  .then(function(){
    console.log('delete photo')
    knex('photo').del()
  })
  .then(function(){
    console.log('delete roomAvailability')
    knex('roomAvailability').del()
  })
    .then(function(){
      console.log('delete roomtype')
      return knex('roomtype').del()
    })
    .then(function(){
      console.log('delete hotel')
      return knex('hotel').del()
    })
    .then(function(){
      console.log('delete users')
    return knex('users').del()
    }).then(function () {
      console.log('create users')
      return knex('users').insert([
        {username: 'customer1', password: '$2b$10$Un1MMdeCMrZy3jHhv3olO.ws0ZGjdraeerfTR7AUJq3osJ1ioApSC', telephone:91700000, email:'customer1@demo.com', loginMethod:'local'},
        {username: 'customer2', password: '$2b$10$djwYpp6NzvAzvjrY5wvQvOJYl.7Cam4Up4YZqptmdV6rXMx9Lc1xC', telephone:91700001, email:'customer2@demo.com', loginMethod:'local'},
        {username: 'partner1', password: '$2b$10$LPc4J4m2WBr28RjI2u0RCe5aM4edd9kxT/Jm448cI1iywEkBtAuFi', telephone:21700000, email:'partner1@demo.com', loginMethod:'local'},
        {username: 'partner2', password: '$2b$10$TRhsghGI2RWLZdW9V8nDAeRYtnlmXU2058n3GVh2/k5AI2n7LdFMi', telephone:21700001, email:'partner2@demo.com', loginMethod:'local'},
        {username: 'partner3', password: '$2b$10$sLL1sbhfc1LBV8AkGIfHg.KAK1yKahBQStmoiQQtMy5TIhnNdsad6', telephone:21700002, email:'partner3@demo.com', loginMethod:'local'},
        {username: 'admin1', password: '$2b$10$OsdCXyH8NRr0D68E.xlV6e7TOdZwOPeHNJgpNaTP9nBYtxzSaGOJC', telephone:21800000, email:'admin1@demo.com', loginMethod:'local'},
      ]);
    }).then(function () {
      console.log('create hotel')
      return knex('hotel').insert([
        {name:'Dogotel & Spa',address:'G/F. & Cockloft, 21 Yik Yam Street, Happy Valley',description:'It all began with our first shop in 2002 featuring services that were not available elsewhere in HK. This quickly established itself as the leading example in K9 care, raising standards for the whole pet-care industry.', telephone:27110051, username: 'partner1', password: '$2a$10$6b0WmWeZDCmcVrCSI6wN7uYqkl4rcqt6N8.I5WF6VCPc/ApCkQmSa', email:'partner1@demo.com',vaccineRequirement:{vaccine:['DHPPiL','Rabies','Kennel Cough']}, facilities:{swimmingPool:false, airConditioner:true, blanket:true, playTime:true}, partnershipType:'paid', app:'yes', averageRating:4.2, availablePeriod:6, latitude:22.269193, longitude:114.184680, district:'Wan Chai'},
        {name:'Pet Pet Planet',address:'Shop 7b, G/f., 211 - 213a Sai Yeung Choi Street North, Prince Edward',description:'Our experienced staff provide expert advice, vet and quarantine assistance & safe international pet moving services. Talk with staff today.', telephone:26095882, username: 'partner2', password: '$2a$10$DRtoXx4NZeqaF8sIiq9/Q.HteUtP7AzVCu7dVGUwMEItka.5bSgu6', email:'partner2@demo.com',vaccineRequirement:{vaccine:['DHPPiL','Rabies']}, facilities:{swimmingPool:false, airConditioner:true, blanket:true, playTime:false}, partnershipType:'paid', app:'no', averageRating:3.9, availablePeriod:2, latitude:22.327285, longitude:114.167993, district:'Yau Tsim Mong'},
        {name:'Posh Paws Resort',address:'No.169B Tai Tong Road, Hung Cho Tin Tsuen, Yuen Long',description:'Safe clean and fun boarding, grooming, and daycare is our mission.', telephone:29474001,  email:'partner3@demo.com',vaccineRequirement:{vaccine:['DHPPiL','Rabies','Kennel Cough']}, facilities:{swimmingPool:true, airConditioner:true, blanket:true, playTime:true}, partnershipType:'nonpaid', app:'no', averageRating:3.3, availablePeriod:6, latitude:22.423431, longitude:114.031928, district:'Yuen Long'},
        {name:'Posh Paws Resort',address:'No.169B Tai Tong Road, Hung Cho Tin Tsuen, Yuen Long',description:'Safe clean and fun boarding, grooming, and daycare is our mission.', telephone:29474001,  email:'partner3@demo.com',vaccineRequirement:{vaccine:['DHPPiL','Rabies','Kennel Cough']}, facilities:{swimmingPool:true, airConditioner:true, blanket:true, playTime:true}, partnershipType:'nonpaid', app:'no', averageRating:3.3, availablePeriod:6, latitude:22.423431, longitude:114.031928, district:'Yuen Long'}
      ]);
    }).then(function () {
      console.log('create roomtype')
      return knex('roomtype').insert([
        {hotelID:1, roomtype:'Duluxe Room', price:480, description: 'This room provides our boarding pet guests with the highest quality of comfort and care.', requirement: {minWeight:5, maxWeight:15, numberOfPet:1,pet:'dog'}, additionalPrice:{Christmas:100}, quantity: 1},
        {hotelID:1, roomtype:'Superior Room', price:680, description: 'This room provides our boarding pet guests with the highest quality of comfort and care.', requirement: {minWeight:15, maxWeight:40, numberOfPet:1,pet:'dog'}, additionalPrice:{Christmas:100}, quantity: 1},
        {hotelID:1, roomtype:'Family Room', price:880, description: 'This room fits 3 dogs in 100ft room with air-conditioner.', requirement: {minWeight:5, maxWeight:45, numberOfPet:3,pet:'dog'}, additionalPrice:{Christmas:300}, quantity: 1},
        {hotelID:3, roomtype:'Small cat Room', price:220, description: 'This room fits 1 cat in 100ft room with air-conditioner.', requirement: {minWeight:5, maxWeight:10, numberOfPet:1,pet:'cat'}, additionalPrice:{ChineseNewYear:50}, quantity: 1},
        {hotelID:3, roomtype:'Big cat Room', price:420, description: 'This room fits 1 cat in 100ft room with air-conditioner.', requirement: {minWeight:10, maxWeight:20, numberOfPet:1,pet:'cat'}, additionalPrice:{ChineseNewYear:100}, quantity: 1}
      ]);
    }) 
    // .then(function () {
    //   console.log('create roomAvailability')
    //   return knex('roomAvailability').insert([
    //     {roomtypeID:1, bookedDate:'2018-12-16',status:'taken'},
    //     {roomtypeID:1, bookedDate:'2018-12-17',status:'taken'},
    //     {roomtypeID:1, bookedDate:'2018-12-18',status:'taken'},
    //     {roomtypeID:1, bookedDate:'2018-2-3',status:'taken'},
    //     {roomtypeID:1, bookedDate:'2018-2-3',status:'taken'},
    //     {roomtypeID:2, bookedDate:'2018-11-5',status:'taken'},
    //     {roomtypeID:2, bookedDate:'2018-11-6',status:'taken'},
    //     {roomtypeID:4, bookedDate:'2018-2-10',status:'taken'},
    //     {roomtypeID:4, bookedDate:'2018-2-11',status:'taken'},
    //     {roomtypeID:4, bookedDate:'2018-2-12',status:'taken'},
    //   ]);
    // })
    .then(function () {
      console.log('create photo')
      return knex('photo').insert([
        {hotelID:1, icon:true, path:'./image/hotel1photo4.jpg'},
        {hotelID:1, roomtypeID:'1',icon:true, path:'./image/hotel1photo2.jpg'},
        {hotelID:1, roomtypeID:'1',icon:false, path:'./image/hotel1photo3.jpg'},
        {hotelID:1, roomtypeID:'1',icon:false, path:'./image/hotel1photo4.jpg'},
        {hotelID:2, icon:true, path:'./image/hotel2photo1.jpg'},
        {hotelID:3, icon:true, path:'./image/hotel3photo1.jpg'},
      ]);
    }).then(function () {
      console.log('create service')
      return knex('service').insert([
        {hotelID:1, serviceType:'Bath', price:200, description:'30-minutes warm water bath with nail trims',petType:'dog'},
        {hotelID:1, serviceType:'Grooming', price:350, description:'Pamper your pet with our professional pet grooming service',petType:'dog'},
        {hotelID:1, serviceType:'Obedience training', price:600, description:'Professional trainers give teaching basic commands.',petType:'dog'},
      ]);
    }).then(function () {
      console.log('create booking')
      return knex('booking').insert([
        {userID:1, hotelID:1, roomtypeID:1, expiryTime:'2018-01-07T08:36:00',startDate:'2018-2-5', endDate:'2018-2-7',duration:3,service:{Bath:1,['Obedience training']:2},totalPrice:1200,status:'past'},
        {userID:2, hotelID:2, roomtypeID:1, expiryTime:'2018-01-07T08:36:00',startDate:'2018-2-5', endDate:'2018-2-7',duration:3,service:{Bath:1,['Obedience training']:2},totalPrice:1200,status:'past'},
        {userID:2, hotelID:3, roomtypeID:1, expiryTime:'2018-01-25T08:36:00',startDate:'2019-1-17', endDate:'2019-1-25',duration:9,service:{Bath:1,['Obedience training']:2},totalPrice:1200,status:'past'}
      ]);
    }).then(function () {
      console.log('create review')
      return knex('review').insert([
        {userID:1, hotelID:1, bookingID:1, rating:4,comment:'Great experience. My dog had a good time at the hotel. I wish they can give my dog my play time'},
        {userID:2, hotelID:2, bookingID:2, rating:3, comment:'My dog was returned to me in perfect condition.'},

      ]);
    }).then(function () {
      console.log('create conversation')
      return knex('conversation').insert([
        {userID:1, hotelID:1},
        {userID:2, hotelID:2},
        {userID:1, hotelID:2},
      ]);
    }).then(function () {
      console.log('create message')
      return knex('message').insert([
        {conversationID:1, authorID:{users:1},body:'Hello',type:'text'},
        {conversationID:2, authorID:{hotel:1},body:'How can I help you?',type:'text'},

      ]);
    })
    
    
 
};
