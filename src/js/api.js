// API Client - handles all communication with the backend

class APIClient {
  constructor(baseURL) {
    // Use current origin for production, localhost for development
    this.baseURL = baseURL || `${window.location.origin}/api`;
    this.token = localStorage.getItem('token');
  }

  // Set authorization token
  setToken(token) {
    this.token = token;
    localStorage.setItem('token', token);
  }

  // Get authorization header
  getHeaders() {
    const headers = {
      'Content-Type': 'application/json'
    };

    if (this.token) {
      headers.Authorization = `Bearer ${this.token}`;
    }

    return headers;
  }

  // Generic request method
  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const config = {
      ...options,
      headers: this.getHeaders()
    };

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || `HTTP ${response.status}`);
      }

      return data;
    } catch (error) {
      console.error(`API Error (${endpoint}):`, error);
      throw error;
    }
  }

  // ============ AUTHENTICATION ============

  async signup(email, password, firstName, lastName) {
    const data = await this.request('/auth/signup', {
      method: 'POST',
      body: JSON.stringify({ email, password, firstName, lastName })
    });

    if (data.token) {
      this.setToken(data.token);
    }

    return data;
  }

  async login(email, password) {
    const data = await this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password })
    });

    if (data.token) {
      this.setToken(data.token);
    }

    return data;
  }

  async getProfile() {
    return this.request('/auth/me', { method: 'GET' });
  }

  logout() {
    this.token = null;
    localStorage.removeItem('token');
  }

  isAuthenticated() {
    return !!this.token;
  }

  // ============ MENU ============

  async getMenu() {
    return this.request('/menu', { method: 'GET' });
  }

  async getCategory(category) {
    return this.request(`/menu/category/${category}`, { method: 'GET' });
  }

  async getDrink(drinkId) {
    return this.request(`/menu/drink/${drinkId}`, { method: 'GET' });
  }

  // ============ ORDERS ============

  async createOrder(items) {
    const data = await this.request('/orders/create', {
      method: 'POST',
      body: JSON.stringify({ items })
    });

    return data;
  }

  async getMyOrders() {
    return this.request('/orders/my-orders', { method: 'GET' });
  }

  async getOrder(orderId) {
    return this.request(`/orders/${orderId}`, { method: 'GET' });
  }

  // ============ AUTHENTICATION ============

  isAuthenticated() {
    return !!this.token;
  }

  logout() {
    this.token = null;
    localStorage.removeItem('token');
  }

  async signup(userData) {
    const data = await this.request('/auth/signup', {
      method: 'POST',
      body: JSON.stringify(userData)
    });

    if (data.token) {
      this.setToken(data.token);
    }

    return data;
  }

  async login(credentials) {
    const data = await this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials)
    });

    if (data.token) {
      this.setToken(data.token);
    }

    return data;
  }

  async getProfile() {
    return this.request('/auth/me', { method: 'GET' });
  }
}

// Export singleton instance
const api = new APIClient();
