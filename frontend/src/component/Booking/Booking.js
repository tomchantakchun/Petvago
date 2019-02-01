import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import './booking.css'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser,faPhone, faPaw, faWeight, faDog,faSyringe,faBath } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios';
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
            duration:0,
            hotelPrice:0,
            servicePrice:0,
            ownerName:null,
            ownerPhone:null,
            petName:null,
            petWeight:null,
            petType:null,
            vaccineRequirement:this.props.vaccineRequirement,
            service:{},
            totalPrice:0,
            loading:false,
            vaccineCheck:null,
            vaccineError:null,
            vaccineClass:null,
            time:'',
            hotelIcon:this.props.hotelIcon
            
        }
    }

    componentDidMount(){

        if (!this.state.bookingID) {
            this.props.history.push('/')
        }
        
        //calculate duration
        let promise=new Promise((resolve,reject)=>{
            let duration=((new Date(this.state.endDate))-(new Date(this.state.startDate))) / (60*60*24*1000);
            this.setState({
                duration
            });
            resolve()

        })

        promise.then(()=>{
          //calculate total price
          let totalPrice= this.state.duration * this.state.roomPrice;
          this.setState({
              hotelPrice:totalPrice,
              totalPrice:totalPrice
          })
        })

        //start timer
        this.timeID=setInterval(
            ()=>this.timer(),
            1000
        );

        //format date
        let startDate=new Date(this.state.startDate)
        var dd = startDate.getDate();
        var mm = startDate.getMonth() + 1; 
        var yyyy = startDate.getFullYear();
        startDate = dd + '/' + mm + '/' + yyyy;

        let endDate=new Date(this.state.endDate)
        var dd2 = endDate.getDate();
        var mm2 = endDate.getMonth() + 1; 
        var yyyy2 = endDate.getFullYear();
        endDate = dd2 + '/' + mm2 + '/' + yyyy2;

        this.setState(
            {startDate, endDate}
        )

            
       

    }

    timer=()=>{
        var now = new Date().getTime();
        var distance = new Date(this.state.expiryTime) - now;
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);
        let time= minutes+' : '+seconds
        if (distance>=0){
            this.setState({
                time
            })
        }else{
            this.setState({
                time: 'Time is up, please try to book another room'
            })
        }
      
    }

    handleChange=(e)=>{
        this.setState({
            [e.target.name]:e.target.value,
        })
        // console.log(e.target.name+':'+this.state[e.target.name])

    }

    handleVaccineChange=(e)=>{
        if(e.target.checked===true){
            this.setState({
                vaccineCheck: this.state.vaccineCheck+1
            })
        }else if(e.target.checked===false && this.state.vaccineCheck>0){
            this.setState({
                vaccineCheck: this.state.vaccineCheck-1
            })
        }
        
    }

    handleServiceChange=(e)=>{
        if(e.target.checked===true){
            //add service
            let newService=this.state.service;
            newService[e.target.name]=1;
            let price=Number(e.target.value)

            let promise=new Promise((resolve,reject)=>{
                this.setState({
                    service:newService,
                    servicePrice: this.state.servicePrice+price
                })
                resolve(price)
    
            })

            let totalPrice=this.state.totalPrice;

            promise.then((price)=>{
                let newTotalPrice=totalPrice+price;
                this.setState({
                    totalPrice:newTotalPrice
                })
            })

        }else{
            //delete service
            let newService=this.state.service;
            delete newService[e.target.name];
           
            let price=Number(e.target.value)

            let promise=new Promise((resolve,reject)=>{
                this.setState({
                    service:newService,
                    servicePrice: this.state.servicePrice-price
                })
                resolve(price)
    
            })

            let totalPrice=this.state.totalPrice;

            promise.then((price)=>{
                let newTotalPrice=totalPrice-price;
                this.setState({
                    totalPrice:newTotalPrice
                })
            })

        }

    }

    handleSubmit=(e)=>{
        e.preventDefault();
        clearInterval(this.timerID)

        //check vaccine.length
        if(this.state.vaccineRequirement && this.state.vaccineRequirement.vaccine.length!==this.state.vaccineCheck){
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

        

        //check is number 
        let checkPhone=Number(this.state.ownerPhone);
        let checkWeight=Number(this.state.petWeight)
        console.log('222',checkPhone)

        //
        if( this.state.ownerName && this.state.ownerPhone && isNaN(checkPhone)===false && this.state.petName && this.state.petType && this.state.petWeight && isNaN(checkWeight)=== false && this.state.vaccineCheck===this.state.vaccineRequirement.vaccine.length){
            const jwt = localStorage.getItem('petvago-token');
            if (!jwt) {
                this.props.history.push('/login')
            }

            let today=new Date()

            let data={
                id:this.state.bookingID,
                ownerName:this.state.ownerName,
                ownerPhone:checkPhone,
                petName: this.state.petName,
                petType: this.state.petType,
                petWeight: checkWeight,
                vaccineRequirement: this.state.vaccineRequirement,
                service: this.state.service,
                totalPrice: this.state.totalPrice,
                orderDate:today
            }

            

            let history=this.props.history

            axios.put(`${process.env.REACT_APP_BACKEND_DOMAIN}/api/booking/update-booking`,data, { headers: { Authorization: `Bearer ${jwt}` } }).then((result)=>{
                history.push({pathname:'/confirmation',state:{bookingID:data.id}})
                
    
            }).catch(err=>console.log(err))
           
            }else{
                alert('Make sure all fields are filled in and in correct format.')
            }
            
        

    }

    renderVaccine=()=>{
        if(this.state.vaccineRequirement){
            return this.state.vaccineRequirement.vaccine.map((each)=>{
                return(
                    <div key={each} className="form-check" style={{paddingTop:'5px',paddingBottom:'5px', marginLeft:'30px'}}>
                    <input className="form-check-input" type="checkbox" name="vaccine" value={each} style={{display:'inline'}}
                            onChange={this.handleVaccineChange}/>
                    <label  className="form-check-label">
                        {each}
                    </label>
                    </div>
                )
    
            })

        }else{
            return (<div><label> No vaccine is required :)</label></div>)
        }

    }
    

    render(){

        return(
        <div className='booking'>
            
            <div className='booking-form'>

            <h1 style={{marginBottom:"20px"}}>Basic information</h1>

            <div className="form-group row">
                <label className="col-sm-4 col-form-label"> <FontAwesomeIcon icon="user" style={{marginRight:'10px'}}/>Onwer's name</label>
                <div className="col-sm-8">
                <input name="ownerName" type="text" className="form-control"  onChange={this.handleChange}/>
                </div>
            </div>
            <div className="form-group row">
                <label className="col-sm-4 col-form-label"><FontAwesomeIcon icon="phone" style={{marginRight:'10px'}}/>Phone number</label>
                <div className="col-sm-8">
                <input name="ownerPhone" type="text" className="form-control"  onChange={this.handleChange}/>
                </div>
            </div>
            <div className="form-group row">
                <label className="col-sm-4 col-form-label"><FontAwesomeIcon icon="paw" style={{marginRight:'10px'}}/>Pet's name</label>
                <div className="col-sm-8">
                <input name="petName" type="text" className="form-control"  onChange={this.handleChange}/>
                </div>
            </div>
            <div className="form-group row">
                <label className="col-sm-4 col-form-label"><FontAwesomeIcon icon="weight" style={{marginRight:'10px'}}/>Pet weight</label>
                <div className="col-sm-8">
                <input name="petWeight" type="text" className="form-control"  onChange={this.handleChange}/>
                </div>
                
            </div>

            <div className="form-group row">
            <label className="col-sm-4 col-form-label"><FontAwesomeIcon icon="dog" style={{marginRight:'10px'}}/>Pet type</label>
                <div className="col-sm-8">
                    <select onChange={this.handleChange} name="petType" className="form-control">
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
            
            <div className="form-check" style={{paddingTop:'20px'}}>
            <input className="form-check-input" type="checkbox" name="Bath" value='350' style={{display:'inline'}}
                    onChange={this.handleServiceChange}/>
            <label className="form-check-label">
                Bath  +$350
            </label>
            </div>

            <div className="form-check" style={{paddingTop:'20px'}}>
            <input className="form-check-input" type="checkbox" name="Obedience Training" value='500' style={{display:'inline'}}
                    onChange={this.handleServiceChange}/>
            <label className="form-check-label" >
                Obedience Training  +$500
            </label>
            </div>

            <div className="form-check" style={{paddingTop:'20px'}}>
            <input className="form-check-input" type="checkbox" name="Swimming class" value='200' style={{display:'inline'}}
                    onChange={this.handleServiceChange}/>
            <label className="form-check-label" >
                Swimming class  +$200
            </label>
            </div>

            <button className=" booking-button" onClick={this.handleSubmit}>Submit</button>

           <div className='count-down'>
            <div><p> We will hold this room for : </p></div>
            <div><h5>{this.state.time}</h5></div>
           </div>




            </div>

            <div className='booking-box'>
                <div style={{display:'flex'}}>
                    <h1 style={{width:'50%', fontWeight: "bold"}}>{this.state.hotelName}</h1>
                    <img style={{width:'50%'}} src={this.state.hotelIcon} alt="hotel" className="booking-icon"/>
                </div>
                <div className="booking-line"></div>  

                <div style={{display:'flex', justifyContent:'space-between'}}>
                    <p style={{fontWeight: "bold"}}>Date: </p>
                    <p>{this.state.startDate} - {this.state.endDate}</p>
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
    roomPrice: state.hotel.roomPrice,
    vaccineRequirement: state.hotel.vaccineRequirement,
    hotelIcon: state.hotel.hotelIcon
});




export default connect(mapStateToProps)(withRouter(Booking));