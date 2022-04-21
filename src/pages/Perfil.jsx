import React from "react";
import CardPerfil from "../components/CardPerfil";

const Perfil = () => {
  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <h1>Perfil de usuario</h1>
          <hr />
        </div>
      </div>
      <div className="row">
        <CardPerfil />
      </div>
    </div>
  );
};

export default Perfil;
