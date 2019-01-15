import React from 'react';
import classes from './Login.module.css'
import axios from 'axios'
import { withRouter } from 'react-router-dom';

class Login extends React.Component {
    state = {
        name: '',
        password: '',
        loginFailed: false
    }

    handleSubmit = (e) => {
        e.preventDefault();

        console.log(`http://localhost:8080/api/login`);
        axios.post(
            `http://localhost:8080/api/login`,
            {
                name: this.state.name,
                password: this.state.password
            })
            .then(response => {
                if (response.data == null) {
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

    loginFailed() {
        console.log('Login failed')
        this.setState({ name: '', password: '', loginFailed: true })
    }

    handleChangeName = (e) => {
        this.setState({ name: e.currentTarget.value })
    }
    handleChangePassword = (e) => {
        this.setState({ password: e.currentTarget.value })
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
                        <input type='submit' value='Submit' className={classes.Submit} onClick={this.handleSubmit}></input>
                    </form>
                    <button className={classes.Facebook}>Facebook</button>
                    <button className={classes.Wechat}>WeChat</button>
                </section>
            </div>
        )
    }
}

export default withRouter(Login);