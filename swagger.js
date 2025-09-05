const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Jordan Locations API',
      version: '1.0.0',
      description: 'Read-only API for governorates, districts, and areas in Jordan',
    },
    servers: [
      { url: process.env.BASE_URL || 'http://localhost:10000' },
    ],
  },
  apis: ['./routes/*.js'], // Load swagger comments from route files
};

const specs = swaggerJsdoc(options);

module.exports = { swaggerUi, specs };
