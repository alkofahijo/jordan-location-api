// index.js
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const dns = require('dns');
require('dotenv').config();

const pool = require('./db'); // Supabase pool
const governoratesRoutes = require('./routes/governorates');
const districtsRoutes = require('./routes/districts');
const areasRoutes = require('./routes/areas');
const errorHandler = require('./middleware/errorHandler');
const { swaggerUi, specs } = require('./swagger');

const app = express();

// --------------------
// Force IPv4 for Supabase (Node 18+)
// --------------------
dns.setDefaultResultOrder('ipv4first');

// --------------------
// Middleware
// --------------------
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());

// --------------------
// API Versioning
// --------------------
app.use('/api/v1/governorates', governoratesRoutes);
app.use('/api/v1/districts', districtsRoutes);
app.use('/api/v1/areas', areasRoutes);

// --------------------
// Swagger UI
// --------------------
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// --------------------
// Default route
// --------------------
app.get('/', (req, res) => {
  res.send(
    'Jordan Locations API is running. Visit /api-docs for API documentation.'
  );
});

// --------------------
// Test DB connection
// --------------------
app.get('/test-db', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');
    res.json({ now: result.rows[0].now });
  } catch (err) {
    console.error('DB connection error:', err.stack);
    res.status(500).json({ error: 'Database connection failed' });
  }
});

// --------------------
// Global Error Handler
// --------------------
app.use((err, req, res, next) => {
  console.error('Global error:', err.stack);
  res.status(500).json({ status: 'error', message: 'Internal server error' });
});

// --------------------
// Start server
// --------------------
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
