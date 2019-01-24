import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import './booking.css'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser,faPhone, faPaw, faWeight, faDog,faSyringe,faBath } from '@fortawesome/free-solid-svg-icons'
library.add(faUser)
library.add(faPhone)
library.add(faPaw)
library.add(faWeight)
library.add(faDog)
library.add(faSyringe)
library.add(faBath)



class Booking extends Component {
    constructor(props){
        super(props);
        this.state={ 
            expiryTime: this.props.expiryTime,
            bookingID:this.props.bookingID,
            hotelID:this.props.hotel,
            hotelName:this.props.hotelName,
            startDate:this.props.startDate,
            endDate:this.props.endDate,
            roomTypeID:this.props.roomTypeID,
            roomType:this.props.roomType,
            roomPrice:this.props.roomPrice,
            duration:null,
            hotelPrice:null,
            servicePrice:0,
            ownerName:null,
            ownerPhone:null,
            petName:null,
            petWeight:null,
            petType:null,
            vaccineRequirement:{vaccine:['DHPPiL','Rabies']},
            service:null,
            totalPrice:null,
            loading:false,
            vaccineCheck:null,
            vaccineError:null,
            vaccineClass:null
            
        }
    }

    componentDidMount(){
      
        
        //calculate duration
        let duration=((new Date(this.state.endDate))-(new Date(this.state.startDate))) / (60*60*24*1000);
        this.setState({
            duration
        })

          //calculate total price
          let totalPrice= this.state.duration * this.state.roomPrice;
          this.setState({
              hotelPrice:totalPrice,
              totalPrice:totalPrice
          })
    }

    handleChange=(e)=>{
        this.setState({
            [e.target.name]:e.target.value,
        })
        console.log(e.target.name+':'+this.state[e.target.name])

    }

    handleVaccineChange=(e)=>{
        if(e.target.checked==true){
            this.setState({
                vaccineCheck: this.state.vaccineCheck+1
            })
        }else if(e.target.checked==false && this.state.vaccineCheck>0){
            this.setState({
                vaccineCheck: this.state.vaccineCheck-1
            })
        }
        console.log(e.target.checked)
        console.log('length',this.state.vaccineRequirement.vaccine.length)
        
    }

    handleSubmit=(e)=>{
        e.preventDefault();

        //check vaccine.length
        if(this.state.vaccineRequirement.vaccine.length!=this.state.vaccineCheck){
            console.log('not ok')
            this.setState({
                vaccineError:<div style={{color:'#da3846'}}>Make sure you pet has received all the vaccine.</div>,
                vaccineClass:'vaccine-not-ok'
            })
        }else{
            this.setState({
                vaccineError:null,
                vaccineClass:null
            })
        }

        //
        

    }

    renderVaccine=()=>{
        return this.state.vaccineRequirement.vaccine.map((each)=>{
            return(
                <div key={each} className="form-check" style={{paddingTop:'5px',paddingBottom:'5px', marginLeft:'30px'}}>
                <input className="form-check-input" type="checkbox" name="vaccine" value={each} style={{display:'inline'}}
                        onChange={this.handleVaccineChange}/>
                <label style={{paddingTop:'5px'}} className="form-check-label">
                    {each}
                </label>
                </div>
            )

        })
    }
    

