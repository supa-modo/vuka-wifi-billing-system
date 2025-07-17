import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/Card";
import { Button } from "../ui/Button";
import { PaymentsManager } from "./PaymentsManager";
import {
  WifiIcon,
  DollarIcon,
  UsersIcon,
  BarChartIcon,
  SettingsIcon,
  MenuIcon,
  XIcon,
  RouterIcon,
  MessageIcon,
  ClockIcon,
  CheckIcon,
} from "../ui/Icons";

// Demo data
const demoStats = {
  totalRevenue: 125000,
  todayRevenue: 8500,
  activeUsers: 127,
  totalPayments: 1543,
  successRate: 98.5,
  avgSessionTime: "2.5 hours",
};

const recentPayments = [
  {
    id: "1",
    phone: "+254712345678",
    plan: "1 Day",
    amount: 150,
    status: "completed",
    time: "10 mins ago",
  },
  {
    id: "2",
    phone: "+254723456789",
    plan: "1 Hour",
    amount: 20,
    status: "completed",
    time: "15 mins ago",
  },
  {
    id: "3",
    phone: "+254734567890",
    plan: "1 Week",
    amount: 800,
    status: "processing",
    time: "20 mins ago",
  },
  {
    id: "4",
    phone: "+254745678901",
    plan: "1 Day",
    amount: 150,
    status: "completed",
    time: "25 mins ago",
  },
  {
    id: "5",
    phone: "+254756789012",
    plan: "1 Month",
    amount: 2500,
    status: "failed",
    time: "30 mins ago",
  },
];

const activeConnections = [
  {
    id: "1",
    phone: "+254712345678",
    plan: "1 Day",
    timeLeft: "18h 45m",
    dataUsed: "2.3 GB",
  },
  {
    id: "2",
    phone: "+254723456789",
    plan: "1 Hour",
    timeLeft: "35m",
    dataUsed: "250 MB",
  },
  {
    id: "3",
    phone: "+254734567890",
    plan: "1 Week",
    timeLeft: "5d 12h",
    dataUsed: "8.7 GB",
  },
  {
    id: "4",
    phone: "+254745678901",
    plan: "1 Day",
    timeLeft: "22h 15m",
    dataUsed: "1.8 GB",
  },
];

