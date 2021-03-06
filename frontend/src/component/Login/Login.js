import React from 'react';
import classes from './Login.module.css'
import axios from 'axios'
import { withRouter } from 'react-router-dom';
import Facebook from './Facebook';
import Instagram from './Instagram';
import { connect } from 'react-redux';
import {login} from '../../store/actions';
import './facebook.css'


class Login extends React.Component {
    state = {
        name: '',
        password: '',
        isHotel: false,
        loginFailed: false,
        signupFailed: false,
        signupHotelFailed: false,
        errorMessage: '',
        hotelClass:'login-not-chosen',
        customerClass:'login-chosen'
    }

    handleSubmit = (e) => {
        e.preventDefault();

        axios.post(`https://petvago.site/auth/jwt`,
            {
                name: this.state.name,
                password: this.state.password,
                isHotel: this.state.isHotel
            })
            .then(response => {
                if (response.data === null) {
                    this.loginFailed();
                } else if (!response.data.token) {
                    this.loginFailed();
                } else {
                    console.log('Login succeeded, setting token');
                    console.log(`Setting tokent to localstorage: ${'petvago-token'}`);
                    console.log(`Token: ${response.data.token}`);
                    localStorage.setItem('petvago-token', response.data.token);
                    this.props.login(response.data.token)
                    this.props.history.push('/')
                }
            })
            .catch((err) => {
                if (err.response.status === undefined) {
                    this.loginFailed()
                } else if (err.response.status === 401) {
                    this.loginFailed()
                }
            })
    }

    handleSignup = () => {
        if (this.state.isHotel) {
            this.setState({ name: '', password: '', signupHotelFailed: true })
        } else {
            axios.post(`https://petvago.site/auth/signupjwt`,
            {
                name: this.state.name,
                password: this.state.password
            })
            .then(response => {
                if (response.data === null) {
                    this.signupFailed();
                } else if (response.data.token === undefined) {
                    this.setState({ errorMessage: response.body })
                } else {
                    console.log('Signup succeeded, setting token');
                    console.log(`Setting tokent to localstorage: ${'petvago-token'}`);
                    console.log(`Token: ${response.data.token}`);
                    localStorage.setItem('petvago-token', response.data.token);
                    this.props.login(response.data.token)
                    this.props.history.push('/')
                }
            })
            .catch((err) => {
                console.log(err);
                this.signupFailed();
            })
        }
    }

    loginFailed() {
        console.log('Login failed')
        this.setState({ name: '', password: '', loginFailed: true })
    }

    signupFailed() {
        console.log('Signup failed')
        this.setState({ name: '', password: '', signupFailed: true })
    }

    // handleChangeName = (e) => {
    //     this.setState({ name: e.currentTarget.value })
    // }
    // handleChangePassword = (e) => {
    //     this.setState({ password: e.currentTarget.value })
    // }

    handleInputChange = (e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        this.setState({
            [e.target.name]: value
        });
    }

    redirectToIndex = () => {
        this.props.history.push('/')
    }

    chooseCustomer =()=>{
        this.setState({
            hotelClass:'login-not-chosen',
            customerClass:'login-chosen',
            isHotel:false
        })
    }

    chooseHotel=()=>{
        this.setState({
            hotelClass:'login-chosen',
            customerClass:'login-not-chosen',
            isHotel:true
        })
    }

    render() {
        return (
            <div className={classes.Login}>
                <section>
                    <h1>Login</h1>
                    <div >
                    <div style={{display:'flex'}}>
                        <button className={this.state.customerClass} onClick={this.chooseCustomer}>Customer</button>
                        <button className={this.state.hotelClass} onClick={this.chooseHotel}>Hotel</button>
                    </div>
                    <div className="login-form" style={{padding:'10px'}}>
                    <form >
                        <h6>Name: </h6>
                        <input type='text' name='name' className={classes.TextBox} onChange={this.handleInputChange} value={this.state.name}></input>
                        <h6>Password: </h6>
                        <input type='password' name='password' className={classes.TextBox} onChange={this.handleInputChange} value={this.state.password}></input>
                        {this.state.loginFailed ? <h6 className={classes.loginFailed}>Incorrect username or password</h6> : null}
                        {this.state.signupFailed ? <h6 className={classes.loginFailed}>Signup failed</h6> : null}
                        {this.state.signupHotelFailed ? <h6 className={classes.loginFailed}>You cannot signup as hotel</h6> : null}
                        <h6>{this.state.errorMessage}</h6>
                        <input  type='submit' value='Submit' className={classes.Submit} onClick={this.handleSubmit}></input>
                    </form>
                    {this.state.isHotel===false?<button className={classes.Signup} onClick={this.handleSignup}>Signup</button>:null}
                    
                    {this.state.isHotel===false?<Facebook redirectToIndex={this.redirectToIndex} />:null}
                    {this.state.isHotel===false? <Instagram redirectToIndex={this.redirectToIndex} />:null}
                    </div>
                    </div>
                </section>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        login: (data) => { dispatch(login(data)) },
    }
}

const mapStateToProps = state => {
    return {
    }
};

export default connect( mapStateToProps, mapDispatchToProps)(withRouter(Login));