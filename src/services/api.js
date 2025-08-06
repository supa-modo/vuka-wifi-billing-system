// API service for VukaWiFi Billing System
import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api/v1";

const DEMO_MODE = false;

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
    name: "Power Hour",
    description: "Perfect for quick browsing and social media",
    durationHours: 2,
    basePrice: 10,
    bandwidthLimit: "3M/1M",
    maxDevices: 3,
    isPopular: true,
    isActive: true,
    subscribers: 125,
    features: [
      "3 Mbps internet speed",
      "Up to 3 devices supported",
      "Unlimited Internet, Youtube + more",
    ],
    durationDisplay: "2 Hours",
    createdAt: "2023-10-15T10:00:00Z",
  },
  {
    id: "plan2",
    name: "Mega Hour",
    description: "Great for extended browsing sessions",
    durationHours: 3,
    basePrice: 20,
    bandwidthLimit: "5M/2M",
    maxDevices: 3,
    isPopular: false,
    isActive: false,
    subscribers: 360,
    features: [
      "5 Mbps internet speed",
      "Up to 3 devices supported",
      "Unlimited Internet, Youtube + more",
    ],
    durationDisplay: "3 Hours",
    createdAt: "2023-10-14T14:30:00Z",
  },
  {
    id: "plan3",
    name: "Standard Day",
    description: "Great for work and entertainment all day long",
    durationHours: 24,
    basePrice: 35,
    bandwidthLimit: "5M/2M",
    maxDevices: 5,
    isPopular: true,
    isActive: true,
    subscribers: 200,
    features: [
      "5 Mbps internet speed",
      "Up to 5 devices supported",
      "24/7 customer support + more",
    ],
    durationDisplay: "1 Day",
    createdAt: "2023-10-13T09:15:00Z",
  },
  {
    id: "plan4",
    name: "Premium Week",
    description: "Ultimate experience for heavy users and families",
    durationHours: 168,
    basePrice: 300,
    bandwidthLimit: "10M/5M",
    maxDevices: 5,
    isPopular: false,
    isActive: true,
    subscribers: 892,
    features: [
      "10+ Mbps premium internet speed",
      "Up to 5 devices supported",
      "Priority support + more",
    ],
    durationDisplay: "1 Week",
    createdAt: "2023-10-12T16:45:00Z",
  },
];

// Create axios instance with default config
const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor to add auth token
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors globally
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      // Token is invalid, clear it
      localStorage.removeItem("authToken");
    }
    return Promise.reject(error);
  }
);

class ApiService {
  constructor() {
    this.axios = axiosInstance;
  }

  setAuthToken(token) {
    if (token) {
      localStorage.setItem("authToken", token);
    } else {
      localStorage.removeItem("authToken");
    }
  }

  // Generic request method using axios
  async request(endpoint, options = {}) {
    try {
      console.log("Making request to:", `${API_BASE_URL}${endpoint}`);
      console.log("Request options:", options);
      console.log("Current origin:", window.location.origin);

      const response = await this.axios({
        url: endpoint,
        ...options,
        // Add explicit headers for CORS
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          ...options.headers,
        },
      });

      console.log("Response received:", response.status, response.statusText);
      return response.data;
    } catch (error) {
      console.error("API Request Error:", error);
      console.error("Error details:", {
        message: error.message,
        code: error.code,
        response: error.response,
        request: error.request,
        config: error.config,
        url: `${API_BASE_URL}${endpoint}`,
        origin: window.location.origin,
      });

      if (error.response) {
        const errorData = error.response.data;
        throw new Error(
          errorData.message || errorData.error || "API request failed"
        );
      } else if (error.request) {
        console.error("No response received. Request details:", error.request);

        // Check if it's a CORS error
        if (
          error.message.includes("Network Error") ||
          error.code === "ERR_NETWORK"
        ) {
          throw new Error(
            "CORS error - server not accessible or CORS not configured properly"
          );
        }

        throw new Error("Network error - no response from server");
      } else {
        throw new Error(error.message || "Request failed");
      }
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
      return { success: true, data: [] };
    }

