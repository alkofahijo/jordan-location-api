// routes/governorates.js
const express = require('express');
const pool = require('../db');
const router = express.Router();

// =======================
// Get all governorates
// =======================
router.get('/', async (req, res, next) => {
  try {
    const result = await pool.query(
      'SELECT governorate_id, name_ar, name_en FROM governorates ORDER BY governorate_id'
    );
    res.json({ status: 'success', count: result.rows.length, data: result.rows });
  } catch (err) {
    console.error('Governorates query error:', err.stack);
    next(err); // Pass to global Express error handler
  }
});

// =======================
// Get governorate by ID
// =======================
router.get('/id/:id', async (req, res, next) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) return res.status(400).json({ error: 'Invalid governorate ID' });

  try {
    const result = await pool.query(
      'SELECT governorate_id, name_ar, name_en FROM governorates WHERE governorate_id=$1',
      [id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Governorate not found' });
    }
    res.json({ status: 'success', data: result.rows[0] });
  } catch (err) {
    console.error('Governorate by ID query error:', err.stack);
    next(err);
  }
});

module.exports = router;
