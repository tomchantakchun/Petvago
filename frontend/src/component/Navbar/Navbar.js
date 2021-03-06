import React from 'react';
import { connect } from 'react-redux';

import "./Navbar.css"

class Navigationbar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            token:this.props.token
        }
    }
    componentDidMount() {
        this.isLoggedInNavbar();
    }

    
    componentWillUpdate=(nextProps, nextState) =>{
        if (nextState.token !== this.state.token ) {
            console.log('22222')
        }
        
      }

    isLoggedInNavbar() {
        
        if (!localStorage.getItem('petvago-token')) {
            return this.guestNavbar();
        } else {
            let user=JSON.parse(window.atob(localStorage.getItem('petvago-token').split('.')[1]));
            if(user.isHotel===false){
                return this.userNavbar();
            }else{
                return this.hotelNavbar();
            }
        }
    }

    handleLogout = () => {
        localStorage.removeItem('petvago-token');
    }

    guestNavbar() {
        return (
            <div className="navbar-container">
                <nav className="navbar navbar-expand-lg navbar-dark bg-info fixed-top">
                    <div className="d-flex flex-grow-1 responsive-nav">
                        {/* <span className="w-100 d-lg-none d-block"></span> */}
                        <a className="navbar-brand d-none d-lg-inline-block" href="/"> </a>
                        <a className="navbar-brand-two mx-auto d-lg-none d-inline-block" href="/"> </a>
                        <div className="w-100 text-right">
                            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#myNavbar">
                                <span className="navbar-toggler-icon">
                                
                                </span>
                            </button>

                        </div>
                    </div>
                        
                    <div className="collapse navbar-collapse flex-grow-1 text-right" id="myNavbar">
                        <ul className="navbar-nav ml-auto flex-nowrap">
                            <li className="nav-item">
                                <a href="/becomehost" className="nav-link m-2 menu-item nav-active">Become a host </a>
                            </li>
                            <li className="nav-item">
                                <a href="/login" className="nav-link m-2 menu-item">Login</a>
                            </li>
                            <li className="nav-item">
                                <a href="/login" className="nav-link m-2 menu-item"> Sign up</a>
                            </li>
                        </ul>
                    </div>

                </nav>
            </div>
        );    
        
    }

    userNavbar() {
        return (
            <div className="navbar-container">
                <nav className="navbar navbar-expand-lg navbar-dark bg-info fixed-top">
                    <div className="d-flex flex-grow-1 responsive-nav">
                        {/* <span className="w-100 d-lg-none d-block"></span> */}
                        <a className="navbar-brand d-none d-lg-inline-block" href="/"> </a>
                        <a className="navbar-brand-two mx-auto d-lg-none d-inline-block" href="/"> </a>
                        <div className="w-100 text-right">
                            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#myNavbar">
                                <span className="navbar-toggler-icon">
                                
                                </span>
                            </button>
                        </div>
                    </div>
                    <div className="collapse navbar-collapse flex-grow-1 text-right" id="myNavbar">
                        <ul className="navbar-nav ml-auto flex-nowrap">
                            <li className="nav-item">
                                <a href="/message" className="nav-link m-2 menu-item nav-active">Message</a>
                            </li>
                            <li className="nav-item">
                                <a href="/mybooking" className="nav-link m-2 menu-item">Booking</a>
                            </li>
                            <li className="nav-item" onClick={this.handleLogout}>
                                <a href="/" className="nav-link m-2 menu-item">Logout</a>
                            </li>
                        </ul>
                    </div>

                </nav>
            </div>

        );
    }

    hotelNavbar() {
        return (
            <div className="navbar-container">
                <nav className="navbar navbar-expand-lg navbar-dark bg-info fixed-top">
                    <div className="d-flex flex-grow-1 responsive-nav">
                        {/* <span className="w-100 d-lg-none d-block"></span> */}
                        <a className="navbar-brand d-none d-lg-inline-block" href="/"> </a>
                        <a className="navbar-brand-two mx-auto d-lg-none d-inline-block" href="/"> </a>
                        <div className="w-100 text-right">
                            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#myNavbar">
                                <span className="navbar-toggler-icon">
                                
                                </span>
                            </button>
                        </div>
                    </div>
                    <div className="collapse navbar-collapse flex-grow-1 text-right" id="myNavbar">
                        <ul className="navbar-nav ml-auto flex-nowrap">
                            <li className="nav-item">
                                <a href="/message" className="nav-link m-2 menu-item nav-active">Message</a>
                            </li>
                            <li className="nav-item">
                                <a href="/host-management" className="nav-link m-2 menu-item">Host Management</a>
                            </li>
                            <li className="nav-item" onClick={this.handleLogout}>
                                <a href="/" className="nav-link m-2 menu-item">Logout</a>
                            </li>
                        </ul>
                    </div>

                </nav>
            </div>

        );
    }


    



    render() {
        return (
            this.isLoggedInNavbar()
        )
    }
}

const mapStateToProps = state => {
    return {
        token:state.login.token
    }
};

export default connect( mapStateToProps)(Navigationbar);