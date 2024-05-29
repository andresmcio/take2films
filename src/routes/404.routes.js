const express = require('express');
const router = express.Router();

const { notFound } = require('../controllers/main.controller');

router.get('*', notFound);

module.exports = router;