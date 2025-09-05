const express = require('express');
const pool = require('../db');
const router = express.Router();

/**
 * Get all areas filtered by district_id and governorate_id
 */
router.get('/', async (req, res, next) => {
  const { district_id, governorate_id, limit = 100, offset = 0 } = req.query;
  if (!district_id || !governorate_id)
    return res.status(400).json({ error: 'district_id and governorate_id are required' });

  try {
    const result = await pool.query(
      `SELECT area_id, district_id, governorate_id, name_ar, name_en
       FROM areas
       WHERE district_id=$1 AND governorate_id=$2
       ORDER BY area_id
       LIMIT $3 OFFSET $4`,
      [district_id, governorate_id, limit, offset]
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

/**
 * Get area by ID
 */
router.get('/id/:id', async (req, res, next) => {
  const id = parseInt(req.params.id);
  try {
    const result = await pool.query(
      'SELECT area_id, district_id, governorate_id, name_ar, name_en FROM areas WHERE area_id=$1',
      [id]
    );
    if (result.rows.length === 0) return res.status(404).json({ error: 'Area not found' });
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

module.exports = router;
