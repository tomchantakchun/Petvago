import React from 'react';
import classes from './Login.module.css'
import axios from 'axios'
import { withRouter } from 'react-router-dom';
import Facebook from './Facebook';
import Instagram from './Instagram';

class Login extends React.Component {
    state = {
        name: '',
        password: '',
        loginFailed: false,
        signupFailed: false,
        errorMessage: ''
    }

    handleSubmit = (e) => {
        e.preventDefault();

        console.log(`http://localhost:8080/auth/jwt`);
        axios.post(`http://localhost:8080/auth/jwt`,
            {
                name: this.state.name,
                password: this.state.password
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
                    this.props.history.push('/')
                }
            })
            .catch((err)=>{
                if (err.response.status === undefined) {
                    this.loginFailed()
                } else if (err.response.status === 401) {
                    this.loginFailed()
                }
            })
    }

    handleSignup = () => {
        axios.post('http://localhost:8080/auth/signupjwt',
            {
                name: this.state.name,
                password: this.state.password
            })
            .then(response => {
                if (response.data === null) {
                    this.signupFailed();
                } else if (response.data.token === undefined) {
                    this.setState({errorMessage:response.body})
                } else {
                    console.log('Signup succeeded, setting token');
                    console.log(`Setting tokent to localstorage: ${'petvago-token'}`);
                    console.log(`Token: ${response.data.token}`);
                    localStorage.setItem('petvago-token', response.data.token);
                    this.props.history.push('/')
                }
            })
            .catch((err)=>{
                console.log(err);
                this.signupFailed();
            })
    }

    loginFailed() {
        console.log('Login failed')
        this.setState({ name: '', password: '', loginFailed: true })
    }

    signupFailed() {
        console.log('Signup failed')
        this.setState({ name: '', password: '', signupFailed: true })        
    }

    handleChangeName = (e) => {
        this.setState({ name: e.currentTarget.value })
    }
    handleChangePassword = (e) => {
        this.setState({ password: e.currentTarget.value })
    }

    redirectToIndex = () => {
        this.props.history.push('/')
    }

    render() {
        return (
            <div className={classes.Login}>
                <section>
                    <h1>Please login</h1>
                    <form>
                        <h6>Name: </h6>
                        <input type='text' name='name' className={classes.TextBox} onChange={this.handleChangeName} value={this.state.name}></input>
                        <h6>Password: </h6>
                        <input type='password' name='password' className={classes.TextBox} onChange={this.handleChangePassword} value={this.state.password}></input>
                        {this.state.loginFailed ? <h6 className={classes.loginFailed}>Incorrect username or password</h6> : null}
                        {this.state.signupFailed ? <h6 className={classes.loginFailed}>Signup failed</h6> : null}
                        <h6>{this.state.errorMessage}</h6>
                        <input type='submit' value='Submit' className={classes.Submit} onClick={this.handleSubmit}></input>
                    </form>
                    <button className={classes.Signup} onClick={this.handleSignup}>Signup</button>
                    <Facebook redirectToIndex={this.redirectToIndex}/>
                    <Instagram redirectToIndex={this.redirectToIndex}/>
                </section>
            </div>
        )
    }
}

export default withRouter(Login);