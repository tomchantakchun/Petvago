import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

class Confirmation extends Component {
    constructor(props){
        super(props);
        this.state={ 
          
        }
    }

    componentDidMount(){
        const jwt = localStorage.getItem('petvago-token');
        if (!jwt) {
            this.props.history.push('/login')
        }
        axios.get(`http://localhost:8080/api/booking/user`, { headers: { Authorization: `Bearer ${jwt}` } }).then((result)=>{
            console.log(result)
        }).catch((err)=>console.log(err))
    }

    render(){
        return(<div>
            Hello
        </div>)
    }

}

export default withRouter(Confirmation);