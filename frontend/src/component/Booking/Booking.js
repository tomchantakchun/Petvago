import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import './booking.css'


class Booking extends Component {
    constructor(props){
        super(props);
        this.state={ 
            bookingID:1,
            hotel:this.props.hotel,
            startDate:'2019-02-05',
            endDate:'2019-02-09',
            duration:4,
            hotelPrice:1200,
            servicePrice:350,
            ownerName:null,
            ownerPhone:null,
            petName:null,
            petWeight:null,
            petType:null,
            vaccineRequirement:null,
            service:null,
            totalPrice:1550,
            loading:false,
            checked:false
        }
    }

    handleChange=(e)=>{
        this.setState({
            [e.target.name]:e.target.value,
        })
        console.log(e.target.name+':'+this.state[e.target.name])

    }

    handleVaccineChange=(e)=>{
        console.log(e.target.value)
    }

    render(){

        return(
        <div className='booking'>
            
            <div className='booking-form'>

            <h1 style={{marginBottom:"20px"}}>Basic informtion</h1>

            <div className="form-group row">
                <label className="col-sm-3 col-form-label">Onwer's name</label>
                <div className="col-sm-9">
                <input name="ownerName" type="text" className="form-control"  onChange={this.handleChange}/>
                </div>
            </div>
            <div className="form-group row">
                <label className="col-sm-3 col-form-label">Phone number</label>
                <div className="col-sm-9">
                <input name="ownerPhone" type="text" className="form-control"  onChange={this.handleChange}/>
                </div>
            </div>
            <div class="form-group row">
                <label className="col-sm-3 col-form-label">Pet's name</label>
                <div className="col-sm-9">
                <input name="petName" type="text" className="form-control"  onChange={this.handleChange}/>
                </div>
            </div>
            <div className="form-group row">
                <label className="col-sm-3 col-form-label">Pet weight</label>
                <div className="col-sm-3">
                <input name="petWeight" type="text" className="form-control"  onChange={this.handleChange}/>
                </div>
                
            </div>

            <div className="form-group row">
            <label className="col-sm-3 col-form-label" >Pet type</label>
                <div className="col-sm-4">
                    <select onChange={this.handleChange} className="form-control">
                    <option default>Choose a pet type</option>
                    <option value="dog">Dog</option> 
                    <option value="cat">Cat</option>  
                    </select>
                </div>
            </div>

            <p>Has your pet received these vaccines?</p>


            <div className="form-check" style={{paddingTop:'10px'}}>
            <input className="form-check-input" type="checkbox" name="vaccine" value='vaccine1' style={{display:'inline'}}
                    onChange={this.handleVaccineChange}/>
            <label className="form-check-label">
                Vaccine1
            </label>
            </div>

            <div className="form-check" style={{paddingTop:'10px'}}>
            <input className="form-check-input" type="checkbox" name="vaccine" value='vaccine2' style={{display:'inline'}}
                    onChange={this.handleVaccineChange}/>
            <label className="form-check-label" for="defaultCheck1">
                Vaccines2
            </label>
            </div>

  
        


            <div className="booking-line" style={{marginTop:'30px'}} ></div> 

            <h1 style={{marginBottom:"10px"}}>Service</h1>

            <div className="form-check" style={{paddingTop:'10px'}}>
            <input className="form-check-input" type="checkbox" name="vaccine" value='vaccine1' style={{display:'inline'}}
                    onChange={this.handleVaccineChange}/>
            <label className="form-check-label">
                Vaccine1
            </label>
            </div>

            <div className="form-check" style={{paddingTop:'10px'}}>
            <input className="form-check-input" type="checkbox" name="vaccine" value='vaccine2' style={{display:'inline'}}
                    onChange={this.handleVaccineChange}/>
            <label className="form-check-label" for="defaultCheck1">
                Vaccines2
            </label>
            </div>

            <button className="btn">Submit</button>




            </div>

            <div className='booking-box'>
                <div style={{display:'flex'}}>
                    <h1 style={{width:'50%', fontWeight: "bold"}}>Hotel Name</h1>
                    <img style={{width:'50%'}} src="./image/hotel1photo1.jpg" alt="hotel" className="booking-icon"/>
                </div>
                <div className="booking-line"></div>  

                <div style={{display:'flex', justifyContent:'space-between'}}>
                    <p style={{fontWeight: "bold"}}>Date: </p>
                    <p>{this.state.startDate} - {this.state.endDate}</p>
                </div>
                <div className="booking-line"></div> 

                <p style={{marginBottom:"10px", fontWeight: "bold"}}>Price</p> 

                <div style={{display:'flex', justifyContent:'space-between',marginBottom:"10px"}}>
                    <p>Room x {this.state.duration} days : </p>
                    <p>${this.state.hotelPrice}</p>
                </div>
                <div style={{display:'flex', justifyContent:'space-between',marginBottom:"15px"}}>
                    <p>Service : </p>
                    <p>${this.state.servicePrice}</p>
                </div>
                <div style={{display:'flex', justifyContent:'space-between',marginBottom:"15px"}}>
                    <p style={{fontWeight: "bold"}}>Total price : </p>
                    <p>${this.state.totalPrice}</p>
                </div>



                         

            </div>
            


   

        </div>



    )}
        
    



}

const mapStateToProps = state => ({
    hotel: state.searchHistory.hotelChosenForBooking
});


export default connect(mapStateToProps)(withRouter(Booking));