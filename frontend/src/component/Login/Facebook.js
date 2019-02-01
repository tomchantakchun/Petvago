import React from 'react';
import FacebookLogin from 'react-facebook-login';
import axios from 'axios';

class Facebook extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            isLoggedIn: false,
            isClicked: false
        }
    }

    facebookClicked = () => {
        this.setState({isClicked: true})
    }

    responseFacebook = (response) => {

        if (this.state.isClicked) {
            axios.post(`http://petvago.site/auth/facebook`,
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
    }

    render () {
        let fbContent;

        if (this.state.isLoggedIn) {
            fbContent = null;
        } else {
            fbContent = (
                <FacebookLogin
                    appId={process.env.REACT_APP_FACEBOOK_APP_ID || ''}
                    autoLoad={false}
                    fields="name,email,picture"
                    onClick={this.facebookClicked}
                    callback={this.responseFacebook}
                    cssClass='facebook-login btn' />
            )
        }

        return <div>
            {fbContent}
        </div>;
    }
}

export default Facebook;