import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";
import { FcWiFiLogo } from "react-icons/fc";
import {
  TbArrowBack,
  TbArrowRight,
  TbChevronRight,
  TbMailFilled,
  TbPhoneCall,
} from "react-icons/tb";
import { PiPasswordDuotone, PiUserDuotone } from "react-icons/pi";
import { RiAdminLine } from "react-icons/ri";
import { FaChevronRight, FaCreditCard } from "react-icons/fa";

export const WifiLogin = ({ onPurchasePlan, onNavigateToAdmin }) => {
  const [credentials, setCredentials] = useState({
    phone: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const handleInputChange = (field, value) => {
    setCredentials((prev) => ({ ...prev, [field]: value }));
    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!credentials.phone || !credentials.password) {
      setError("Please fill in all fields");
      return;
    }
    setIsLoading(true);
    setError("");
    // Simulate login
    setTimeout(() => {
      // Demo: Accept any phone/password for now
      if (credentials.phone.length >= 10 && credentials.password.length >= 4) {
        // In real system, redirect to success page or dashboard
        setError("");
        alert("Logged in! (Demo only)");
      } else {
        setError("Invalid phone number or password");
      }
      setIsLoading(false);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary-50 via-primary-100 to-primary-200 flex flex-col justify-between items-center p-4 sm:p-6 lg:p-8">
      <div className="absolute top-4 right-4 z-50">
        <button
          onClick={onNavigateToAdmin}
          className="flex items-center justify-center bg-primary-400/20 border border-primary-400/20 text-primary-500 hover:bg-primary-400/30 px-3.5 md:px-4 py-1 md:py-2 rounded-lg backdrop-blur transition-colors font-medium text-[0.8rem] lg:text-sm lg:font-medium"
        >
          <RiAdminLine className="w-3.5 h-3.5 md:w-4 lg:w-5 md:h-4 lg:h-5 mr-2" />
          Admin Login
          <TbChevronRight className="w-4 h-4 ml-1" />
        </button>
      </div>

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
            VukaWiFi Login
          </h1>
          <p className="text-primary-500 text-[0.9rem] lg:text-base max-w-md font-medium mx-auto">
            Login with your phone number and provided password to be able to
            access the internet
          </p>
        </div>
        <div className="glass backdrop-blur-md border border-white/30 rounded-2xl p-4 md:p-6 lg:p-8 shadow-xl">
          <form onSubmit={handleSubmit} className="space-y-4 lg:space-y-5">
            {error && (
              <div className="bg-red-500/10 border border-red-500/20 rounded-xl py-2 px-3 lg:px-4 lg:py-3 flex items-start space-x-3 animate-fade-in">
                <TbArrowBack
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
                label="Your Phone Number"
                type="tel"
                placeholder="07XXXXXXXX"
                value={credentials.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                disabled={isLoading}
                className="text-base font-lexend focus:outline-none"
                icon={<TbPhoneCall size={20} />}
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
                  <span>Authenticating...</span>
                </div>
              ) : (
                <div className="flex items-center justify-center">
                  <span className="text-[0.93rem] lg:text-base">
                    Login to VukaWiFi
                  </span>
                  <TbArrowRight size={20} className="ml-2" />
                </div>
              )}
            </Button>
          </form>
        </div>

        <div className="mt-6 flex  flex-col items-center justify-center">
          <p className="text-primary-600 text-sm md:text-[0.9rem] lg:text-base font-medium mb-3 md:mb-4">
            Don't have a password? Explore our flexible plans
          </p>
          <Button
            onClick={onPurchasePlan}
            variant="secondary"
            size="lg"
            className="w-fit h-11 font-semibold shadow-lg shadow-secondary-500/25 hover:shadow-xl hover:shadow-secondary-500/30 transition-all duration-300"
          >
            <FaCreditCard size={20} className="mr-2" />
            <span className="text-[0.95rem] ">Purchase a plan</span>
            <FaChevronRight size={16} className="ml-2" />
          </Button>
        </div>

        {/* Customer Support Section */}
        <div className="mt-8 mb-2 flex flex-col items-center justify-center">
          <div className="glass backdrop-blur-md border border-white/20 rounded-xl w-full lg:w-fit px-5 md:px-8 py-4 shadow-lg bg-white/10 hover:bg-white/15 transition-all duration-300">
            <p className="text-gray-600 text-sm font-medium mb-3 text-center">
              Need help? Contact our support team
            </p>
            <div className="flex items-center justify-center space-x-6 text-primary-600 text-sm font-medium">
              <a
                href="tel:+254790193402"
                className="flex items-center space-x-2 hover:text-secondary-500 transition-colors group"
              >
                <TbPhoneCall className="w-4 h-4 " />
                <span className="hover:underline">+254 790 193402</span>
              </a>
              <div className="w-px h-4 bg-primary-400/30"></div>
              <a
                href="mailto:support@vukawifi.com"
                className="flex items-center space-x-2 hover:text-secondary-500 transition-colors group"
              >
                <TbMailFilled className="w-4 h-4 " />
                <span className="hover:underline">support@vukawifi.com</span>
              </a>
            </div>
          </div>
        </div>
      </div>
      {/* Sticky Footer */}
      <footer className="w-full max-w-md lg:max-w-lg mx-auto mt-8 lg:mt-10 text-center pb-2">
        <div className="text-xs font-medium text-primary-600 space-y-1">
          <p>
            &copy; {new Date().getFullYear()} VukaWiFi. All rights reserved.
          </p>
          <p className="text-primary-600">Secure • Reliable • Fast</p>
        </div>
      </footer>
    </div>
  );
};
