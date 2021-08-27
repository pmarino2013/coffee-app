import React, { useState, useEffect } from "react";
import { getProductos } from "../helpers/productos";

import CofeeCarousel from "../components/CofeeCarousel";
import CardProd from "../components/CardProd";

const Inicio = () => {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    getProductos().then((respuesta) => {
      console.log(respuesta);
      setProductos(respuesta.productos);
    });
  }, []);

  return (
    <>
      <div className=" mb-3">
        <CofeeCarousel />
      </div>
      <div className="container mb-3">
        <h1 className="mb-3">Elige a tu gusto ☕</h1>
        <CardProd productos={productos} />
      </div>
    </>
  );
};

export default Inicio;
