import React, { useEffect, useState } from "react";

const CardProd = ({ productos }) => {
  const [carrito, setCarrito] = useState([]);
  const uid = JSON.parse(localStorage.getItem("auth")).usuario.uid;
  useEffect(() => {
    setCarrito(JSON.parse(localStorage.getItem("carrito")) || []);
  }, []);

  useEffect(() => {
    localStorage.setItem("carrito", JSON.stringify(carrito));
  }, [carrito]);

  const agregarCarrito = (id) => {
    setCarrito([
      ...carrito,
      {
        producid: id,
        uid,
      },
    ]);
  };

  return (
    <>
      <div className="row row-cols-1 row-cols-md-3 g-4">
        {productos?.length > 0 ? (
          productos.map((producto) => (
            <div className="col" key={producto._id}>
              <div className="card h-100">
                <img
                  className="card-img"
                  src={producto.img}
                  alt={producto.nombre}
                />
                <div className="card-body">
                  <h5 className="card-title">{producto.nombre}</h5>
                  <strong>{producto.categoria.nombre}</strong>
                  <p className="card-text">{producto.descripcion}</p>
                </div>
                <div className="card-footer ">
                  {producto.disponible ? (
                    <div className="d-flex justify-content-between align-items-center">
                      <span className="text-disponible">Disponible</span>
                      <button
                        className="btn btn-success"
                        onClick={() => agregarCarrito(producto._id)}
                      >
                        Elegir
                      </button>
                    </div>
                  ) : (
                    <span className="text-nodisponible">No disponible</span>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <h3>No hay data</h3>
        )}
      </div>
    </>
  );
};

export default CardProd;
