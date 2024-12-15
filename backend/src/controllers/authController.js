const db = require("../models/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Usuarios = require('../models/usuarios');

// exports.register = async (req, res) => {
//     const { nombre, email, clave, foto_perfil} = req.body;

//     if (!nombre || !email || !clave) {
//         return res.status(400).json({ message: "Todos los campos son obligatorios" });
//     }

//     try {
//         // Verificar si el usuario ya existe
//         const [existingUser] = await db.query()("SELECT * FROM usuarios WHERE email = ?", [email]);
//         if (existingUser.length > 0) {
//             return res.status(400).json({ message: "El correo ya está registrado" });
//         }

//         // Hash de la contraseña
//         const salt = await bcrypt.genSalt(10);
//         const hashedPassword = await bcrypt.hash(clave, salt);

//         // Insertar el nuevo usuario en la base de datos
//         const usuario = await Usuarios.create({
//             nombre,
//             email,
//             clave: hashedPassword,
//             foto_perfil: foto_perfil || null,
//         });

//         const token = jwt.sign(
//             { id: usuario.id, email: usuario.email },
//             process.env.JWT_SECRET,
//             { expiresIn: "1h" }
//         );

//         res.status(201).json({ message: "Usuario registrado con éxito", token });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: "Error al registrar el usuario" });
//     }
// };

exports.register = async (req, res) => {
    const { nombre, email, clave, foto_perfil} = req.body;
    try {
    const hashedClave = await bcrypt.hash(clave, 10);
    const usuario = await Usuarios.create({
        nombre,
        email,
        clave: hashedClave,
        foto_perfil: foto_perfil || null,

    });
    res.status(201).json({ message: 'Usuario registrado exitosamente' });
    } catch (error) {
        res.status(500).json({ error: 'El correo ya está registrado'});
    }
};

// exports.login = async (req, res) => {
//     const { email, clave } = req.body;

//     if (!email || !clave) {
//         return res.status(400).json({ message: "Todos los campos son obligatorios" });
//     }

//     try {
//         // Verificar si el usuario existe
//         const usuario = await db.query({ where: { email } });
//         if (!usuario) {
//             return res.status(404).json({ message: "Usuario no encontrado" });
//         }

//         // Comparar contraseñas
//         const validPassword = await bcrypt.compare(clave, user[0].clave);
//         if (!validPassword) {
//             return res.status(401).json({ message: "Contraseña incorrecta" });
//         }

//         // Generar token JWT
//         const token = jwt.sign({ id: user[0].id }, process.env.JWT_SECRET, { expiresIn: "1h" });

//         res.status(200).json({ message: "Inicio de sesión exitoso", token });
//     } catch (error) {
//         console.error("Error al registrar el usuario:", error.message);
//         res.status(500).json({ message: "Error al iniciar sesión" });
//     }
// };

exports.login = async (req, res) => {
    const { email, clave} = req.body;
    try {
        const usuario= await Usuarios.findOne({ where: { email } });
        if (!usuario || !(await bcrypt.compare(clave, usuario.clave))) {
        return res.status(401).json({ error: 'Credenciales incorrectas' });
        }
        const token = jwt.sign({ id: usuario.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ message: 'Login exitoso', token });
    } catch (error) {
        res.status(500).json({ error: 'Error en el login' });
    }
};
