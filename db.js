// db.js
const { Pool } = require('pg');

// Create a new connection pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    require: true,             // Supabase requires SSL
    rejectUnauthorized: false, // Allow self-signed certificates
  },
});

// Optional: test connection when app starts
pool.connect()
  .then(client => {
    console.log('✅ Connected to Supabase Postgres');
    client.release();
  })
  .catch(err => {
    console.error('❌ Database connection error:', err.stack);
  });

module.exports = pool;
