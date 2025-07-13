const express = require("express");
const router = express.Router();
const pool = require("../db");

// GET all menu items
router.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM menu");
    res.json(result.rows);
  } catch (err) {
    console.error("❌ Menu Fetch Error:", err.message);
    res.status(500).json({ error: "Failed to fetch menu" });
  }
});

module.exports = router;
