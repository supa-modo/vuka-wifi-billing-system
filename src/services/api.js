// API service for VukaWiFi Billing System
const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api/v1";

const DEMO_MODE = true;

const demoPayments = [
  {
    id: "pmt1",
    phoneNumber: "254712345678",
    paymentPlan: { name: "1 Day" },
    amount: 50,
    status: "completed",
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    paidAt: new Date(Date.now() - 86000000).toISOString(),
  },
  {
    id: "pmt2",
    phoneNumber: "254723456789",
    paymentPlan: { name: "1 Hour" },
    amount: 15,
    status: "pending",
    createdAt: new Date(Date.now() - 3600000).toISOString(),
    paidAt: null,
  },
  {
    id: "pmt3",
    phoneNumber: "254734567890",
    paymentPlan: { name: "1 Week" },
    amount: 350,
    status: "failed",
    createdAt: new Date(Date.now() - 604800000).toISOString(),
    paidAt: null,
  },
];

const demoSMSLogs = [
  {
    phoneNumber: "254712345678",
    message: "Your WiFi password is: demo1234",
    status: "delivered",
    sentAt: new Date(Date.now() - 60000).toISOString(),
  },
  {
    phoneNumber: "254723456789",
    message: "Your WiFi password is: test5678",
    status: "failed",
    sentAt: new Date(Date.now() - 120000).toISOString(),
  },
  {
    phoneNumber: "254734567890",
    message: "Your WiFi password is: weekpass",
    status: "sent",
    sentAt: new Date(Date.now() - 180000).toISOString(),
  },
];

const demoRouterCreds = [
  {
    id: "cred1",
    username: "254712345678",
    deviceCount: 2,
    expiresAt: new Date(Date.now() + 86400000).toISOString(),
    status: "active",
  },
  {
    id: "cred2",
    username: "254723456789",
    deviceCount: 1,
    expiresAt: new Date(Date.now() - 3600000).toISOString(),
    status: "expired",
  },
  {
    id: "cred3",
    username: "254734567890",
    deviceCount: 3,
    expiresAt: new Date(Date.now() + 604800000).toISOString(),
    status: "active",
  },
];

const demoPlans = [
  {
    id: "plan1",
    name: "1 Hour",
    durationHours: 1,
    price: 15,
    maxDevices: 2,
    isPopular: false,
    features: [
      "High Speed Internet Access",
      "HD Video Streaming",
      "Unlimited Internet, Youtube + more",
    ],
    durationDisplay: "1 Hour",
    dataLimitDisplay: "500 MB",
  },
  {
    id: "plan2",
    name: "1 Day",
    durationHours: 24,
    price: 50,
    maxDevices: 3,
    isPopular: true,
    features: [
      "High Speed Internet Access",
      "UHD Video Streaming",
      "Unlimited Internet, Youtube + more",
    ],
    durationDisplay: "1 Day",
    dataLimitDisplay: "5 GB",
  },
  {
    id: "plan3",
    name: "1 Week",
    durationHours: 168,
    price: 350,
    maxDevices: 4,
    isPopular: false,
    features: [
      "Ultra High Speed Internet Access",
      "Online Gaming Support & Streaming",
      "Unlimited Internet, Youtube + more",
    ],
    durationDisplay: "1 Week",
    dataLimitDisplay: "25 GB",
  },
  {
    id: "plan4",
    name: "1 Month",
    durationHours: 720,
    price: 1000,
    maxDevices: 5,
    isPopular: false,
    features: [
      "Maximum Internet Speed",
      "Premium Online Gaming Speeds",
      "24/7 Customer Support + more",
    ],
    durationDisplay: "1 Month",
    dataLimitDisplay: "Unlimited",
  },
];

