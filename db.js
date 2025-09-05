// db.js
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }, // required for Supabase Direct Connection
});

// Optional: log when a client connects
pool.on('connect', () => {
  console.log('✅ Connected to Supabase database');
});

// Optional: log errors from idle clients
pool.on('error', (err) => {
  console.error('❌ Unexpected database error:', err);
});

module.exports = pool;
