const express = require('express');

const productsController = require('../controllers/products');

// const rootDir = require('../utils/path');

const router = express.Router();

router.get('/', productsController.getProducts);

module.exports = router;
