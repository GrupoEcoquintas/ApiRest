
const config = require('../config/config');
const mysql = require('mysql');
const Cliente = require('../models/clienteModel');

const connnectionAWS = mysql.createConnection(config.AWSDesarrolloEQ_DB);

// Manejo de Conexion o error 
connnectionAWS.connect((err) => {
    if (err) throw (err);
    console.log('Successfully connected ✔️');
});

// Defino la rura de mi raiz
exports.index = (req, res) => {
    res.send('Bienvenidos a mi API');
};

exports.consultaCliente = (req, res) => {
    const cedula = req.params.cedula;
    

    //Llama al procedimiento almacenado con la cedula especificada
    connnectionAWS.query('CALL PA_ConsultaClienteActivo(?)', [cedula], (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Error al buscar el cliente ✖️' });
        }
        if (results[0].length === 0) {
            return res.status(404).json({ message: 'Cliente no encontrado ✖️' });
            
        }

        //Obtener la fecha atual en formato UTC
        const currentDate = new Date().toUTCString();

        const clienteData = results[0][0]; // Acceder al primer objeto en el array
        
        //Instanciar el cliente
        const cliente = new Cliente(
            clienteData.nombre,
            clienteData.apellidos,
            clienteData.cedula,
            clienteData.tipo_cliente,
            clienteData.proyecto,
        );
  
        // Agrega los encabezados
        res.setHeader('Content-Type', 'application/json'); //para setear el tipo de archivo que recibimos
        res.setHeader('Cache-Control', 'public, max-age=86400'); //para almacenar el caché un día 
        res.setHeader('Access-Control-Allow-Origin', '*'); //permisos de acceso a la API
        res.setHeader('ETag', '12345'); //identificador único para la respuesta
        res.setHeader('Date', currentDate); //Fecha de la respuesta
        
        // Devuelve los resultados en un json
        return res.json( {date: currentDate, cliente});
        
    });
};
