import React from 'react';
import InstagramLogin from 'react-instagram-login';
import axios from 'axios';

class Instagram extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            isLoggedIn: false    
        }
    }

    responseInstagram = (response) => {
        console.log(response);

        console.log(`http://localhost:8080/auth/instagram`);
        axios.post(`http://localhost:8080/auth/instagram`,
            {
                accessToken: response,
            })
            .then(response => {
                if (response.data === null) {
                    console.log('Login failed')
                } else if (!response.data.token) {
                    console.log('Login failed')
                } else {
                    console.log('Login succeeded, setting token');
                    console.log(`Setting tokent to localstorage: ${'petvago-token'}`);
                    console.log(`Token: ${response.data.token}`);
                    localStorage.setItem('petvago-token', response.data.token);
                    this.props.redirectToIndex()
                }
            })
            .catch((err)=>{ 
                if (err.response === undefined) {
                    console.log(err);
                } else if (err.response.status === undefined) {
                    console.log('Login failed')
                } else if (err.response.status === 401) {
                    console.log('Login failed')
                }
            })
    }

    render () {
        let igContent;

        if (this.state.isLoggedIn) {
            igContent = null;
        } else {
            igContent = (
                <InstagramLogin
                    clientId={process.env.REACT_APP_INSTAGRAM_CLIENT_ID || ''}
                    buttonText="Login with Instagram"
                    onSuccess={this.responseInstagram}
                    onFailure={this.responseInstagram} />
            )
        }

        return <div>
            {igContent}
        </div>;
    }
}

export default Instagram;