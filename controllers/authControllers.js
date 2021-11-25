const User = require("../models/Users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
require("dotenv").config({ path: "variables.env" });

exports.authenticateUser = async (req, res, next) => {
  //*Revisar si Hay Errores
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  //*Buscar el Usuario para ver si Esta Registrado
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    res.status(401).json({ msg: "The User not exist " });
    return next();
  }

  //*Verificar el Password y autenticar el Usuario
  if (bcrypt.compareSync(password, user.password)) {
    //* CrearJWT
    const token = jwt.sign(
      {
        id: user._id,
        name: user.name,
        email: user.email,
      },
      process.env.SECRET_KEY,
      {
        expiresIn: "8h",
      }
    );
    res.json({ token });
  } else {
    res.status(401).json({ msg: "Wrong Password" });
  }
  // console.log('El usuario Exciste')
};

exports.authenticatedUser = async (req, res) => {
  res.json({ user: req.user });
};
