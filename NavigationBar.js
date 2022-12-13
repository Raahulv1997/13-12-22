import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { LinkContainer } from 'react-router-bootstrap';
import { NavLink } from 'react-router-dom';


export const NavigationBar = () => {
  return (
    <>
      <Navbar bg="light" expand="lg">
      <Container>
       <LinkContainer to={'/'}><Navbar.Brand >Users</Navbar.Brand></LinkContainer> 
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
      
           {/* <NavLink to={'/about'}> <Nav.Link >About Us</Nav.Link></NavLink>   */}
              <LinkContainer to={'/about'}><Nav.Link >About Us</Nav.Link></LinkContainer> 
              <LinkContainer to={'/showimage'}><Nav.Link >Show Image</Nav.Link></LinkContainer> 
           
          
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </>
  )
}
