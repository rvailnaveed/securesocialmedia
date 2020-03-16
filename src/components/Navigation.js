import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';
import {Navbar, Nav} from 'react-bootstrap';

export default class Navigation extends Component{
    render(){
        return (
            <Navbar bg="dark" variant="dark" >
                <Navbar.Brand>Twooter</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href="/">My Feed</Nav.Link>
                        <Nav.Link href="/error">Error</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        )
    }
}
