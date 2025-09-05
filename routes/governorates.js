const express = require('express');
const pool = require('../db');
const router = express.Router();

/**
 * Get all governorates
 */
router.get('/', async (req, res, next) => {
  try {
    const result = await pool.query(
      'SELECT governorate_id, name_ar, name_en FROM governorates ORDER BY governorate_id'
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

/**
 * Get governorate by ID
 */
router.get('/id/:id', async (req, res, next) => {
  const id = parseInt(req.params.id);
  try {
    const result = await pool.query(
      'SELECT governorate_id, name_ar, name_en FROM governorates WHERE governorate_id=$1',
      [id]
    );
    if (result.rows.length === 0) return res.status(404).json({ error: 'Governorate not found' });
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

module.exports = router;
