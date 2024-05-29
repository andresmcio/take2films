const express = require('express');
const router = express.Router();

const { sendEmail } = require('../controllers/users.controller');

router.post('/contact', sendEmail);

module.exports = router;