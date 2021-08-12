// const url = "http://localhost:8080";
const urlCloud = "https://restserver-pm.herokuapp.com";

export const postAuth = async (data) => {
  const resp = await fetch(`${urlCloud}/api/auth/login`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });
  const datos = await resp.json();

  return datos;
};
