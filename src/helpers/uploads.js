const url = process.env.REACT_APP_URL;

const subirArchivo = async (id, formdata) => {
  try {
    const resp = await fetch(`${url}uploads/usuarios/${id}`, {
      method: "PUT",
      body: formdata,
    });
    const data = await resp.json();
    return data;
  } catch (error) {
    console.log(error);

    throw new Error("No se pudo hacer la petición");
  }
};

const subirArchivoProd = async (id, formdata) => {
  try {
    const resp = await fetch(`${url}uploads/productos/${id}`, {
      method: "PUT",
      body: formdata,
    });
    const data = await resp.json();
    return data;
  } catch (error) {
    console.log(error);

    throw new Error("No se pudo hacer la petición");
  }
};
export { subirArchivo, subirArchivoProd };
