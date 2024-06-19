import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import logoMovies from '../header/logoMovies24_7.png';
import './signup.css'

function SignUp() {
    const [formData, setFormData] = useState({
        nombre: '',
        apellido: '',
        edad: '',
        email: '',
        password: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Enviando datos:', formData);
        try {
            const response = await fetch('http://localhost:5000/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            const result = await response.json();
            console.log('Respuesta del servidor:', result);
            if (result.success) {
                setFormData({
                    nombre: '',
                    apellido: '',
                    edad: '',
                    email: '',
                    password: ''
                });
                alert('Usuario registrado exitosamente!');
            } else {
                alert('Error al registrar el usuario: ' + result.message);
            }
        } catch (error) {
            console.error('Error en la solicitud:', error);
            alert('Error al registrar el usuario. Intenta nuevamente.');
        }
    };

    return (
        <div className='form-container'>
            <form onSubmit={handleSubmit}>
                <div className='logo-container'>
                    <img src={logoMovies} alt='logo' />
                    <h1>Sign Up Here:</h1>
                </div>
                <div className='inputs-section'>
                    <div className='input-container'>
                        <label for='name'>Name:</label>
                        <input type="text" id='name' name="nombre" value={formData.nombre} onChange={handleChange} required />
                    </div>
                    <div className='input-container'>
                        <label for='lastname'>Lastname:</label>
                        <input type="text" id='lastname' name="apellido" value={formData.apellido} onChange={handleChange} required />
                    </div>
                    <div className='input-container'>
                        <label for='age'>Age:</label>
                        <input type="number" id='age' name="edad" value={formData.edad} onChange={handleChange} required />
                    </div>
                    <div className='input-container'>
                        <label for='email'>Email:</label>
                        <input type="email" id='email' name="email" value={formData.email} onChange={handleChange} required />
                    </div>
                    <div className='input-container'>
                        <label for='password'>Password:</label>
                        <input type="password" id='password' name="password" value={formData.password} onChange={handleChange} required />
                    </div>
                </div>
                <div className='signup-btn'>
                    <button type="submit"><FontAwesomeIcon icon="fa-solid fa-user-plus" />  Sign Up</button>
                </div>
            </form>
        </div>
    );
}

export default SignUp;