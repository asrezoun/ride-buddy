import React from 'react';
import { useContext } from 'react';
import { Button, Form, FormControl, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { UserContext } from '../../App';
import './Header.css'

const Header = () => {
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  const handleLogOut = ()=>{
    const newUser = {name: '',
                      email:'',
                    password:''}
      setLoggedInUser(newUser);
  }
    return (
        <Navbar bg="light" expand="lg">
        <Navbar.Brand><Link style={{ textDecoration: 'none', fontSize:"35px" }} to="/home"><strong>RIDE BUDDY</strong></Link></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <Nav className="me-auto">
            <Nav.Link className="nav"><Link style={{ textDecoration: 'none' }} to="/home">Home</Link></Nav.Link>
            <Nav.Link className="nav">Destination</Nav.Link>
            <Nav.Link className="nav">Blog</Nav.Link>
            <Nav.Link className="nav">Contact</Nav.Link>
            {loggedInUser.email?<Nav.Link style={{color: 'red'}}>{loggedInUser.name}</Nav.Link>
            :<Nav.Link style={{backgroundColor: "orange", borderRadius: "5px"}}><Link style={{ textDecoration: 'none' }} to="/login">Log in</Link></Nav.Link>}
           {loggedInUser.email && <Nav.Link onClick={handleLogOut} style={{backgroundColor: "orange", borderRadius: "5px"}}><Link style={{ textDecoration: 'none' }} to="/home">Log out</Link></Nav.Link>}
          </Nav>
        </Navbar.Collapse>
      </Navbar>

    );
};

export default Header;