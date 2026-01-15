// Order Model - stores orders and manages order state

const orders = [];

class Order {
  constructor(id, userId, userName, items, totalPrice) {
    this.id = id;
    this.userId = userId;
    this.userName = userName;
    this.items = items; // Array of { drinkId, drinkName, quantity, price }
    this.totalPrice = totalPrice;
    this.status = 'pending'; // pending, preparing, ready, completed
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }

  updateStatus(newStatus) {
    this.status = newStatus;
    this.updatedAt = new Date();
  }

  getSummary() {
    const itemsList = this.items
      .map(item => `${item.quantity}x ${item.drinkName}`)
      .join(', ');
    return `${this.userName} ordered: ${itemsList}`;
  }
}

// In-memory storage
const orderStore = {
  orders: [],

  create(userId, userName, items, totalPrice) {
    const id = `ORD-${Date.now()}`;
    const order = new Order(id, userId, userName, items, totalPrice);
    this.orders.push(order);
    return order;
  },

  findById(id) {
    return this.orders.find(o => o.id === id);
  },

  findByUserId(userId) {
    return this.orders.filter(o => o.userId === userId);
  },

  updateStatus(orderId, newStatus) {
    const order = this.findById(orderId);
    if (order) {
      order.updateStatus(newStatus);
      return order;
    }
    return null;
  },

  getAllOrders() {
    return this.orders.sort((a, b) => b.createdAt - a.createdAt);
  }
};

module.exports = { Order, orderStore };
