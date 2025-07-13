// backend/controllers/dashboardController.js
const db = require('../db');

// ✅ GET /api/dashboard/sales – Total Sales Amount
exports.getTotalSales = async (req, res) => {
  try {
    const result = await db.query('SELECT SUM(total_price) AS total_sales FROM orders');
    res.json({ totalSales: parseFloat(result.rows[0].total_sales) || 0 });
  } catch (err) {
    console.error('❌ Sales Stats Error:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
};

// ✅ GET /api/dashboard/orders – Total Orders Count
exports.getTotalOrders = async (req, res) => {
  try {
    const result = await db.query('SELECT COUNT(*) AS total_orders FROM orders');
    res.json({ totalOrders: parseInt(result.rows[0].total_orders) || 0 });
  } catch (err) {
    console.error('❌ Order Count Error:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
};

// ✅ GET /api/dashboard/sales-stats – Combined sales, orders, items
exports.getTotalSalesStats = async (req, res) => {
  try {
    const totalSales = await db.query('SELECT COALESCE(SUM(total_price), 0) AS total_sales FROM orders');
    const totalOrders = await db.query('SELECT COUNT(*) AS total_orders FROM orders');
    const totalItems = await db.query('SELECT COALESCE(SUM(quantity), 0) AS total_items FROM order_items');

    res.json({
      totalSales: totalSales.rows[0].total_sales,
      totalOrders: totalOrders.rows[0].total_orders,
      totalItems: totalItems.rows[0].total_items,
    });
  } catch (err) {
    console.error('❌ Sales Stats Error:', err.message);
    res.status(500).json({ error: 'Server error' });
  }
};

// ✅ GET /api/dashboard/report – Daily Sales Report
exports.getSalesReport = async (req, res) => {
  try {
    const report = await db.query(`
      SELECT 
        DATE(created_at) AS date,
        COUNT(*) AS order_count,
        SUM(total_price) AS total_sales
      FROM orders
      GROUP BY DATE(created_at)
      ORDER BY DATE(created_at)
    `);
    res.json(report.rows);
  } catch (err) {
    console.error('❌ Sales Report Error:', err.message);
    res.status(500).json({ error: 'Server error' });
  }
};

// ✅ GET /api/dashboard/popular – Top 5 Most Sold Menu Items
exports.getPopularItems = async (req, res) => {
  try {
    const popularItems = await db.query(`
      SELECT m.name, SUM(oi.quantity) AS total_sold
      FROM order_items oi
      JOIN menu m ON m.id = oi.menu_id
      GROUP BY m.name
      ORDER BY total_sold DESC
      LIMIT 5
    `);
    res.json(popularItems.rows);
  } catch (err) {
    console.error('❌ Popular Items Error:', err.message);
    res.status(500).json({ error: 'Server error' });
  }
};
