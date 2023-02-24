
// Inicializamos la const express nos permite hacer uso del framework express
const express = require('express');

// Asignamos la const express a la constante app
const app = express();

// La const morgan nos permite hacer uso del framework morgan
const morgan = require('morgan');

// Creo la const mysql que me permite hacer uso del framework
const mysql = require('mysql');

// Llamo mysql para crear la conexion con los datos del servidor de DESARROLLO EN AWS
const connnectionAWSTest = mysql.createConnection({
    host: 'localhost',
    user: 'usuario-mysql',
    password: 'contraseña-mysql',
    database: 'nombre_DB',
});

// Manejo de Conexion o error 
connnectionAWSTest.connect( (err)=> {
    if (err)  throw (`disconnected ${ err } `); 
    console.log('successfully connected');
});

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