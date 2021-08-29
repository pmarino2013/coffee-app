import React, { useState, useEffect } from "react";
import { getProductos } from "../helpers/productos";

import CofeeCarousel from "../components/CofeeCarousel";
import CardProd from "../components/CardProd";
import BtnPaginacion from "../components/BtnPaginacion";

const Inicio = () => {
  const [productos, setProductos] = useState([]);
  const [pagina, setPagina] = useState(0);
  const [totPag, setTotpag] = useState(0);
  // console.log(pagina);
  useEffect(() => {
    getProductos().then((respuesta) => {
      // console.log(respuesta);
      setProductos(respuesta.productos);
      setTotpag(respuesta.Total);
    });
  }, []);

  useEffect(() => {
    getProductos(pagina).then((respuesta) => {
      setProductos(respuesta.productos);
    });
  }, [pagina]);

  return (
    <>
      <div className=" mb-3">
        <CofeeCarousel />
      </div>
      <div className="container mb-3">
        <h1 className="mb-3">Elige a tu gusto ☕</h1>
        <div className="d-flex justify-content-center my-3">
          <BtnPaginacion
            pagina={pagina}
            totPag={totPag}
            setPagina={setPagina}
          />
        </div>
        <CardProd productos={productos} />
      </div>
    </>
  );
};

export default Inicio;
