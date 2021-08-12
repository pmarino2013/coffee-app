import React from "react";
import { Link, NavLink } from "react-router-dom";
import { Navbar, Container, Nav } from "react-bootstrap";
const CoffeeNav = () => {
  return (
    <Navbar bg="dark" expand="lg">
      <Container>
        <Navbar.Brand>
          <Link className="nav-link text-white" to="/">
            Coffee App
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <NavLink to="/" className="nav-link text-white">
              Inicio
            </NavLink>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default CoffeeNav;
