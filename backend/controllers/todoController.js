// importar modelo
const Todo = require("../models/Todo");

// importar librerias
const mongoose = require("mongoose");

// obtener todos los todos
exports.getAllTodos = async (req, res) => {
  try {
    // obtener el id de usuario
    const { userId, search, sort } = req.query;
    const sortValidate = sort === "DESC" ? -1 : 1;

    // buscar todos por el id de usuario
    // const todos = await Todo.find({ userId });
    const todos = await Todo.aggregate([
      {
        $match: {
          $and: [
            { userId: new mongoose.Types.ObjectId(userId) },
            {
              $or: [
                {
                  task: {
                    $regex: search,
                    $options: "i",
                  },
                },
              ],
            },
          ],
        },
      },
      {
        $sort: {
          due_date: sortValidate,
        },
      },
    ]);

    // devolver todos
    res.json(todos);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
};

// crear todo
exports.createTodo = async (req, res) => {
  try {
    // obtener campos
    const { task, due_date } = req.body;

    // obtener el id de usuario
    const { userId } = req.query;

    // crear todo
    const todo = new Todo({
      task,
      due_date,
      userId: userId,
    });
    await todo.save();

    // devolver todo
    res.status(201).json(todo);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" + error });
  }
};

// actualizar todo
exports.updateTodo = async (req, res) => {
  try {
    // obtener todo id
    const { id } = req.params;

    // obtener campos
    const { task, completed, due_date } = req.body;

    // actualizar por id
    const todo = await Todo.findByIdAndUpdate(
      id,
      { task, completed, due_date },
      { new: true }
    );

    // devolver todo
    res.json(todo);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

// eliminar todo
exports.deleteTodo = async (req, res) => {
  try {
    // obtener id
    const { id } = req.params;

    // buscar  y eliminar todo
    await Todo.findOneAndDelete({ _id: id });

    // devolver mensaje
    res.json({ message: "Todo deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

// eliminar todos los todos
exports.deleteAllTodos = async (req, res) => {
  try {
    // obtener id de usuario
    const { userId } = req.query;

    // eliminar por id de usuario
    await Todo.deleteMany({ userId });
    // devolver mensaje
    res.json({ message: "All todos deleted successfully", status: 200 });
  } catch (error) {
    res.status(500).json({ message: "Server error", status: 500 });
  }
};
