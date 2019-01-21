import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from './component/Login/Login'
import User from './component/User/User'
import AuthenticatedComponent from './component/Login/AuthenticatedComponent'
import Navigationbar from './component/Navbar/Navbar'

const Logged = (props) => {
  return (
    <h1>You are logged in as {props.username}</h1>
  )
}

class App extends Component {
  render() {
    return (
      
      <div><Navigationbar/>
      <Router>
        <div className="App">
          <Switch>
            <Route exact path='/login' component={Login} />
            <Route exact path='/user' component={User} />
            <Route exact path='/' component={Logged} />
            <AuthenticatedComponent>
              
            </AuthenticatedComponent>
          </Switch>
        </div>
      </Router>
      </div>
    );
  }
}

export default App;
