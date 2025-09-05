// swagger.js
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

// Swagger definition
const options = {
  definition: {
    openapi: '3.0.3',
    info: {
      title: 'Jordan Locations API',
      version: '1.0.0',
      description: 'API for all governorates, districts, and areas in Jordan.',
      contact: {
        name: 'FutureTech Volunteer Team',
        url: 'https://jordan-location-api.onrender.com',
      },
    },
    servers: [
      {
        url: 'https://jordan-location-api.onrender.com/api/v1',
      },
    ],
  },
  apis: ['./routes/*.js'], // Points to routes for JSDoc comments
};

const specs = swaggerJsdoc(options);

module.exports = { swaggerUi, specs };
