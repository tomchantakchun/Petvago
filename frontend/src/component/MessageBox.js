import React from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';

class MessageBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            chatlist:null
        }
        this.children = null
    }

    componentDidMount() {
        const jwt = localStorage.getItem('petvago-token');
        if (!jwt) {
            this.props.history.push('/login')
        }

        axios.get('http://localhost:8080/api/chatroom/chatlist/user',{ headers: { Authorization: `Bearer ${jwt}` } }).then(res=>{
            this.setState({chatlist:res.data})
            console.log(res.data)
        }).catch(err => {
            console.log(err)
        })

    }

  

    render() {
        if (!this.state.chatlist) {
            return (
                <div>Loading ... </div>
            )
        }else{
            return (
                <div>
                Chatlist
                </div>
            )

        }

        
    }
}

export default withRouter(MessageBox);