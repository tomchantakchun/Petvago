import React, { Component } from 'react';
import 'reset-css';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from './component/Login/Login';
import Search from './component/Search/Search'
import User from './component/User';
import MessageBox from './component/MessageBox';
import AuthenticatedComponent from './component/Login/AuthenticatedComponent'
import GoogleMap from './component/GoogleMap/GoogleMap'
import Navigationbar from './component/Navbar/Navbar'
import Footer from './component/Footer/Footer'
import Homepage from './component/Homepage/Homepage'

import PhotoUpload from './component/PhotoUpload/PhotoUpload'

const TestHome = (props) => {
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
      <img src='https://firebasestorage.googleapis.com/v0/b/petvago-6b2c9.appspot.com/o/lich.png?alt=media&token=cec2bd70-bbf9-4d9b-8ade-0404d537973f' alt='testing lich'></img>
      <PhotoUpload />
      
    </div>
  )
}

class App extends Component {
  render() {
    return (
      
      <div>
      <Router>
        
        <div className="App">
          <Navigationbar/>
          <Switch>
          <Route exact path='/search' component={Search} />
          {/* <Route exact path='/result' component={Result} /> */}
            <Route exact path='/login' component={Login} />
            <Route exact path='/user' component={User} />
            <Route exact path='/' component={TestHome} />
            <Route exact path='/home' component={Homepage} />
            <Route exact path='/message' component={MessageBox} />
            <AuthenticatedComponent>
              
            </AuthenticatedComponent>
          </Switch>
          <Footer/>
        </div>
      </Router>
      
      
      </div>
    );
  }
}

export default App;
