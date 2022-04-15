// const url = "http://localhost:8080/api/auth/login";
// const url = "https://backend-mentor-22i.herokuapp.com/api/auth/login";

export const postAuth = async (data) => {
  console.log(data);
  const resp = await fetch(`${process.env.REACT_APP_URL}auth/login`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });
  const datos = await resp.json();

  return datos;
};
