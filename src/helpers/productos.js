// const url = "http://localhost:8080/api/productos";
const url = "https://restserver-pm.herokuapp.com";

export const getProductos = async (desde) => {
  const resp = await fetch(`${url}?desde=${desde}`, {
    method: "GET",

    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });
  const datos = await resp.json();

  return datos;
};
