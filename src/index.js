

// Inicializamos la const express nos permite hacer uso del framework express
const express = require('express');

const cors = require('cors');

// Asignamos la const express a la constante app
const app = express();

// La const routes nos ayuda al manejo de rutas en nuestro archivo routes.js
const routes = require('./routes');

// La const morgan nos permite hacer uso del framework morgan
const morgan = require('morgan');

//Configuraciones para solicitudes y respuestas
app.set('port', process.env.PORT || 3080);

// Middleware
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use('/api', routes);
app.use(cors());


// Condificamos el "escucha" en el puerto definido anteriormente
app.listen(app.get('port'), () => {
    console.log(` Server Listening on port ${app.get('port')}`);
});