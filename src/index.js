

// Inicializamos la const express nos permite hacer uso del framework express
const express = require('express');

// Inicializamos la const cors nos permite hacer uso de los Cors
const cors = require('cors');

// La const routes nos ayuda al manejo de rutas en nuestro archivo routes.js
const clienteRoute = require('../routes/clienteRoute');

// La const morgan nos permite hacer uso del framework morgan
const morgan = require('morgan');

// Asignamos la const express a la constante app
const app = express();

//Configuraciones del puerto para solicitudes y respuestas
app.set('port', process.env.PORT || 3080);

// Middleware
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

// Se definen las rutas
app.use('/api', clienteRoute);

// Condificamos el "escucha" en el puerto definido anteriormente
app.listen(app.get('port'), () => {
    console.log(` Server Listening on port ${app.get('port')}`);
});