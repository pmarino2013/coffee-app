import React from "react";

const BtnPaginacion = ({ totPag, pagina, setPagina }) => {
  const nextPag = () => {
    if (totPag - pagina > 1) {
      setPagina(pagina + 5);
      console.log(pagina);
    }
  };

  const prevPag = () => {
    console.log("presionado prev");
    if (pagina > 0) {
      setPagina(pagina - 5);
    }
  };
  return (
    <>
      <button
        className="btn btn-outline-success"
        onClick={prevPag}
        disabled={pagina === 0 ? true : false}
      >
        <i className="fa fa-chevron-left"></i>
      </button>
      <button
        className="btn btn-outline-success ms-2"
        disabled={totPag - pagina <= 1 ? true : false}
        onClick={nextPag}
      >
        <i className="fa fa-chevron-right"></i>
      </button>
    </>
  );
};

export default BtnPaginacion;
