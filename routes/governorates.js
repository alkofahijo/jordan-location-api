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



/**
 * @swagger
 * tags:
 *   name: Governorates
 *   description: Jordan governorates
 */

/**
 * @swagger
 * /governorates:
 *   get:
 *     summary: Get all governorates
 *     tags: [Governorates]
 *     responses:
 *       200:
 *         description: List of governorates
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   governorate_id:
 *                     type: integer
 *                     example: 1
 *                   name_ar:
 *                     type: string
 *                     example: "عمان"
 *                   name_en:
 *                     type: string
 *                     example: "Amman"
 */

/**
 * @swagger
 * /governorates/id/{id}:
 *   get:
 *     summary: Get a governorate by ID
 *     tags: [Governorates]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Governorate ID
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Governorate found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 governorate_id:
 *                   type: integer
 *                 name_ar:
 *                   type: string
 *                 name_en:
 *                   type: string
 *       404:
 *         description: Governorate not found
 */
