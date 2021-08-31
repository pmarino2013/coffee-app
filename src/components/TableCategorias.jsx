import React, { useState, useEffect } from "react";
import { getCategorias, deleteCategoria } from "../helpers/categorias";
import BtnPaginacion from "./BtnPaginacion";
import ModalCategorias from "./modales/ModalCategorias";

const TableCategorias = () => {
  const [actualizar, setActualizar] = useState("");

  const [categorias, setCategorias] = useState({
    datos: [],
    loading: true,
  });

  const [pagina, setPagina] = useState(0);
  const [totPag, setTotpag] = useState(0);

  const [show, setShow] = useState(false);

  useEffect(() => {
    getCategorias().then((respuesta) => {
      setCategorias({
        datos: respuesta.categorias,
        loading: false,
      });
      setTotpag(respuesta.Total);
    });
  }, []);

  useEffect(() => {
    updateDatos(pagina);
  }, [pagina, show]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const updateDatos = (pag) => {
    getCategorias(pag).then((respuesta) => {
      setCategorias({
        datos: respuesta.categorias,
        loading: false,
      });
    });
  };

  //---------------------------
  const borrarCategoria = (uid) => {
    let categ = categorias.datos.find((categoria) => {
      return categoria._id === uid;
    });

    let validar = window.confirm(
      `Esta seguro que quiere inactivar ${categ.nombre} de categorías?`
    );
    if (validar) {
      deleteCategoria(uid).then((respuesta) => {
        if (respuesta.msg) {
          window.alert(respuesta.msg);
        }
        updateDatos(pagina);
      });
    }
  };

  return (
    <>
      {categorias.loading ? (
        <div className="alert alert-success text-center" role="alert">
          Cargando...
        </div>
      ) : (
        <div>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Nombre</th>
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
                <th></th>
              </tr>
            </thead>
            <tbody>
              {categorias.datos.map((categoria) => (
                <tr key={categoria._id}>
                  <th scope="row">{categoria.nombre}</th>
                  <td>
                    <button
                      className="btn btn-warning ms-2"
                      onClick={() => {
                        setActualizar(categoria._id);
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
                      onClick={() => borrarCategoria(categoria._id)}
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
            <ModalCategorias
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

export default TableCategorias;
