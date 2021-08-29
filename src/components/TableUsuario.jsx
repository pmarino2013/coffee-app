import React, { useEffect } from "react";
import { useState } from "react";
import { getUsuarios } from "../helpers/usuarios";
import BtnPaginacion from "./BtnPaginacion";

const TableUsuario = () => {
  const [usuarios, setUsuarios] = useState({
    datos: [],
    loading: true,
  });
  const [pagina, setPagina] = useState(0);
  const [totPag, setTotpag] = useState(0);

  useEffect(() => {
    getUsuarios().then((respuesta) => {
      setUsuarios({
        datos: respuesta.usuarios,
        loading: false,
      });
      setTotpag(respuesta.total);
    });
  }, []);

  useEffect(() => {
    // setUsuarios({
    //   ...usuarios,
    //   loading: true,
    // });
    getUsuarios(pagina).then((respuesta) => {
      setUsuarios({
        datos: respuesta.usuarios,
        loading: false,
      });
    });
  }, [pagina]);

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
                <th scope="col">Estado</th>
              </tr>
            </thead>
            <tbody>
              {usuarios.datos.map((usuario) => (
                <tr key={usuario.uid}>
                  <th scope="row">{usuario.nombre}</th>
                  <td>{usuario.email}</td>
                  <td>{usuario.estado ? "Activo" : "Inactivo"}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <BtnPaginacion
            totPag={totPag}
            pagina={pagina}
            setPagina={setPagina}
          />
        </div>
      )}
    </>
  );
};

export default TableUsuario;
