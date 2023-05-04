const { admin } = require("./firebase");

module.exports = async (req, res) => {
  // opcion 1
  /*
    const email         = req.body.email;
    const contrasena    = req.body.contrasena;
    */

  // opcion 2
  const { email, contrasena } = req.body;

  try {
    const usuario = await admin.auth().createUser({
      email,
      contrasena,
    });
    return usuario;
  } catch (error) {
    res.status(500).send({ error: "Ocurrió un error al crear el usuario." });
  }
};