    render(){

        return(
        <div className='booking'>
            
            <div className='booking-form'>

            <h1 style={{marginBottom:"20px"}}>Basic informtion</h1>

            <div className="form-group row">
                <label className="col-sm-3 col-form-label"> <FontAwesomeIcon icon="user" style={{marginRight:'10px'}}/>Onwer's name</label>
                <div className="col-sm-9">
                <input name="ownerName" type="text" className="form-control"  onChange={this.handleChange}/>
                </div>
            </div>
            <div className="form-group row">
                <label className="col-sm-3 col-form-label"><FontAwesomeIcon icon="phone" style={{marginRight:'10px'}}/>Phone number</label>
                <div className="col-sm-9">
                <input name="ownerPhone" type="text" className="form-control"  onChange={this.handleChange}/>
                </div>
            </div>
            <div className="form-group row">
                <label className="col-sm-3 col-form-label"><FontAwesomeIcon icon="paw" style={{marginRight:'10px'}}/>Pet's name</label>
                <div className="col-sm-9">
                <input name="petName" type="text" className="form-control"  onChange={this.handleChange}/>
                </div>
            </div>
            <div className="form-group row">
                <label className="col-sm-3 col-form-label"><FontAwesomeIcon icon="weight" style={{marginRight:'10px'}}/>Pet weight</label>
                <div className="col-sm-3">
                <input name="petWeight" type="text" className="form-control"  onChange={this.handleChange}/>
                </div>
                
            </div>

            <div className="form-group row">
            <label className="col-sm-3 col-form-label"><FontAwesomeIcon icon="dog" style={{marginRight:'10px'}}/>Pet type</label>
                <div className="col-sm-4">
                    <select onChange={this.handleChange} className="form-control">
                    <option default>Choose a pet type</option>
                    <option value="dog">Dog</option> 
                    <option value="cat">Cat</option>  
                    </select>
                </div>
            </div>

            <p style={{marginBottom:"10px"}}> <FontAwesomeIcon icon="syringe" style={{marginRight:'10px'}}/>Has your pet received these vaccines?</p>
            <div className={this.state.vaccineClass}>
                {this.renderVaccine()}
            </div>
                {this.state.vaccineError}

            <div className="booking-line" style={{marginTop:'30px'}} ></div> 

            <h1 style={{marginBottom:"10px"}}><FontAwesomeIcon icon="bath" style={{marginRight:'10px'}}/>Service </h1>
            
            <div className="form-check" style={{paddingTop:'10px'}}>
            <input className="form-check-input" type="checkbox" name="vaccine" value='vaccine1' style={{display:'inline'}}
                    onChange={this.handleVaccineChange}/>
            <label className="form-check-label">
                Bath  +$350
            </label>
            </div>

            <div className="form-check" style={{paddingTop:'10px'}}>
            <input className="form-check-input" type="checkbox" name="vaccine" value='vaccine2' style={{display:'inline'}}
                    onChange={this.handleVaccineChange}/>
            <label className="form-check-label" for="defaultCheck1">
                Obedience Training  +$350
            </label>
            </div>

            <div className="form-check" style={{paddingTop:'10px'}}>
            <input className="form-check-input" type="checkbox" name="vaccine" value='vaccine2' style={{display:'inline'}}
                    onChange={this.handleVaccineChange}/>
            <label className="form-check-label" for="defaultCheck1">
                Swimming class  +$350
            </label>
            </div>

            <button className="btn booking-button" onClick={this.handleSubmit}>Submit</button>




            </div>

            <div className='booking-box'>
                <div style={{display:'flex'}}>
                    <h1 style={{width:'50%', fontWeight: "bold"}}>{this.state.hotelName}</h1>
                    <img style={{width:'50%'}} src="./image/hotel1photo1.jpg" alt="hotel" className="booking-icon"/>
                </div>
                <div className="booking-line"></div>  

                <div style={{display:'flex', justifyContent:'space-between'}}>
                    <p style={{fontWeight: "bold"}}>Date: </p>
                    <p>{this.state.startDate} to {this.state.endDate}</p>
                </div>
                <div className="booking-line"></div> 

                <p style={{marginBottom:"10px", fontWeight: "bold"}}>Price</p> 

                <div style={{display:'flex', justifyContent:'space-between',marginBottom:"10px"}}>
                    <p>{this.state.roomType} x {this.state.duration} days : </p>
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
    hotel:state.hotel.hotelChosenforBooking,
    expiryTime:state.hotel.expiryTime,
    startDate: state.hotel.bookingStartDate,
    endDate: state.hotel.bookingEndDate,
    bookingID: state.hotel.bookingID,
    hotelName: state.hotel.hotelName,
    roomType: state.hotel.roomType,
    roomTypeID: state.hotel.roomTypeID,
    roomPrice: state.hotel.roomPrice
});


export default connect(mapStateToProps)(withRouter(Booking));