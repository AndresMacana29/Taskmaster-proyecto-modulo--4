const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Importa tu conexión de Sequelize
 
const Usuarios = sequelize.define('Usuarios', {
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  clave: {
    type: DataTypes.STRING,
    allowNull: false
  },
  foto_perfil: {
    type: DataTypes.STRING,
    allowNull: true
  },
  
}, {
  tableName: 'usuarios',
  timestamps: false // Desactiva la creación automática de createdAt y updatedAt
});
 
module.exports= Usuarios;