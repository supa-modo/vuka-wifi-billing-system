import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";
import { useContext } from "react";
import { CaptivePortal } from "./components/captive/CaptivePortal";
import { AdminLogin } from "./components/admin/AdminLogin";
import AdminLayout from "./components/admin/AdminLayout";
import SMSLogs from "./components/admin/SMSLogs";
import { WifiLogin } from "./components/captive/WifiLogin";
import { Analytics } from "@vercel/analytics/react";
import { AuthProvider, AuthContext } from "./context/AuthContext";
import { NotificationProvider } from "./hooks/useNotification.jsx";
import AdminResetRequest from "./components/admin/AdminResetRequest";
import AdminResetConfirm from "./components/admin/AdminResetConfirm";
import AdminSettings from "./components/admin/AdminSettings";
import AdminDashboard from "./components/admin/AdminDashboard";
import PaymentsManager from "./components/admin/PaymentsManager";
import PaymentPlans from "./components/admin/PaymentPlans";
import UserManagement from "./components/admin/UserManagement";
import ActiveSessions from "./components/admin/ActiveSessions";
import RouterManager from "./components/admin/RouterManager";

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { token } = useContext(AuthContext);
  if (!token) {
    return <Navigate to="/admin/login" replace />;
  }
  return children;
};

function App() {
  return (
    <AuthProvider>
      <NotificationProvider>
        <Analytics />
        <Router>
          <Routes>
            {/* Default route - WiFi Login */}
            <Route path="/" element={<WifiLogin />} />
            {/* Captive Portal route */}
            <Route path="/portal" element={<CaptivePortal />} />
            {/* Admin routes */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route
              path="/admin/forgot-password"
              element={<AdminResetRequest />}
            />
            <Route
              path="/admin/reset-password"
              element={<AdminResetConfirm />}
            />

            <Route
              path="/admin"
              element={
                <ProtectedRoute>
                  <AdminLayout />
                </ProtectedRoute>
              }
            >
              {/* Default admin route - redirect to dashboard */}
              <Route
                index
                element={<Navigate to="/admin/dashboard" replace />}
              />

              {/* Dashboard */}
              <Route path="dashboard" element={<AdminDashboard />} />

              {/* Payments Management */}
              <Route path="payments" element={<PaymentsManager />} />

              {/* Payment Plans */}
              <Route path="plans" element={<PaymentPlans />} />

              {/* User Management */}
              <Route path="users" element={<UserManagement />} />

              {/* Active Sessions */}
              <Route path="sessions" element={<ActiveSessions />} />

              {/* Router Management */}
              <Route path="routers" element={<RouterManager />} />

              {/* SMS Logs */}
              {/* <Route path="sms-logs" element={<SMSLogs />} /> */}

              {/* Settings */}
              {/* <Route path="settings" element={<AdminSettings />} /> */}
              <Route path="settings" element={<AdminDashboard />} />

              {/* Sms (Coming Soon) */}
              <Route
                path="sms-logs"
                element={
                  <div className="glass p-8 rounded-2xl shadow-glow text-center text-primary-700">
                    <h2 className="text-2xl font-bold mb-4">
                      SMS Logs Coming Soon
                    </h2>
                    <p className="text-lg">SMS Logs will appear here.</p>
                  </div>
                }
              />
              {/* Payments (Coming Soon) */}
              {/* <Route
                path="payments"
                element={
                  <div className="glass p-8 rounded-2xl shadow-glow text-center text-primary-700">
                    <h2 className="text-2xl font-bold mb-4">
                      Payments Coming Soon
                    </h2>
                    <p className="text-lg">Payments will appear here.</p>
                  </div>
                }
              /> */}
              {/* Analytics (Coming Soon) */}
              <Route
                path="analytics"
                element={
                  <div className="glass p-8 rounded-2xl shadow-glow text-center text-primary-700">
                    <h2 className="text-2xl font-bold mb-4">
                      Analytics Coming Soon
                    </h2>
                    <p className="text-lg">
                      Charts and advanced analytics will appear here.
                    </p>
                  </div>
                }
              />

              {/* System Status (Coming Soon) */}
              <Route
                path="system-status"
                element={
                  <div className="glass p-8 rounded-2xl shadow-glow text-center text-primary-700">
                    <h2 className="text-2xl font-bold mb-4">
                      System Status Coming Soon
                    </h2>
                    <p className="text-lg">System Status will appear here.</p>
                  </div>
                }
              />

              {/* Catch all admin routes - redirect to dashboard */}
              <Route
                path="*"
                element={<Navigate to="/admin/dashboard" replace />}
              />
            </Route>
            {/* Catch all route - redirect to root */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Router>
      </NotificationProvider>
    </AuthProvider>
  );
}

export default App;
