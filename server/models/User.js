// Simple in-memory user storage (replace with database in production)
// In a real app, use MongoDB, PostgreSQL, etc.

const users = [];

class User {
  constructor(id, email, password, firstName, lastName) {
    this.id = id;
    this.email = email;
    this.password = password;
    this.firstName = firstName;
    this.lastName = lastName;
    this.createdAt = new Date();
    this.orderHistory = [];
    this.favorites = [];
  }

  addOrder(order) {
    this.orderHistory.push({
      orderId: order.id,
      timestamp: new Date(),
      items: order.items,
      totalPrice: order.totalPrice
    });
  }

  addFavorite(drinkId) {
    if (!this.favorites.includes(drinkId)) {
      this.favorites.push(drinkId);
    }
  }

  getFullName() {
    return `${this.firstName} ${this.lastName}`;
  }
}

// In-memory storage
const userStore = {
  users: [],

  create(email, hashedPassword, firstName, lastName) {
    const id = Date.now().toString();
    const user = new User(id, email, hashedPassword, firstName, lastName);
    this.users.push(user);
    return user;
  },

  findByEmail(email) {
    return this.users.find(u => u.email === email);
  },

  findById(id) {
    return this.users.find(u => u.id === id);
  },

  update(id, updates) {
    const user = this.findById(id);
    if (user) {
      Object.assign(user, updates);
      return user;
    }
    return null;
  }
};

module.exports = { User, userStore };
