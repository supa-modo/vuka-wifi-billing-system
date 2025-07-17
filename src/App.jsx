import { useState } from "react";
import { CaptivePortal } from "./components/captive/CaptivePortal";
import { AdminLogin } from "./components/admin/AdminLogin";
import { AdminDashboard } from "./components/admin/AdminDashboard";
import { Button } from "./components/ui/Button";

function App() {
  const [currentApp, setCurrentApp] = useState("selector"); // 'selector', 'captive', 'admin'
  const [adminUser, setAdminUser] = useState(null);
  const [currentAdminView, setCurrentAdminView] = useState("dashboard");

  const handleAdminLogin = (user) => {
    setAdminUser(user);
    setCurrentApp("admin");
  };

  const handleAdminLogout = () => {
    setAdminUser(null);
    setCurrentApp("selector");
    setCurrentAdminView("dashboard");
  };

  const handleViewChange = (view) => {
    setCurrentAdminView(view);
  };

  // App Selector (for demo purposes)
  if (currentApp === "selector") {
    return (
      <div className="min-h-screen gradient-hero flex items-center justify-center p-4">
        <div className="text-center">
          <h1 className="text-responsive-3xl font-bold text-white mb-4">
            VukaWiFi Demo
          </h1>
          <p className="text-responsive-lg text-white/90 mb-8 max-w-2xl">
            Choose which interface you'd like to view:
          </p>

          <div className="space-y-4 max-w-md mx-auto">
            <Button
              variant="secondary"
              size="lg"
              className="w-full"
              onClick={() => setCurrentApp("captive")}
            >
              Customer Portal
              <span className="block text-sm opacity-75">
                WiFi Plans & Payment
              </span>
            </Button>

            <Button
              variant="gradient"
              size="lg"
              className="w-full"
              onClick={() => setCurrentApp("admin")}
            >
              Admin Dashboard
              <span className="block text-sm opacity-75">
                System Management
              </span>
            </Button>
          </div>

          <div className="mt-8 text-white/70 text-sm">
            <p>This is a demo of the WiFi billing system</p>
            <p>Both interfaces are fully functional with demo data</p>
          </div>
        </div>
      </div>
    );
  }

  // Captive Portal
  if (currentApp === "captive") {
    return (
      <div>
        {/* Back to Demo Selector */}
        <div className="absolute top-4 left-4 z-50">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setCurrentApp("selector")}
            className="bg-white/10 text-white hover:bg-white/20 backdrop-blur"
          >
            ← Back to Demo
          </Button>
        </div>
        <CaptivePortal />
      </div>
    );
  }

  // Admin Dashboard
  if (currentApp === "admin") {
    if (!adminUser) {
      return (
        <div>
          {/* Back to Demo Selector */}
          <div className="absolute top-4 left-4 z-50">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setCurrentApp("selector")}
              className="bg-white/10 text-gray-600 hover:bg-gray-100"
            >
              ← Back to Demo
            </Button>
          </div>
          <AdminLogin onLogin={handleAdminLogin} />
        </div>
      );
    }

    return (
      <AdminDashboard
        user={adminUser}
        onLogout={handleAdminLogout}
        currentView={currentAdminView}
        onViewChange={handleViewChange}
      />
    );
  }

  return null;
}

export default App;
