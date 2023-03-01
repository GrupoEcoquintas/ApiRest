
const express = require('express');
const router = express.Router();

const clienteController = require('../controllers/clienteController');

// Se define la ruta raiz
router.get('/', clienteController.index);

// Se define la ruta para llamar al procedimiento ConsultaClienteActivo por cedula
router.get('/consulta-cliente/:cedula', clienteController.consultaCliente);

module.exports = router;