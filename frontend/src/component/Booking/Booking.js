import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';


class Booking extends Component {
    constructor(props){
        super(props);
        this.state={ 
            hotel:this.props.hotel,
            ownerName:null,
            ownerPhone:null,
            petName:null,
            petWeight:null,
            petType:null,
            vaccineRequirement:null,
            service:null,
            totalPrice:null


        }
    }

    handleChange=(e)=>{
        this.setState({
            [e.target.name]:e.target.value,
        })

    }

    render(){

        console.log('1111',this.state.hotel)
        return(
        <div>
            <h1>Basic informtion</h1>

   

            {this.state.hotel}
        </div>



    )}
        
    



}

const mapStateToProps = state => ({
    hotel: state.searchHistory.hotelChosenForBooking
});


export default connect(mapStateToProps)(withRouter(Booking));