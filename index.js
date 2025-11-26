const express = require('express');
const app = express();
const port = 3000;
const connectDB = require('./models/database');
const autor = require('./routes/autor');
const genero = require('./routes/genero');
const libro = require('./routes/libro');

app.use(express.json());

app.use('/autor', autor);
app.use('/genero', genero);
app.use('/libro', libro);

const start = async () => {
    try {
        await connectDB();
        console.log('Conexión a MongoDB establecida con éxito.');
        app.listen(port, () => {
            console.log(`Servidor escuchando en http://localhost:${port}`);
        });
    } catch (error) {
        console.log('No se pudo conectar a la base de datos:', error);
    }
};

start();