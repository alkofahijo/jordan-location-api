const express = require('express');
const pool = require('../db');
const router = express.Router();

/**
 * Get all districts (optional filter by governorate_id)
 */
router.get('/', async (req, res, next) => {
  const { governorate_id } = req.query;
  try {
    let query = 'SELECT district_id, governorate_id, name_ar, name_en FROM districts';
    const params = [];
    if (governorate_id) {
      query += ' WHERE governorate_id=$1';
      params.push(governorate_id);
    }
    query += ' ORDER BY district_id';
    const result = await pool.query(query, params);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

/**
 * Get district by ID
 */
router.get('/id/:id', async (req, res, next) => {
  const id = parseInt(req.params.id);
  try {
    const result = await pool.query(
      'SELECT district_id, governorate_id, name_ar, name_en FROM districts WHERE district_id=$1',
      [id]
    );
    if (result.rows.length === 0) return res.status(404).json({ error: 'District not found' });
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

module.exports = router;
