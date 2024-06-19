import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';
import logoMovies from '../header/logoMovies24_7.png';
import './signin.css'

function SignIn() {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Iniciando sesión con:', formData);
        try {
            const response = await fetch('http://localhost:5000/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            const result = await response.json();
            console.log('Respuesta del servidor:', result);
            if (result.success) {
                // Guardar datos del usuario en localStorage
                localStorage.setItem('user', JSON.stringify(result.user));
                navigate('/'); // Redirigir a la página principal o a otra página
            } else {
                alert('Error al iniciar sesión: ' + result.message);
            }
        } catch (error) {
            console.error('Error en la solicitud:', error);
            alert('Error al iniciar sesión. Intenta nuevamente.');
        }
    };

    return (
        <div className='form-container'>
            <form onSubmit={handleSubmit}>
                <div className='logo-container'>
                    <img src={logoMovies} alt='logo' />
                    <h1>Sign In:</h1>
                </div>
                <div className='inputs-section'>
                    <div className='input-container'>
                        <label>Email:</label>
                        <input type="email" name="email" value={formData.email} onChange={handleChange} required />
                    </div>
                    <div className='input-container'>
                        <label>Contraseña:</label>
                        <input type="password" name="password" value={formData.password} onChange={handleChange} required />
                    </div>
                </div>
                <div className='signin-btn'>
                    <button type="submit"><FontAwesomeIcon icon="fa-solid fa-right-to-bracket" />  Sign In</button>
                </div>
            </form>
        </div>
    );
}

export default SignIn;