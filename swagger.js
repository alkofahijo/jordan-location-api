const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

swaggerDocument.servers = [
  { url: process.env.BASE_URL || 'http://localhost:3000/api/v1' }
];

module.exports = {
  swaggerUi,
  specs: swaggerDocument
};
