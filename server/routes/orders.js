// Orders Routes - handle order creation and management

const express = require('express');
const router = express.Router();
const { verifyToken } = require('./auth');
const { userStore } = require('../models/User');
const { orderStore } = require('../models/Order');
const notificationService = require('../services/notifications');

/**
 * POST /orders/create
 * Create a new order and send notifications
 */
router.post('/create', verifyToken, async (req, res) => {
  try {
    const { items } = req.body;
    const userId = req.user.id;
    const userName = req.user.name;

    // Validation
    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ error: 'Cart cannot be empty' });
    }

    // Calculate total (all items are $0.00)
    const totalPrice = 0.00;

    // Create order
    const order = orderStore.create(userId, userName, items, totalPrice);

    // Add order to user's history
    const user = userStore.findById(userId);
    if (user) {
      user.addOrder(order);
    }

    // Send notifications to admin
    const notificationResult = await notificationService.notifyAdmin(userName, items);

    res.status(201).json({
      message: 'Order created successfully',
      order: {
        id: order.id,
        status: order.status,
        items: order.items,
        createdAt: order.createdAt
      },
      notifications: notificationResult
    });
  } catch (error) {
    console.error('Order creation error:', error);
    res.status(500).json({ error: 'Failed to create order' });
  }
});

/**
 * GET /orders/my-orders
 * Get current user's orders
 */
router.get('/my-orders', verifyToken, (req, res) => {
  try {
    const userId = req.user.id;
    const userOrders = orderStore.findByUserId(userId);

    res.json({
      orders: userOrders.map(order => ({
        id: order.id,
        status: order.status,
        items: order.items,
        totalPrice: order.totalPrice,
        createdAt: order.createdAt
      }))
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
});

/**
 * GET /orders/:orderId
 * Get specific order details
 */
router.get('/:orderId', verifyToken, (req, res) => {
  try {
    const { orderId } = req.params;
    const order = orderStore.findById(orderId);

    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    // Verify user owns this order
    if (order.userId !== req.user.id) {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    res.json({
      order: {
        id: order.id,
        userId: order.userId,
        userName: order.userName,
        status: order.status,
        items: order.items,
        totalPrice: order.totalPrice,
        createdAt: order.createdAt,
        updatedAt: order.updatedAt
      }
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch order' });
  }
});

/**
 * GET /orders/admin/all
 * Get all orders (admin only - in production, add admin check)
 */
router.get('/admin/all', verifyToken, (req, res) => {
  try {
    const allOrders = orderStore.getAllOrders();

    res.json({
      totalOrders: allOrders.length,
      orders: allOrders.map(order => ({
        id: order.id,
        userName: order.userName,
        status: order.status,
        items: order.items,
        totalPrice: order.totalPrice,
        createdAt: order.createdAt,
        updatedAt: order.updatedAt,
        summary: order.getSummary()
      }))
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
});

module.exports = router;
