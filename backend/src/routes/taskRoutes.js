const express = require("express");
const { createTask, getTasks, updateTask, deleteTask } = require("../controllers/taskController");
const { verifyToken } = require("../middleware/authMiddleware");
const taskController = require('../controllers/taskController');

const router = express.Router();

router.post('/create', taskController.createTask); // Crear una tarea
router.get("/", getTasks); // Obtener todas las tareas
router.put("/:id", updateTask); // Actualizar la tarea
router.delete("/:id", deleteTask); // Eliminar una tarea

module.exports = router;