export const apiFetch = async (url, options = {}) => {
  const token = localStorage.getItem("adminToken");
  const headers = {
    ...(options.headers || {}),
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
  return fetch(url, { ...options, headers });
};

class ApiService {
  constructor() {
    this.baseURL = API_BASE_URL;
    this.token = localStorage.getItem("authToken");
  }

  // Set authentication token
  setAuthToken(token) {
    this.token = token;
    if (token) {
      localStorage.setItem("authToken", token);
    } else {
      localStorage.removeItem("authToken");
    }
  }

  // Get authentication headers
  getAuthHeaders() {
    const headers = {
      "Content-Type": "application/json",
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
      headers: this.getAuthHeaders(),
      ...options,
    };

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || data.error || "API request failed");
      }

      return data;
    } catch (error) {
      console.error("API Request Error:", error);
      throw error;
    }
  }

  // GET request
  async get(endpoint, params = {}) {
    if (DEMO_MODE) {
      if (endpoint === "/admin/payments")
        return { success: true, data: demoPayments };
      if (endpoint === "/admin/sms")
        return { success: true, data: demoSMSLogs };
      if (endpoint === "/admin/router/wifi-credentials")
        return { success: true, data: demoRouterCreds };
      if (endpoint === "/payment-plans")
        return { success: true, data: demoPlans };
      // Add more demo endpoints as needed
      return { success: true, data: [] };
    }
    const queryString = new URLSearchParams(params).toString();
    const url = queryString ? `${endpoint}?${queryString}` : endpoint;

    return this.request(url, {
      method: "GET",
    });
  }

  // POST request
  async post(endpoint, data = {}) {
    if (DEMO_MODE) return { success: true, data: {} };
    return this.request(endpoint, {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  // PUT request
  async put(endpoint, data = {}) {
    if (DEMO_MODE) return { success: true, data: {} };
    return this.request(endpoint, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  }

  // DELETE request
  async delete(endpoint) {
    if (DEMO_MODE) return { success: true };
    return this.request(endpoint, {
      method: "DELETE",
    });
  }

  // PATCH request
  async patch(endpoint, data = {}) {
    if (DEMO_MODE) return { success: true, data: {} };
    return this.request(endpoint, {
      method: "PATCH",
      body: JSON.stringify(data),
    });
  }

  // ================================
  // PAYMENT PLANS API
  // ================================

  // Get all payment plans
  async getPaymentPlans(activeOnly = true) {
    if (DEMO_MODE) return { success: true, data: demoPlans };
    return this.get("/payment-plans", { active_only: activeOnly });
  }

  // Get single payment plan
  async getPaymentPlan(planId) {
    return this.get(`/payment-plans/${planId}`);
  }

  // Calculate price for multiple devices
  async calculatePlanPrice(planId, deviceCount) {
    if (DEMO_MODE) {
      const plan = demoPlans.find((p) => p.id === planId);
      if (!plan) return { success: false };
      let calculatedPrice = plan.price;
      if (deviceCount > 1)
        calculatedPrice = Math.round(
          plan.price * (1 + 0.6 * (deviceCount - 1))
        );
      return { success: true, data: { calculatedPrice } };
    }
    return this.get(`/payment-plans/${planId}/calculate-price`, {
      deviceCount,
    });
  }

  // Create payment plan (admin)
  async createPaymentPlan(planData) {
    return this.post("/payment-plans", planData);
  }

  // Update payment plan (admin)
  async updatePaymentPlan(planId, planData) {
    return this.put(`/payment-plans/${planId}`, planData);
  }

  // Delete payment plan (admin)
  async deletePaymentPlan(planId) {
    return this.delete(`/payment-plans/${planId}`);
  }

  // Toggle plan status (admin)
  async togglePlanStatus(planId) {
    return this.patch(`/payment-plans/${planId}/toggle`);
  }

  // Set popular plan (admin)
  async setPopularPlan(planId) {
    return this.patch(`/payment-plans/${planId}/set-popular`);
  }

  // ================================
  // PAYMENTS API (to be implemented)
  // ================================

  // Initiate M-Pesa payment
  async initiatePayment(paymentData) {
    return this.post("/payments/initiate", paymentData);
  }

  // Check payment status
  async checkPaymentStatus(paymentId) {
    return this.get(`/payments/${paymentId}/status`);
  }

  // Get payment history by phone
  async getPaymentHistory(phoneNumber) {
    return this.get(`/payments/history`, { phone: phoneNumber });
  }

  // ================================
  // WIFI CREDENTIALS API (to be implemented)
  // ================================

  // Check WiFi access for MAC address
  async checkWifiAccess(macAddress) {
    return this.get("/wifi/check-access", { mac: macAddress });
  }

  // Verify WiFi login credentials
  async verifyWifiLogin(username, password) {
    return this.post("/wifi/verify-login", { username, password });
  }

  // Get active WiFi sessions by phone
  async getActiveWifiSessions(phoneNumber) {
    return this.get("/wifi/sessions", { phone: phoneNumber });
  }

  // ================================
  // ADMIN AUTHENTICATION API (to be implemented)
  // ================================

  // Admin login
  async adminLogin(credentials) {
    const response = await this.post("/admin/login", credentials);
    if (response.success && response.data.token) {
      this.setAuthToken(response.data.token);
    }
    return response;
  }

  // Admin logout
  async adminLogout() {
    await this.post("/admin/logout");
    this.setAuthToken(null);
  }

  // Get admin profile
  async getAdminProfile() {
    return this.get("/admin/profile");
  }

  // ================================
  // HEALTH CHECK
  // ================================

  // Check API health
  async checkHealth() {
    return this.get("/health");
  }
}

// Create and export a singleton instance
const apiService = new ApiService();
export default apiService;

// Export the class for testing purposes
export { ApiService };
