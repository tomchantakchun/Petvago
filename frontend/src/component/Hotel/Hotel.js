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

const mapStateToProps = state => {
    return {
        SearchResult: state.search,
        HotelID : state.hotelId,
    }
};

class Hotel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hotelID: this.props.HotelID.hotelId ,
            hotelName: 'Fake Hotel & Spa',
            hotelIcon: '',
            hotelAddress: "1 Downing Street, London",
            hotelAverageRating: 1.0,
            hotelDescription: "I am Descripiton",
            hotelEmail:"dafdw!@email.com",
            hotelPhone:"2180000",
            hotelLatitude: 22.320188,
            hotelLongitude:114.175812,
            roomTypeArr: [],
            roomTypeID: 0,
            roomType: 100,
            reviewArr:[],
            gallery: [],
            vaccineRequirement: { vaccine: ['DHPPiL', 'Rabies'] },
            startDate: "DD-MM-YYYY",
            endDate:"DD-MM-YYYY",
        }

        if(this.state.hotelID == 0){
            console.log('i am zero');
            this.props.history.push('/')
        }

        

    };

    async componentDidMount() {
        
        try{
            const _hotelInfoArrayData = await axios.get("http://localhost:8080/api/hotel/"+ this.state.hotelID);
            const _hotelReviewArrayData = await axios.get("http://localhost:8080/api/review/hotel/"+this.state.hotelID);
            const _hotelInfo = _hotelInfoArrayData.data[0];
                console.log(_hotelInfo);
            const _hotelReviewArray = _hotelReviewArrayData.data;
                console.log(_hotelReviewArray);
            const _gallaryArr = _hotelInfo.hotelPhoto.map((e) => e.path);
            const _fillterGallaryArr = _gallaryArr.filter(e => !!e);
            {/* once photo uploaded to firebase, have to remove _temp array  */}
                console.log(_fillterGallaryArr);
            const _tempGallaryArr = _fillterGallaryArr.map(e => '.'.concat(e));
                console.log(_tempGallaryArr);


            for (let i= 0; i<_hotelInfo.roomType.length; i++){
                for (let j=0; j<_hotelInfo.roomType[i].photo.length;i++){
                    if(_hotelInfo.roomType[i].photo[j].icon === true){
                        _hotelInfo.roomType[i].icon = _hotelInfo.roomType[i].photo[j].path
                    }
                }
            }   
            await this.setState({
                hotelID: _hotelInfo.id,
                hotelName: _hotelInfo.name,

                // hotelIcon: _fillterGallaryArr[0],
                hotelIcon: _tempGallaryArr[0],

                hotelAddress: _hotelInfo.address,
                hotelAverageRating: _hotelInfo.averageRating,
                hotelDescription: _hotelInfo.description,
                hotelEmail: _hotelInfo.email,
                hotelPhone: _hotelInfo.telephone,
                hotelLatitude: _hotelInfo.latitude,
                hotelLongitude:_hotelInfo.longitude,
                roomTypeArr:_hotelInfo.roomType,
                reviewArr: _hotelReviewArray,

                // gallery: _fillterGallaryArr,
                gallery: _tempGallaryArr,

                vaccineRequirement: _hotelInfo.vaccineRequirement,
                startDate: this.props.SearchResult.startDate,
                endDate: this.props.SearchResult.endDate,
                
             });
        } catch(err){
            console.log(err);
        }
    };


    book = () => {
        let data = {
            hotelID: this.state.hotelID,
            roomTypeID: this.state.roomTypeID,
            startDate: this.state.startDate,
            endDate: this.state.endDate,
        }
        let hotelID = this.state.hotelID;
        let hotelName = this.state.hotelName;
        let hotelIcon = this.state.hotelIcon;
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
                hotelIcon,
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

    handleRoomTypeID = async(e) =>{
        
        const _roomTypeId = Number(e.target.parentElement.id.replace('roomType-id-',''));
        const _roomType = (e.target.parentElement.children[1].id.replace('roomType-',''));
        const _roomPrice = (e.target.parentElement.children[3].id.replace('roomType-price-',''));
        await this.setState({
            roomTypeID: _roomTypeId,
            roomType: _roomType,
            roomPrice: _roomPrice,
        })
    }

    render() {
       
        const vaccineListItem = this.state.vaccineRequirement.vaccine.map((e,index) =>
            <li key={index}> {e} </li>
        );
        const roomTypeListItem = this.state.roomTypeArr.map((e) => 
            <div key={e.roomTypeID} id={`roomType-id-${e.roomTypeID}`} className="hotel-room-data-card">
                {/* once photo uploaded to firebase, change the source of icon */}
                <img className="hotel-room-data-card-icon" src={`.${e.icon}`} alt="NA" />
                <div id={`roomType-${e.roomType}`} className="hotel-room-data-card-type left-break-line">{e.roomType}</div>
                <div className="hotel-room-data-card-description left-break-line">{e.description}</div>
                <div id={`roomType-price-${e.price}`} className="hotel-room-data-card-price">
                    ${e.price}
                </div>
                <button className="btn btn-primary hotel-room-data-card-booking" onClick={this.handleRoomTypeID}>Book</button>
            </div>
        );

        const reviewListItem = this.state.reviewArr.map(e =>
            <div key={e.bookingID} className="hotel-review-box">
                <p className="hotel-review-user-name"> {e.username} </p>
                <RatingBarNonEdit rating={e.rating}/>
                <div className="hotel-review-text">
                    {e.comment}
                </div>
            </div>
        )

        const hotelBody = ( 
                <div className="hotel-body">
                    {this.state.chosenHotel}
                    <div className="hotel-row-3">
                        <div className="hotel-row-3-a">
                            <div className="hotel-name-3">{this.state.hotelName}</div>
                            <div className="hotel-rate-3">
                                <RatingBarNonEdit rating={this.state.hotelAverageRating} />
                            </div>
                            <p className="hotel-address-3">{this.state.hotelAddress}</p>
                            <div className="hotel-map-container">
                                <GoogleMap
                                    markerArray={[
                                        {
                                            coords: { lat: this.state.hotelLatitude, lng: this.state.hotelLongitude },
                                            content: '<h1>Dogotel & Spa</h1>'
                                        }
                                    ]}
                                    zoom={17} height={'30vh'} width={'35vh'}
                                />
                            </div>
                        </div>
                        <div className="hotel-row-3-b">
                            <div className="hotel-photo-3" >
                                < ImageShow urlArray={this.state.gallery} />
                            </div>
                        </div>
                    </div>
                    <div className="hotel-description-3">{this.state.hotelDescription}</div>

                    <div className="align-left hotel-date-3">DATE INPUT </div>

                    <div className="hotel-room-type-3">
                        <p className="align-left"> Room type</p>
                        <div className="hotel-room-data-card-container">
                            {roomTypeListItem}
                        </div>
                    </div>

                    <div className="hotel-vaccine-3">
                        <p className="align-left"> Vaccine Requirement</p>
                        <ul className="hotel-vaccine-list-3">{vaccineListItem}</ul>
                    </div>

                    <div className="hotel-review-3">
                        <p className="align-left"> Review</p>
                        <div className="hotel-review-panel-3">
                            {reviewListItem}
                        </div>
                    </div>
                    <button className="btn btn-primary" onClick={this.book}>Book</button>
                </div>
        )

        return (
            <div className="hotel-upper-body">


                {hotelBody}
            </div>
        )
    }
}


const mapDispatchtoProps = (dispatch) => {
    return {
        chooseHotel: (data) => { dispatch(choose_hotel_to_book(data)) },
    }
}

export default connect(mapStateToProps, mapDispatchtoProps)(withRouter(Hotel));