import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import TableCategorias from "../components/TableCategorias";
import TableProductos from "../components/TableProductos";
import TableUsuario from "../components/TableUsuario";

const Admin = () => {
  const [state, setState] = useState({ rol: "" });

  useEffect(() => {
    const datos = JSON.parse(localStorage.getItem("auth"));
    setState(datos.usuario);
  }, [state.rol]);

  if (state.rol !== "ADMIN_ROLE") {
    return (
      <div className="alert alert-danger text-center" role="alert">
        🚫No autorizado🚫
      </div>
    );
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <h1>Admin</h1>
          <hr />
        </div>
      </div>
      <div className="row">
        <div className="col-12 col-md-4 offset-md-2">
          <h3>Usuarios</h3>
          <TableUsuario />
        </div>
        <div className="col-12 col-md-4 offset-md-1">
          <h3>Categorias</h3>
          <TableCategorias />
        </div>
      </div>
      <div className="row">
        <div className="col">
          <h3>Productos</h3>
          <TableProductos />
        </div>
      </div>
    </div>
  );
};

export default Admin;
