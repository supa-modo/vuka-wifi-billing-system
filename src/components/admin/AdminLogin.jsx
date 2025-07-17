import { useState } from "react";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";
import { Card, CardContent } from "../ui/Card";
import { WifiIcon, AlertIcon } from "../ui/Icons";

export const AdminLogin = ({ onLogin }) => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleInputChange = (field, value) => {
    setCredentials((prev) => ({
      ...prev,
      [field]: value,
    }));
    // Clear error when user starts typing
    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!credentials.email || !credentials.password) {
      setError("Please fill in all fields");
      return;
    }

    setIsLoading(true);
    setError("");

    // Simulate API call
    setTimeout(() => {
      // Demo credentials
      if (
        credentials.email === "admin@vukawifi.com" &&
        credentials.password === "admin123"
      ) {
        onLogin({
          id: "1",
          email: "admin@vukawifi.com",
          name: "Admin User",
          role: "super_admin",
        });
      } else {
        setError("Invalid email or password");
      }
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo and Title */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-600 rounded-full mb-4">
            <WifiIcon size={32} className="text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            VukaWiFi Admin
          </h1>
          <p className="text-gray-600">
            Sign in to manage your WiFi billing system
          </p>
        </div>

        <Card>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="bg-danger-50 border border-danger-200 rounded-lg p-4 flex items-center">
                  <AlertIcon
                    size={20}
                    className="text-danger-500 mr-3 flex-shrink-0"
                  />
                  <span className="text-danger-700 text-sm">{error}</span>
                </div>
              )}

              <Input
                label="Email Address"
                type="email"
                placeholder="admin@vukawifi.com"
                value={credentials.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                disabled={isLoading}
              />

              <Input
                label="Password"
                type="password"
                placeholder="Enter your password"
                value={credentials.password}
                onChange={(e) => handleInputChange("password", e.target.value)}
                disabled={isLoading}
              />

              <Button
                type="submit"
                variant="primary"
                className="w-full"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"></div>
                    Signing in...
                  </div>
                ) : (
                  "Sign In"
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Demo Credentials */}
        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <h3 className="text-sm font-medium text-blue-900 mb-2">
            Demo Credentials:
          </h3>
          <div className="text-sm text-blue-700 space-y-1">
            <p>
              <strong>Email:</strong> admin@vukawifi.com
            </p>
            <p>
              <strong>Password:</strong> admin123
            </p>
          </div>
        </div>

        <div className="mt-8 text-center text-xs text-gray-500">
          <p>&copy; 2025 VukaWiFi. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};
