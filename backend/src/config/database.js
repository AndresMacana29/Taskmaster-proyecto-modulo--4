require("dotenv").config();
const { Sequelize } = require("sequelize");

// Configurar la conexión a la base de datos
const sequelize = new Sequelize(
    process.env.DB_NAME,     // Nombre de la base de datos
    process.env.DB_USER,     // Usuario de la base de datos
    process.env.DB_PASSWORD, // Contraseña de la base de datos
    {
        host: process.env.DB_HOST,
        dialect: "mysql",    // Usamos MySQL
        logging: false,
    }
);

// Probar la conexión
sequelize
    .authenticate()
    .then(() => console.log("Conexión a la base de datos exitosa"))
    .catch((error) => console.error("Error al conectar a la base de datos:", error));

module.exports = sequelize;