import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { choose_hotel_to_book } from '../../store/actions';
import axios from 'axios';


class Hotel extends Component {
    constructor(props){
        super(props);
        this.state={  
                hotelID:1,
                hotelName:'Dogotel & Spa',
                roomTypeID:1,
                roomType:'Deluxe Room',
                roomPrice: 400,

            }
    }

    componentDidMount(){
        //calculate total price
       
    }

    book=()=>{
        let data={
            hotelID:this.state.hotelID,
            roomTypeID:this.state.roomTypeID,
            startDate:'2019-02-01',
            endDate:'2019-02-03',
        }

        let hotelName=this.state.hotelName;
        let roomTypeID=this.state.roomTypeID;
        let roomType= this.state.roomType;
        let roomPrice=this.state.roomPrice;
        let history=this.props.history

        const jwt = localStorage.getItem('petvago-token');
        if (!jwt) {
            this.props.history.push('/login')
        }
    
        axios.post(`http://localhost:8080/api/booking/create-booking`,data, { headers: { Authorization: `Bearer ${jwt}` } }).then((result)=>{
            console.log('11111',result.data)
            let payload={
                bookingStartDate:data.startDate,
                bookingEndDate:data.endDate,
                hotelID: this.state.hotel,
                expiryTime: result.data.expiryTime,
                bookingID: result.data.bookingID,
                hotelName: hotelName,
                roomTypeID,
                roomType,
                roomPrice
            }
            console.log('payload',payload)
            this.props.chooseHotel(payload)

        }).then(()=>{
            history.push('/booking')
        })
        .catch(err=>console.log(err))
       }

    render(){
        return(
            <div>
                {this.state.chosenHotel}
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