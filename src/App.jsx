import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useNavigate,
  useLocation,
} from "react-router-dom";
import { useState } from "react";
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
const AdminLoginPage = ({ onLogin }) => {
  const navigate = useNavigate();
  const handleAdminLogin = (user) => {
    localStorage.setItem("adminUser", JSON.stringify(user));
    onLogin();
    navigate("/admin/dashboard");
  };
  const handleBack = () => navigate("/");
  return <AdminLogin onLogin={handleAdminLogin} onBack={handleBack} />;
};

// Admin Dashboard Component with Navigation
const AdminDashboardPage = ({ onLogout }) => {
  const navigate = useNavigate();
  const adminUser = JSON.parse(localStorage.getItem("adminUser"));
  const [currentAdminView, setCurrentAdminView] = useState("dashboard");

  const handleAdminLogout = () => {
    localStorage.removeItem("adminUser");
    onLogout();
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
  // This state is used to force a re-render on login/logout
  const [authChanged, setAuthChanged] = useState(0);

  const handleAuthChange = () => {
    setAuthChanged((c) => c + 1);
  };

  return (
    <Router>
      <Routes>
        {/* Root route - Captive Portal */}
        <Route path="/" element={<CaptivePortalPage />} />

        {/* Admin routes */}
        <Route
          path="/admin"
          element={<AdminLoginPage onLogin={handleAuthChange} />}
        />
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute>
              <AdminDashboardPage onLogout={handleAuthChange} />
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
