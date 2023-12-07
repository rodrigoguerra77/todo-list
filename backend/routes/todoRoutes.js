// importar librerias
const express = require("express");
const router = express.Router();

// importar controlador
const todoController = require("../controllers/todoController");

// importar middleware
const auth = require("../middleware/auth");

// crear rutas
router.get("/", auth, todoController.getAllTodos);
router.post("/", auth, todoController.createTodo);
router.put("/:id", auth, todoController.updateTodo);
router.delete("/:id", auth, todoController.deleteTodo);
router.delete("/delete/all", auth, todoController.deleteAllTodos);

module.exports = router;
