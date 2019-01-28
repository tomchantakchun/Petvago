import React from 'react';

import "./Navbar.css"

class Navigationbar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    componentDidMount() {
        this.isLoggedInNavbar();

    }
    isLoggedInNavbar() {
        if (!localStorage.getItem('petvago-token')) {
            return this.guestNavbar();
        } else {
            return this.userNavbar();
        }
    }

    handleLogout = () => {
        localStorage.removeItem('petvago-token');
    }

    guestNavbar() {
        return (
            <div className="navbar-container">
                <nav className="navbar navbar-expand-lg navbar-dark bg-info fixed-top">
                    <div className="d-flex flex-grow-1">
                        {/* <span className="w-100 d-lg-none d-block"></span> */}
                        <a className="navbar-brand d-none d-lg-inline-block" href="/"></a>
                        <a className="navbar-brand-two mx-auto d-lg-none d-inline-block" href="/"></a>
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
                                <a href="/login" className="nav-link m-2 menu-item">login</a>
                            </li>
                            <li className="nav-item">
                                <a href="/signup" className="nav-link m-2 menu-item"> Sign up</a>
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
                    <div className="d-flex flex-grow-1">
                        {/* <span className="w-100 d-lg-none d-block"></span> */}
                        <a className="navbar-brand d-none d-lg-inline-block" href="/"></a>
                        <a className="navbar-brand-two mx-auto d-lg-none d-inline-block" href="/"></a>
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
                                <a href="/mybooking" className="nav-link m-2 menu-item">{this.props.userName}'s booking</a>
                            </li>
                            <li className="nav-item" onClick={this.handleLogout}>
                                <a href="/logout" className="nav-link m-2 menu-item">Logout</a>
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

export default Navigationbar;