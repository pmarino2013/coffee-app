import React from "react";
import { useState } from "react";
import { useEffect } from "react";
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
        <div className="col">
          <TableUsuario />
        </div>
      </div>
    </div>
  );
};

export default Admin;
