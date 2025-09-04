const pool = require('../db');

const getGovernorates = async (req, res, next) => {
  try {
    const result = await pool.query('SELECT id, name_ar, name_en FROM governorates ORDER BY id');
    res.json(result.rows);
  } catch (err) {
    next(err);
  }
};

module.exports = { getGovernorates };
