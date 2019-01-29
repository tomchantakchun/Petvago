import React from 'react';
import axios from 'axios';
import './message.css'
import { withRouter } from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMapMarkerAlt , faUser ,faPhone, faEnvelope} from '@fortawesome/free-solid-svg-icons'
import { Input , Button , MessageList } from 'react-chat-elements'
import 'react-chat-elements/dist/main.css';
library.add(faMapMarkerAlt)
library.add(faUser)
library.add(faPhone)
library.add(faEnvelope)

 

class Chatroom extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activeBooking:null,
            chat:null,
            author:null,
            body:null,
            conversationID:null,
        }
    }



    componentDidMount() {
        const jwt = localStorage.getItem('petvago-token');
        if (!jwt) {
            this.props.history.push('/login')
        }

        

        let promise=new Promise((resolve,reject)=>{
            let user=JSON.parse(window.atob(localStorage.getItem('petvago-token').split('.')[1]));
            this.setState({
                author: user.isHotel==false? 'users':'hotel'
            })
            resolve()
        })

        promise.then(()=>{
            axios.get(`http://localhost:8080/api/chatroom/message/${this.props.location.state.conversationID}`,{ headers: { Authorization: `Bearer ${jwt}` } }).then(res=>{
            let newArr=res.data.map((each)=>{
                each.text=each.body;
                each.date=new Date(each.created_at);
                each.position=Object.keys(each.authorID)[0]==this.state.author? 'right':'left';
                return each
            })
            this.setState({
                chat:newArr
            })
        }).catch(err => {
            console.log(err)
        })

            if(this.state.author=='users'){
                axios.get(`http://localhost:8080/api/chatroom/activebooking/${this.props.location.state.conversationID}`,{ headers: { Authorization: `Bearer ${jwt}` } }).then(res=>{
                    console.log('active booking',res.data)
                    this.setState({
                        activeBooking:res.data[0],
                        conversationID:this.props.location.state.conversationID
                    })
                }).catch(err => {
                    console.log(err)
                })
            }else{
                axios.get(`http://localhost:8080/api/chatroom/userinfo/${this.props.location.state.conversationID}`,{ headers: { Authorization: `Bearer ${jwt}` } }).then(res=>{
                    console.log('active booking for hotel',res.data)
                    this.setState({
                        activeBooking:res.data[0],
                        conversationID:this.props.location.state.conversationID
                    })
                }).catch(err => {
                    console.log(err)
                })

            }

        })

        

    }

    componentWillUpdate=(nextProps, nextState) =>{
        if (nextState.activeBooking != this.state.activeBooking ) {
          this.renderActive()
        }

        if (nextState.chat != this.state.chat ) {
            return new Promise((resolve,reject)=>{
                this.renderChat()
                resolve(111)
            }).then((data)=>{
                console.log('scroll sent')
                this.scrollToBottom()
            })
           
          }
        
      }


    renderActive=()=>{
        if(this.state.activeBooking && this.state.author=="users"){
            return(
                this.state.activeBooking.activeBooking.map((each)=>{
                    //format date
                    let startDate=new Date(each.startDate)
                    var dd = startDate.getDate();
                    var mm = startDate.getMonth() + 1; 
                    var yyyy = startDate.getFullYear();
                    startDate = dd + '/' + mm + '/' + yyyy;

                    if(!each.startDate){
                        return <div><p>No active booking.</p></div>
                    }
                    return(<div key={each.bookingID}>
                        <p>{each.roomType} - {startDate}</p>
                        </div>)
                })
            )
        }
    }

    renderChat=()=>{
        if(this.state.chat){
            return(
                <MessageList
                            className='message-list'
                            lockable={true}
                            toBottomHeight={'100%'}
                            dataSource={this.state.chat} />
            )
        }
        
    }

    scrollToBottom = () => {
        if(this.state.activeBooking){
            console.log('scroll')
            this.el.scrollIntoView();
        }
        
    }

    input=(e)=>{
        this.setState({
            body:e.target.value
        })
    }

    send=()=>{
        this.refs.input.clear();
        let data={
            body:this.state.body,
            type:'text'
        }
        let date=new Date();
        let chat=this.state.chat;
        const jwt = localStorage.getItem('petvago-token');

        axios.post(`http://localhost:8080/api/chatroom/sendmessage/${this.state.conversationID}`,data,{ headers: { Authorization: `Bearer ${jwt}` } }).then(res=>{
            console.log('sent',res.data)
            let newArray=[...chat,{text:data.body,type:data.type,position:'right',date} ]
            this.setState({chat:newArray})
           
        }).catch(err => {
            console.log(err)
        })
    }

    renderBox=()=>{
        if (this.state.activeBooking && this.state.author=="users"){
            return(<div><img className='chatRoom-icon' src={this.state.activeBooking.icon} alt="icon"/>
            <p style={{ marginTop:'20px'}}>{this.state.activeBooking.hotelName}</p>
            <p style={{fontSize:'16px', marginTop:'20px', textAlign:'center'}}><FontAwesomeIcon icon="map-marker-alt" style={{marginRight:'10px', color:'#50b5a9'}}/>{this.state.activeBooking.address}</p>
            </div>)
        }else if(this.state.activeBooking && this.state.author=="hotel"){
            return(<div>
                <p style={{ marginTop:'20px', textAlign:'center'}}><FontAwesomeIcon icon="user" style={{marginRight:'10px', color:'#50b5a9'}}/>{this.state.activeBooking.username}</p>
                <p style={{fontSize:'16px', marginTop:'20px', textAlign:'center'}}><FontAwesomeIcon icon="phone" style={{marginRight:'10px', color:'#50b5a9'}}/>{this.state.activeBooking.telephone}</p>
                <p style={{ fontSize:'16px', marginTop:'20px', textAlign:'center'}}><FontAwesomeIcon icon="envelope" style={{marginRight:'10px', color:'#50b5a9'}}/>{this.state.activeBooking.email}</p>

        
            </div>)
        }
    }


    render() {
        if (!this.state.activeBooking) {
            return (
                <div style={{display:'flex',justifyContent:'center',marginTop:'40vh',alignItems:'center'}}><img src="./image/run.gif" alt='loading'/>
                <p style={{marginLeft:'20px'}}>Loading...</p>
                </div>
                
            )
        }else{
            return (
               
                <div className="chatroomBox row">
                
                    <div className="activeChat-box col-4 d-flex flex-column align-items-center">
                        {this.renderBox()}
                    <div className='activeBooking'>
                        <p style={{fontWeight:'bold'}}>Active booking:</p>
                        {this.renderActive()}
                    </div>
                        
                    
                    </div>
                    <div className="activeChat col-8">
                    {this.renderChat()}
                    
                    <div ref={el => { this.el = el; }} />
                   
                    <Input
                        placeholder="Type here..."
                        ref='input'
                        onChange={this.input}
                        multiline={true}
                        rightButtons={
                            <Button
                                color='white'
                                onClick={this.send}
                                text='Send'/>
                                
                        }/>

                     
                    
                    
                    </div>
                    
                </div>
            )

        }

        
    }
}

export default withRouter(Chatroom);