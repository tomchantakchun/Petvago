import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { choose_hotel_to_book } from '../../store/actions';
import axios from 'axios';
import GoogleMap from "../GoogleMap/GoogleMap";
import RatingBarNonEdit from "./RatingBar-non-edit";
// import Slideshow from "../Slideshow/Slideshow";
import ImageShow from "../ImageShow/ImageShow";
import "./Hotel.css"

class Hotel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hotelInfo: "",
            hotelID: 1,
            hotelName: 'Dogotel & Spa',
            hotelAddress: "1 Downing Street, London",
            hotelAverageRating: 4.0,
            hotelDescription: "I am Descripiton",
            hotelEmail:"dafdw!@email.com",
            hotelPhone:"2180000",
            hotelLatitude: 22.320188,
            hotelLongtitude:114.175812,

            roomTypeArr: [],
            
            roomTypeID: 1,
            roomType: 'Deluxe Room',
            roomPrice: 400,
            vaccineRequirement: { vaccine: ['DHPPiL', 'Rabies'] },
            gallery: ['https://i.imgur.com/sFq0wAC.jpg',"https://i.imgur.com/IE0fsbI.jpg"]
        }
    };

    async componentDidMount() {
        try{
            const _hotelInfoArray = await axios.get("http://localhost:8080/api/hotel/1");
            const _hotelReviewArray = await axios.get("http://localhost:8080/api/review/hotel/1");

            const _hotelInfo = _hotelInfoArray.data[0];
                console.log(_hotelInfo);
            const _hotelReview = _hotelReviewArray.data[0];
                console.log(_hotelReview);

            const _gallaryArr = _hotelInfo.hotelPhoto.map((e) => e.path);
            const _fillterGallaryArr = _gallaryArr.filter(e => !!e);
            for (let i= 0; i<_hotelInfo.roomType.length; i++){
                for (let j=0; j<_hotelInfo.roomType[i].photo.length;i++){
                    if(_hotelInfo.roomType[i].photo[j].icon = true){
                        _hotelInfo.roomType[i].icon = _hotelInfo.roomType[i].photo[j].path
                    }
                }
            }
                console.log(_hotelInfo.roomType);
                
            this.setState({
                hotelID: _hotelInfo.id,
                hotelName: _hotelInfo.name,
                hotelAddress: _hotelInfo.address,
                hotelAverageRating: _hotelInfo.averageRating,
                hotelDescription: _hotelInfo.description,
                hotelEmail: _hotelInfo.email,
                hotelPhone: _hotelInfo.telephone,
                hotelLatitude: _hotelInfo.latitude,
                hotelLongtitude:_hotelInfo.longtitude,
                roomTypeArr:_hotelInfo.roomType,
                vaccineRequirement: _hotelInfo.vaccineRequirement,
                gallery: _fillterGallaryArr,
             });
        } catch(err){
            console.log(err);
        }
    };


    book = () => {
        let data = {
            hotelID: this.state.hotelID,
            roomTypeID: this.state.roomTypeID,
            startDate: '2019-02-01',
            endDate: '2019-02-03',
        }
        let hotelID = this.state.hotelID;
        let hotelName = this.state.hotelName;
        let roomTypeID = this.state.roomTypeID;
        let roomType = this.state.roomType;
        let roomPrice = this.state.roomPrice;
        let vaccineRequirement = this.state.vaccineRequirement;
        let history = this.props.history

        const jwt = localStorage.getItem('petvago-token');
        if (!jwt) {
            this.props.history.push('/login')
        }

        axios.post(`http://localhost:8080/api/booking/create-booking`, data, { headers: { Authorization: `Bearer ${jwt}` } }).then((result) => {
            let payload = {
                bookingStartDate: data.startDate,
                bookingEndDate: data.endDate,
                hotelID,
                expiryTime: result.data.expiryTime,
                bookingID: result.data.bookingID,
                hotelName,
                roomTypeID,
                roomType,
                roomPrice,
                vaccineRequirement
            }
            this.props.chooseHotel(payload)

        }).then(() => {
            history.push('/booking')
        })
            .catch(err => console.log(err))
    };

    handleRoomTypeID = () =>{

    }

    render() {
        const vaccineListItem = this.state.vaccineRequirement.vaccine.map((e) =>
            <li> {e} </li>
        );
        const roomTypeListItem = this.state.roomTypeArr.map((e) => 
            

           
            <div key={e.roomTypeID} className="hotel-room-data-card">
                <img className="hotel-room-data-card-icon" src={e.icon} alt="NA" />
                <div className="hotel-room-data-card-type left-break-line">{e.roomType}</div>
                <div className="hotel-room-data-card-description left-break-line">{e.description}</div>
                <div id="hotel-room-data-card-price">
                    ${e.price}
                </div>
                <button className="btn btn-primary hotel-room-data-card-booking" onClick={this.handleRoomTypeID}>Book</button>
            </div>
            
        
        
        );

        console.log(this.state.roomTypeArr.map((e)=>
                e.photo
        ))

        
        
        return (
            <div className="hotel-body">
                {this.state.chosenHotel}
                <div className="hotel-row-3">
                    <div className="hotel-row-3-a">
                        <div className="hotel-name-3">{this.state.hotelName}</div>
                        <div className="hotel-rate-3">
                            <RatingBarNonEdit rating={4.0}/>
                        </div>
                        <p className="hotel-address-3">address</p>
                        <div className="hotel-map-container">
                            <GoogleMap
                                markerArray={[
                                    {
                                        coords: { lat: 22.320188, lng: 114.175812 },
                                        content: '<h1>Dogotel & Spa</h1>'
                                    }
                                ]}
                                zoom={17} height={'30vh'} width={'35vh'}
                            />
                        </div>
                    </div>

                    <div className="hotel-row-3-b">
                        <div className="hotel-photo-3" > 
                        < ImageShow urlArray={this.state.gallery}/>
                        </div>
                    </div>


                </div>

                <div className="hotel-description-3">{this.state.hotelDescription}</div>

                <div className="align-left hotel-date-3">DATE INPUT </div>
                
                <div className="hotel-room-type-3">
                    <p className="align-left"> Room type:</p>
                    <div className="hotel-room-data-card-container">
                        {roomTypeListItem}
                    </div>

                </div>

                <div className="hotel-vaccine-3">
                    <p className="align-left"> Vaccine Requirement:</p>
                    
                    <ul className="hotel-vaccine-list-3">{vaccineListItem}</ul>
                    
                </div>

                <div className="hotel-review-3">
                    <p className="align-left"> Review</p>
                    <div className="hotel-review-box">
                        <p className="user-name"> user name </p>
                        <RatingBarNonEdit rating={3}/>
                        <div className="hotel-review-text">
                            Amazing Hotel
                        </div>
                    </div>

                </div>



                <button className="btn btn-primary" onClick={this.book}>Book</button>
            </div>
        )
    }
}



const mapStateToProps = state => ({

});

const mapDispatchtoProps = (dispatch) => {
    return {
        chooseHotel: (data) => { dispatch(choose_hotel_to_book(data)) },
    }
}

export default connect(mapStateToProps, mapDispatchtoProps)(withRouter(Hotel));