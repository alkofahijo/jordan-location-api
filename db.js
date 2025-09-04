const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL, // store your URI in .env
  ssl: { rejectUnauthorized: false } // Supabase requires this
});

module.exports = pool;
