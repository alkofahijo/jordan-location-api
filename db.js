// db.js
const { Pool } = require('pg');
const dns = require('dns');

// Force IPv4 DNS resolution (fix ENETUNREACH)
dns.setDefaultResultOrder('ipv4first');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }, // required for Supabase Direct Connection
});

// Log successful connection
pool.on('connect', () => console.log('✅ Connected to Supabase database'));

// Log unexpected errors
pool.on('error', (err) => console.error('❌ Unexpected database error:', err));

module.exports = pool;
