const url = "http://localhost:8080/api/categorias";

export const getCategorias = async () => {
  const resp = await fetch(url, {
    method: "GET",

    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });
  const datos = await resp.json();

  return datos;
};

export const getCategoriaId = async (id) => {
  const resp = await fetch(`${url}/${id}`, {
    method: "GET",

    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });
  const datos = await resp.json();

  return datos;
};

export const postCategoria = async (data) => {
  const resp = await fetch(`${url}/api/usuarios`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      token: localStorage.getItem("auth"),
    },
  });
  const datos = await resp.json();

  return datos;
};

export const putCategoria = async (id, data) => {
  const resp = await fetch(`${url}/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      token: localStorage.getItem("auth"),
    },
  });
  const datos = await resp.json();

  return datos;
};

export const deleteCategoria = async (id) => {
  const resp = await fetch(`${url}/${id}`, {
    method: "DELETE",

    headers: {
      "Content-type": "application/json; charset=UTF-8",
      token: localStorage.getItem("auth"),
    },
  });
  const datos = await resp.json();

  return datos;
};
