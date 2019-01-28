import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import Ratings from 'react-ratings-declarative';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser,faPhone,faEnvelope,faHotel, faCalendarAlt,faReceipt, faThumbsUp } from '@fortawesome/free-solid-svg-icons'
library.add(faUser)
library.add(faPhone)
library.add(faEnvelope)
library.add(faHotel)
library.add(faCalendarAlt)
library.add(faReceipt)
library.add(faThumbsUp)

class Confirmation extends Component {
    constructor(props){
        super(props);
        this.state={ 
            username:null,
            telephone:null,
            email:null,
            pastBooking:null,
            upcomingBooking:null,
            modal:null,
            bookingID:null,
            orderDate:null,
            ownerName:null,
            hotelName:null,
            ownerPhone:null,
            petName:null,
            petWeight:null,
            petType:null,
            vaccineRequirement:null,
            service:null,
            totalPrice:null,
            startDate:null,
            endDate:null,
            roomType:null,  
            modalBody:null,    
            review:null,
            rating:1,
            reviewArray:null,     
          
        }
    }

    componentDidMount(){
        const jwt = localStorage.getItem('petvago-token');
        if (!jwt) {
            this.props.history.push('/login')
        }
        axios.get(`http://localhost:8080/api/userprofile`, { headers: { Authorization: `Bearer ${jwt}` } }).then((result)=>{

            this.setState({
                username:result.data[0].username,
                telephone:result.data[0].telephone,
                email:result.data[0].email
            })
            
        }).catch((err)=>console.log(err))

        axios.get(`http://localhost:8080/api/booking/user`, { headers: { Authorization: `Bearer ${jwt}` } }).then((result)=>{
            this.setState({
                pastBooking:result.data[0].pastBooking,
                upcomingBooking:result.data[0].upcomingBooking,
            })
        }).catch((err)=>console.log(err))

        axios.get(`http://localhost:8080/api/review/user`, { headers: { Authorization: `Bearer ${jwt}` } }).then((result)=>{
            this.setState({
                reviewArray:result.data
            })
        }).catch((err)=>console.log(err))

    }

    componentWillUpdate=(nextProps, nextState) =>{
        if (nextState.pastBooking != this.state.pastBooking ) {
          this.renderPast()
        }
        if (nextState.upcomingBooking != this.state.upcomingBooking ) {
            this.renderUpcoming()
          }
      }

    handleToggle=(type,id)=>{
        return new Promise((resolve,reject)=>{
            this.setState({
                modal:type,
                bookingID:id
            })
            resolve()
        }).then(()=>{
            this.renderModal()
        })
        
    }


