const pool = require('../db');

const getDistrictsByGovernorate = async (req, res, next) => {
  const { governorateId } = req.params;
  const { page = 1, limit = 50, search = '' } = req.query;

  const offset = (page - 1) * limit;

  try {
    const result = await pool.query(
      `SELECT id, name_ar, name_en
       FROM districts
       WHERE governorate_id = $1 AND name_ar ILIKE $2
       ORDER BY id
       LIMIT $3 OFFSET $4`,
      [governorateId, `%${search}%`, limit, offset]
    );

    res.json(result.rows);
  } catch (err) {
    next(err);
  }
};

module.exports = { getDistrictsByGovernorate };
