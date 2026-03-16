const express = require('express');
const router = express.Router();

let cart = [];

// Get cart
router.get('/', (req, res) => {
  res.json(cart);
});

// Sync cart (overwrite)
router.post('/', (req, res) => {
  cart = req.body;
  res.json(cart);
});

module.exports = router;
