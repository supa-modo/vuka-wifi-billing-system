import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";
import { TbArrowBack, TbAlertTriangle, TbLock } from "react-icons/tb";
import { FcWiFiLogo } from "react-icons/fc";

const AdminResetConfirm = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token") || "";
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!password || !confirm) {
      setError("Please fill in all fields");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }
    if (password !== confirm) {
      setError("Passwords do not match");
      return;
    }
    setIsLoading(true);
    setError("");
    try {
      const res = await fetch("/api/v1/auth/reset-confirm", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Reset failed");
        setIsLoading(false);
        return;
      }
      setSuccess(true);
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary-50 via-primary-100 to-primary-200 flex flex-col justify-between items-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-md lg:max-w-lg flex flex-col flex-grow justify-center">
        <div className="flex flex-col items-center justify-center text-center mb-3 md:mb-4 lg:mb-5">
          <FcWiFiLogo
            size={80}
            className="text-white cursor-pointer"
            onClick={() => navigate("/")}
          />
          <h1 className="text-2xl lg:text-3xl font-bold text-primary-600 mb-1 md:mb-2 lg:mb-3">
            Set New Password
          </h1>
          <p className="text-primary-500 text-[0.9rem] lg:text-base max-w-md font-medium mx-auto">
            Enter your new password below.
          </p>
        </div>
        <div className="glass backdrop-blur-md border border-white/30 rounded-2xl p-4 md:p-6 lg:p-8 shadow-xl">
          {success ? (
            <div className="bg-green-500/10 border border-green-500/20 rounded-xl py-3 px-4 flex flex-col items-center space-x-3 animate-fade-in">
              <span className="text-green-700 text-center text-sm font-medium mb-2">
                Your Password has been reset successfully! You can now log in
                with the new password.
              </span>
              <button
                onClick={() => navigate("/admin")}
                className="underline underline-offset-4 text-secondary-500 hover:text-secondary-600 text-sm font-semibold transition-colors mt-2"
                type="button"
              >
                Go to Admin Login
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 lg:space-y-5">
              {error && (
                <div className="bg-red-500/10 border border-red-500/20 rounded-xl py-2 md:py-3 px-3 flex items-start space-x-3 animate-fade-in">
                  <TbAlertTriangle
                    size={20}
                    className="text-red-500 mt-0.5 flex-shrink-0"
                  />
                  <span className="text-red-600 text-sm font-medium">
                    {error}
                  </span>
                </div>
              )}
              <Input
                label="New Password"
                type="password"
                placeholder="Enter new password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
                className="text-base focus:outline-none"
                icon={<TbLock size={20} />}
              />
              <Input
                label="Confirm Password"
                type="password"
                placeholder="Confirm new password"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                disabled={isLoading}
                className="text-base focus:outline-none"
                icon={<TbLock size={20} />}
              />
              <Button
                type="submit"
                variant="gradient"
                size="lg"
                className="w-full h-12 font-semibold shadow-lg shadow-primary-500/25 hover:shadow-xl hover:shadow-primary-500/30 transition-all duration-300"
                disabled={isLoading || !password || !confirm}
              >
                {isLoading ? "Resetting..." : "Set New Password"}
              </Button>
            </form>
          )}
        </div>
        <div className="flex justify-center mt-5 lg:mt-8">
          <button
            onClick={() => navigate("/admin")}
            className="flex items-center justify-center underline underline-offset-4 hover:cursor-pointer text-primary-700 transition-colors font-medium text-sm"
            type="button"
          >
            <TbArrowBack size={20} className="mr-2" />
            Back to Admin Login
          </button>
        </div>
      </div>
      <footer className="w-full max-w-md lg:max-w-lg mx-auto mt-8 lg:mt-10 text-center pb-2">
        <div className="text-xs font-medium text-primary-600 space-y-1">
          <p>&copy; 2025 VukaWiFi. All rights reserved.</p>
          <p className="text-primary-600">Secure • Reliable • Fast</p>
        </div>
      </footer>
    </div>
  );
};

export default AdminResetConfirm;
