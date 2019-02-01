import React from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';

class User extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            response:null
        }
        this.children = null
    }

    componentDidMount() {
        const jwt = localStorage.getItem('petvago-token');
        if (!jwt) {
            this.props.history.push('/login')
        }

        axios.get(`http://petvago.site/api/userprofile`,{ headers: { Authorization: `Bearer ${jwt}` } }).then(res=>{
            this.setState({response:res.data[0]})
            console.log('userprofile',this.state.response)
        }).catch(err => {
            console.log(err)
        })

       
    }

  

    render() {
        if (!this.state.response) {
            return (
                <div>Loading ... </div>
            )
        }else{
            return (
                <div>
                Welcome back, {this.state.response.username}
                </div>
            )

        }

        
    }
}

export default withRouter(User);