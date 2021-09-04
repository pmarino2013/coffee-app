import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { getProductos, deleteProducto } from "../helpers/productos";
import BtnPaginacion from "./BtnPaginacion";
import ModalProductos from "./modales/ModalProductos";

const TableProductos = () => {
  const [actualizar, setActualizar] = useState("");
  const [productos, setProductos] = useState({
    datos: [],
    loading: true,
  });

  const [pagina, setPagina] = useState(0);
  const [totPag, setTotpag] = useState(0);

  const [show, setShow] = useState(false);

  useEffect(() => {
    updateDatos(pagina);
  }, [pagina, show]);

  const handleClose = () => {
    setActualizar("");
    setShow(false);
  };
  const handleShow = () => setShow(true);

  const updateDatos = (pag) => {
    getProductos(pag).then((respuesta) => {
      setProductos({
        datos: respuesta.productos,
        loading: false,
      });
      setTotpag(respuesta.Total);
    });
  };

  //---------------------------
  const borrarProducto = (uid) => {
    let produc = productos.datos.find((producto) => {
      return producto._id === uid;
    });

    Swal.fire({
      title: "Esta seguro?",
      text: `El producto ${produc.nombre} será inactivado`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#7B7A7A",
      confirmButtonText: "Si, borrar!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteProducto(uid).then((respuesta) => {
          if (respuesta.msg) {
            Swal.fire({
              icon: "info",

              text: respuesta.msg,
            });
          } else {
            Swal.fire("Borrado!", "El producto ha sido borrada.", "success");
          }
          console.log(pagina);
          updateDatos(pagina);
        });
      }
    });
  };

  return (
    <>
      {productos.loading ? (
        <div className="alert alert-success text-center" role="alert">
          Cargando...
        </div>
      ) : (
        <div className="mb-5">
          <table className="table table-responsive">
            <thead>
              <tr>
                <th scope="col">Nombre</th>
                <th scope="col">Disponible</th>
                <th scope="col">Precio</th>
                <th scope="col">Categoria</th>
                <th className="d-flex justify-content-end">
                  <button
                    className="btn btn-success"
                    onClick={() => {
                      setActualizar("");
                      handleShow();
                    }}
                  >
                    <i className="fa fa-user-plus" aria-hidden="true"></i>
                  </button>
                </th>
              </tr>
            </thead>
            <tbody>
              {productos.datos.map((producto) => (
                <tr key={producto._id}>
                  <th scope="row">{producto.nombre}</th>
                  <td
                    className={
                      producto.disponible ? "text-success" : "text-danger"
                    }
                  >
                    {producto.disponible ? "Disponible" : "No disponible"}
                  </td>
                  <td className="d-flex justify-content-center">
                    ${producto.precio}
                  </td>
                  <td>{producto.categoria.nombre}</td>
                  <td>
                    <button
                      className="btn btn-warning ms-2"
                      onClick={() => {
                        setActualizar(producto._id);
                        handleShow();
                      }}
                    >
                      <i
                        className="fa fa-pencil-square-o"
                        aria-hidden="true"
                      ></i>
                    </button>
                    <button
                      className="btn btn-danger ms-2"
                      onClick={() => borrarProducto(producto._id)}
                    >
                      <i className="fa fa-trash-o" aria-hidden="true"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="d-flex justify-content-center">
            <BtnPaginacion
              totPag={totPag}
              pagina={pagina}
              setPagina={setPagina}
            />
            <ModalProductos
              show={show}
              handleClose={handleClose}
              actualizar={actualizar}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default TableProductos;
