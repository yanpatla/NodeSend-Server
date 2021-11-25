const Links = require("../models/Links");
const shortid = require("shortid");
const bcrypt = require("bcrypt");
const { validationResult } = require("express-validator");
exports.newLink = async (req, res, next) => {
  //*Revisar si hay Errores
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  //*Crear un Objeto Link
  const { original_name } = req.body;
  const link = new Links();
  link.url = shortid.generate();
  link.name = shortid.generate();
  link.original_name = original_name;

  //*Si el Usuario Esta Autenticado
  if (req.user) {
    const { password, download } = req.body;

    //*Asignar a  enlace el num d descargas
    if (download) {
      link.download = download;
    }

    //*Asignar el password
    if (password) {
      const salt = await bcrypt.genSalt(10);
      link.password = await bcrypt.hash(password, salt);
    }

    //*Asignar el Author
    link.author = req.user.id;
  }
  //*Almacenar en la DB
  try {
    await link.save();
    res.json({ msg: `${link.url}` });
    return next();
  } catch (error) {
    console.log(error);
  }
  console.log(link);
};

//*Obtener enlace

exports.getLink = async (req, res, next) => {
  const { url } = req.params;

  //*Verificar si Existe el Enlace
  const link = await Links.findOne({ url });
  if (!link) {
    res.status(404).json({ msg: "This Links Doesn't Exist" });
  }
  //*Si el Link existe
  res.json({ file: link.name });

  //*Si las Descargas son iguales a 1 quiere decir que tenemos que borrar la entrada y borrar el archivo
  const { download, name } = link;
  if (download === 1) {
 
    //*Eliminar el Archivo
    req.file = name; //? req.file Varibale interna para comunicar

    //*Eliminar la Entrada de la DB
    await Links.findOneAndRemove(url)
    next();
  } else {
    //*Si las Descargas son > 1 - Restar 1
    link.download--;
    await link.save();
  
  }
};
