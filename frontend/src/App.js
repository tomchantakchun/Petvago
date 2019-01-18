import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from './component/Login/Login';
import Search from './component/Search/Search'
import User from './component/User';
import MessageBox from './component/MessageBox';
import AuthenticatedComponent from './component/Login/AuthenticatedComponent'

const Logged = (props) => {
  return (
    <h1>You are logged in as {props.username}</h1>
  )
}

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Switch>
          <Route exact path='/search' component={Search} />
          {/* <Route exact path='/result' component={Result} /> */}
            <Route exact path='/login' component={Login} />
            <Route exact path='/user' component={User} />
            <Route exact path='/messagebox' component={MessageBox} />
            <AuthenticatedComponent>
              <Route exact path='/' component={Logged} />
            </AuthenticatedComponent>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
