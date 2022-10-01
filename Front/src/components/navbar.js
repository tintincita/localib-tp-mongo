import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

import logo from "../assets/localib.png";

const NavBar = () => {
return (
  <Navbar expand="lg" bg="white">
      <Container>
        <Navbar.Brand href="#home"><img src={logo} height="100" alt="localib Logo" loading="lazy" /></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/clients">Clients</Nav.Link>
            <Nav.Link href="/Vehicules">Vehicules</Nav.Link>
            <Nav.Link href="/Locations">Locations</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
)
};

export default NavBar;
