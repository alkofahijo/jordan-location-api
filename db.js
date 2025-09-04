// db.js
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL, // Supabase connection string
  ssl: { rejectUnauthorized: false }         // required for Supabase SSL
});

module.exports = pool;
