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
import PaymentsManager from "./components/admin/PaymentsManager";
import SMSLogs from "./components/admin/SMSLogs";
import RouterManager from "./components/admin/RouterManager";
import { WifiLogin } from "./components/captive/WifiLogin";
import { Analytics } from "@vercel/analytics/react";
import { AuthProvider, AuthContext } from "./context/AuthContext";
import AdminResetRequest from "./components/admin/AdminResetRequest";
import AdminResetConfirm from "./components/admin/AdminResetConfirm";
import AdminSettings from "./components/admin/AdminSettings";

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { token } = useContext(AuthContext);
  if (!token) {
    return <Navigate to="/admin" replace />;
  }
  return children;
};

function App() {
  return (
    <AuthProvider>
      <Analytics />
      <Router>
        <Routes>
          {/* Default route - WiFi Login */}
          <Route path="/" element={<WifiLogin />} />
          {/* Captive Portal route */}
          <Route path="/portal" element={<CaptivePortal />} />
          {/* Admin routes */}
          <Route path="/admin" element={<AdminLogin />} />
          <Route
            path="/admin/forgot-password"
            element={<AdminResetRequest />}
          />
          <Route path="/admin/reset-password" element={<AdminResetConfirm />} />

          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<PaymentsManager />} />
            <Route path="payments" element={<PaymentsManager />} />
            <Route path="sms-logs" element={<SMSLogs />} />
            <Route path="router" element={<RouterManager />} />
            <Route path="settings" element={<AdminSettings />} />
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
            <Route
              path="users"
              element={
                <div className="glass p-8 rounded-2xl shadow-glow text-center text-primary-700">
                  <h2 className="text-2xl font-bold mb-4">
                    Users Management Coming Soon
                  </h2>
                  <p className="text-lg">Users Management will appear here.</p>
                </div>
              }
            />
            <Route
              path="payment-plans"
              element={
                <div className="glass p-8 rounded-2xl shadow-glow text-center text-primary-700">
                  <h2 className="text-2xl font-bold mb-4">
                    Payment Plans Coming Soon
                  </h2>
                  <p className="text-lg">Payment Plans will appear here.</p>
                </div>
              }
            />
          </Route>
          {/* Catch all route - redirect to root */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
