import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { choose_hotel_to_book } from '../../store/actions';
import axios from 'axios';
import GoogleMap from "../GoogleMap/GoogleMap";

class Hotel extends Component {
    constructor(props){
        super(props);
        this.state={  
                hotelID:1,
                hotelName:'Dogotel & Spa',
                roomTypeID:1,
                roomType:'Deluxe Room',
                roomPrice: 400,
                vaccineRequirement: {vaccine:['DHPPiL','Rabies']}

            }
    }

    componentDidMount(){
       
    }

    book=()=>{
        let data={
            hotelID:this.state.hotelID,
            roomTypeID:this.state.roomTypeID,
            startDate:'2019-02-01',
            endDate:'2019-02-03',
        }
        let hotelID=this.state.hotelID;
        let hotelName=this.state.hotelName;
        let roomTypeID=this.state.roomTypeID;
        let roomType= this.state.roomType;
        let roomPrice=this.state.roomPrice;
        let vaccineRequirement=this.state.vaccineRequirement;
        let history=this.props.history

        const jwt = localStorage.getItem('petvago-token');
        if (!jwt) {
            this.props.history.push('/login')
        }
    
        axios.post(`http://localhost:8080/api/booking/create-booking`,data, { headers: { Authorization: `Bearer ${jwt}` } }).then((result)=>{
            let payload={
                bookingStartDate:data.startDate,
                bookingEndDate:data.endDate,
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

        }).then(()=>{
            history.push('/booking')
        })
        .catch(err=>console.log(err))
       }

    render(){
        return(
            <div className="hotel-body">
                {this.state.chosenHotel}
                <div className="hotel-name-3">hotel name</div>
                <div className="hotel-rate-3">rating</div>
                <div className="hotel-map-container"></div>
                <div></div>
                <button className="btn btn-primary" onClick={this.book}>Book</button>
            </div>
        )
    }
}



const mapStateToProps = state => ({

});

const mapDispatchtoProps = (dispatch) =>{
    return {
        chooseHotel: (data)=>{dispatch(choose_hotel_to_book(data))},     
    }
}

export default connect(mapStateToProps,mapDispatchtoProps)(withRouter(Hotel));