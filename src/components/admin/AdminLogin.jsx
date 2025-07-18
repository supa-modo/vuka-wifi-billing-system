import { useState } from "react";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";
import { Card, CardContent } from "../ui/Card";
import { WifiIcon, AlertIcon } from "../ui/Icons";
import { TbAlertTriangle, TbShieldLock, TbMailFilled } from "react-icons/tb";
import { FcWiFiLogo } from "react-icons/fc";
import { LuLogIn } from "react-icons/lu";
import { PiPasswordDuotone } from "react-icons/pi";

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
    <div className="min-h-screen bg-gradient-to-br from-secondary-50 via-primary-100 to-primary-200 flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-md lg:max-w-lg">
        {/* Logo and Title */}
        <div className="flex flex-col items-center justify-center text-center mb-3 md:mb-4 lg:mb-5">
          <FcWiFiLogo size={80} className="text-white" />

          <h1 className="text-2xl lg:text-3xl font-bold text-primary-600 mb-1 md:mb-2 lg:mb-3">
            VukaWiFi Admin
          </h1>
          <p className="text-primary-500 text-[0.9rem] lg:text-base max-w-sm mx-auto">
            Secure admin access to your WiFi billing system
          </p>
        </div>

        <div className="glass backdrop-blur-md border border-white/20 rounded-2xl p-4 md:p-6 lg:p-8 shadow-xl">
          <form onSubmit={handleSubmit} className="space-y-4 lg:space-y-5">
            {error && (
              <div className="bg-red-500/10 border border-red-500/20 rounded-xl py-2 px-3 lg:px-4 lg:py-3 flex items-start space-x-3 animate-fade-in">
                <TbAlertTriangle
                  size={20}
                  className="text-red-500 mt-0.5 flex-shrink-0"
                />
                <div>
                  <span className="text-red-600 text-sm font-medium">
                    {error}
                  </span>
                </div>
              </div>
            )}

            <div className="space-y-3 lg:space-y-4">
              <Input
                label="Email Address"
                type="email"
                placeholder="admin@vukawifi.com"
                value={credentials.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                disabled={isLoading}
                className="text-base focus:outline-none"
                icon={<TbMailFilled size={20} />}
              />

              <Input
                label="Password"
                type="password"
                placeholder="Enter your password"
                value={credentials.password}
                onChange={(e) => handleInputChange("password", e.target.value)}
                disabled={isLoading}
                className="text-base focus:outline-none"
                icon={<PiPasswordDuotone size={20} />}
              />
            </div>

            <Button
              type="submit"
              variant="gradient"
              size="lg"
              className="w-full h-12 font-semibold shadow-lg shadow-primary-500/25 hover:shadow-xl hover:shadow-primary-500/30 transition-all duration-300"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-3"></div>
                  <span>Signing in...</span>
                </div>
              ) : (
                <div className="flex items-center justify-center">
                  <LuLogIn size={20} className="mr-2" />
                  <span className="text-[0.9rem] lg:text-base">
                    Sign In to Dashboard
                  </span>
                </div>
              )}
            </Button>
          </form>
        </div>

        {/* Demo Credentials */}
        {/* <div className="mt-6 lg:mt-8 p-4 lg:p-5 glass backdrop-blur-md border border-white/20 rounded-xl shadow-sm">
          <div className="text-sm text-white/90 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-medium">Email:</span>
              <code className="bg-white/10 px-2 py-1 rounded text-white font-mono text-xs border border-white/20">
                admin@vukawifi.com
              </code>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-medium">Password:</span>
              <code className="bg-white/10 px-2 py-1 rounded text-white font-mono text-xs border border-white/20">
                admin123
              </code>
            </div>
          </div>
          <p className="text-xs text-white/70 mt-3 italic">
            Use these credentials to access the demo admin dashboard
          </p>
        </div> */}

        {/* Footer */}
        <div className="mt-8 lg:mt-10 text-center">
          <div className="text-xs text-white/60 space-y-1">
            <p>&copy; 2025 VukaWiFi. All rights reserved.</p>
            <p className="text-white/50">Secure • Reliable • Fast</p>
          </div>
        </div>
      </div>
    </div>
  );
};
