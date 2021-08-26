import React from "react";

import coffee1 from "../assets/coffee1.jpg";
import coffee2 from "../assets/coffee2.jpg";
const CofeeCarousel = () => {
  return (
    <div
      id="carousel"
      className="carousel slide carousel-fade"
      data-bs-ride="carousel"
    >
      <div className="carousel-inner">
        <div className="carousel-item active">
          <img src={coffee1} className="d-block w-100" alt="coffee1" />
        </div>
        <div className="carousel-item">
          <img src={coffee2} className="d-block w-100" alt="cofee2" />
        </div>
        <div className="overlay d-flex align-items-center">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-12 col-md-6 offset-md-3 text-center text-md-end">
                <h1 className="mb-2 fst-italic d-none d-md-block">
                  "No hay nada como una taza de café para estimular las células
                  del cerebro."
                </h1>
                <h3 className="d-none d-md-block text-end fw-lighter">
                  Sherlock Holmes
                </h3>
                <div className="text-center">
                  <button type="button" className="btn btn-success  mt-2">
                    <span className="fs-3">Compra tu café</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#carousel"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#carousel"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button> */}
    </div>
  );
};

export default CofeeCarousel;
