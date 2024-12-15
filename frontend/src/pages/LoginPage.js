import React, { useState } from "react";
import axios from "axios";
import "../css/loginPage.css";

function LoginPage() {
    const [formData, setFormData] = useState({
        email: "",
        contraseña: "",
    });
    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:5000/api/auth/login", formData);
            setMessage("Inicio de sesión exitoso");
            localStorage.setItem("token", response.data.token); // Guarda el token
        } catch (error) {
            setMessage(error.response?.data?.message || "Error al iniciar sesión");
        }
    };

    return (
        <div className="login-container">
            <div className="container-login">
                <div className="panel-title__container">
                    <h2>Bienvenido a TaskMaster</h2>
                    <p>Organiza tus proyectos educativos y laborales de forma visual, intuitiva y eficiente. 
                    Nuestra plataforma Kanban está diseñada para ayudarte a priorizar tareas, optimizar el tiempo y 
                    fomentar la colaboración en equipo.</p>
                </div>
                <div className="panel-login__container">
                    <h3>Inicia Sesión</h3>
                    <form className="form-login" onSubmit={handleSubmit}>
                        <div className="form-login-space">
                            <label htmlFor="email">Correo Electr&oacute;nico</label>
                            <input
                                    type="email"
                                    name="email"
                                    placeholder="Ingresa tu correo"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                        </div>
                        <div className="form-login-space">
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
                        <div className="login-actions">
                            <button type="submit" onClick={handleSubmit}>Ingresar</button>
                            <div className="login-links">
                                <a href="/register">Registrarse</a>
                                <a href="/recovery">Contrase&ntilde;a Olvidada</a>
                            </div>
                        </div>
                    </form>
                    <div className="text-alert">
                    {message && <p>{message}</p>}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;

