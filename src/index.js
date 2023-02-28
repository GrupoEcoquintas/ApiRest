

// Inicializamos la const express nos permite hacer uso del framework express
const express = require('express');

// Asignamos la const express a la constante app
const app = express();

// La const routes nos ayuda al manejo de rutas en nuestro archivo routes.js
const routes = require('./routes');

// La const morgan nos permite hacer uso del framework morgan
const morgan = require('morgan');

//Configuraciones para solicitudes y respuestas
app.set('port', process.env.PORT || 3302);

// Middleware
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use('/api', routes);

// Codificar los servicios que se expone a modo de prueba
// app.get('/', (req, res) => {
//     connnectionAWSTest.query( 'SELECT * FROM tbl_users LIMIT 5', (err, results) => {
//         if (err) throw err;
//         //res.status(200).json ( results );
//         res.json (
//             {
//                 results
//             }
//             );
//             const data = Object.values(results);
//             console.log(data)
//     });
// });


//  Codificar los servicios que se expone con el llamado al procedimiento

// Se define la funcion que llama al procedimiento que retorna si el cliente está activo



// Condificamos el "escucha" en el puerto definido anteriormente
app.listen(app.get('port'), () => {
    console.log(` Server Listening on port ${app.get('port')}`);
});