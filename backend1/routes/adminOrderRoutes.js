// routes/adminOrderRoutes.js
const express = require('express');
const router = express.Router();
const adminOrderController = require('../controllers/adminOrderController');

// GET /api/admin/orders
router.get('/', adminOrderController.getAllAdminOrders);

// PUT /api/admin/orders/:id
router.put('/:id', adminOrderController.updateOrderStatus);

module.exports = router;