    renderModal=()=>{
        if(this.state.bookingID){
            const jwt = localStorage.getItem('petvago-token');

            axios.get(`http://localhost:8080/api/booking/info/${this.state.bookingID}`, { headers: { Authorization: `Bearer ${jwt}` } }).then((result)=>{
                
                let data=result.data[0];
                let vaccine=data.vaccineRequirement.vaccine.join(', ')
                let service=data.service;
                let newService=[];
    
                for (let [key, value] of Object.entries(service)) {
                    newService.push(key+' ('+value+') ');
                }
                newService=newService.join(', ')
    
                let startDate=new Date(data.startDate)
                var dd = startDate.getDate();
                var mm = startDate.getMonth() + 1; 
                var yyyy = startDate.getFullYear();
                startDate = dd + '/' + mm + '/' + yyyy;
    
                let endDate=new Date(data.endDate)
                var dd2 = endDate.getDate();
                var mm2 = endDate.getMonth() + 1; 
                var yyyy2 = endDate.getFullYear();
                endDate = dd2 + '/' + mm2 + '/' + yyyy2;

                let orderDate=null;
    
                if(data.orderDate){
                    orderDate=new Date(data.orderDate)
                    var dd3 = orderDate.getDate();
                    var mm3 = orderDate.getMonth() + 1; 
                    var yyyy3 = orderDate.getFullYear();
                    orderDate = dd3 + '/' + mm3 + '/' + yyyy3;
                }else{
                    orderDate=null
                }
                
    
    
                this.setState({
                    orderDate:orderDate,
                    ownerName:data.ownerName,
                    hotelName:data.hotelName,
                    ownerPhone:data.ownerPhone,
                    petName:data.petName,
                    petWeight:data.petWeight,
                    petType:data.petType,
                    vaccineRequirement:vaccine,
                    service:newService,
                    totalPrice:data.totalPrice,
                    startDate:startDate,
                    endDate:endDate,
                    roomType:data.roomType,
    
                })
                }).then(()=>{
                    
                    if(this.state.modal && this.state.modal=='upcoming'){
                        this.setState({
                            modalBody: ( <div>
                                <div className="modal-body mybooking-modal-body">
                                <p> Reference number: {this.state.bookingID}</p>
                                <p> Order date: {this.state.orderDate!=null ? this.state.orderDate: '-'}</p>
                                <p style={{marginTop:'30px'}}> Owner's name: {this.state.ownerName}</p>
                                <p> Phone number: {this.state.ownerPhone}</p>
                                <p> Pet's name: {this.state.petName}</p>
                                <p> Pet's weight: {this.state.petWeight}</p>
                                <p> Pet type: {this.state.petType}</p>
                                <p> Vaccine requirement: {this.state.vaccineRequirement}</p>

                                <p style={{marginTop:'30px'}}> Hotel name: {this.state.hotelName}</p>
                                <p> Room type: {this.state.roomType}</p>
                                <p> Service: {this.state.service}</p>
                                <p> Date: {this.state.startDate} - {this.state.endDate}</p>
                                <p> Price: ${this.state.totalPrice}</p>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn mybooking-button">Contact Hotel</button>
                                </div>
                            </div>)
                        });
                       
                    }else if(this.state.modal && this.state.modal=='past'){

                        let isReviewed=this.state.reviewArray.filter((each)=>{
                            if (each.bookingID==this.state.bookingID){
                                return true
                            }else{return false}
                        })

                        console.log('isReviewed',isReviewed)

                        const changeRating=( newRating ) =>{
                            return new Promise((resolve,reject)=>{
                                this.setState({
                                    rating: newRating
                                  });
                                  resolve()
                            }).then(()=>{
                                set()
                            })
                          }

                        const set=()=>{
                            if (isReviewed.length==0){
                                this.setState({
                                    modalBody: ( <div>
                                           <div className="modal-body mybooking-modal-body">
                                        <p> Reference number: {this.state.bookingID}</p>
                                        <p> Order date: {this.state.orderDate!=null ? this.state.orderDate: '-'}</p>
                                        <p style={{marginTop:'30px'}}> Owner's name: {this.state.ownerName}</p>
                                        <p> Phone number: {this.state.ownerPhone}</p>
                                        <p> Pet's name: {this.state.petName}</p>
                                        <p> Pet's weight: {this.state.petWeight}</p>
                                        <p> Pet type: {this.state.petType}</p>
                                        <p> Vaccine requirement: {this.state.vaccineRequirement}</p>
        
                                        <p style={{marginTop:'30px'}}> Hotel name: {this.state.hotelName}</p>
                                        <p> Room type: {this.state.roomType}</p>
                                        <p> Service: {this.state.service}</p>
                                        <p> Date: {this.state.startDate} - {this.state.endDate}</p>
                                        <p> Price: ${this.state.totalPrice}</p>
        
                                        <div className="booking-line" style={{marginBottom:'20px'}} ></div> 
        
                                        <p style={{marginTop:'20px',marginBottom:'10px',fontSize:'20px'}}><FontAwesomeIcon icon="thumbs-up" style={{marginRight:'10px', color:'#50b5a9'}}/>Write a review</p>
                                        <Ratings
                                            rating={this.state.rating}
                                            widgetRatedColors="yellow"
                                            widgetDimensions="25px"
                                            changeRating={changeRating}
                                        >
                                            <Ratings.Widget widgetHoverColor="yellow"/>
                                            <Ratings.Widget widgetHoverColor="yellow"/>
                                            <Ratings.Widget widgetHoverColor="yellow"/>
                                            <Ratings.Widget widgetHoverColor="yellow" />
                                            <Ratings.Widget widgetHoverColor="yellow"/>
                                        </Ratings>
                                        <div className="form-group" style={{marginTop:'10px'}}>
                                        <textarea className="form-control" rows="3" onChange={this.writeReview}></textarea>
                                        </div>
                                      
        
                                        <button type="button" className="btn mybooking-button" data-dismiss="modal" onClick={this.submitReview}>Submit</button>
                    
                                        </div>
                                    </div>)
                                });      

                            }else{
                                this.setState({
                                    modalBody: ( <div>
                                           <div className="modal-body mybooking-modal-body">
                                        <p> Reference number: {this.state.bookingID}</p>
                                        <p> Order date: {this.state.orderDate!=null ? this.state.orderDate: '-'}</p>
                                        <p style={{marginTop:'30px'}}> Owner's name: {this.state.ownerName}</p>
                                        <p> Phone number: {this.state.ownerPhone}</p>
                                        <p> Pet's name: {this.state.petName}</p>
                                        <p> Pet's weight: {this.state.petWeight}</p>
                                        <p> Pet type: {this.state.petType}</p>
                                        <p> Vaccine requirement: {this.state.vaccineRequirement}</p>
        
                                        <p style={{marginTop:'30px'}}> Hotel name: {this.state.hotelName}</p>
                                        <p> Room type: {this.state.roomType}</p>
                                        <p> Service: {this.state.service}</p>
                                        <p> Date: {this.state.startDate} - {this.state.endDate}</p>
                                        <p> Price: ${this.state.totalPrice}</p>
        
                                        <div className="booking-line" style={{marginBottom:'20px'}} ></div> 
    
        
                                        <p style={{marginTop:'20px',marginBottom:'10px',fontSize:'20px'}}><FontAwesomeIcon icon="thumbs-up" style={{marginRight:'10px', color:'#50b5a9'}}/>Your review</p>
                                        <Ratings
                                            rating={isReviewed[0].rating}
                                            widgetRatedColors="yellow"
                                            widgetDimensions="25px"
                                        >
                                            <Ratings.Widget/>
                                            <Ratings.Widget/>
                                            <Ratings.Widget/>
                                            <Ratings.Widget/>
                                            <Ratings.Widget/>

                                        </Ratings>
                                        <p>{isReviewed[0].comment}</p>
                                   
                                    </div>
                                    </div>)
                                });      

                            }
                            
                        }
                      set()
                      
                    }

                }).catch(err=>console.log(err))
        }
    }


  
    
