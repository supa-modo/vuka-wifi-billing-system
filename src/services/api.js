// API service for VukaWiFi Billing System
import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api/v1";

// Debug logging
console.log("API Base URL:", API_BASE_URL);
console.log("Environment variables:", {
  VITE_API_BASE_URL: import.meta.env.VITE_API_BASE_URL,
  NODE_ENV: import.meta.env.NODE_ENV,
  MODE: import.meta.env.MODE,
});

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

      const response = await this.axios({
        url: endpoint,
        ...options,
      });

      console.log("Response received:", response.status, response.statusText);
      return response.data;
    } catch (error) {
      console.error("API Request Error:", error);

      if (error.response) {
        const errorData = error.response.data;
        throw new Error(
          errorData.message || errorData.error || "API request failed"
        );
      } else if (error.request) {
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
