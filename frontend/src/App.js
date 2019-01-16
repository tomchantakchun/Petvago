import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from './component/Login/Login'
import AuthenticatedComponent from './component/Login/AuthenticatedComponent'

const Logged = () => {
  return (
    <h1>You are logged in</h1>
  )
}

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Switch>
            <Route exact path='/login' component={Login} />
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