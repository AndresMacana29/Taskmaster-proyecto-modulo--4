const { DataTypes } = require("sequelize");
const sequelize = require("../config/database"); // Ajusta según la configuración de tu proyecto    
const Usuarios = require("../models/usuarios")

const Tareas = sequelize.define("Tareas", {
    usuario_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'usuarios',
            key: 'id'

        },
        allowNull: false
    },

    titulo: {
        type: DataTypes.STRING,
        allowNull: false, // Campo obligatorio
    },
    descripcion: {
        type: DataTypes.TEXT,
        allowNull: true, // Opcional
    },
    estado: {
        type: DataTypes.STRING,
        defaultValue: "pendiente", // Estados como: pendiente, en progreso, completada
    },
    fechaLimite: {
        type: DataTypes.DATE,
        allowNull: true, // Opcional, para agregar una fecha límite
    },    
}, {
    tableName: 'tareas',
    timestamps: false // Desactiva la creacion automatica de createdAt y updatedAt
});

Tareas.belongsTo(Usuarios, { foreignKey: 'usuario_id', as: 'usuarios' });
Usuarios.hasMany(Tareas, { foreignKey: 'usuario_id', as: 'tareas' });

module.exports = Tareas;