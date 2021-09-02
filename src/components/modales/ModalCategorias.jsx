import React, { useState } from "react";
import { useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import {
  getCategoriaId,
  postCategoria,
  putCategoria,
} from "../../helpers/categorias";

const ModalCategorias = ({ show, handleClose, actualizar, setActualizar }) => {
  const [loading, setLoading] = useState(false);
  const [wait, setWait] = useState(false);
  const [formValue, setFormValue] = useState({
    nombre: "",
  });

  useEffect(() => {
    limpiarCampos();
    if (actualizar) {
      setWait(true);
      getCategoriaId(actualizar).then((respuesta) => {
        setFormValue({
          nombre: respuesta.categoria.nombre,
        });
        setWait(false);
      });
    }
  }, [actualizar]);

  const limpiarCampos = () => {
    setFormValue({
      nombre: "",
    });
  };

  const handleChange = (e) => {
    setFormValue({
      nombre: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setLoading(true);

    if (actualizar) {
      putCategoria(actualizar, formValue).then((respuesta) => {
        if (respuesta.errors) {
          setLoading(false);
          return window.alert(respuesta.errors[0].msg);
        }
        if (respuesta.msg) {
          window.alert(respuesta.msg);
        }
        setLoading(false);
        limpiarCampos();

        handleClose();
      });
    } else {
      postCategoria(formValue).then((respuesta) => {
        if (respuesta.errors) {
          setLoading(false);
          return window.alert(respuesta.errors[0].msg);
        }
        if (respuesta.msg) {
          window.alert(respuesta.msg);
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
          <Modal.Title>Nueva categoria</Modal.Title>
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
                  placeholder="Ej: Bebidas saborizadas"
                  required
                  value={formValue.nombre}
                  onChange={handleChange}
                />
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

export default ModalCategorias;
