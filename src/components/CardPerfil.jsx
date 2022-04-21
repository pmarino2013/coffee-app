import React, { useEffect, useState } from "react";
import "../css/card.css";
const CardPerfil = () => {
  const [datos, setDatos] = useState({});
  console.log(JSON.parse(localStorage.getItem("auth")).usuario);
  useEffect(() => {
    setDatos(JSON.parse(localStorage.getItem("auth")).usuario);
  }, []);

  return (
    <div className="col-12 col-md-6 offset-md-3">
      <div className="our-team">
        <div className="picture">
          <img className="img-fluid" src={datos.img} />
        </div>
        <div className="team-content">
          <h3 className="name">{datos.nombre}</h3>
          <h4 className="title">{datos.correo}</h4>
        </div>
        <ul className="social">
          <li>
            <a
              href="https://codepen.io/collection/XdWJOQ/"
              class="fa fa-facebook"
              aria-hidden="true"
            ></a>
          </li>
          <li>
            <a
              href="https://codepen.io/collection/XdWJOQ/"
              class="fa fa-twitter"
              aria-hidden="true"
            ></a>
          </li>
          <li>
            <a
              href="https://codepen.io/collection/XdWJOQ/"
              class="fa fa-google-plus"
              aria-hidden="true"
            ></a>
          </li>
          <li>
            <a
              href="https://codepen.io/collection/XdWJOQ/"
              class="fa fa-linkedin"
              aria-hidden="true"
            ></a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default CardPerfil;
