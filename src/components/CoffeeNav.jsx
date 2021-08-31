import React, { useEffect, useState } from "react";
import { Link, NavLink, useHistory } from "react-router-dom";
import {
  Navbar,
  Container,
  Nav,
  DropdownButton,
  Dropdown,
} from "react-bootstrap";

import logo from "../assets/coffee.png";

const CoffeeNav = () => {
  const history = useHistory();
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    const datos = JSON.parse(localStorage.getItem("auth"));
    setUsuario(datos.usuario);
  }, []);

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

            <DropdownButton
              id="dropdown-basic-button"
              title={
                <i className="fa fa-user-circle-o" aria-hidden="true">
                  <span> {usuario?.nombre}</span>
                </i>
              }
              className="dropstart ms-2"
              variant="success"
            >
              <Dropdown.Item>
                <NavLink className="nav-link" to="/">
                  Perfil
                </NavLink>
              </Dropdown.Item>

              {usuario?.rol === "ADMIN_ROLE" && (
                <Dropdown.Item>
                  <NavLink className="nav-link" to="/admin">
                    Administración
                  </NavLink>
                </Dropdown.Item>
              )}
              <Dropdown.Divider />
              <Dropdown.Item>
                <NavLink className="nav-link" to="#" onClick={logout}>
                  Cerrar sesión
                </NavLink>
              </Dropdown.Item>
            </DropdownButton>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default CoffeeNav;
