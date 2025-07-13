// backend/routes/dashboardRoutes.js
const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboardController');

router.get('/sales', dashboardController.getTotalSales);
router.get('/orders', dashboardController.getTotalOrders);
router.get('/report', dashboardController.getSalesReport); // ✅ Add this
router.get('/popular', dashboardController.getPopularItems); // ✅ Add this

module.exports = router;
