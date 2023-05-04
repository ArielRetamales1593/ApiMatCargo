const { admin } = require("./firebase");

module.exports = async (req, res) => {
  switch (req.method) {
    case "GET":
      return procesoGET(req, res);

    case "POST":
      return procesoPOST(req, res);

    case "PUT":
      return procesarPUT(req, res);

    case "DELETE":
      return procesarDELETE(req, res);
    default:
      res.code(500).send({ error: "metodo http no soportado" });
  }
};

async function procesoGET(req, res) {
  try {
    const querySnapshot = await getColeccion().get();
    const documentos = querySnapshot.docs.map((d) => {
      /*
          return {
              id: d.id,
              ...d.data()
          }
          */
      return d.data();
    });
    return documentos;
  } catch (error) {
    res.code(500).send({ error: error.message });
  }
}

// metodo de ayuda para no repetir tanto el codigo /// instancia una coleccion
function getColeccion() {
  return admin.firestore().collection("categorias");
}

async function procesoPOST(req, res) {
  try {
    const { nombre, region } = req.body;
    const categoria = {
      nombre,
      region,
    };
    const documento = await getColeccion().doc(); // crea documento vacío
    const id = documento.id;
    documento.set(categoria);

    // el dato queda fuera del id en firebase , esto lo evita
    categoria.id = id;
    return categoria;
  } catch (error) {
    res.code(500).send({ error: error.message });
  }
}

async function procesarPUT(req, res) {
  try {
    const { nombre, region, id } = req.body;
    const categoria = {
      nombre,
      descripcion,
    };
    const documento = await getColeccion().doc(id); // crea documento vacío
    documento.update(categoria);
    return categoria;
  } catch (error) {
    res.code(500).send({ error: error.message });
  }
}

async function procesarDELETE(req, res) {
  try {
    const id = req.query.id; // http://localhost:3000/categoria?id=XXXXXX
    const docRef = await getColeccion().doc(id);
    await docRef.delete();
    return { borrado: true };
  } catch (error) {
    return { borrado: false, mensaje: error.message };
  }
}
