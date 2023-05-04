const { app } = require("./firebase");
const { getAuth, signInWithEmailAndPassword } = require("firebase/auth");
module.exports = async (req, res) => {
  const { email, contrasena } = req.body;

  try {
    const usuario = await signInWithEmailAndPassword(
      getAuth(),
      email,
      contrasena
    );

    return { usuario };
  } catch (error) {
    switch (error.code) {
      case "auth/invalid-email":
      case "auth/user-not-found":
      case "auth/wrong-password":
        return res.code(401).send({
          codigo: error.code,
          mensaje: error.message,
        });
      default:
        res.code(500).send({
          codigo: error.code,
          mensaje: error.message,
        });
    }
  }
};

// resolver con then
// const auth = getAuth(app);
// signInWithEmailAndPassword(auth, email, contrasena)
//   .then((userCredential) => {
//     const user = userCredential.user;
//     response.send({ message: "Authentication successful!" });
//   })
//   .catch((error) => {
//     console.error(error);
//     response.status(400).send({ error: error.message });
//   });
