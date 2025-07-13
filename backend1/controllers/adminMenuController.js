const pool = require('../db');
const path = require('path');

// ✅ GET all menu items
const getMenuItems = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM menu ORDER BY category, name');
    res.json(result.rows);
  } catch (err) {
    console.error('❌ Error fetching menu:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
};

// ✅ POST - Add menu item with image
const addMenuItem = async (req, res) => {
  try {
    const { name, category, price_half, price_full, description } = req.body;
    const image_url = req.file ? req.file.filename : null;

    if (!name || !category || !price_full || !image_url) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    await pool.query(
      'INSERT INTO menu (name, category, price_half, price_full, description, image_url) VALUES ($1, $2, $3, $4, $5, $6)',
      [name, category, price_half || null, price_full, description || null, image_url]
    );

    res.status(201).json({ message: 'Item added successfully' });
  } catch (err) {
    console.error('❌ Error adding item:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
};

// ✅ DELETE a menu item
const deleteMenuItem = async (req, res) => {
  const { id } = req.params;

  try {
    await pool.query('DELETE FROM menu WHERE id = $1', [id]);
    res.json({ message: 'Item deleted' });
  } catch (err) {
    console.error('❌ Error deleting item:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getMenuItems,
  addMenuItem,
  deleteMenuItem,
};
