import React, { useState } from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import "../css/registerPage.css";
import LoginPage from "./LoginPage";


function RegisterPage(){
    const navegar=useNavigate();
    const [formData, setFormData] = useState({
        nombre: "",
        email: "",
        contraseña: "",
    });
    const goback = () => {
        navegar("/");
    }

    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:5000/api/auth/register", formData);
            setMessage(response.data.message);
        } catch (error) {
            setMessage(error.response?.data.message || "Error al registrarse");
        }
    };

    return (
        <div className="register-container">
            <div className="container-register">
                <div className="panel-title__register">
                    <h2>¿Por qué elegir TaskMaster?</h2>
                    <div className="items">
                        <p>✨ Fácil de usar: Una interfaz diseñada para que organices tus tareas con unos pocos clics.</p>
                        <p>📌Personalización: Establece prioridades, fechas de vencimiento y estados para cada tarea.</p>
                        <p>🚀 Mantén el enfoque: Visualiza tus pendientes en un solo lugar y alcanza tus metas más rápido.</p>
                        <p>🔒 Seguro y confiable: Tus datos están protegidos para que te enfoques solo en lo que importa</p>
                    </div>
                </div>
                <div className="panel-register__container">
                    <h3>Crear Cuenta</h3>
                    <form className="form-register" onSubmit={handleSubmit}>
                        <div className="form-register-space">
                            <label htmlFor="email">Correo Electr&oacute;nico</label>
                            <input
                                type="text"
                                name="nombre"
                                placeholder="Ingresa tu nombre"
                                value={formData.nombre}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-register-space">
                            <label htmlFor="password">Contrase&ntilde;a</label>
                            <input
                                type="email"
                                name="email"
                                placeholder="Ingresa tu correo"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-register-space">
                            <label htmlFor="password">Contrase&ntilde;a</label>
                            <input
                                type="password"
                                name="contraseña"
                                placeholder="Ingresa tu contraseña"
                                value={formData.contraseña}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-actions">
                            <button type="submit" onClick={handleSubmit}>
                                Registrarse
                            </button>
                            <button type="button" onClick={goback}>
                                Volver
                            </button>
                        </div>
                    </form>
                    <div className="text-alert">
                    {message && <p>{message}</p>}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;
