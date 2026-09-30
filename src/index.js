require('dotenv').config(); // Siempre primero, para cargar variables de entorno

const express = require('express');
const bodyParser = require('body-parser');
const iaWebhookController = require('./controllers/iaWebhookController');
const iaWebhookDevolucionController = require('./controllers/iaWebhookDevolucionController');
const iaWebhookAlejoController = require('./controllers/iaWebhookAlejoController');
const iaWebhookFinalController = require('./controllers/iaWebhookFinalController');
const iaWebhookPdfController = require('./controllers/iaWebhookPdfController.js');


const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

const legacyEndpointGone = (req, res) => {
  res.status(410).json({ error: 'Endpoint retired' });
};

app.post('/webhook', legacyEndpointGone);
app.post('/webhook/notion', legacyEndpointGone);
app.post('/webhook/ia/jota', iaWebhookController.handleIaWebhook);
app.post('/webhook/ia/erick', iaWebhookDevolucionController.handleIaWebhookDevolucion);
app.post('/webhook/ia/alejo', iaWebhookAlejoController.handleIaWebhookAlejo);
app.post('/webhook/ia/final', iaWebhookFinalController.handleIaWebhookFinal);
app.post('/webhook/ia/gpt-image', legacyEndpointGone);
app.post('/webhook/ia/pdf', iaWebhookPdfController.handleIaWebhookPdf);


// Servir archivos estáticos desde /public
app.use('/public', require('express').static(path.join(__dirname, '..', 'public')));

app.get('/', (req, res) => {
  res.send('Backend iniciado correctamente');
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
