// swagger.js
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json'); // path to your full swagger.json

module.exports = {
  swaggerUi,
  specs: swaggerDocument
};