    writeReview=(e)=>{
        this.setState({
            review:e.target.value
        })
    }

    submitReview=(e)=>{
        console.log(this.state.review)
    }

    renderPast=()=>{
        if(this.state.pastBooking){
            function compare(a,b) {
                if (a.startDate < b.startDate)
                  return 1;
                if (a.startDate > b.startDate)
                  return -1;
                return 0;
              }

              let array=this.state.pastBooking; 
              array.sort(compare);

            return (
                array.map((each)=>{

                     //format date
                    let startDate=new Date(each.startDate)
                    var dd = startDate.getDate();
                    var mm = startDate.getMonth() + 1; 
                    var yyyy = startDate.getFullYear();
                    startDate = dd + '/' + mm + '/' + yyyy;

                    let endDate=new Date(each.endDate)
                    var dd2 = endDate.getDate();
                    var mm2 = endDate.getMonth() + 1; 
                    var yyyy2 = endDate.getFullYear();
                    endDate = dd2 + '/' + mm2 + '/' + yyyy2;

                    return (
                 
                            <div className="mybooking-each-box" >
                            <button className="mybooking-toggle-button" type="button" data-toggle="modal" data-target="#exampleModal" onClick={()=>this.handleToggle('past',each.bookingID)}>
                                </button>
                                <img className='mybooking-icon' key={each.id} src={each.hotelIconPath} alt="hotel"/>
                                <p><FontAwesomeIcon icon="hotel" style={{marginRight:'10px', color:'#50b5a9'}}/> {each.hotelName}</p>
                                <div className='mybooking-each-box-text' style={{display:'flex'}}><div><FontAwesomeIcon icon="calendar-alt" style={{marginRight:'12px', marginLeft:'2px',color:'#50b5a9'}}/> </div><div>{startDate} - {endDate}</div></div>
                            </div>
                 
                    )
                })
            )

        }
        
    }

