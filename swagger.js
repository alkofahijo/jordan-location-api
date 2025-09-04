const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json'); // your JSON file

// Dynamically set the server URL based on environment
const BASE_URL = process.env.BASE_URL || 'http://localhost:3000/api/v1';
swaggerDocument.servers = [
  { url: BASE_URL }
];

module.exports = {
  swaggerUi,
  specs: swaggerDocument,
};
