
// Inicializamos la const express nos permite hacer uso del framework express
const express = require('express');

// Asignamos la const express a la constante app
const app = express();

// La const morgan nos permite hacer uso del framework morgan
const morgan = require('morgan');

//Configuraciones para solicitudes y respuestas
app.set('port', process.env.PORT || 3000);
//app.set('json spaces', 2);

// Middleware
app.use(morgan('dev'));
app.use(express.urlencoded({extended:false}));
app.use(express.json());


// Codificar los servicios que se expoen a modo de prueba
app.get('/', (req, res) => {
    res.json (
        {
            "Title": 'Hola Ecoquintas'
        }
    );
})

// Condificamos el "escucha" en el puerto definido anteriormente
app.listen(app.get('port'), () => {
    console.log(` Server Listening on port ${ app.get('port') }`);
});