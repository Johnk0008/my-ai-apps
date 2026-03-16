const express = require('express');
const router = express.Router();
const products = require('../data/products');

// Get all products
router.get('/', (req, res) => {
  res.json(products);
});

// Get product by id
router.get('/:id', (req, res) => {
  const product = products.find(p => p.id === req.params.id);
  if (!product) {
    return res.status(404).json({ error: 'Product not found' });
  }
  res.json(product);
});

module.exports = router;