    return this.request(endpoint, {
      method: "GET",
      params: params,
    });
  }

  // POST request
  async post(endpoint, data = {}) {
    if (DEMO_MODE) return { success: true, data: {} };
    return this.request(endpoint, {
      method: "POST",
      data: data,
    });
  }

  // PUT request
  async put(endpoint, data = {}) {
    if (DEMO_MODE) return { success: true, data: {} };
    return this.request(endpoint, {
      method: "PUT",
      data: data,
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
      data: data,
    });
  }

  // ================================
  // PAYMENT PLANS API
  // ================================

  // Get all payment plans
  async getPaymentPlans(activeOnly = true) {
    if (DEMO_MODE) return { success: true, data: demoPlans };
    return this.get("/plans", { activeOnly: activeOnly });
  }

  // Get single payment plan
  async getPaymentPlan(planId) {
    return this.get(`/plans/${planId}`);
  }

  // Calculate price for multiple devices
  async calculatePlanPrice(planId, deviceCount) {
    if (DEMO_MODE) {
      const plan = demoPlans.find((p) => p.id === planId);
      if (!plan) return { success: false };
      let calculatedPrice = plan.basePrice;
      if (deviceCount > 1)
        calculatedPrice = Math.round(
          plan.basePrice * (1 + 0.6 * (deviceCount - 1))
        );
      return { success: true, data: { calculatedPrice } };
    }
    return this.post(`/plans/${planId}/calculate-price`, {
      deviceCount,
    });
  }

  // Create payment plan (admin)
  async createPaymentPlan(planData) {
    return this.post("/plans", planData);
  }

  // Update payment plan (admin)
  async updatePaymentPlan(planId, planData) {
    return this.put(`/plans/${planId}`, planData);
  }

  // Delete payment plan (admin)
  async deletePaymentPlan(planId) {
    return this.delete(`/plans/${planId}`);
  }

  // Toggle plan status (admin)
  async togglePlanStatus(planId) {
    return this.patch(`/plans/${planId}/toggle`);
  }

  // Set popular plan (admin)
  async setPopularPlan(planId, isPopular = true) {
    return this.patch(`/plans/${planId}/set-popular`, { isPopular });
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
    const response = await this.post("/auth/login", credentials);
    // Handle response format from backend
    if (response.success && response.data && response.data.token) {
      this.setAuthToken(response.data.token);
    }
    return response;
  }

  // Admin logout
  async adminLogout() {
    await this.post("/auth/logout");
    this.setAuthToken(null);
  }

  // Get admin profile
  async getAdminProfile() {
    return this.get("/auth/profile");
  }

  // ================================
  // RADIUS INTEGRATION API
  // ================================

  // RADIUS authentication
  async radiusAuthenticate(credentials) {
    return this.post("/radius/authenticate", credentials);
  }

  // Get active RADIUS sessions
  async getActiveSessions(filters = {}) {
    return this.get("/radius/sessions/active", filters);
  }

  // Disconnect user session
  async disconnectUser(username, reason = "Admin-Request") {
    return this.post("/radius/disconnect", { username, reason });
  }

  // Get session accounting data
  async getSessionAccounting(username) {
    return this.get(`/radius/accounting/${username}`);
  }

  // Test RADIUS connectivity
  async testRadiusConnectivity() {
    return this.get("/radius/test");
  }

  // ================================
  // CHANGE OF AUTHORIZATION (CoA) API
  // ================================

  // Generic CoA request
  async sendCoA(username, sessionId, action, params = {}) {
    return this.post("/radius/coa", {
      username,
      sessionId,
      action,
      params,
    });
  }

  // Disconnect user (updated to use new endpoint)
  async disconnectUser(username, reason = "Admin-Request") {
    return this.post(`/radius/disconnect/${username}`, { reason });
  }

  // Update user bandwidth
  async updateUserBandwidth(username, bandwidth) {
    return this.post(`/radius/bandwidth/${username}`, { bandwidth });
  }

  // Extend user session
  async extendUserSession(username, timeoutSeconds) {
    return this.post(`/radius/extend/${username}`, { timeoutSeconds });
  }

  // Quick bandwidth presets
  async setUserBandwidthPreset(username, preset) {
    const presets = {
      basic: "512k/1M",
      standard: "1M/2M",
      premium: "2M/5M",
      unlimited: "10M/20M",
    };

    const bandwidth = presets[preset] || preset;
    return this.updateUserBandwidth(username, bandwidth);
  }

  // Bulk CoA operations
  async bulkDisconnectUsers(usernames, reason = "Admin-Request") {
    const results = await Promise.all(
      usernames.map((username) => this.disconnectUser(username, reason))
    );
    return {
      success: results.some((r) => r.success),
      results,
      successCount: results.filter((r) => r.success).length,
      totalCount: results.length,
    };
  }

  // ================================
  // PAYMENTS API
  // ================================

  // Get all payments
  async getPayments(limit = 100, offset = 0) {
    return this.get("/payments", { limit, offset });
  }

  // Get payment by ID
  async getPayment(paymentId) {
    return this.get(`/payments/${paymentId}`);
  }

  // Get payments by phone number
  async getPaymentsByPhone(phoneNumber) {
    return this.get(`/payments/phone/${phoneNumber}`);
  }

  // Initiate payment
  async initiatePayment(paymentData) {
    return this.post("/payments/initiate", paymentData);
  }

  // Check payment status
  async checkPaymentStatus(paymentId) {
    return this.get(`/payments/${paymentId}/status`);
  }

  // ================================
  // USER SESSION MANAGEMENT API
  // ================================

  // Get user session by phone number
  async getUserSessionByPhone(phoneNumber) {
    return this.get(`/sessions/user/${phoneNumber}`);
  }

  // Get all sessions (admin)
  async getAllSessions(filters = {}) {
    return this.get("/sessions/all", filters);
  }

  // Terminate session
  async terminateSession(sessionId, reason = "Admin-Request") {
    return this.post(`/sessions/${sessionId}/terminate`, { reason });
  }

  // Bulk terminate sessions
  async bulkTerminateSessions(sessionIds, reason = "Admin-Request") {
    return this.post("/sessions/bulk-terminate", { sessionIds, reason });
  }

  // Get session statistics
  async getSessionStatistics() {
    return this.get("/sessions/statistics");
  }

  // ================================
  // PAYMENT INTEGRATION API
  // ================================

  // Handle payment success (creates user session)
  async handlePaymentSuccess(paymentData) {
    return this.post("/payments/success", paymentData);
  }

  // Handle payment failure
  async handlePaymentFailure(paymentData) {
    return this.post("/payments/failure", paymentData);
  }

  // Get payment history for admin
  async getAdminPaymentHistory(filters = {}) {
    return this.get("/admin/payments", filters);
  }

  // ================================
  // USER MANAGEMENT API
  // ================================

  // Get all users (admin)
  async getUsers(filters = {}) {
    return this.get("/users", filters);
  }

  // Get single user
  async getUser(userId) {
    return this.get(`/users/${userId}`);
  }

  // Create user (admin)
  async createUser(userData) {
    return this.post("/users", userData);
  }

  // Update user (admin)
  async updateUser(userId, userData) {
    return this.put(`/users/${userId}`, userData);
  }

  // Delete user (admin)
  async deleteUser(userId) {
    return this.delete(`/users/${userId}`);
  }

  // Toggle user status
  async toggleUserStatus(userId) {
    return this.patch(`/users/${userId}/toggle-status`);
  }

  // Get user sessions
  async getUserSessions(userId) {
    return this.get(`/users/${userId}/sessions`);
  }

  // ================================
  // ANALYTICS AND DASHBOARD API
  // ================================

  // Get dashboard statistics
  async getDashboardStats() {
    return this.get("/admin/dashboard/stats");
  }

  // Get revenue analytics
  async getRevenueAnalytics(period = "week") {
    return this.get("/admin/dashboard/revenue", { period });
  }

  // Get user analytics
  async getUserAnalytics(period = "week") {
    return this.get("/admin/dashboard/users", { period });
  }

  // Get plan analytics
  async getPlanAnalytics(period = "week") {
    return this.get("/admin/dashboard/plans", { period });
  }

  // ================================
  // SYSTEM MANAGEMENT API
  // ================================

  // Get system settings
  async getSystemSettings() {
    return this.get("/admin/settings");
  }

  // Update system settings
  async updateSystemSettings(settings) {
    return this.put("/admin/settings", settings);
  }

  // Get SMS logs
  async getSMSLogs(filters = {}) {
    if (DEMO_MODE) return { success: true, data: demoSMSLogs };
    return this.get("/admin/sms", filters);
  }

  // Send test SMS
  async sendTestSMS(phoneNumber, message) {
    return this.post("/admin/sms/test", { phoneNumber, message });
  }

  // Get router status
  async getRouterStatus() {
    return this.get("/admin/router/status");
  }

  // Update router configuration
  async updateRouterConfig(config) {
    return this.put("/admin/router/config", config);
  }

  // ================================
  // HEALTH CHECK
  // ================================

  // Check API health
  async checkHealth() {
    return this.get("/health");
  }

  // Check database connectivity
  async checkDatabase() {
    return this.get("/health/database");
  }

  // Check RADIUS connectivity
  async checkRadiusHealth() {
    return this.get("/health/radius");
  }

  // Get system status
  async getSystemStatus() {
    return this.get("/health/system");
  }
}

// Create and export a singleton instance
const apiService = new ApiService();
export default apiService;

// Export the class for testing purposes
export { ApiService };
