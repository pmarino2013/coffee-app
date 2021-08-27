const url = "http://localhost:8080";
// const url = "https://restserver-pm.herokuapp.com";

export const getUsuarioId = async (id) => {
  const resp = await fetch(`${url}/api/usuarios/${id}`, {
    method: "GET",

    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });
  const datos = await resp.json();

  return datos;
};
