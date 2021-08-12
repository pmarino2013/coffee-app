import React from "react";

import coffee1 from "../assets/coffee1.jpg";
import coffee2 from "../assets/coffee2.jpg";
const CofeeCarousel = () => {
  return (
    <div
      id="carouselExampleControls"
      className="carousel slide"
      data-bs-ride="carousel"
    >
      <div className="carousel-inner h-100">
        <div className="carousel-item active">
          <img src={coffee1} className="d-block w-100" alt="coffee1" />
        </div>
        <div className="carousel-item">
          <img src={coffee2} className="d-block w-100" alt="coffe2" />
        </div>
        {/* <div className="carousel-item">
      <img src="..." className="d-block w-100" alt="..." />
    </div> */}
      </div>
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#carouselExampleControls"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#carouselExampleControls"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
};

export default CofeeCarousel;
