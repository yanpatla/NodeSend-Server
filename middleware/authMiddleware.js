const jwt = require("jsonwebtoken");
require("dotenv").config({ path: "variables.env" });

module.exports = (req, res, next) => {
  const authHeader = req.get("Authorization");
  if (authHeader) {
    //*Obtener Token
    //*Esto va a separa el berer del token  tomara nada mas que el token
    const token = authHeader.split(" ")[1];

    //*Compronar el JWT
    try {
      const user = jwt.verify(token, process.env.SECRET_KEY);
      req.user = user;
    } catch (error) {
      console.log(error);
    }
  }

  return next();
};
