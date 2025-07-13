// controllers/menuController.js
const pool = require("../db");

exports.getMenu = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM menu ORDER BY category, name");

    const menuWithImageUrl = result.rows.map(item => ({
      ...item,
      image_url: `/uploads/${item.image}`  // 👈 Add this
    }));

    res.json(menuWithImageUrl);
  } catch (err) {
    console.error("❌ Failed to fetch menu:", err.message);
    res.status(500).json({ error: "Failed to fetch menu" });
  }
};
