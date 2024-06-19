const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 10000;

app.use(bodyParser.json());
app.use(cors());

const JSON_BIN_URL = 'https://api.jsonbin.io/v3/b/666790d3acd3cb34a855aa59';
const JSON_BIN_HEADERS = {
    'X-MASTER-KEY': '$2a$10$PJAxhsOL7dxxKTFgRFfEmOJEXZpMO2dltUd.4Prn.b0bSoVcjeSIa',
};

// Función para leer los usuarios actuales
const getUsers = async () => {
    try {
        const response = await axios.get(JSON_BIN_URL, { headers: JSON_BIN_HEADERS });
        return response.data.record.record.users;
    } catch (error) {
        console.error('Error al leer los datos de JSON Bin:', error);
        throw error;
    }
};

// Función para escribir los usuarios actuales
const writeUsers = async (users) => {
    try {
        await axios.put(JSON_BIN_URL, { record: { users } }, { headers: JSON_BIN_HEADERS });
        console.log('Datos actualizados en JSON Bin');
    } catch (error) {
        console.error('Error al escribir en JSON Bin:', error);
        throw error;
    }
};

// Función para agregar un nuevo usuario
const addUser = async (newUser) => {
    try {
        const users = await getUsers();
        newUser.favorites = []; // Añadir campo favorites vacío
        users.push(newUser);
        await writeUsers(users);
        console.log('Usuario agregado correctamente:', newUser);
    } catch (error) {
        console.error('Error al agregar el usuario:', error);
        throw error;
    }
};

// Función para verificar si el email ya está registrado
const emailExists = async (email) => {
    const users = await getUsers();
    return users.some(user => user.email === email);
};

// Ruta para manejar el registro de usuarios
app.post('/api/register', async (req, res) => {
    const newUser = req.body;
    console.log('Solicitud de registro recibida:', newUser);

    if (await emailExists(newUser.email)) {
        return res.status(400).json({ success: false, message: 'El correo electrónico ya está registrado.' });
    }

    try {
        await addUser(newUser);
        res.status(200).json({ success: true });
    } catch (error) {
        console.error('Error al registrar el usuario:', error);
        res.status(500).json({ success: false, message: 'Error al registrar el usuario.' });
    }
});

// Ruta para manejar el inicio de sesión
app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const users = await getUsers();
        const user = users.find(user => user.email === email && user.password === password);

        if (user) {
            res.status(200).json({ success: true, user });
        } else {
            res.status(400).json({ success: false, message: 'Credenciales incorrectas.' });
        }
    } catch (error) {
        console.error('Error al iniciar sesión:', error);
        res.status(500).json({ success: false, message: 'Error al iniciar sesión.' });
    }
});

// Ruta para agregar a favoritos
app.post('/api/favorites', async (req, res) => {
    const { email, movieId } = req.body;
    try {
        let users = await getUsers();
        const userIndex = users.findIndex(user => user.email === email);

        if (userIndex !== -1) {
            if (!users[userIndex].favorites) {
                users[userIndex].favorites = [];
            }

            if (!users[userIndex].favorites.includes(movieId)) {
                users[userIndex].favorites.push(movieId);
                await writeUsers(users);
                res.status(200).json({ success: true, favorites: users[userIndex].favorites });
            } else {
                res.status(400).json({ success: false, message: 'La película ya está en favoritos.' });
            }
        } else {
            res.status(404).json({ success: false, message: 'Usuario no encontrado.' });
        }
    } catch (error) {
        console.error('Error al actualizar favoritos:', error);
        res.status(500).json({ success: false, message: 'Error al guardar favoritos.' });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});