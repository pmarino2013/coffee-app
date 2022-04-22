import React from "react";
import CardPerfil from "../components/CardPerfil";

const Perfil = () => {
  let id = JSON.parse(localStorage.getItem("auth")).usuario.uid;
  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <h1>Perfil de usuario</h1>
          <hr />
        </div>
      </div>
      <div className="row">
        <CardPerfil id={id} />
      </div>
    </div>
  );
};

export default Perfil;
