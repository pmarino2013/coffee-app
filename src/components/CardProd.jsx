import React from "react";

const CardProd = ({ productos }) => {
  return (
    <>
      <div className="row row-cols-1 row-cols-md-3 g-4">
        {productos.map((producto) => (
          <div className="col" key={producto._id}>
            <div className="card h-100">
              <img
                src="https://es.himgs.com/imagenes/estar-bien/20190111135512/cafe-beneficioso-perjudicial/0-635-445/cafenutricion-t.jpg"
                className="card-img-top"
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
                    <button className="btn btn-success">Elegir</button>
                  </div>
                ) : (
                  <span className="text-nodisponible">No disponible</span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default CardProd;
