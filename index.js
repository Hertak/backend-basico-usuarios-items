const express = require('express');
const cors = require('cors');
const { dbConnection } = require('./database/config');
require('dotenv').config();


//Crear servidor Express

const app = express();

// Base de datos

dbConnection();

// CORS

app.use(cors());

//Directorio Publico 

app.use(express.static('public'));

//Lectura del body

app.use( express.json() );

//Rutas 
app.use('/api/auth', require('./routes/auth'));

//escuchar peticiones

app.listen(process.env.PORT, () => {
    
    console.log(`Servidor corriendo en el puerto ${process.env.PORT}`);
});