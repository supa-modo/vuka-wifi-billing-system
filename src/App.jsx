import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useNavigate,
  useLocation,
} from "react-router-dom";
import { useState, useEffect } from "react";
import { CaptivePortal } from "./components/captive/CaptivePortal";
import { AdminLogin } from "./components/admin/AdminLogin";
import { AdminDashboard } from "./components/admin/AdminDashboard";

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const adminUser = JSON.parse(localStorage.getItem("adminUser"));

  if (!adminUser) {
    return <Navigate to="/admin" replace />;
  }

  return children;
};

// Admin Login Component with Navigation
const AdminLoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleAdminLogin = (user) => {
    localStorage.setItem("adminUser", JSON.stringify(user));
    navigate("/admin/dashboard");
  };

  return (
    <div>
      {/* Back to Captive Portal */}
      <div className="absolute top-4 left-4 z-50">
        <button
          onClick={() => navigate("/")}
          className="bg-white/10 text-white hover:bg-white/20 px-4 py-2 rounded-lg backdrop-blur transition-colors"
        >
          ← Back to WiFi Portal
        </button>
      </div>
      <AdminLogin onLogin={handleAdminLogin} />
    </div>
  );
};

// Admin Dashboard Component with Navigation
const AdminDashboardPage = () => {
  const navigate = useNavigate();
  const [adminUser, setAdminUser] = useState(null);
  const [currentAdminView, setCurrentAdminView] = useState("dashboard");

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("adminUser"));
    if (user) {
      setAdminUser(user);
    }
  }, []);

  const handleAdminLogout = () => {
    localStorage.removeItem("adminUser");
    setAdminUser(null);
    navigate("/");
  };

  const handleViewChange = (view) => {
    setCurrentAdminView(view);
  };

  if (!adminUser) {
    return <Navigate to="/admin" replace />;
  }

  return (
    <AdminDashboard
      user={adminUser}
      onLogout={handleAdminLogout}
      currentView={currentAdminView}
      onViewChange={handleViewChange}
    />
  );
};

// Captive Portal Component with Navigation
const CaptivePortalPage = () => {
  const navigate = useNavigate();

  const handleNavigateToAdmin = () => {
    navigate("/admin");
  };

  return <CaptivePortal onNavigateToAdmin={handleNavigateToAdmin} />;
};

function App() {
  return (
    <Router>
      <Routes>
        {/* Root route - Captive Portal */}
        <Route path="/" element={<CaptivePortalPage />} />

        {/* Admin routes */}
        <Route path="/admin" element={<AdminLoginPage />} />
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute>
              <AdminDashboardPage />
            </ProtectedRoute>
          }
        />

        {/* Catch all route - redirect to root */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
