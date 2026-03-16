const express = require('express');
const crypto = require('crypto');
const router = express.Router();

let orders = [];

// Get all orders
router.get('/', (req, res) => {
  res.json(orders);
});

// Create new order
router.post('/', (req, res) => {
  const { items, total, customer } = req.body;
  if (!items || items.length === 0 || !customer) {
    return res.status(400).json({ error: 'Invalid order data' });
  }

  const newOrder = {
    id: crypto.randomUUID(),
    items,
    total,
    customer,
    status: 'Confirmed',
    createdAt: new Date()
  };

  orders.push(newOrder);
  res.status(201).json({ message: 'Order placed successfully', orderId: newOrder.id });
});

module.exports = router;
