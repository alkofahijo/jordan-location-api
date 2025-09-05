// test-connection.js
const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { require: true, rejectUnauthorized: false },
});

(async () => {
  try {
    const result = await pool.query('SELECT NOW()');
    console.log('✅ Database connected successfully:', result.rows[0]);
    process.exit(0);
  } catch (err) {
    console.error('❌ Database connection failed:');
    console.error('Error code:', err.code);           // PostgreSQL error code
    console.error('Error message:', err.message);     // Detailed message
    console.error('Error stack:', err.stack);         // Stack trace
    process.exit(1);
  }
})();
