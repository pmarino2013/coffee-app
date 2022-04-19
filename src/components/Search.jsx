import React from "react";
// import { buscarProd } from "../helpers/buscar";

const Search = ({ inputValue, setInputValue }) => {
  // const [inputValue, setInputValue] = useState("");

  const handleChange = ({ target }) => {
    setInputValue(target.value);
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   if (inputValue) {
  //     buscarProd(inputValue).then((respuesta) => {
  //       console.log(respuesta.results);
  //       setInputValue("");
  //     });
  //   }
  // };

  return (
    <div className="col-12 col-md-6 offset-md-3">
      {/* <form onSubmit={handleSubmit}> */}

      <input
        type="text"
        className="form-control"
        value={inputValue}
        placeholder="Buscar producto..."
        onChange={handleChange}
        onClick={() => setInputValue("")}
      />
    </div>
  );
};

export default Search;
