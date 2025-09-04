// index.js
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
require('dotenv').config();

const governoratesRoutes = require('./routes/governorates');
const districtsRoutes = require('./routes/districts');
const areasRoutes = require('./routes/areas');
const errorHandler = require('./middleware/errorHandler');

const { swaggerUi, specs } = require('./swagger');

const app = express();

// Middleware
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());

// API versioning
app.use('/api/v1/governorates', governoratesRoutes);
app.use('/api/v1/districts', districtsRoutes);
app.use('/api/v1/areas', areasRoutes);

// Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// Default route for testing
app.get('/', (req, res) => {
  res.send('Jordan Locations API is running. Visit /api-docs for API documentation.');
});

// Error handling middleware
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
