import React, { useEffect, useState } from "react";

import { subirArchivo } from "../helpers/uploads";
import { getUsuarioId } from "../helpers/usuarios";

import "../css/card.css";
const CardPerfil = ({ id }) => {
  //--------------------------------------------------
  const [inputValue, setInputValue] = useState({
    valor: "",
    archivo: {},
  });

  //--------------------------------------------------

  const [datos, setDatos] = useState({
    loading: true,
    usuario: {},
    msg: null,
  });
  const [btnDisabled, setBtnDisabled] = useState(false);

  useEffect(() => {
    getUsuarioId(id).then((response) => {
      setDatos({
        loading: false,
        usuario: response.usuario,
        msg: null,
      });
    });
  }, [id]);

  //-------------------------------------------
  const handleChange = (e) => {
    setInputValue({ valor: e.target.value, archivo: e.target.files[0] });
  };

  //----------------------------------------

  const onSubmit = (e) => {
    e.preventDefault();
    setBtnDisabled(true);
    let { uid } = datos.usuario;

    const formData = new FormData();

    formData.append("archivo", inputValue.archivo);

    subirArchivo(uid, formData).then((response) => {
      console.log(response);
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
      setBtnDisabled(false);
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
              <img className="img-fluid" src={datos.usuario.img} alt="imagen" />
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
