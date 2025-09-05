// routes/districts.js
const express = require('express');
const pool = require('../db');
const router = express.Router();

// =======================
// Get all districts (optional: filter by governorate_id)
// =======================
router.get('/', async (req, res, next) => {
  const { governorate_id } = req.query;
  const params = [];
  let query = 'SELECT district_id, governorate_id, name_ar, name_en FROM districts';

  if (governorate_id) {
    const govIdNum = parseInt(governorate_id);
    if (isNaN(govIdNum)) {
      return res.status(400).json({ error: 'governorate_id must be a number' });
    }
    query += ' WHERE governorate_id=$1';
    params.push(govIdNum);
  }

  query += ' ORDER BY district_id';

  try {
    const result = await pool.query(query, params);
    res.json({ status: 'success', count: result.rows.length, data: result.rows });
  } catch (err) {
    console.error('DB error:', err.stack);
    next(err);
  }
});

// =======================
// Get district by ID
// =======================
router.get('/id/:id', async (req, res, next) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) return res.status(400).json({ error: 'Invalid district ID' });

  try {
    const result = await pool.query(
      'SELECT district_id, governorate_id, name_ar, name_en FROM districts WHERE district_id=$1',
      [id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'District not found' });
    }
    res.json({ status: 'success', data: result.rows[0] });
  } catch (err) {
    console.error('DB error:', err.stack);
    next(err);
  }
});

module.exports = router;
