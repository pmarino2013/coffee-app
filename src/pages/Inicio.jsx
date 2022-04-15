import React, { useState, useEffect } from "react";
import { getProductos } from "../helpers/productos";
import { buscarProd } from "../helpers/buscar";

import CofeeCarousel from "../components/CofeeCarousel";
import CardProd from "../components/CardProd";
import BtnPaginacion from "../components/BtnPaginacion";
import Search from "../components/Search";

const Inicio = () => {
  const [productos, setProductos] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [pagina, setPagina] = useState(0);
  const [totPag, setTotpag] = useState(0);
  // console.log(pagina);

  useEffect(() => {
    getProductos().then((respuesta) => {
      // console.log(respuesta);
      setProductos(respuesta.productos);
      setTotpag(respuesta.total);
    });
  }, []);

  useEffect(() => {
    if (inputValue) {
      buscarProd(inputValue).then((respuesta) => {
        const productos = respuesta.results;
        setProductos(productos);
        // setTotpag(total);

        // console.log(respuesta);
        // setInputValue("");
      });
    } else {
      getProductos(pagina).then((respuesta) => {
        setProductos(respuesta.productos);
        setTotpag(respuesta.total);
      });
    }
  }, [inputValue, pagina]);

  // useEffect(() => {
  //   getProductos(pagina).then((respuesta) => {
  //     setProductos(respuesta.productos);
  //   });
  // }, [pagina]);

  // const updateProd = () => {
  //   if (inputValue) {
  //     buscarProd(inputValue).then((respuesta) => {
  //       const { productos, Total } = respuesta.results;
  //       setProductos(productos);
  //       setTotpag(Total);

  //       // console.log(respuesta);
  //       // setInputValue("");
  //     });
  //   } else {
  //     getProductos(pagina).then((respuesta) => {
  //       // console.log(respuesta);
  //       setProductos(respuesta.productos);
  //       setTotpag(respuesta.Total);
  //     });
  //   }
  // };

  return (
    <>
      <div className=" mb-3">
        <CofeeCarousel />
      </div>
      <div className="container mb-3">
        <h1 className="mb-3">Elige a tu gusto ☕</h1>
        <Search inputValue={inputValue} setInputValue={setInputValue} />
        <div className="d-flex justify-content-center my-3">
          {!inputValue && (
            <BtnPaginacion
              pagina={pagina}
              totPag={totPag}
              setPagina={setPagina}
            />
          )}
        </div>
        <CardProd productos={productos} />
      </div>
    </>
  );
};

export default Inicio;
