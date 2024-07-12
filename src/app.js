const express = require('express');
const bodyParser = require('body-parser');
const config = require('./config');
const tareas = require('./modulos/tareas/tareas');

const app = express();

// Configuración de middleware
app.set('port', config.app.port);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configurar la carpeta 'public' para servir archivos estáticos
app.use(express.static('./src/public'));

// Configurar directorio de vistas y motor de plantillas
app.set('views', './src/views');
app.set('view engine', 'ejs');

// Rutas API para tareas
app.use('/api/tareas', tareas);

module.exports = app;

