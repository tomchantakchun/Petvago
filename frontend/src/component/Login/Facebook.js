import React from 'react';
import FacebookLogin from 'react-facebook-login';
import axios from 'axios';

class Facebook extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            isLoggedIn: false    
        }
    }

    facebookClicked = () => {
        
    }

    responseFacebook = (response) => {
        console.log(response);

        console.log(`http://localhost:8080/auth/facebook`);
        axios.post(`http://localhost:8080/auth/facebook`,
            {
                name: response.name,
                password: response.name,
                email: response.email
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
                    this.props.history.push('/')
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
        let fbContent;

        if (this.state.isLoggedIn) {
            fbContent = null;
        } else {
            fbContent = (
                <FacebookLogin
                appId={process.env.REACT_APP_FACEBOOK_APP_ID || ''}
                autoLoad={true}
                fields="name,email,picture"
                onClick={this.facebookClicked}
                callback={this.responseFacebook} />
            )
        }

        return <div>
            {fbContent}
        </div>;
    }
}

export default Facebook;