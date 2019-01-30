import React from 'react';
import axios from 'axios';
import './message.css'
import { withRouter } from 'react-router-dom';

class MessageBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            who:null,
            chatlist:null
        }
        this.children = null
    }

    componentDidMount() {
        const jwt = localStorage.getItem('petvago-token');
        if (!jwt) {
            this.props.history.push('/login')
        }

        let promise=new Promise((resolve,reject)=>{
            let user=JSON.parse(window.atob(localStorage.getItem('petvago-token').split('.')[1]));
            this.setState({
                who: user.isHotel===false? 'users':'hotel'
            })
            resolve()
        })

        promise.then(()=>{
            if(this.state.who==='users'){
                axios.get('http://localhost:8080/api/chatroom/chatlist/user',{ headers: { Authorization: `Bearer ${jwt}` } }).then(res=>{
                    this.setState({chatlist:res.data})
                    console.log(res.data)
        
                }).catch(err => {
                    console.log(err)
                })
            }else{
                axios.get('http://localhost:8080/api/chatroom/chatlist/hotel',{ headers: { Authorization: `Bearer ${jwt}` } }).then(res=>{
                    this.setState({chatlist:res.data})
                    console.log(res.data)
        
                }).catch(err => {
                    console.log(err)
                })
            }

        })

       


    }

    componentWillUpdate=(nextProps, nextState) =>{
        if (nextState.chatlist !== this.state.chatlist ) {
          this.renderChatlist()
        }
        
      }

    renderChatlist=()=>{
        if(this.state.chatlist){
            if(this.state.who==='users'){
            return(
                this.state.chatlist.map((each)=>{
                    let time=''
                    if(each.lastMessageTime){
                        time=new Date(each.lastMessageTime)
                        time= time.toTimeString();
                        time=time.split(' ')[0];
                        time=time.slice(0,5);
                    }
                    return(
                        <div key={each.conversationID}>
                        <div className='messageBox-conersation row' onClick={()=>this.click(each.conversationID)}>
                        <div className="col-2">
                            <img className='messageBox-icon' src={each.icon} alt="icon"/>
                        </div>
                        <div className="col-3">
                            {each.name}
                        </div>
                        <div className="col-5">
                            {each.lastMessage}
                        </div>
                        <div className="col-2">
                            {time}
                        </div>

                        

                        </div>
                        <div className="booking-line"></div> 
                        </div>
                    )

                })
            )
            }else{
                return(
                    this.state.chatlist.map((each)=>{
                        let time=''
                        if(each.lastMessageTime){
                            time=new Date(each.lastMessageTime)
                            time= time.toTimeString();
                            time=time.split(' ')[0];
                            time=time.slice(0,5);
                        }
                        return(
                            <div key={each.conversationID}>
                            <div className='messageBox-conersation row' onClick={()=>this.click(each.conversationID)}>
                            <div className="col-3">
                                {each.name}
                            </div>
                            <div className="col-7">
                                {each.lastMessage}
                            </div>
                            <div className="col-2">
                                {time}
                            </div>
    
                            
    
                            </div>
                            <div className="booking-line"></div> 
                            </div>
                        )
    
                    })
                )
            }
        }
    }
    
    click=(id)=>{
        this.props.history.push({pathname:'/chatroom',state:{conversationID:id}})
    }

    render() {
        if (!this.state.chatlist) {
            return (
                <div style={{display:'flex',justifyContent:'center',marginTop:'40vh', alignItems:'center'}}><img src="./image/run.gif" alt='loading'/>
                <p style={{marginLeft:'20px'}}>Loading...</p></div>
            )
        }else{
            return (
                <div className="messageBox">
                    <h1 style={{marginBottom:"20px"}}> All message</h1>
                    <div className="booking-line"></div> 

                    {this.renderChatlist()}

                </div>
            )

        }

        
    }
}

export default withRouter(MessageBox);