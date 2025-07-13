// backend/routes/adminRoutes.js
const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController'); // Make sure path is correct

// POST /api/admin/login
router.post('/login', adminController.adminLogin);

module.exports = router;
