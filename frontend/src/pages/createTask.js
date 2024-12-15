import React from "react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import apiRoutes from './apiRoutes';
import '../css/createTask.css';


const CreateTask = () => {

	const [userId, setUserId] = useState(null);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [tag, setTag] = useState('frontend');
    const [priority, setPriority] = useState('baja');
    const [statusTask, setStatusTask] = useState('todo');
    const [errores, setErrores] = useState('');
    const navegar = useNavigate();
    const volver = () => {
        navegar("/dashboard");
    }

	useEffect(
        () => {
            getProfile();
        }, []
    );
	const getProfile = async() => {
        const token = localStorage.getItem("access_token");
        const config = {
            headers: {
                'Authorization': `Bearer ${token}` // Incluye el token en los encabezados
            }
        };

        try {
            const res = await axios.get(apiRoutes.profile, config);
            setUserId(res.data.id);
            console.log(JSON.stringify(setUserId));
        }
        catch(error){
                setErrores('Acceso denegado, intentar nuevamente');
                console.log('Error al obtener el perfil:', error);
            }
    };

    useEffect(() => {
        if (userId) {
            console.log('userId actualizado:', userId);
        }
    }, [userId]);

	const validateTask = async () => {

        setErrores('');
        try {
            if (!userId) {
                alert('El usuario no est� logueado. Por favor, vuelve a iniciar sesi�n.');
                return;
            }
        
            const res = await axios.post(apiRoutes.addTask, {
                user_id: userId,
                title,
                description,
                fecha_vencimiento,    
                priority,
                statusTask
            });

            if(res.status === 401){
                alert('No tienes autorizaci�n para acceder a este recurso.');
                setErrores('No tienes autorizaci�n para acceder a este recurso.');
            }else{
                alert('Tarea creada exitosamente.');
                navegar("/dashboard");
            }

            }
            catch (error) {
                console.error('Error al obtener el perfil:', error.response || error.message);
                if (error.response && error.response.status === 404) {
                    setErrores('Endpoint no encontrado. Verifica el backend.');
                } else if (error.response && error.response.status === 401) {
                    setErrores('No tienes autorizaci�n para acceder a este recurso.');
                } else {
                    setErrores('Error inesperado. Intenta nuevamente m�s tarde.');
                }
            }
        } 

    return (
		
		<div className="create-task-page">
			<div className="create-task-container">
				<div className="create-task-form">
				{errores && <p className="error-message">{errores}</p>}
				<h2>Crear Tarea</h2>
					<form>
                        <div className="form-group">
                            <label>T&iacute;tulo</label>
                            <input
                                type="text"
                                id="title"
                                onChange={(e) => setTitle(e.target.value)}
                                value={title}
                                placeholder="Ingresa el t&iacute;tulo de la tarea"/>
                        </div>
                        <div className="form-group">
                            <label>Descripci&oacute;n</label>
                            <input
                                type="text"
                                id="description"
                                onChange={(e) => setDescription(e.target.value)}
                                value={description}
                                placeholder="Ingresa una descripci&oacute;n para la tarea" />
                        </div>
						<div className="form-group">
							<label>Fecha de Vencimiento</label>
							<imput type="date" value={'frontend'} 
							onChange={(e) => setTag(e.target.value)}>
								<input type="date" id="start" name="trip-start" value="2024-12-13" min="2024-01-01" max="2030-12-31" />
							</imput>
						</div>
						<div className="form-group">
							<label>Prioridad:</label>
							<select name="tag" value={'baja'} 
							onChange={(e) => setPriority(e.target.value)}>
								<option value="baja">Baja</option>
								<option value="media">Media</option>
								<option value="alta">Alta</option>
							</select>
						</div>
						<div className="form-group">
							<label>Estado:</label>
							<select name="tag" value={'todo'} 
							onChange={(e) => setStatusTask(e.target.value)}>
								<option value="todo">To Do</option>
								<option value="inprogress">In Progress</option>
								<option value="done">Done</option>
							</select>
						</div>
						<button type="button" onClick={validateTask}>
							Crear Tarea
						</button>
					</form>
                    <button type="button" onClick={volver}>Volver</button>
				</div>
            <div className="register-right">
                <div className="image-right"></div>
            </div>
        </div>
    </div>
    );
};

export default CreateTask;