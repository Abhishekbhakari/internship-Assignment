const express = require('express');
const { seedDatabase } = require('../controllers/initializeDatabase');

const router = express.Router();

router.get('/seed', seedDatabase);

module.exports = router;
