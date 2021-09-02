const url = "https://restserver-pm.herokuapp.com/api/buscar";

export const buscarProd = async (termino) => {
  const resp = await fetch(`${url}/productos/${termino}`, {
    method: "GET",

    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });
  const datos = await resp.json();

  return datos;
};
