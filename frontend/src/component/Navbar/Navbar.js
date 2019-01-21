import React from 'react';
import { Nav, Navbar, NavItem } from 'react-bootstrap';

class Navigationbar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
           
        }
    }
    componentDidMount(){
        this.isLoggedInNavbar();
    
    }
    isLoggedInNavbar () {
        if (!localStorage.getItem('petvago-token')) {
            return this.guestNavbar();
        } else {
            return this.userNavbar();
        }
    }

    
    guestNavbar(){
        return(
            <Navbar inverse collapseOnSelect>
                <Navbar.Header>
                    <Navbar.Brand>
                        <a href="/">Petvago</a>
                    </Navbar.Brand>
                    <Navbar.Toggle />
                </Navbar.Header>
                <Navbar.Collapse>
                    <Nav pullRight>
                        <NavItem eventKey={1} href="#">
                            Become a host
                        </NavItem>
                        <NavItem eventKey={2} href="/login">
                            Login
                        </NavItem>
                        <NavItem eventKey={3} href="#">
                            Sign up
                        </NavItem>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        );
    }

    userNavbar(){
        return(
         <Navbar inverse collapseOnSelect>
                <Navbar.Header>
                    <Navbar.Brand>
                        <a href="/">Petvago</a>
                    </Navbar.Brand>
                    <Navbar.Toggle />
                </Navbar.Header>
                <Navbar.Collapse>
                    <Nav pullRight>
                        <NavItem eventKey={1} href="#">
                            Message
                        </NavItem>
                        <NavItem eventKey={2} href="/user">
                            {this.props.userName}'s booking
                        </NavItem>
                        <NavItem eventKey={3} href="/logout">
                            Logout
                        </NavItem>
                        
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        );    
    }

    companyNavbar(){

    }

    render() {
        return (
            this.isLoggedInNavbar()
        )
    }

}

export default Navigationbar;