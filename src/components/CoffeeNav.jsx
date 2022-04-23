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
  const [usuario, setUsuario] = useState(null);
  // const [countCarrito, setCountCarrito] = useState(0);

  useEffect(() => {
    const datos = JSON.parse(localStorage.getItem("auth"));

    // setCountCarrito(JSON.parse(localStorage.getItem("carrito"))?.length || 0);
    setUsuario(datos.usuario);
  }, []);

  // const updateCarrito = () => {
  //   setCountCarrito(JSON.parse(localStorage.getItem("carrito")).length || 0);
  // };

  const history = useHistory();
  const logout = () => {
    localStorage.clear();
    history.push("/login");
  };
  return (
    <Navbar bg="dark" expand="lg" className="sticky-top">
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
                <>
                  <i className="fa fa-user-circle-o" aria-hidden="true"></i>
                  <span> {usuario?.nombre}</span>
                </>
              }
              className="dropstart ms-2"
              variant="success"
              // onClick={updateCarrito}
            >
              <Link className="dropdown-item" to="/perfil">
                Perfil
              </Link>

              <Link className="dropdown-item" to="/">
                <i className="fa fa-shopping-cart" aria-hidden="true"></i>
                {/* {countCarrito} */}0
              </Link>

              {usuario?.rol === "ADMIN_ROLE" && (
                <Link className="dropdown-item" to="/admin">
                  Administración
                </Link>
              )}
              <Dropdown.Divider />

              <Link className="dropdown-item" to="#" onClick={logout}>
                Cerrar sesión
              </Link>
            </DropdownButton>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default CoffeeNav;
