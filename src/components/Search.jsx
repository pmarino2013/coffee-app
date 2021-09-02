import React, { useState } from "react";
import { buscarProd } from "../helpers/buscar";

const Search = () => {
  const [inputValue, setInputValue] = useState("");

  const handleChange = ({ target }) => {
    setInputValue(target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue) {
      buscarProd(inputValue).then((respuesta) => {
        console.log(respuesta);
        setInputValue("");
      });
    }
  };

  return (
    <div className="col-12 col-md-6 offset-md-3">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          className="form-control"
          value={inputValue}
          onChange={handleChange}
        />
      </form>
    </div>
  );
};

export default Search;
