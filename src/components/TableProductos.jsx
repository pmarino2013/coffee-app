import React, { useState, useEffect } from "react";
import { getProductos } from "../helpers/productos";

const TableProductos = () => {
  const [productos, setProductos] = useState({
    datos: [],
    loading: true,
  });

  const [pagina, setPagina] = useState(0);
  const [totPag, setTotpag] = useState(0);

  const [show, setShow] = useState(false);

  useEffect(() => {
    getProductos().then((respuesta) => {
      setProductos({
        datos: respuesta.productos,
        loading: false,
      });
      setTotpag(respuesta.Total);
    });
  }, []);

  useEffect(() => {
    updateDatos(pagina);
  }, [pagina, show]);

  const updateDatos = (pag) => {
    getProductos(pag).then((respuesta) => {
      setProductos({
        datos: respuesta.productos,
        loading: false,
      });
    });
  };

  return (
    <>
      {productos.loading ? (
        <div className="alert alert-success text-center" role="alert">
          Cargando...
        </div>
      ) : (
        <div>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Nombre</th>
                <th scope="col">Disponible</th>
                <th scope="col">Precio</th>
                <th scope="col">Categoria</th>
              </tr>
            </thead>
            <tbody>
              {productos.datos.map((producto) => (
                <tr key={producto._id}>
                  <th scope="row">{producto.nombre}</th>
                  <td>
                    {producto.disponible ? "Disponible" : "No disponible"}
                  </td>
                  <td className="d-flex justify-content-center">
                    ${producto.precio}
                  </td>
                  <td>{producto.categoria.nombre}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

export default TableProductos;
