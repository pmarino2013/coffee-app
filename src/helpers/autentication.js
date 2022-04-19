// const url = "http://localhost:8080";
const url = process.env.REACT_APP_URL;

export const postAuth = async (data) => {
  const resp = await fetch(`${url}auth/login`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });
  const datos = await resp.json();
  console.log(datos);
  return datos;
};
