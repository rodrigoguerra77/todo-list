// importar librerias
const express = require("express");
const router = express.Router();

// importar controlador
const userController = require("../controllers/userController");

// crear rutas
router.post("/register", userController.register);
router.post("/login", userController.login);

module.exports = router;
