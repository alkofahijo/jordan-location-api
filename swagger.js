const swaggerUi = require('swagger-ui-express');
const fs = require('fs');
const path = require('path');

// Load your Swagger JSON
let swaggerDocument = JSON.parse(
  fs.readFileSync(path.join(__dirname, 'swagger.json'), 'utf8')
);

// Dynamically set server URL based on environment
const BASE_URL = process.env.BASE_URL || 'http://localhost:3000/api/v1';
swaggerDocument.servers = [{ url: BASE_URL }];

module.exports = {
  swaggerUi,
  specs: swaggerDocument,
};
