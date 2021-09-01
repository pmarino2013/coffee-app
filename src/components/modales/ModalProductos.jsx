import React, { useState } from "react";
import { useEffect } from "react";
import { Modal, Button } from "react-bootstrap";

import {
  getProducto,
  postProducto,
  putProducto,
} from "../../helpers/productos";
import { getCategorias } from "../../helpers/categorias";
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

  useEffect(() => {
    getCategorias().then((respuesta) => {
      setCategorias(respuesta.categorias);
    });
  }, []);

  useEffect(() => {
    setFormValue({
      nombre: "",
      precio: "",
      descripcion: "",
      categoria: "",
      disponible: true,
    });
    if (actualizar) {
      setWait(true);
      getProducto(actualizar).then((respuesta) => {
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

  const handleSubmit = (e) => {
    e.preventDefault();

    setLoading(true);

    if (actualizar) {
      putProducto(actualizar, formValue).then((respuesta) => {
        if (respuesta.errors) {
          setLoading(false);
          return window.alert(respuesta.errors[0].msg);
        }
        if (respuesta.msg) {
          window.alert(respuesta.msg);
        }
        setLoading(false);
        setFormValue({
          nombre: "",
          precio: "",
          descripcion: "",
          categoria: "",
          disponible: true,
        });
        handleClose();
      });
    } else {
      postProducto(formValue).then((respuesta) => {
        if (respuesta.errors) {
          setLoading(false);
          return window.alert(respuesta.errors[0].msg);
        }
        if (respuesta.msg) {
          window.alert(respuesta.msg);
        }
        setLoading(false);
        setFormValue({
          nombre: "",
          precio: "",
          descripcion: "",
          categoria: "",
          disponible: true,
        });
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
