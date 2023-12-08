// importar libreria
const jwt = require("jsonwebtoken");

// obtener variables del dotenv
const config = process.env;

const verifyToken = (req, res, next) => {
  // obtener token
  const token = req.headers.authorization.slice(7);

  // validar si existe el token
  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }
  try {
    // verificar token
    const decoded = jwt.verify(token, config.TOKEN_KEY);
    req.user = decoded;
  } catch (err) {
    // token invalido
    return res.status(401).send("Invalid Token");
  }
  // si el token es valido, continuar
  return next();
};

module.exports = verifyToken;
