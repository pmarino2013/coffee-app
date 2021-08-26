import React from "react";
import { Link, NavLink, useHistory } from "react-router-dom";
import { Navbar, Container, Nav } from "react-bootstrap";

import logo from "../assets/coffee.png";
const CoffeeNav = () => {
  const history = useHistory();
  const logout = () => {
    localStorage.clear();
    history.push("/login");
  };
  return (
    <Navbar bg="dark" expand="lg">
      <Container>
        <Navbar.Brand>
          <Link className="nav-link text-white" to="/">
            <img className="logo-nav" src={logo} alt="logo" /> Coffee App
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className=" justify-content-between w-100">
            <NavLink to="/" className="nav-link text-white">
              Inicio
            </NavLink>
            <div>
              <button className="btn btn-outline-secondary" onClick={logout}>
                Cerrar sesión
              </button>
            </div>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default CoffeeNav;
