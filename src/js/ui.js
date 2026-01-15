// UI Manager - handles all UI interactions and state

class UIManager {
  constructor() {
    this.currentView = 'login';
    this.cart = [];
    this.user = null;
    this.menu = null;
    this.init();
  }

  init() {
    this.setupEventListeners();
    this.checkAuthentication();
  }

  setupEventListeners() {
    // Auth events
    document.addEventListener('showLogin', () => this.showLoginView());
    document.addEventListener('showSignup', () => this.showSignupView());
    document.addEventListener('showMenu', () => this.loadAndShowMenu());
    document.addEventListener('logout', () => this.handleLogout());
    document.addEventListener('addToCart', (e) => this.addToCart(e.detail));
    document.addEventListener('removeFromCart', (e) => this.removeFromCart(e.detail));
    document.addEventListener('placeOrder', () => this.placeOrder());
    document.addEventListener('viewFavorites', () => this.showFavoritesView());
    document.addEventListener('viewOrderHistory', () => this.showOrderHistoryView());

    // Form submissions
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
      loginForm.addEventListener('submit', (e) => this.handleLogin(e));
    }

    const signupForm = document.getElementById('signupForm');
    if (signupForm) {
      signupForm.addEventListener('submit', (e) => this.handleSignup(e));
    }
  }

  async checkAuthentication() {
    if (api.isAuthenticated()) {
      try {
        const response = await api.getProfile();
        this.user = response.user;
        this.showMenuView();
      } catch (error) {
        api.logout();
        this.showLoginView();
      }
    } else {
      this.showLoginView();
    }
  }

  // ============ VIEWS ============

  showLoginView() {
    this.currentView = 'login';
    const app = document.getElementById('app');
    app.innerHTML = `
      <div class="auth-container">
        <div class="auth-card">
          <div class="auth-header">
            <h1>☕ OfficeBar</h1>
            <p>Premium Office Beverages</p>
          </div>
          
          <form id="loginForm" class="auth-form">
            <div class="form-group">
              <label for="loginEmail">Email</label>
              <input
                type="email"
                id="loginEmail"
                name="email"
                placeholder="your@company.com"
                required
              />
            </div>

            <div class="form-group">
              <label for="loginPassword">Password</label>
              <input
                type="password"
                id="loginPassword"
                name="password"
                placeholder="••••••••"
                required
              />
            </div>

            <button type="submit" class="btn btn-primary btn-block">
              Sign In
            </button>
          </form>

          <div class="auth-footer">
            <p>Don't have an account? <a href="#" onclick="document.dispatchEvent(new Event('showSignup'))">Sign up</a></p>
          </div>
        </div>
      </div>
    `;

    const loginForm = document.getElementById('loginForm');
    loginForm.addEventListener('submit', (e) => this.handleLogin(e));
  }

  showSignupView() {
    this.currentView = 'signup';
    const app = document.getElementById('app');
    app.innerHTML = `
      <div class="auth-container">
        <div class="auth-card">
          <div class="auth-header">
            <h1>☕ OfficeBar</h1>
            <p>Join Our Community</p>
          </div>
          
          <form id="signupForm" class="auth-form">
            <div class="form-row">
              <div class="form-group">
                <label for="signupFirstName">First Name</label>
                <input
                  type="text"
                  id="signupFirstName"
                  name="firstName"
                  placeholder="John"
                  required
                />
              </div>

              <div class="form-group">
                <label for="signupLastName">Last Name</label>
                <input
                  type="text"
                  id="signupLastName"
                  name="lastName"
                  placeholder="Doe"
                  required
                />
              </div>
            </div>

            <div class="form-group">
              <label for="signupEmail">Email</label>
              <input
                type="email"
                id="signupEmail"
                name="email"
                placeholder="your@company.com"
                required
              />
            </div>

            <div class="form-group">
              <label for="signupPassword">Password</label>
              <input
                type="password"
                id="signupPassword"
                name="password"
                placeholder="At least 6 characters"
                minlength="6"
                required
              />
            </div>

            <button type="submit" class="btn btn-primary btn-block">
              Create Account
            </button>
          </form>

          <div class="auth-footer">
            <p>Already have an account? <a href="#" onclick="document.dispatchEvent(new Event('showLogin'))">Sign in</a></p>
          </div>
        </div>
      </div>
    `;

    const signupForm = document.getElementById('signupForm');
    signupForm.addEventListener('submit', (e) => this.handleSignup(e));
  }

  async showMenuView() {
    this.currentView = 'menu';
    this.renderMenuView();
  }

  renderMenuView() {
    const app = document.getElementById('app');
    
    app.innerHTML = `
      <div class="app-container">
        <header class="navbar">
          <div class="navbar-brand">
            <h1>☕ OfficeBar</h1>
          </div>
          <div class="navbar-menu">
            <div class="user-info">
              <span>👤 ${this.user?.name || 'User'}</span>
            </div>
            <button class="btn btn-secondary btn-sm" onclick="document.dispatchEvent(new Event('viewOrderHistory'))">
              📜 My Orders
            </button>
            <button class="btn btn-secondary btn-sm" onclick="document.dispatchEvent(new Event('logout'))">
              🚪 Logout
            </button>
          </div>
        </header>

        <main class="main-content">
          <div class="menu-section">
            <div id="menuCategories" class="menu-categories"></div>
            <div id="menuItems" class="menu-items"></div>
          </div>

          <aside class="cart-sidebar">
            <div class="cart-header">
              <h2>🛒 Cart</h2>
              <span class="cart-badge" id="cartCount">0</span>
            </div>
            <div id="cartItems" class="cart-items"></div>
            <div class="cart-summary">
              <div class="summary-row">
                <span>Subtotal:</span>
                <span>$0.00</span>
              </div>
              <div class="summary-row">
                <span>Tax:</span>
                <span>$0.00</span>
              </div>
              <div class="summary-row total">
                <span>Total:</span>
                <span id="cartTotal">$0.00</span>
              </div>
              <button 
                id="orderBtn"
                class="btn btn-primary btn-block"
                onclick="document.dispatchEvent(new Event('placeOrder'))"
                ${this.cart.length === 0 ? 'disabled' : ''}
              >
                Order Now
              </button>
            </div>
          </aside>
        </main>
      </div>
    `;

    this.loadMenuCategories();
  }

  async loadMenuCategories() {
    try {
      const response = await api.getMenu();
      this.menu = response.menu;

      const categoriesContainer = document.getElementById('menuCategories');
      categoriesContainer.innerHTML = Object.keys(this.menu).map(category => `
        <button 
          class="category-btn"
          onclick="ui.showCategory('${category}')"
        >
          ${this.menu[category].emoji} ${this.menu[category].name}
        </button>
      `).join('');

      // Show first category by default
      const firstCategory = Object.keys(this.menu)[0];
      this.showCategory(firstCategory);
    } catch (error) {
      this.showError('Failed to load menu');
    }
  }

  showCategory(category) {
    const itemsContainer = document.getElementById('menuItems');
    const drinks = this.menu[category].drinks;

    itemsContainer.innerHTML = `
      <div class="category-header">
        <h2>${this.menu[category].emoji} ${this.menu[category].name}</h2>
      </div>
      <div class="drinks-grid">
        ${drinks.map(drink => `
          <div class="drink-card">
            <div class="drink-image">${drink.image}</div>
            <div class="drink-info">
              <h3>${drink.name}</h3>
              <p class="drink-description">${drink.description}</p>
              <div class="drink-footer">
                <span class="drink-price">$${drink.price.toFixed(2)}</span>
                <button 
                  class="btn btn-small"
                  onclick="document.dispatchEvent(new CustomEvent('addToCart', { detail: ${JSON.stringify(drink).replace(/"/g, '&quot;')} }))"
                >
                  Add +
                </button>
              </div>
            </div>
          </div>
        `).join('')}
      </div>
    `;
  }

  addToCart(drink) {
    const existingItem = this.cart.find(item => item.id === drink.id);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      this.cart.push({ ...drink, quantity: 1 });
    }

    this.updateCartDisplay();
  }

  removeFromCart(drinkId) {
    const index = this.cart.findIndex(item => item.id === drinkId);
    if (index > -1) {
      this.cart.splice(index, 1);
    }
    this.updateCartDisplay();
  }

  updateCartDisplay() {
    const cartItemsContainer = document.getElementById('cartItems');
    const cartCountBadge = document.getElementById('cartCount');
    const cartTotalSpan = document.getElementById('cartTotal');
    const orderBtn = document.getElementById('orderBtn');

    cartCountBadge.textContent = this.cart.length;

    if (this.cart.length === 0) {
      cartItemsContainer.innerHTML = '<div class="empty-cart">Your cart is empty</div>';
      cartTotalSpan.textContent = '$0.00';
      orderBtn.disabled = true;
    } else {
      cartItemsContainer.innerHTML = this.cart.map((item, index) => `
        <div class="cart-item">
          <div class="cart-item-info">
            <span class="cart-item-name">${item.name}</span>
            <span class="cart-item-qty">x${item.quantity}</span>
          </div>
          <button 
            class="btn-remove"
            onclick="document.dispatchEvent(new CustomEvent('removeFromCart', { detail: '${item.id}' }))"
          >
            ✕
          </button>
        </div>
      `).join('');

      const total = this.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      cartTotalSpan.textContent = `$${total.toFixed(2)}`;
      orderBtn.disabled = false;
    }
  }

  async placeOrder() {
    if (this.cart.length === 0) return;

    try {
      const orderButton = document.getElementById('orderBtn');
      orderButton.disabled = true;
      orderButton.textContent = 'Processing...';

      const items = this.cart.map(item => ({
        drinkId: item.id,
        drinkName: item.name,
        quantity: item.quantity,
        price: item.price
      }));

      const response = await api.createOrder(items);

      this.showSuccess(`Order #${response.order.id} placed successfully! Notifications sent to admin.`);
      this.cart = [];
      this.updateCartDisplay();
      
      orderButton.textContent = 'Order Now';
    } catch (error) {
      this.showError(`Order failed: ${error.message}`);
      const orderButton = document.getElementById('orderBtn');
      orderButton.disabled = false;
      orderButton.textContent = 'Order Now';
    }
  }

  async showOrderHistoryView() {
    try {
      const response = await api.getMyOrders();
      this.renderOrderHistoryView(response.orders);
    } catch (error) {
      this.showError('Failed to load order history');
    }
  }

  renderOrderHistoryView(orders) {
    const app = document.getElementById('app');
    
    app.innerHTML = `
      <div class="app-container">
        <header class="navbar">
          <div class="navbar-brand">
            <h1>☕ OfficeBar</h1>
          </div>
          <div class="navbar-menu">
            <button class="btn btn-secondary btn-sm" onclick="document.dispatchEvent(new Event('showMenu'))">
              ← Back to Menu
            </button>
          </div>
        </header>

        <main class="order-history">
          <h2>📜 My Orders</h2>
          ${orders.length === 0 ? `
            <div class="empty-state">
              <p>No orders yet. Start by ordering from the menu!</p>
            </div>
          ` : `
            <div class="orders-list">
              ${orders.map(order => `
                <div class="order-card">
                  <div class="order-header">
                    <h3>${order.id}</h3>
                    <span class="order-status status-${order.status}">${order.status.toUpperCase()}</span>
                  </div>
                  <div class="order-items">
                    ${order.items.map(item => `
                      <div class="order-item">
                        ${item.quantity}x ${item.drinkName}
                      </div>
                    `).join('')}
                  </div>
                  <div class="order-footer">
                    <span class="order-date">${new Date(order.createdAt).toLocaleString()}</span>
                    <span class="order-total">Total: $${order.totalPrice.toFixed(2)}</span>
                  </div>
                </div>
              `).join('')}
            </div>
          `}
        </main>
      </div>
    `;
  }

  showFavoritesView() {
    this.showError('Favorites feature coming soon!');
  }

  async handleLogin(e) {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    try {
      const response = await api.login(email, password);
      this.user = response.user;
      this.showMenuView();
    } catch (error) {
      this.showError(`Login failed: ${error.message}`);
    }
  }

  async handleSignup(e) {
    e.preventDefault();
    const firstName = document.getElementById('signupFirstName').value;
    const lastName = document.getElementById('signupLastName').value;
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;

    try {
      const response = await api.signup(email, password, firstName, lastName);
      this.user = response.user;
      this.showMenuView();
    } catch (error) {
      this.showError(`Signup failed: ${error.message}`);
    }
  }

  handleLogout() {
    api.logout();
    this.user = null;
    this.cart = [];
    this.showLoginView();
  }

  showSuccess(message) {
    this.showNotification(message, 'success');
  }

  showError(message) {
    this.showNotification(message, 'error');
  }

  showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
      notification.classList.add('show');
    }, 10);

    setTimeout(() => {
      notification.classList.remove('show');
      setTimeout(() => notification.remove(), 300);
    }, 3000);
  }
}

// Initialize UI when DOM is ready
let ui;
document.addEventListener('DOMContentLoaded', () => {
  ui = new UIManager();
});
