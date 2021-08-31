// const url = "http://localhost:8080/api/auth/login";
const url = "https://restserver-pm.herokuapp.com";

export const postAuth = async (data) => {
  const resp = await fetch(url, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });
  const datos = await resp.json();

  return datos;
};
