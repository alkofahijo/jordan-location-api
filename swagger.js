// swagger.js
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json'); // your JSON file

module.exports = {
  swaggerUi,
  specs: swaggerDocument,
};
