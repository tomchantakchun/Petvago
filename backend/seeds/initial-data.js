
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
    console.log('delete roomType')
    return knex('roomType').del()
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
        {name:'Dogotel & Spa',address:'G/F. & Cockloft, 21 Yik Yam Street, Happy Valley',description:'It all began with our first shop in 2002 featuring services that were not available elsewhere in HK. This quickly established itself as the leading example in K9 care, raising standards for the whole pet-care industry.', telephone:27110051, username: 'partner1', password: '$2a$10$6b0WmWeZDCmcVrCSI6wN7uYqkl4rcqt6N8.I5WF6VCPc/ApCkQmSa', email:'partner1@demo.com',vaccineRequirement:{vaccine:['DHPPiL','Rabies','Kennel Cough']}, facilities:{swimmingPool:false, airConditioner:true, blanket:true, playTime:true}, partnershipType:'paid', app:'yes', averageRating:4.2,peopleRated:10, availablePeriod:6, latitude:22.269193, longitude:114.184680, district:'Wan Chai'},
        {name:'Pet Pet Planet',address:'Shop 7b, G/f., 211 - 213a Sai Yeung Choi Street North, Prince Edward',description:'Our experienced staff provide expert advice, vet and quarantine assistance & safe international pet moving services. Talk with staff today.', telephone:26095882, username: 'partner2', password: '$2a$10$DRtoXx4NZeqaF8sIiq9/Q.HteUtP7AzVCu7dVGUwMEItka.5bSgu6', email:'partner2@demo.com',vaccineRequirement:{vaccine:['DHPPiL','Rabies']}, facilities:{swimmingPool:false, airConditioner:true, blanket:true, playTime:false}, partnershipType:'paid', app:'no', averageRating:3.9, peopleRated:10, availablePeriod:2, latitude:22.327285, longitude:114.167993, district:'Yau Tsim Mong'},
        {name:'Posh Paws Resort',address:'No.169B Tai Tong Road, Hung Cho Tin Tsuen, Yuen Long',description:'Safe clean and fun boarding, grooming, and daycare is our mission.', telephone:29474001,  email:'partner3@demo.com',vaccineRequirement:{vaccine:['DHPPiL','Rabies','Kennel Cough']}, facilities:{swimmingPool:true, airConditioner:true, blanket:true, playTime:true}, partnershipType:'nonpaid', app:'no', averageRating:3.3, peopleRated:5, availablePeriod:6, latitude:22.423431, longitude:114.031928, district:'Yuen Long'},
        //new
        {name:'Doggyland Kennel Limited',address:'Rm 6, 3/F, Kin Wing Industrial Building, 33 Kin Wing Street, Tuen Mun, NT',description:'Safe clean and fun boarding, grooming, and daycare is our mission.', telephone:69094444,  email:'partner4@demo.com',vaccineRequirement:{vaccine:['DHPPiL','Rabies','Kennel Cough']}, facilities:{swimmingPool:true, airConditioner:true, blanket:true, playTime:true}, partnershipType:'nonpaid', app:'no', averageRating:2.3, peopleRated:8, availablePeriod:6, latitude:22.423431, longitude:114.031928, district:'Tuen Mun'},
        {name:'Hong Kong Canine Working and Agility Club',address:'Lot No 3265 SA, DD91 52 On Po Village, Sheung Shui',description:'Safe clean and fun boarding, grooming, and daycare is our mission.', telephone:65103333,  email:'partner5@demo.com',vaccineRequirement:{vaccine:['DHPPiL','Rabies']}, facilities:{swimmingPool:true, airConditioner:true, blanket:true, playTime:true}, partnershipType:'nonpaid', app:'no', averageRating:3.4, peopleRated:8, availablePeriod:6, latitude:22.423431, longitude:114.031928, district:'North'},
        {name:'Honey Pet Limited',address:'No. 30 Shek Wu Tong Tsuen, Kam Sheung Road, Pat Heung, Yuen Long',description:'Safe clean and fun boarding, grooming, and daycare is our mission.', telephone:97708866,  email:'partner6@demo.com',vaccineRequirement:{vaccine:['DHPPiL','Rabies']}, facilities:{swimmingPool:true, airConditioner:true, blanket:true, playTime:true}, partnershipType:'nonpaid', app:'no', averageRating:4.4, peopleRated:8, availablePeriod:6, latitude:22.423431, longitude:114.031928, district:'Yuen Long'}
      ]);
    }).then(function () {
      console.log('create roomType')
      return knex('roomType').insert([
        {hotelID:1, roomType:'Duluxe Room', price:480, description: 'This room provides our boarding pet guests with the highest quality of comfort and care.', requirement: {minWeight:5, maxWeight:15, numberOfPet:1,pet:'dog'}, additionalPrice:{Christmas:100}, quantity: 1},
        {hotelID:1, roomType:'Superior Room', price:680, description: 'This room provides our boarding pet guests with the highest quality of comfort and care.', requirement: {minWeight:15, maxWeight:40, numberOfPet:1,pet:'dog'}, additionalPrice:{Christmas:100}, quantity: 1},
        {hotelID:1, roomType:'Family Room', price:880, description: 'This room fits 3 dogs in 100ft room with air-conditioner.', requirement: {minWeight:5, maxWeight:45, numberOfPet:3,pet:'dog'}, additionalPrice:{Christmas:300}, quantity: 1},
        {hotelID:2, roomType:'Purin Room', price:999, description: 'Only for Pompompurin and his friends.', requirement: {minWeight:5, maxWeight:45, numberOfPet:3,pet:'dog'}, additionalPrice:{Christmas:300}, quantity: 1},
        {hotelID:3, roomType:'Small cat Room', price:220, description: 'This room fits 1 cat in 100ft room with air-conditioner.', requirement: {minWeight:5, maxWeight:10, numberOfPet:1,pet:'cat'}, additionalPrice:{ChineseNewYear:50}, quantity: 1},
        {hotelID:3, roomType:'Big cat Room', price:420, description: 'This room fits 1 cat in 100ft room with air-conditioner.', requirement: {minWeight:10, maxWeight:20, numberOfPet:1,pet:'cat'}, additionalPrice:{ChineseNewYear:100}, quantity: 1},
        //new
        {hotelID:4, roomType:'small dog Room', price:200, description: 'This room fits 1 dog in 100ft room with air-conditioner.', requirement: {minWeight:5, maxWeight:10, numberOfPet:1,pet:'dog'}, additionalPrice:{ChineseNewYear:100}, quantity: 1},
        {hotelID:4, roomType:'big dog Room', price:800, description: 'This room fits 1 dog in 100ft room with air-conditioner.', requirement: {minWeight:11, maxWeight:20, numberOfPet:1,pet:'dog'}, additionalPrice:{ChineseNewYear:100}, quantity: 1},
        {hotelID:5, roomType:'Small cat Room', price:220, description: 'This room fits 1 cat in 100ft room with air-conditioner.', requirement: {minWeight:5, maxWeight:10, numberOfPet:1,pet:'cat'}, additionalPrice:{ChineseNewYear:50}, quantity: 1},
        {hotelID:5, roomType:'Big cat Room', price:420, description: 'This room fits 1 cat in 100ft room with air-conditioner.', requirement: {minWeight:10, maxWeight:20, numberOfPet:1,pet:'cat'}, additionalPrice:{ChineseNewYear:100}, quantity: 1},
        {hotelID:6, roomType:'Small cat Room', price:220, description: 'This room fits 1 cat in 100ft room with air-conditioner.', requirement: {minWeight:5, maxWeight:10, numberOfPet:1,pet:'cat'}, additionalPrice:{ChineseNewYear:50}, quantity: 1},
        {hotelID:6, roomType:'Big cat Room', price:420, description: 'This room fits 1 cat in 100ft room with air-conditioner.', requirement: {minWeight:10, maxWeight:20, numberOfPet:1,pet:'cat'}, additionalPrice:{ChineseNewYear:100}, quantity: 1}
      ]);
    }) 
    .then(function () {
      console.log('create photo')
      return knex('photo').insert([
        {hotelID:1, icon:true, path:'https://firebasestorage.googleapis.com/v0/b/petvago-6b2c9.appspot.com/o/Sample%2Fcocomomo-300x226.png?alt=media&token=cf9834fb-fd89-4dfe-a985-b5e48ed5a8a6'},
        {hotelID:1, roomTypeID:'1',icon:true, path:'https://firebasestorage.googleapis.com/v0/b/petvago-6b2c9.appspot.com/o/Sample%2Fdog-furnace.jpg?alt=media&token=8f465711-a9e3-46d2-b9fb-f70a9497a408'},
        {hotelID:1, roomTypeID:'1',icon:false, path:'https://firebasestorage.googleapis.com/v0/b/petvago-6b2c9.appspot.com/o/Sample%2Fhotel-icon.jpg?alt=media&token=d9ad6d60-6ae4-4917-bd13-f23ea097229a'},
        {hotelID:1, roomTypeID:'1',icon:false, path:'https://firebasestorage.googleapis.com/v0/b/petvago-6b2c9.appspot.com/o/Sample%2Fjet-palace.jpg?alt=media&token=e470030f-aec6-4dbd-aa82-e9ce6a89b536'},
        {hotelID:1, roomTypeID:'2',icon:true, path:'https://firebasestorage.googleapis.com/v0/b/petvago-6b2c9.appspot.com/o/Sample%2Fking-suite.jpg?alt=media&token=d2bd53b3-73d3-43c5-ae93-f2dbf2193f3f'},
        {hotelID:2, icon:true, path:'https://firebasestorage.googleapis.com/v0/b/petvago-6b2c9.appspot.com/o/Sample%2FMason%20Hadley%20MA0177-L.jpg?alt=media&token=63410dfd-9ae4-406b-863b-373cd3db16ff'},
        {hotelID:3, icon:true, path:'https://firebasestorage.googleapis.com/v0/b/petvago-6b2c9.appspot.com/o/Sample%2Fpet-hotel-sample-1.jpg?alt=media&token=2244dfca-5eb5-461c-8e6c-a4fc60139305'},
                //new
        {hotelID:4, icon:true, path:'https://firebasestorage.googleapis.com/v0/b/petvago-6b2c9.appspot.com/o/Sample%2Fpet-hotel-sample-10.jpeg?alt=media&token=bb730a92-036a-4228-8678-c9bf8588a3b3'},
        {hotelID:5, icon:true, path:'https://firebasestorage.googleapis.com/v0/b/petvago-6b2c9.appspot.com/o/Sample%2Fpet-hotel-sample-2.jpg?alt=media&token=e4c3df44-1e39-4dde-83fd-d005b354da12'},
        {hotelID:6, icon:true, path:'https://firebasestorage.googleapis.com/v0/b/petvago-6b2c9.appspot.com/o/Sample%2Fpet-hotel-sample-3.jpg?alt=media&token=ec7c46db-49b1-4692-93a9-94583fe44c0c'},
      ]);
    }).then(function () {
      console.log('create service')
      return knex('service').insert([
        {hotelID:1, serviceType:'Bath', price:200, description:'30-minutes warm water bath with nail trims',petType:'dog'},
        {hotelID:1, serviceType:'Grooming', price:350, description:'Pamper your pet with our professional pet grooming service',petType:'dog'},
        {hotelID:1, serviceType:'Obedience training', price:600, description:'Professional trainers give teaching basic commands.',petType:'dog'},
        {hotelID:2, serviceType:'Bath', price:200, description:'30-minutes warm water bath with nail trims',petType:'dog'},
        {hotelID:3, serviceType:'Grooming', price:350, description:'Pamper your pet with our professional pet grooming service',petType:'dog'},
        //new
        {hotelID:4, serviceType:'Obedience training', price:600, description:'Professional trainers give teaching basic commands.',petType:'cat'},
        {hotelID:5, serviceType:'Grooming', price:350, description:'Pamper your pet with our professional pet grooming service',petType:'dog'},
        {hotelID:6, serviceType:'Grooming', price:350, description:'Pamper your pet with our professional pet grooming service',petType:'cat'},
      ]);
    }).then(function () {
      console.log('create booking')
      return knex('booking').insert([
        {userID:1, hotelID:1, roomTypeID:1, expiryTime:'2018-01-07T08:36:00',startDate:'2019-2-5', endDate:'2019-2-7',duration:3,service:{Bath:1,['Obedience training']:2},totalPrice:1200,status:'confirmed',ownerName:'Katy Chan',ownerPhone:91234567,petName:'Pooh',petWeight:15,petType:'dog',vaccineRequirement:{vaccine:['DHPPiL','Rabies','Kennel Cough']}},
        {userID:1, hotelID:1, roomTypeID:2, expiryTime:'2018-01-07T08:36:00',startDate:'2018-2-7', endDate:'2018-2-8',duration:2,service:{Bath:1,['Obedience training']:2},totalPrice:1200,status:'confirmed',ownerName:'Katy Chan',ownerPhone:91234567,petName:'Pooh',petWeight:15,petType:'dog',vaccineRequirement:{vaccine:['DHPPiL','Rabies','Kennel Cough']}},
        {userID:1, hotelID:1, roomTypeID:3, expiryTime:'2018-01-07T08:36:00',startDate:'2019-2-7', endDate:'2019-2-12',duration:6,service:{Bath:1,['Obedience training']:2},totalPrice:1200,status:'confirmed',ownerName:'Katy Chan',ownerPhone:91234567,petName:'Pooh',petWeight:15,petType:'dog',vaccineRequirement:{vaccine:['DHPPiL','Rabies','Kennel Cough']}},
        {userID:2, hotelID:2, roomTypeID:1, expiryTime:'2018-01-07T08:36:00',startDate:'2019-2-5', endDate:'2019-2-7',duration:3,service:{Bath:1,['Obedience training']:2},totalPrice:1200,status:'confirmed',ownerName:'Peter Lam',ownerPhone:91234567,petName:'Blackie',petWeight:15,petType:'dog',vaccineRequirement:{vaccine:['DHPPiL','Rabies','Kennel Cough']}},
        {userID:2, hotelID:3, roomTypeID:1, expiryTime:'2018-01-25T08:36:00',startDate:'2019-1-17', endDate:'2019-1-25',duration:9,service:{Bath:1,['Obedience training']:2},totalPrice:1200,status:'confirmed',ownerName:'Peter Lam',ownerPhone:91234567,petName:'Blackie',petWeight:15,petType:'dog',vaccineRequirement:{vaccine:['DHPPiL','Rabies','Kennel Cough']}},
        {userID:1, hotelID:4, roomTypeID:8, expiryTime:'2018-01-07T08:36:00',startDate:'2019-2-5', endDate:'2019-2-7',duration:3,service:{Bath:1,['Obedience training']:2},totalPrice:1200,status:'past',ownerName:'Katy Chan',ownerPhone:91234567,petName:'Pooh',petWeight:15,petType:'dog',vaccineRequirement:{vaccine:['DHPPiL','Rabies','Kennel Cough']}},
        {userID:1, hotelID:5, roomTypeID:10, expiryTime:'2018-01-07T08:36:00',startDate:'2018-2-5', endDate:'2018-2-7',duration:3,service:{Bath:1,['Obedience training']:2},totalPrice:1200,status:'confirmed',ownerName:'Katy Chan',ownerPhone:91234567,petName:'Pooh',petWeight:15,petType:'dog',vaccineRequirement:{vaccine:['DHPPiL','Rabies','Kennel Cough']}},
        {userID:1, hotelID:5, roomTypeID:9, expiryTime:'2018-01-07T08:36:00',startDate:'2019-2-5', endDate:'2019-2-7',duration:3,service:{Bath:1,['Obedience training']:2},totalPrice:1200,status:'confirmed',ownerName:'Tom Chan',ownerPhone:93290902,petName:'Purin',petWeight:15,petType:'dog',vaccineRequirement:{vaccine:['DHPPiL','Rabies','Kennel Cough']}},
      ]);
    }).then(function () {
      console.log('create review')
      return knex('review').insert([
        {userID:1, hotelID:1, bookingID:7, rating:4,comment:'Great experience. My dog had a good time at the hotel. I wish they can give my dog my play time'},
        {userID:1, hotelID:2, bookingID:2, rating:3, comment:'My dog was returned to me in perfect condition.'},
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
