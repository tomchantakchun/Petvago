import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from './component/Login/Login';
import Search from './component/Search/Search'
import User from './component/User';
import MessageBox from './component/MessageBox';
import AuthenticatedComponent from './component/Login/AuthenticatedComponent'
import GoogleMap from './component/GoogleMap/GoogleMap'

const Logged = (props) => {
  return (
    <div>
      <h1>You are logged in as {props.username}</h1>
      <GoogleMap 
        markerArray={[
          {
            coords:{lat:22.320188,lng:114.175812},
            content:'<h1>Dogotel & Spa</h1>'
          }
        ]} 
        zoom={13} height={300} width={400}
      />
    </div>
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
