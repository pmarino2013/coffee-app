import React, { useState } from "react";
import Swal from "sweetalert2";
import { useEffect } from "react";
import { Modal, Button } from "react-bootstrap";

import {
  getProducto,
  postProducto,
  putProducto,
} from "../../helpers/productos";
import { getCategorias } from "../../helpers/categorias";
import { subirArchivoProd } from "../../helpers/uploads";

const ModalProductos = ({ show, handleClose, actualizar }) => {
  const [loading, setLoading] = useState(false);
  const [wait, setWait] = useState(false);
  const [categorias, setCategorias] = useState([]);
  const [formValue, setFormValue] = useState({
    nombre: "",
    precio: "",
    descripcion: "",
    categoria: "",
    disponible: true,
  });
  const [imagen, setImagen] = useState({
    valor: "",
    archivo: {},
    msg: null,
  });

  useEffect(() => {
    getCategorias().then((respuesta) => {
      setCategorias(respuesta.categorias);
    });
  }, []);

  useEffect(() => {
    limpiarCampos();
    if (actualizar) {
      setWait(true);
      getProducto(actualizar).then((respuesta) => {
        localStorage.setItem("idProd", JSON.stringify(respuesta.producto._id));
        setFormValue({
          nombre: respuesta.producto.nombre,
          precio: respuesta.producto.precio,
          descripcion: respuesta.producto.descripcion,
          categoria: respuesta.producto.categoria._id,
          disponible: respuesta.producto.disponible,
        });

        setWait(false);
      });
    }
  }, [actualizar]);

  const handleChange = ({ target }) => {
    if (target.name === "disponible") {
      setFormValue({
        ...formValue,
        [target.name]: target.checked,
      });
    } else {
      setFormValue({
        ...formValue,
        [target.name]: target.value,
      });
    }
  };

  const imageChange = ({ target }) => {
    setImagen({ valor: target.value, archivo: target.files[0], msg: null });
  };

  const limpiarCampos = () => {
    setFormValue({
      nombre: "",
      precio: "",
      descripcion: "",
      categoria: "",
      disponible: true,
    });
  };

  const prepararImagen = () => {
    const id = JSON.parse(localStorage.getItem("idProd"));

    //Convierto a formdata los datos de la imagen
    const formData = new FormData();
    formData.append("archivo", imagen.archivo);

    //Petición para subir archivo
    subirArchivoProd(id, formData).then((response) => {
      //si hay un error cargarlo en msg sino continuar con la carga de los datos
      if (response?.msg) {
        setImagen({
          ...imagen,
          msg: response.msg,
        });
      } else {
        setImagen({
          valor: "",
          archivo: {},
          msg: null,
        });
      }
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setLoading(true);
    prepararImagen();

    if (actualizar) {
      putProducto(actualizar, formValue).then((respuesta) => {
        if (respuesta.errors) {
          setLoading(false);
          return Swal.fire({
            icon: "error",
            title: "Error",
            text: respuesta.errors[0].msg,
          });
          // return window.alert(respuesta.errors[0].msg);
        }
        if (respuesta.msg) {
          Swal.fire({
            icon: "info",

            text: respuesta.msg,
          });
          // window.alert(respuesta.msg);
        }
        setLoading(false);
        limpiarCampos();

        handleClose();
      });
    } else {
      postProducto(formValue).then((respuesta) => {
        if (respuesta.errors) {
          setLoading(false);

          return Swal.fire({
            icon: "error",
            title: "Error",
            text: respuesta.errors[0].msg,
          });
          // return window.alert(respuesta.errors[0].msg);
        }
        if (respuesta.msg) {
          Swal.fire({
            icon: "info",
            text: respuesta.msg,
          });
          // window.alert(respuesta.msg);
        } else {
          Swal.fire({
            icon: "success",
            title: "OK",
            text: "Producto guardado con éxito",
          });
        }
        setLoading(false);
        limpiarCampos();
        handleClose();
      });
    }
  };

  return (
    <div>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>
            {actualizar ? "Modificar producto" : "Nuevo producto"}
          </Modal.Title>
        </Modal.Header>
        {wait ? (
          <Modal.Body>
            <h3 className="text-center">Cargando...</h3>
          </Modal.Body>
        ) : (
          <form onSubmit={handleSubmit}>
            <Modal.Body>
              <div className="form-group">
                <label>Nombre</label>
                <input
                  type="text"
                  name="nombre"
                  className="form-control"
                  placeholder="Ej: Café Torrado"
                  required
                  value={formValue.nombre}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label>Precio</label>
                <input
                  type="number"
                  name="precio"
                  className="form-control"
                  value={formValue.precio}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label>Descripción</label>
                <textarea
                  type="text"
                  name="descripcion"
                  className="form-control"
                  value={formValue.descripcion}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label>Categorias</label>
                <select
                  className="form-select"
                  name="categoria"
                  value={formValue.categoria}
                  onChange={handleChange}
                  required
                >
                  <option defaultValue="">Elije categoría</option>
                  {categorias.map((categoria) => (
                    <option key={categoria._id} value={categoria._id}>
                      {categoria.nombre}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  checked={formValue.disponible}
                  value={formValue.disponible}
                  onChange={handleChange}
                  name="disponible"
                />
                <label>Disponible</label>
              </div>
              {actualizar && (
                <div className="my-3 ">
                  <div>
                    <input
                      className="form-control form-control-sm"
                      type="file"
                      name="archivo"
                      accept="image/*"
                      value={formValue.img}
                      onChange={imageChange}
                    />
                  </div>
                </div>
              )}
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button variant="success" type="submit" disabled={loading}>
                Save Changes
              </Button>
            </Modal.Footer>
          </form>
        )}
      </Modal>
    </div>
  );
};

export default ModalProductos;
