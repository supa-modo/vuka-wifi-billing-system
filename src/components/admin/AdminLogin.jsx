import { useState, useContext, useRef } from "react";
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
  TbArrowBackUp,
} from "react-icons/tb";
import { FcWiFiLogo } from "react-icons/fc";
import { LuLogIn } from "react-icons/lu";
import { PiPasswordDuotone } from "react-icons/pi";
import { AuthContext } from "../../context/AuthContext";

export const AdminLogin = () => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [loginStep, setLoginStep] = useState("credentials");
  const [twoFactorCode, setTwoFactorCode] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef([]);

  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useContext(AuthContext);

  const handleInputChange = (field, value) => {
    setCredentials((prev) => ({
      ...prev,
      [field]: value,
    }));
    if (error) setError("");
  };

  const handleCredentialsSubmit = async (e) => {
    e.preventDefault();
    if (!credentials.email || !credentials.password) {
      setError("Please fill in all fields");
      return;
    }
    setIsLoading(true);
    setError("");
    try {
      const res = await fetch("/api/v1/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      });
      const data = await res.json();
      if (data.requires2FA) {
        setLoginStep("2fa");
        setIsLoading(false);
        return;
      }
      if (!res.ok) {
        setError(data.error || "Login failed");
        setIsLoading(false);
        return;
      }
      login(data.token, data.admin);
      navigate("/admin/dashboard");
    } catch (err) {
      setError("Network error. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handle2FAChange = (index, value) => {
    if (!/^[0-9]?$/.test(value)) return;
    const newCode = [...twoFactorCode];
    newCode[index] = value;
    setTwoFactorCode(newCode);
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
    if (error) setError("");
  };

  const handle2FAKeyDown = (index, e) => {
    if (e.key === "Backspace" && !twoFactorCode[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handle2FAPaste = (e) => {
    const paste = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, 6);
    if (paste.length === 6) {
      setTwoFactorCode(paste.split(""));
      inputRefs.current[5]?.focus();
    }
  };

  const handle2FASubmit = async (e) => {
    e.preventDefault();
    const code = twoFactorCode.join("");
    if (code.length !== 6) {
      setError("Please enter the 6-digit code");
      return;
    }
    setIsLoading(true);
    setError("");
    try {
      const res = await fetch("/api/v1/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...credentials, twoFactorCode: code }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "2FA verification failed");
        setIsLoading(false);
        return;
      }
      login(data.token, data.admin);
      navigate("/admin/dashboard");
    } catch (err) {
      setError("Network error. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackToCredentials = () => {
    setLoginStep("credentials");
    setTwoFactorCode(["", "", "", "", "", ""]);
    setError("");
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
            {loginStep === "credentials"
              ? "Secure administrator access to VukaWiFi billing system"
              : "Enter the 6-digit code from your authenticator app"}
          </p>
        </div>
        <div className="glass backdrop-blur-md border border-white/30 rounded-2xl p-4 md:p-6 lg:p-8 shadow-xl">
          {error && (
            <div className="bg-red-500/10 border border-red-500/20 rounded-xl py-2 md:py-3 px-3 lg:px-4 lg:py-3 flex items-start space-x-3 animate-fade-in mb-3">
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
          {loginStep === "credentials" ? (
            <form
              onSubmit={handleCredentialsSubmit}
              className="space-y-4 lg:space-y-5"
            >
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
                  onChange={(e) =>
                    handleInputChange("password", e.target.value)
                  }
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
          ) : (
            <form onSubmit={handle2FASubmit} className="space-y-4 lg:space-y-5">
              <div className="flex gap-2 justify-center mb-2">
                {[0, 1, 2, 3, 4, 5].map((index) => (
                  <input
                    key={index}
                    type="text"
                    inputMode="numeric"
                    className="w-12 h-14 text-center text-lg font-bold text-primary-700 rounded-lg border-2 bg-white/10 backdrop-blur-sm focus:bg-white/20 focus:ring-2 focus:outline-none focus:ring-primary-400 focus:border-0 font-lexend placeholder-primary-400 border-white/30 hover:border-white/50"
                    value={twoFactorCode[index]}
                    onChange={(e) => handle2FAChange(index, e.target.value)}
                    onKeyDown={(e) => handle2FAKeyDown(index, e)}
                    onPaste={handle2FAPaste}
                    maxLength={1}
                    required
                    ref={(el) => (inputRefs.current[index] = el)}
                    disabled={isLoading}
                  />
                ))}
              </div>
              <Button
                type="submit"
                variant="gradient"
                size="lg"
                className="w-full h-12 font-semibold shadow-lg shadow-primary-500/25 hover:shadow-xl hover:shadow-primary-500/30 transition-all duration-300"
                disabled={isLoading || twoFactorCode.some((c) => !c)}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-3"></div>
                    <span>Verifying...</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-center">
                    <LuLogIn size={20} className="mr-2" />
                    <span className="text-[0.9rem] lg:text-base">
                      Verify & Sign In
                    </span>
                  </div>
                )}
              </Button>
              <button
                type="button"
                onClick={handleBackToCredentials}
                className="w-full mt-2 h-12 bg-white/10 hover:bg-white/20 text-primary-700 font-medium rounded-lg border border-white/30 hover:border-white/50 transition-all duration-300 flex items-center justify-center gap-2"
                disabled={isLoading}
              >
                <TbArrowBack className="h-4 w-4" />
                <span>Back to Login</span>
              </button>
            </form>
          )}
        </div>
        {/* Back to WiFi Portal Button */}
        <div className="flex justify-between mt-3 lg:mt-6 px-4">
          <div className="flex justify-center">
            <button
              onClick={() => navigate("/")}
              className="flex items-center justify-center underline underline-offset-4 hover:cursor-pointer text-primary-700 transition-colors font-medium text-sm"
              type="button"
            >
              <TbArrowBackUp size={20} className="mr-2" />
              Back to WiFi Portal
            </button>
          </div>

          <button
            onClick={() => navigate("/admin/forgot-password")}
            className=" text-secondary-500 hover:text-secondary-600 text-sm font-semibold transition-colors"
            type="button"
          >
            Forgot password?
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
