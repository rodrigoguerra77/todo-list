// importar modelo
const User = require("../models/User");

// importar librerias
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// importar dotenv
require("dotenv").config();

// registrar usuario
exports.register = async (req, res) => {
  try {
    // obtener campos
    const { first_name, last_name, email, password } = req.body;

    // validar campos
    if (!(email && password && first_name && last_name)) {
      return res.status(400).send("All input is required");
    }

    // validar longitud contraseña
    if (password.length < 6 || password.length > 20) {
      return res
        .status(400)
        .send("Password must be between 6 and 20 characters");
    }

    // validar si el usuario está registrado (correo)
    const oldUser = await User.findOne({ email });

    if (oldUser) {
      return res.status(409).send("User Already Exist. Please Login");
    }

    // encriptar contraseña
    const encryptedPassword = await bcrypt.hash(password, 10);

    // registrar usuario
    const user = await User.create({
      first_name,
      last_name,
      email: email.toLowerCase(),
      password: encryptedPassword,
    });

    // crear token para inicio de sesion
    const token = jwt.sign(
      { user_id: user._id, email },
      process.env.TOKEN_KEY,
      {
        expiresIn: "2h",
      }
    );

    // devolver el usuario y el token de sesion
    res.status(201).json({ user, token });
  } catch (err) {
    console.log(err);
    res.status(500).send("Server error");
  }
};

// inicio de sesion
exports.login = async (req, res) => {
  try {
    // obtener campos
    const { email, password } = req.body;

    // validar campos
    if (!(email && password)) {
      return res.status(400).send("All input is required");
    }

    // validar si el usuario está registrado (correo)
    const user = await User.findOne({ email });

    // comparar contraseña
    if (user && (await bcrypt.compare(password, user.password))) {
      // crear token para inicio de sesion
      const token = jwt.sign(
        { user_id: user._id, email },
        process.env.TOKEN_KEY,
        {
          expiresIn: "2h",
        }
      );

      // agregar token al usuario
      user.token = token;

      // devolver el usuario y el token de sesion
      return res.status(200).json(user);
    }

    // credenciales inválidas
    return res.status(400).send("Invalid Credentials");
  } catch (err) {
    console.log(err);
  }
};