    renderUpcoming=()=>{
        if(this.state.upcomingBooking){
            function compare(a,b) {
                if (a.startDate < b.startDate)
                  return -1;
                if (a.startDate > b.startDate)
                  return 1;
                return 0;
              }

              let array=this.state.upcomingBooking; 
              array.sort(compare);
              
            return (
                array.map((each)=>{

                     //format date
                    let startDate=new Date(each.startDate)
                    var dd = startDate.getDate();
                    var mm = startDate.getMonth() + 1; 
                    var yyyy = startDate.getFullYear();
                    startDate = dd + '/' + mm + '/' + yyyy;

                    let endDate=new Date(each.endDate)
                    var dd2 = endDate.getDate();
                    var mm2 = endDate.getMonth() + 1; 
                    var yyyy2 = endDate.getFullYear();
                    endDate = dd2 + '/' + mm2 + '/' + yyyy2;

                    return (
                 
                            <div className="mybooking-each-box">
                                <button className="mybooking-toggle-button" type="button" data-toggle="modal" data-target="#exampleModal" onClick={()=>this.handleToggle('upcoming',each.bookingID)}>
                                </button>
                                <img className='mybooking-icon' key={each.id} src={each.hotelIconPath} alt="hotel"/>
                                <p><FontAwesomeIcon icon="hotel" style={{marginRight:'10px', color:'#50b5a9'}}/> {each.hotelName}</p>
                                <div className='mybooking-each-box-text' style={{display:'flex'}}><div><FontAwesomeIcon icon="calendar-alt" style={{marginRight:'12px', marginLeft:'2px',color:'#50b5a9'}}/> </div><div>{startDate} - {endDate}</div></div>
                            </div>
                 
                    )
                })
            )

        }
        
    }


    render(){
        return(<div className="myBooking row">

        <div className="col-8">
        
        <h1 style={{marginBottom:'20px'}}>Upcoming Booking</h1>
        <div className="myBooking-wrap">
            {this.renderUpcoming()}
        </div>

        <div className="booking-line" style={{marginBottom:'20px'}} ></div> 

        <h1 style={{marginBottom:'20px',marginTop:'20px'}}>History</h1>
        <div className="myBooking-wrap">
            {this.renderPast()}
        </div>

        </div>

        <div className="col-4 myBooking-info">
           <h1 style={{marginBottom:'20px',marginTop:'20px'}}> My information</h1>
           <div className="booking-line" style={{marginBottom:'20px'}} ></div> 
                <p><FontAwesomeIcon icon="user" style={{marginRight:'10px', color:'#50b5a9'}}/> {this.state.username}</p>
                <p><FontAwesomeIcon icon="envelope" style={{marginRight:'10px',color:'#50b5a9'}}/> {this.state.email}</p>
                <p><FontAwesomeIcon icon="phone" style={{marginRight:'10px',color:'#50b5a9'}}/>{this.state.telephone}</p>
        
        </div>

        <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title mybooking-modal-title" id="exampleModalLabel"><FontAwesomeIcon icon="receipt" style={{marginRight:'10px', color:'#50b5a9'}}/>Booking detail</h5>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
             
                   {this.state.modalBody}

                
                </div>
            </div>
        </div>
                    
        </div>)
    }

}

export default withRouter(Confirmation);