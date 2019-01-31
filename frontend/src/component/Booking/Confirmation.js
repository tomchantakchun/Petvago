import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle, faPrint,faReceipt } from '@fortawesome/free-solid-svg-icons'
library.add(faPrint)
library.add(faCheckCircle)
library.add(faReceipt)


class Confirmation extends Component {
    constructor(props){
        super(props);
        this.state={ 
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
            loading:false
        }
    }

    componentDidMount(){
        console.log(!this.props.location.state)

        if(!this.props.location.state===true){
            console.log('123')
            this.props.history.push('/')
        }else if (!this.props.location.state===false) {
            let promise=new Promise((resolve,reject)=>{
                this.setState({
                    bookingID:this.props.location.state.bookingID
                })
                resolve()
            })

            promise.then(()=>{

                const jwt = localStorage.getItem('petvago-token');
        if (!jwt) {
            this.props.history.push('/login')
            
        }

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

            let orderDate=new Date(data.orderDate)
            var dd3 = orderDate.getDate();
            var mm3 = orderDate.getMonth() + 1; 
            var yyyy3 = orderDate.getFullYear();
            orderDate = dd3 + '/' + mm3 + '/' + yyyy3;


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
            }).catch(err=>console.log(err))

            })
            
        }
                 
    }

    print=()=>{
        window.print()
    }

    done=()=>{

            this.props.history.push('/')

    }

    render(){
        return(
        <div className="confirmation">
            <h1 style={{textAlign:'center'}}>Your order is cofirmed. <FontAwesomeIcon icon="check-circle" style={{marginLeft:'10px', color:'#50b5a9'}}/></h1>
            
            <div className="confirm-box">
            <p className="confrim-title">Your booking <FontAwesomeIcon icon="receipt" style={{marginLeft:'10px'}}/></p>
            <p> Reference number: {this.state.bookingID}</p>
            <p> Order date: {this.state.orderDate}</p>
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








            <div className="confirm-button">
            <button onClick={this.print} className="btn booking-button"><FontAwesomeIcon icon="print" style={{marginRight:'10px', color:'#fff'}}/> Print</button>
            <button onClick={this.done} className="btn booking-button"> Done</button>
            </div>
            
            </div>
            

        </div>
        )
    }
}

export default (withRouter(Confirmation));