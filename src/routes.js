
const config = require('../config/config');
const express = require('express');
const router = express.Router();

const mysql = require('mysql');

/* Llamo mysql para crear la conexion con los datos y configuracion del archivo config/config.js del servidor de DESARROLLO EN AWS */
const connnectionAWS = mysql.createConnection(config.AWSDesarrolloEQ_DB);

// // Manejo de Conexion o error 
// connnectionAWSDesarrolloEQ.connect((err) => {
//     if (err) throw (err);
//     console.log('Successfully connected');
// });

// Defino la rura de mi raiz
router.get('/', (req, res) => {
    res.send('Bienvenidos a mi API');
});

// Ruta para llamar a mi procedimiento de consultar cliente por cedula
router.get('/consulta-cliente/:cedula', (req, res) => {
    const cedula = req.params.cedula;

    //Llama al procedimiento almacenado con la cedula especificada
    connnectionAWS.query('CALL PA_ConsultaClienteActivo(?)', [cedula], (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Error al buscar el cliente' });
        }
        if (results[0].length === 0) {
            return res.status(404).json({ message: 'Cliente no encontrado' });
        }

        // Devuelve los resultados en un json
        return res.json(results);
    });
});

module.exports = router;