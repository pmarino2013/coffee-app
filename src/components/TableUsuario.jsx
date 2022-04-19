import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

import { getUsuarios, deleteUsuario } from "../helpers/usuarios";
import BtnPaginacion from "./BtnPaginacion";
import ModalUsuarioAdd from "./modales/ModalUsuarioAdd";

const TableUsuario = () => {
  const [usuarios, setUsuarios] = useState({
    datos: [],
    loading: true,
  });
  const [pagina, setPagina] = useState(0);
  const [totPag, setTotpag] = useState(0);

  const [show, setShow] = useState(false);

  useEffect(() => {
    updateDatos(pagina);
  }, [pagina, show]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const updateDatos = (pag) => {
    getUsuarios(pag).then((respuesta) => {
      setUsuarios({
        datos: respuesta.usuarios,
        loading: false,
      });
      setTotpag(respuesta.total);
    });
  };

  //---------------------------
  const borrarUsuario = (uid) => {
    const user = JSON.parse(localStorage.getItem("auth")).usuario;

    if (user.uid === uid) {
      return Swal.fire({
        icon: "error",
        title: "Oops...",
        text: '"No puede eliminar el usuario en uso"',
      });
      // window.alert("No puede eliminar el usuario en uso");
    }

    Swal.fire({
      title: "Esta seguro?",
      text: "El usuario será inactivado",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#7B7A7A",
      confirmButtonText: "Si, borrar!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteUsuario(uid).then((respuesta) => {
          if (respuesta.msg) {
            Swal.fire({
              icon: "info",

              text: respuesta.msg,
            });
          } else {
            Swal.fire("Borrado!", "El usuario ha sido borrado.", "success");
          }
          updateDatos(pagina);
        });
      }
    });

    // let validar = window.confirm(
    //   `Esta seguro que quiere eliminar este usuario?`
    // );
    // if (validar) {
    //   deleteUsuario(uid).then((respuesta) => {
    //     if (respuesta.msg) {
    //       Swal.fire({
    //         icon: "info",

    //         text: respuesta.msg,
    //       });

    //     }
    //     updateDatos(pagina);
    //   });
    // }
  };

  return (
    <>
      {usuarios.loading ? (
        <div className="alert alert-success text-center" role="alert">
          Cargando...
        </div>
      ) : (
        <div>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Nombre</th>
                <th scope="col">Email</th>
                <th>
                  <button className="btn btn-success" onClick={handleShow}>
                    <i className="fa fa-user-plus" aria-hidden="true"></i>
                  </button>
                </th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {usuarios.datos.map((usuario) => (
                <tr key={usuario.uid}>
                  <th scope="row">{usuario.nombre}</th>
                  <td>{usuario.email}</td>

                  <th>
                    <button
                      className="btn btn-danger"
                      onClick={() => borrarUsuario(usuario.uid)}
                    >
                      <i className="fa fa-trash-o" aria-hidden="true"></i>
                    </button>
                  </th>
                </tr>
              ))}
            </tbody>
          </table>
          <BtnPaginacion
            totPag={totPag}
            pagina={pagina}
            setPagina={setPagina}
          />

          <ModalUsuarioAdd show={show} handleClose={handleClose} />
        </div>
      )}
    </>
  );
};

export default TableUsuario;
