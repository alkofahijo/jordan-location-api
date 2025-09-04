// db.js
const { Pool } = require('pg');
const dns = require('dns');

// Override DNS lookup to force IPv4
const lookup = (hostname, options, callback) => {
  if (typeof options === 'function') {
    callback = options;
    options = {};
  }
  options.family = 4; // force IPv4
  return dns.lookup(hostname, options, callback);
};

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
  // override default lookup to force IPv4
  // pg uses 'lookup' internally
  // note: 'node-postgres' uses pg.defaults for global settings
  // since v8, you can pass 'lookup' in Pool config
  lookup
});

module.exports = pool;
