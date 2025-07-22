import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";
import { Card, CardContent } from "../ui/Card";
import { WifiIcon, AlertIcon } from "../ui/Icons";
import {
  TbAlertTriangle,
  TbShieldLock,
  TbMailFilled,
  TbArrowBack,
} from "react-icons/tb";
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

  const navigate = useNavigate();
  const location = useLocation();

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
    <div className="min-h-screen bg-gradient-to-br from-secondary-50 via-primary-100 to-primary-200 flex flex-col justify-between items-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-md lg:max-w-lg flex flex-col flex-grow justify-center">
        {/* Logo and Title */}
        <div className="flex flex-col items-center justify-center text-center mb-3 md:mb-4 lg:mb-5">
          <FcWiFiLogo
            size={80}
            className="text-white cursor-pointer"
            onClick={() => {
              if (location.pathname === "/") {
                window.location.reload();
              } else {
                navigate("/");
              }
            }}
          />
          <h1 className="text-2xl lg:text-3xl font-bold text-primary-600 mb-1 md:mb-2 lg:mb-3">
            VukaWiFi Admin
          </h1>
          <p className="text-primary-500 text-[0.9rem] lg:text-base max-w-md font-medium mx-auto">
            Secure administrator access to VukaWiFi billing system
          </p>
        </div>

        <div className="glass backdrop-blur-md border border-white/30 rounded-2xl p-4 md:p-6 lg:p-8 shadow-xl">
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

        {/* Back to WiFi Portal Button */}

        <div className="flex justify-center mt-5 lg:mt-8">
          <button
            onClick={() => navigate("/")}
            className="flex items-center justify-center underline underline-offset-4 hover:cursor-pointer text-primary-700 transition-colors font-medium text-sm"
            type="button"
          >
            <TbArrowBack size={20} className="mr-2" />
            Back to WiFi Portal
          </button>
        </div>
      </div>
      {/* Sticky Footer */}
      <footer className="w-full max-w-md lg:max-w-lg mx-auto mt-8 lg:mt-10 text-center pb-2">
        <div className="text-xs font-medium text-primary-600 space-y-1">
          <p>&copy; 2025 VukaWiFi. All rights reserved.</p>
          <p className="text-primary-600">Secure • Reliable • Fast</p>
        </div>
      </footer>
    </div>
  );
};
