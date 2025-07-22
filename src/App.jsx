import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";
import { useState } from "react";
import { CaptivePortal } from "./components/captive/CaptivePortal";
import { AdminLogin } from "./components/admin/AdminLogin";
import AdminLayout from "./components/admin/AdminLayout";
import PaymentsManager from "./components/admin/PaymentsManager";
import SMSLogs from "./components/admin/SMSLogs";
import RouterManager from "./components/admin/RouterManager";
import { WifiLogin } from "./components/captive/WifiLogin";
import { Analytics } from "@vercel/analytics/react";

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const adminUser = JSON.parse(localStorage.getItem("adminUser"));
  if (!adminUser) {
    return <Navigate to="/admin" replace />;
  }
  return children;
};

function App() {
  const [authChanged, setAuthChanged] = useState(0);
  const handleAuthChange = () => {
    setAuthChanged((c) => c + 1);
  };

  return (
    <>
      <Analytics />
      <Router>
        <Routes>
          {/* Default route - WiFi Login */}
          <Route path="/" element={<WifiLogin />} />
          {/* Captive Portal route */}
          <Route path="/portal" element={<CaptivePortal />} />
          {/* Admin routes */}
          <Route
            path="/admin"
            element={<AdminLogin onLogin={handleAuthChange} />}
          />
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
          </Route>
          {/* Catch all route - redirect to root */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
