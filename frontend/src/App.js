import React, { Component } from 'react';
import 'reset-css';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from './component/Login/Login';
import Search from './component/Search/Search';
import User from './component/User';
import MessageBox from './component/MessageBox';
import AuthenticatedComponent from './component/Login/AuthenticatedComponent'
import GoogleMap from './component/GoogleMap/GoogleMap'
import Navigationbar from './component/Navbar/Navbar'
import Footer from './component/Footer/Footer'
import Homepage from './component/Homepage/Homepage'
import EditPage from './component/EditPage/EditPage'
import Booking from './component/Booking/Booking'
import Confirmation from './component/Booking/Confirmation'
import PhotoUpload from './component/PhotoUpload/PhotoUpload'
import SearchResult from './component/SearchResult/SearchResult';
import Hotel from './component/Hotel/Hotel'
import HostManagement from './component/HostManagement/HostMangement';


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
      <div className="App">
  
        <Navigationbar />
        <div className="main-body">
        <Router>
          <Switch>
            <Route exact path='/' component={TestHome} />
            <Route exact path='/home' component={Homepage} />
            <Route exact path='/search' component={Search} />
            <Route exact path='/search_result' component={SearchResult}/> 
            {/* <Route exact path='/result' component={Result} /> */}
            <Route exact path='/login' component={Login} />
            <Route exact path='/user' component={User} />
            <Route exact path='/message' component={MessageBox} />
            <Route exact path='/edit-hotel-info' component={EditPage} />
            <Route exact path='/host-management' component={HostManagement} />
            <Route exact path='/booking' component={Booking} />
            <Route exact path='/hotel' component={Hotel} />
            <Route exact path='/confirmation' component={Confirmation} />


            <AuthenticatedComponent>
            </AuthenticatedComponent>
          </Switch>
        </Router>
        <div className="push"></div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default App;
