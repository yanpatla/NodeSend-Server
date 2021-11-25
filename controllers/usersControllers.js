const User = require("../models/Users");
const bcrypt = require("bcrypt");
const { validationResult } = require("express-validator");

exports.newUser = async (req, res) => {
  //*Mostrar Mensajes de Error de Express Validator
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  //*Verificar si el Usuario ya estuvo Registrado

  const { email, password } = req.body;
  let users = await User.findOne({ email });

  if (users) {
    return res.status(400).json({ msg: "The user is already Register" });
  }
  //*Crear Nuevo Usuario
  users = await new User(req.body);

  //*Hash Password
  const salt = await bcrypt.genSalt(10);
  users.password = await bcrypt.hash(password, salt);

  try {
    await users.save();

    res.json({ msg: "User Created" });
  } catch (error) {
    console.log(error);
  }
};
