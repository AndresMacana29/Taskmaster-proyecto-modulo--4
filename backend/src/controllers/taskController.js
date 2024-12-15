const Usuario= require('../models/usuarios');
const dayjs = require('dayjs')
const Tarea = require('../models/tareas')


exports.createTask = async (req, res) => {
    const { usuario_id, titulo, descripcion, estado, fecha_vencimiento} = req.body;
    try {
        const usuario = await Usuario.findByPk(usuario_id);
        console.log(usuario_id);
        const fechaLimite = dayjs().add(30, 'day').format('YYYY-MM-DD HH:mm:ss'); // A�ade un mes a la fecha de creaci�n para expiraci�n de la tarea

        const tareas = await Tarea.create({
            usuario_id,
            titulo,
            descripcion,
            estado,
            fecha_vencimiento
        });
        res.status(201).json({ message: 'Tarea creada exitosamente.' });
    } catch (error) {
        res.status(500).json({ error: 'Error de creaci&oacute;n de tarea.' + error});
    }
};

exports.getTasks = async (req, res) => {
    const usuario_id = req.user.id; // El ID del usuario autenticado

    try {
        const [tareas] = await db.query("SELECT * FROM tareas WHERE usuario_id = ?", [usuario_id]);
        res.status(200).json(tasks);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al obtener las tareas" });
    }
};

exports.updateTask = async (req, res) => {
    const { id } = req.params; // ID de la tarea
    const { titulo, descripcion, fecha_vencimiento, prioridad, estado } = req.body;

    try {
        const [result] = await db.query(
            "UPDATE tareas SET titulo = ?, descripcion = ?, fecha_vencimiento = ?, prioridad = ?, estado = ? WHERE id = ? AND usuario_id = ?",
            [titulo, descripcion, fecha_vencimiento, prioridad, estado, id, req.user.id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Tarea no encontrada o no autorizada" });
        }

        res.status(200).json({ message: "Tarea actualizada exitosamente" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al actualizar la tarea" });
    }
};

exports.deleteTask = async (req, res) => {
    const { id } = req.params; // ID de la tarea

    try {
        const [result] = await db.query(
            "DELETE FROM tareas WHERE id = ? AND usuario_id = ?",
            [id, req.user.id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Tarea no encontrada o no autorizada" });
        }

        res.status(200).json({ message: "Tarea eliminada exitosamente" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al eliminar la tarea" });
    }
};
