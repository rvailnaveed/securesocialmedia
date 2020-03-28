import React, {Component} from 'react';
import {Navbar, Nav} from 'react-bootstrap';

export default class Navigation extends Component{
    render(){
        return (
            <Navbar bg="danger" variant="dark" fixed="top">
                <Navbar.Brand>Twooter</Navbar.Brand>
                    <Nav className="justify-content-end" >
                        <Nav.Link href="/">My Feed</Nav.Link>
                        <Nav.Link href="/group">Group</Nav.Link>
                    </Nav>
            </Navbar>
        )
    }
}
