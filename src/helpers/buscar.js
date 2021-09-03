const url = "https://restserver-pm.herokuapp.com/api/buscar";
// const url = "http://localhost:8080/api/productos";

export const buscarProd = async (termino, desde) => {
  const resp = await fetch(`${url}/productos/${termino}?desde=${desde}`, {
    method: "GET",

    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });
  const datos = await resp.json();

  return datos;
};
