// backend/controllers/adminController.js
const db = require('../db');

exports.adminLogin = async (req, res) => {
  const { username, password } = req.body;
  try {
    const result = await db.query('SELECT * FROM admins WHERE username = $1 AND password = $2', [username, password]);

    if (result.rows.length === 1) {
      res.json({ token: 'mocked-token' }); // Use JWT in real apps
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (err) {
    console.error('Admin login error:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
};
