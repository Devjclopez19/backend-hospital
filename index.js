require('dotenv').config(); 

const express = require('express');
const cors = require('cors');

const { dbConnection } = require('./database/config');

// Crear el servidor de express
const app = express();

// Base de datos
dbConnection();

const port = process.env.PORT;

// Configurar CORS
app.use(cors());

app.get('/', (req, res) => {
    res.json({
        ok: true,
        msg: 'Hola Mundo'
    })
})

app.listen(port, () => {
    console.log(`Servidor corriendo en puerto ${port}`)
});