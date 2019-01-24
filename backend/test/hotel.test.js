const enzyme = require('enzyme');
const axios = require('axios');
require('dotenv').config();

describe('Hotel backend test', () => {
    it('Get hotel edit info', async () => {
    //jwt of partner1
        const jwt = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJwYXJ0bmVyMSIsImlzSG90ZWwiOnRydWV9.QtkreWj8q4OD--qbCJNa68jQlZ0vhtZFtl0cOeQzNAk';

        await axios.get(`http://localhost:8080/api/hotel/edit/info` ,{ headers: { Authorization: `Bearer ${jwt}` } })
        .then(response => {
            expect(response.data.length).toBe(1);
        }).catch((err)=>{
            console.log(err)
        })

    });

    it('Hotel update info', async () => {
       //jwt of partner1
         const jwt = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJwYXJ0bmVyMSIsImlzSG90ZWwiOnRydWV9.QtkreWj8q4OD--qbCJNa68jQlZ0vhtZFtl0cOeQzNAk';

         let data=  {
            name:'Dogotel & Spa',
            telephone:27110051,
            address:'G/F. & Cockloft, 21 Yik Yam Street, Happy Valley',
            description:'It all began with our first shop in 2002 featuring services that were not available elsewhere in HK. This quickly established itself as the leading example in K9 care, raising standards for the whole pet-care industry.',  
            vaccineRequirement:{vaccine:['DHPPiL','Rabies','Kennel Cough']},
          };

        await axios.put(`http://localhost:8080/api/hotel/edit/submit`, data ,{ headers: { Authorization: `Bearer ${jwt}` } })
        .then(response => {
            expect(response.data.status).toBe('success, updated hotel table');
        }).catch((err)=>{
            console.log(err)
        })

        })

    it('Hotel edit add photo', async () => {
        //jwt of partner1
            const jwt = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJwYXJ0bmVyMSIsImlzSG90ZWwiOnRydWV9.QtkreWj8q4OD--qbCJNa68jQlZ0vhtZFtl0cOeQzNAk';
    
            let data=  {
                name:'Dogotel & Spa',
                telephone:27110051,
                address:'G/F. & Cockloft, 21 Yik Yam Street, Happy Valley',
                description:'It all began with our first shop in 2002 featuring services that were not available elsewhere in HK. This quickly established itself as the leading example in K9 care, raising standards for the whole pet-care industry.',  
                vaccineRequirement:{vaccine:['DHPPiL','Rabies','Kennel Cough']},
                addPhotos:[
                    {roomTypeID:2,path:'a.jpg',icon:false},
                    {roomTypeID:2,path:'b.jpg',icon:false}]
            };
    
            await axios.put(`http://localhost:8080/api/hotel/edit/submit`, data ,{ headers: { Authorization: `Bearer ${jwt}` } })
            .then(response => {
                expect(response.data.status).toBe('success, updated hotel table, added photos');
            }).catch((err)=>{
                console.log(err)
            })
    
            });
    
    it('Hotel edit delete photo', async () => {
        //jwt of partner1
            const jwt = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJwYXJ0bmVyMSIsImlzSG90ZWwiOnRydWV9.QtkreWj8q4OD--qbCJNa68jQlZ0vhtZFtl0cOeQzNAk';
    
            let data=  {
                name:'Dogotel & Spa',
                telephone:27110051,
                address:'G/F. & Cockloft, 21 Yik Yam Street, Happy Valley',
                description:'It all began with our first shop in 2002 featuring services that were not available elsewhere in HK. This quickly established itself as the leading example in K9 care, raising standards for the whole pet-care industry.',  
                vaccineRequirement:{vaccine:['DHPPiL','Rabies','Kennel Cough']},
                deletePhotos:[17,18]
            };
    
            await axios.put(`http://localhost:8080/api/hotel/edit/submit`, data ,{ headers: { Authorization: `Bearer ${jwt}` } })
            .then(response => {
                expect(response.data.status).toBe('success, updated hotel table, deleted photos');
            }).catch((err)=>{
                console.log(err)
            })
    
            });

    it('Hotel edit add and delete photo', async () => {
        //jwt of partner1
            const jwt = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJwYXJ0bmVyMSIsImlzSG90ZWwiOnRydWV9.QtkreWj8q4OD--qbCJNa68jQlZ0vhtZFtl0cOeQzNAk';
    
            let data=  {
                name:'Dogotel & Spa',
                telephone:27110051,
                address:'G/F. & Cockloft, 21 Yik Yam Street, Happy Valley',
                description:'It all began with our first shop in 2002 featuring services that were not available elsewhere in HK. This quickly established itself as the leading example in K9 care, raising standards for the whole pet-care industry.',  
                vaccineRequirement:{vaccine:['DHPPiL','Rabies','Kennel Cough']},
                deletePhotos:[15,16],
                addPhotos:[
                    {roomTypeID:2,path:'a.jpg',icon:false},
                    {roomTypeID:2,path:'b.jpg',icon:false}]
            };
    
            await axios.put(`http://localhost:8080/api/hotel/edit/submit`, data ,{ headers: { Authorization: `Bearer ${jwt}` } })
            .then(response => {
                console.log(response.data)
                expect(response.data.status).toBe('success, updated hotel table, added photos and deleted photos');
            }).catch((err)=>{
                console.log(err)
            })
    
            })


})