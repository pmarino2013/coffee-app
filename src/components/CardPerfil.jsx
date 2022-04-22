import React, { useEffect, useState } from "react";

import { subirArchivo } from "../helpers/uploads"; //Función para solicitar carga de archivos de backend
import { getUsuarioId } from "../helpers/usuarios"; //Función traer datos de un usuario por su id

import "../css/card.css"; //Importar estilos de tarjeta
import loading from "../assets/loading.gif"; //importar gif para usar durante la carga de imagen

const CardPerfil = ({ id }) => {
  //Estado para manejar el input de carga de archivo
  const [inputValue, setInputValue] = useState({
    valor: "",
    archivo: {},
  });
  //Estado para cargar datos de usuario y recibir mensaje en caso de error
  const [datos, setDatos] = useState({
    loading: true,
    usuario: {},
    msg: null,
  });
  //Estado para manejar si el botón está activo o no
  const [btnDisabled, setBtnDisabled] = useState(false);
  //Estado para cargar imagen de loading o no
  const [cargandoImagen, setCargandoImagen] = useState(false);

  //Carga inicial de los datos de usuario
  useEffect(() => {
    getUsuarioId(id).then((response) => {
      setDatos({
        loading: false,
        usuario: response.usuario,
        msg: null,
      });
    });
  }, [id]);

  //Función cuando el input cambia su valor
  const handleChange = (e) => {
    setInputValue({ valor: e.target.value, archivo: e.target.files[0] });
  };
  //Función submit del formulario
  const onSubmit = (e) => {
    e.preventDefault();
    setBtnDisabled(true); //desabilito botón
    let { uid } = datos.usuario; //obtengo el id de usuario

    //Convierto a formdata los datos de la imagen
    const formData = new FormData();
    formData.append("archivo", inputValue.archivo);

    //Se carga la imagen de loading en vez de la foto del avatar
    setCargandoImagen(true);

    //Petición para subir archivo
    subirArchivo(uid, formData).then((response) => {
      //si hay un error cargarlo en msg sino continuar con la carga de los datos
      if (response?.msg) {
        setDatos({
          ...datos,
          msg: response.msg,
        });
      } else {
        setDatos({
          ...datos,
          usuario: response,
          msg: null,
        });
      }
      setCargandoImagen(false); //quitamos la imagen de loading del avatar
      setBtnDisabled(false); //se habilita boton
      //Se inicializan los datos del input
      setInputValue({
        valor: "",
        archivo: {},
      });
    });
  };

  return (
    <>
      {datos.loading ? (
        <h3>Cargando</h3>
      ) : (
        <div className="col-12 col-md-6 offset-md-3">
          <div className="our-team">
            <div className="picture">
              {cargandoImagen ? (
                <img className="img-fluid" src={loading} alt="imagen" />
              ) : (
                <img
                  className="img-fluid"
                  src={datos.usuario.img}
                  alt="imagen"
                />
              )}
            </div>
            <div className="team-content">
              <h3 className="name">{datos.usuario.nombre}</h3>
              <h4 className="title">{datos.usuario.correo}</h4>
            </div>
            <ul className="social">
              <li>
                <a
                  href="https://codepen.io/collection/XdWJOQ/"
                  className="fa fa-facebook"
                  aria-hidden="true"
                ></a>
              </li>
              <li>
                <a
                  href="https://codepen.io/collection/XdWJOQ/"
                  className="fa fa-twitter"
                  aria-hidden="true"
                ></a>
              </li>
              <li>
                <a
                  href="https://codepen.io/collection/XdWJOQ/"
                  className="fa fa-google-plus"
                  aria-hidden="true"
                ></a>
              </li>
              <li>
                <a
                  href="https://codepen.io/collection/XdWJOQ/"
                  className="fa fa-linkedin"
                  aria-hidden="true"
                ></a>
              </li>
            </ul>
          </div>
          <div className="mb-3">
            <form onSubmit={onSubmit} className="d-flex align-items-center">
              <div>
                <input
                  className="form-control form-control-sm"
                  type="file"
                  name="archivo"
                  value={inputValue.valor}
                  onChange={handleChange}
                />
              </div>
              <div className="ms-2">
                <button
                  className="btn btn-primary  float-end btn-sm"
                  type="submit"
                  disabled={btnDisabled}
                >
                  Subir
                </button>
              </div>
            </form>
          </div>
          {datos.msg && (
            <div
              className="alert alert-danger alert-dismissible fade show mt-3"
              role="alert"
            >
              {datos.msg}
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="alert"
                aria-label="Close"
                onClick={() => setDatos({ ...datos, msg: null })}
              ></button>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default CardPerfil;