export const AdminDashboard = ({
  user,
  onLogout,
  currentView,
  onViewChange,
}) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: BarChartIcon },
    { id: "payments", label: "Payments", icon: DollarIcon },
    { id: "plans", label: "Plans", icon: ClockIcon },
    { id: "wifi-sessions", label: "WiFi Sessions", icon: WifiIcon },
    { id: "routers", label: "Routers", icon: RouterIcon },
    { id: "sms-logs", label: "SMS Logs", icon: MessageIcon },
    { id: "settings", label: "Settings", icon: SettingsIcon },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "bg-success-100 text-success-700";
      case "processing":
        return "bg-warning-100 text-warning-700";
      case "failed":
        return "bg-danger-100 text-danger-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-50 lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200">
          <div className="flex items-center">
            <WifiIcon size={24} className="text-primary-600 mr-2" />
            <span className="text-lg font-semibold text-gray-900">
              VukaWiFi
            </span>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-1 rounded-md hover:bg-gray-100"
          >
            <XIcon size={20} />
          </button>
        </div>

        <nav className="p-4">
          <div className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    onViewChange(item.id);
                    setSidebarOpen(false);
                  }}
                  className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                    currentView === item.id
                      ? "bg-primary-100 text-primary-700"
                      : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                  }`}
                >
                  <Icon size={18} className="mr-3" />
                  {item.label}
                </button>
              );
            })}
          </div>
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200">
          <div className="flex items-center mb-3">
            <div className="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center mr-3">
              <span className="text-white text-sm font-medium">
                {user.name.charAt(0)}
              </span>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">{user.name}</p>
              <p className="text-xs text-gray-500">{user.role}</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onLogout}
            className="w-full justify-start"
          >
            Sign Out
          </Button>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Top header */}
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="flex items-center justify-between h-16 px-4 sm:px-6">
            <div className="flex items-center">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 rounded-md hover:bg-gray-100 mr-2"
              >
                <MenuIcon size={20} />
              </button>
              <h1 className="text-xl font-semibold text-gray-900 capitalize">
                {currentView === "wifi-sessions"
                  ? "WiFi Sessions"
                  : currentView === "sms-logs"
                  ? "SMS Logs"
                  : currentView}
              </h1>
            </div>

            <div className="text-sm text-gray-500">
              Last updated: {new Date().toLocaleTimeString()}
            </div>
          </div>
        </header>

        {/* Dashboard content */}
        {currentView === "dashboard" && (
          <main className="p-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <div className="p-2 bg-success-100 rounded-lg">
                      <DollarIcon size={24} className="text-success-600" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">
                        Total Revenue
                      </p>
                      <p className="text-2xl font-bold text-gray-900">
                        KSH {demoStats.totalRevenue.toLocaleString()}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <div className="p-2 bg-primary-100 rounded-lg">
                      <DollarIcon size={24} className="text-primary-600" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">
                        Today's Revenue
                      </p>
                      <p className="text-2xl font-bold text-gray-900">
                        KSH {demoStats.todayRevenue.toLocaleString()}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <div className="p-2 bg-warning-100 rounded-lg">
                      <UsersIcon size={24} className="text-warning-600" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">
                        Active Users
                      </p>
                      <p className="text-2xl font-bold text-gray-900">
                        {demoStats.activeUsers}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <BarChartIcon size={24} className="text-blue-600" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">
                        Success Rate
                      </p>
                      <p className="text-2xl font-bold text-gray-900">
                        {demoStats.successRate}%
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent Payments */}
              <Card>
                <CardHeader>
                  <CardTitle>Recent Payments</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentPayments.map((payment) => (
                      <div
                        key={payment.id}
                        className="flex items-center justify-between"
                      >
                        <div>
                          <p className="font-medium text-gray-900">
                            {payment.phone}
                          </p>
                          <p className="text-sm text-gray-500">
                            {payment.plan} • {payment.time}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-gray-900">
                            KSH {payment.amount}
                          </p>
                          <span
                            className={`status-badge ${getStatusColor(
                              payment.status
                            )}`}
                          >
                            {payment.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Active Connections */}
              <Card>
                <CardHeader>
                  <CardTitle>Active WiFi Sessions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {activeConnections.map((connection) => (
                      <div
                        key={connection.id}
                        className="flex items-center justify-between"
                      >
                        <div>
                          <p className="font-medium text-gray-900">
                            {connection.phone}
                          </p>
                          <p className="text-sm text-gray-500">
                            {connection.plan} • {connection.dataUsed} used
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-success-600">
                            {connection.timeLeft}
                          </p>
                          <div className="flex items-center text-xs text-gray-500">
                            <div className="w-2 h-2 bg-success-500 rounded-full mr-1"></div>
                            Active
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </main>
        )}

        {/* Payments View */}
        {currentView === "payments" && (
          <main className="p-6">
            <PaymentsManager />
          </main>
        )}

        {/* Placeholder for other views */}
        {currentView !== "dashboard" && currentView !== "payments" && (
          <main className="p-6">
            <Card>
              <CardContent className="p-12 text-center">
                <div className="text-gray-400 mb-4">
                  <BarChartIcon size={48} className="mx-auto" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  {currentView === "wifi-sessions"
                    ? "WiFi Sessions"
                    : currentView === "sms-logs"
                    ? "SMS Logs"
                    : currentView.charAt(0).toUpperCase() +
                      currentView.slice(1)}{" "}
                  Management
                </h3>
                <p className="text-gray-500">
                  This section will contain the {currentView} management
                  interface.
                </p>
              </CardContent>
            </Card>
          </main>
        )}
      </div>
    </div>
  );
};
