// routes/areas.js
const express = require('express');
const pool = require('../db');
const router = express.Router();

// =======================
// Get all areas (filter by district_id and governorate_id)
// =======================
router.get('/', async (req, res, next) => {
  const { district_id, governorate_id, limit = 100, offset = 0 } = req.query;

  // Input validation
  if (!district_id || !governorate_id) {
    return res.status(400).json({ error: 'district_id and governorate_id are required' });
  }

  const districtIdNum = parseInt(district_id);
  const governorateIdNum = parseInt(governorate_id);
  const limitNum = parseInt(limit);
  const offsetNum = parseInt(offset);

  if (isNaN(districtIdNum) || isNaN(governorateIdNum)) {
    return res.status(400).json({ error: 'district_id and governorate_id must be numbers' });
  }

  try {
    const result = await pool.query(
      `SELECT area_id, district_id, governorate_id, name_ar, name_en 
       FROM areas 
       WHERE district_id=$1 AND governorate_id=$2
       ORDER BY area_id
       LIMIT $3 OFFSET $4`,
      [districtIdNum, governorateIdNum, limitNum, offsetNum]
    );
    res.json({ status: 'success', count: result.rows.length, data: result.rows });
  } catch (err) {
    console.error('DB error:', err.stack);
    next(err); // Pass to Express error handler
  }
});

// =======================
// Get area by ID
// =======================
router.get('/id/:id', async (req, res, next) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) return res.status(400).json({ error: 'Invalid area ID' });

  try {
    const result = await pool.query(
      'SELECT area_id, district_id, governorate_id, name_ar, name_en FROM areas WHERE area_id=$1',
      [id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Area not found' });
    }
    res.json({ status: 'success', data: result.rows[0] });
  } catch (err) {
    console.error('DB error:', err.stack);
    next(err);
  }
});

module.exports = router;
