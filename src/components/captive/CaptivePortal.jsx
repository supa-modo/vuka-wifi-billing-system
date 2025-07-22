import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";
import { Card } from "../ui/Card";
import { WifiIcon, PhoneIcon, ClockIcon, CheckIcon } from "../ui/Icons";
import { PiChecksBold, PiUserDuotone } from "react-icons/pi";
import { FcWiFiLogo } from "react-icons/fc";
import MpesaIcon from "../ui/MpesaIcon";
import {
  TbArrowBack,
  TbArrowLeft,
  TbArrowRight,
  TbChevronRight,
} from "react-icons/tb";
import { FiCheckCircle } from "react-icons/fi";
import { FaChevronRight, FaCreditCard, FaMinus, FaPlus } from "react-icons/fa";
import { RiAdminLine } from "react-icons/ri";
import apiService from "../../services/api";

export const CaptivePortal = () => {
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [paymentStep, setPaymentStep] = useState("plans"); // 'plans', 'payment', 'processing', 'success'
  const [plans, setPlans] = useState([]);
  const [loadingPlans, setLoadingPlans] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const [deviceCounts, setDeviceCounts] = useState({});

  // Fetch payment plans on component mount
  useEffect(() => {
    const fetchPlans = async () => {
      try {
        setLoadingPlans(true);
        const response = await apiService.getPaymentPlans(true);

        if (response.success) {
          const fetchedPlans = response.data;
          setPlans(fetchedPlans);

          // Initialize device counts (default: 1 device per plan)
          const counts = {};
          fetchedPlans.forEach((plan) => {
            counts[plan.id] = 1;
          });
          setDeviceCounts(counts);
        } else {
          setError("Failed to load payment plans");
        }
      } catch (error) {
        console.error("Error fetching plans:", error);
        setError("Failed to connect to server. Please try again.");
      } finally {
        setLoadingPlans(false);
      }
    };

    fetchPlans();
  }, []);

  const handlePlanSelect = (plan) => {
    setSelectedPlan(plan);
  };

  const handleProceedToPayment = () => {
    if (selectedPlan) {
      setPaymentStep("payment");
    }
  };

  const handlePayment = async () => {
    if (!phoneNumber || !selectedPlan) return;

    setIsLoading(true);
    setPaymentStep("processing");

    // Simulate payment processing
    setTimeout(() => {
      setIsLoading(false);
      setPaymentStep("success");
    }, 3000);
  };

  const formatPhoneNumber = (value) => {
    // Remove all non-digits
    const cleaned = value.replace(/\D/g, "");

    // Format as 254XXXXXXXXX
    if (cleaned.startsWith("0")) {
      return "254" + cleaned.slice(1);
    } else if (cleaned.startsWith("254")) {
      return cleaned;
    } else if (cleaned.length <= 9) {
      return "254" + cleaned;
    }
    return cleaned;
  };

  // Helper to get price for a plan and device count
  const getPlanPrice = async (plan, count) => {
    if (count <= 1) return plan.price;

    try {
      const response = await apiService.calculatePlanPrice(plan.id, count);
      if (response.success) {
        return response.data.calculatedPrice;
      }
    } catch (error) {
      console.error("Error calculating price:", error);
    }

    // Fallback calculation
    return Math.round(plan.price * (1 + 0.6 * (count - 1)));
  };

  // Sync version for immediate display
  const getPlanPriceSync = (plan, count) => {
    if (count <= 1) return plan.price;
    return Math.round(plan.price * (1 + 0.6 * (count - 1)));
  };

  return (
    <div className="min-h-screen gradient-hero flex flex-col">
      {/* Back to Login Page Button */}
      <div className="absolute top-[1.15rem] left-4 z-50">
        <button
          onClick={() => navigate("/")}
          className="flex items-center justify-center underline underline-offset-4 text-white hover:text-secondary-400 transition-colors font-medium text-[0.8rem] lg:text-sm lg:font-medium"
        >
          <TbArrowBack className="w-4 h-4 mr-2" />
          Back to Login
        </button>
      </div>
      {/* Admin Navigation Button */}
      <div className="absolute top-4 right-4 z-50">
        <button
          onClick={() => navigate("/admin")}
          className="flex items-center justify-center bg-white/10 border border-white/20 text-white hover:bg-white/20 px-3.5 md:px-4 py-1 md:py-2 rounded-lg backdrop-blur transition-colors font-medium text-[0.8rem] lg:text-sm lg:font-medium"
        >
          <RiAdminLine className="w-3.5 h-3.5 md:w-4 lg:w-5 md:h-4 lg:h-5 mr-2" />
          <TbChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Header */}
      <div className="text-center pt-12 pb-8">
        <div className="animate-float">
          <FcWiFiLogo
            className="text-white mx-auto w-[5rem] h-[5rem] md:w-[6rem] md:h-[6rem] lg:w-28 lg:h-28 cursor-pointer"
            onClick={() => {
              if (location.pathname === "/") {
                window.location.reload();
              } else {
                navigate("/");
              }
            }}
          />
        </div>
        <h1 className="text-responsive-2xl font-bold text-white mb-2 md:mb-3 lg:mb-4">
          Welcome to VukaWiFi
        </h1>
        <p className="text-responsive-base text-white/90 max-w-4xl mx-auto">
          Get instant reliable high speed internet access with our flexible
          plans. Pay with M-Pesa and connect immediately!
        </p>
      </div>

      {/* Main Content Area (Grid/Payment/Processing/Success) */}
      <div className="px-4 pb-12 flex-grow flex flex-col">
        <div className="max-w-7xl w-full mx-auto flex-grow">
          {/* Conditional rendering for main area */}
          {paymentStep === "plans" && (
            <>
              <h2 className="text-responsive-2xl font-extrabold text-secondary-400 text-center mb-5 lg:mb-8">
                Choose Your Plan
              </h2>

              {/* Error State */}
              {error && (
                <div className="text-center mb-6 max-w-3xl mx-auto">
                  <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-10 rounded-lg">
                    <p className="font-medium">
                      This is an example error we are displaying{error}
                    </p>
                    <button
                      onClick={() => window.location.reload()}
                      className="mt-2 text-sm underline hover:no-underline"
                    >
                      Try Again
                    </button>
                  </div>
                </div>
              )}

              {/* Loading State */}
              {loadingPlans && !error && (
                <div className="text-center mb-8">
                  <div className="animate-spin w-7 md:w-8 lg:w-10 h-7 md:h-8 lg:h-10 border-4 border-secondary-200 border-t-secondary-500 rounded-full mx-auto mb-4"></div>
                  <p className="text-secondary-200 font-medium">
                    Loading available plans, please wait...
                  </p>
                </div>
              )}

              {/* Plans Grid */}
              {!loadingPlans && !error && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {plans.map((plan) => (
                    <div
                      key={plan.id}
                      className={`plan-card relative flex flex-col h-full ${
                        selectedPlan?.id === plan.id ? "selected" : ""
                      }`}
                    >
                      {plan.isPopular && (
                        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                          <span className="bg-warning-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                            Most Popular
                          </span>
                        </div>
                      )}
                      <div className="text-center mb-4">
                        <h3 className="text-xl font-lexend font-bold text-secondary-500 mb-2">
                          {plan.name}
                        </h3>
                        <div className="text-3xl font-lexend font-extrabold text-primary-600 mb-1">
                          Kshs.{" "}
                          {getPlanPriceSync(plan, deviceCounts[plan.id] || 1)}
                        </div>
                        {/* Device controls */}
                        <div className="flex items-center justify-center gap-1 mt-2">
                          <button
                            type="button"
                            className="w-9 h-7 flex items-center justify-center rounded-lg bg-white/40 border border-secondary-200 hover:border-secondary-300 shadow-md hover:cursor-pointer hover:bg-secondary-100/90 text-secondary-500 font-bold text-lg disabled:opacity-50 transition-all duration-150"
                            onClick={() =>
                              setDeviceCounts((prev) => ({
                                ...prev,
                                [plan.id]: Math.max(
                                  1,
                                  (prev[plan.id] || 1) - 1
                                ),
                              }))
                            }
                            disabled={(deviceCounts[plan.id] || 1) <= 1}
                            aria-label="Decrease devices"
                          >
                            <FaMinus size={16} />
                          </button>
                          <span className="font-semibold text-primary-700 text-base min-w-[80px] text-center">
                            <span className="font-lexend">
                              {deviceCounts[plan.id] || 1}
                            </span>{" "}
                            device
                            {(deviceCounts[plan.id] || 1) > 1 ? "s" : ""}
                          </span>
                          <button
                            type="button"
                            className="w-9 h-7 flex items-center justify-center rounded-lg bg-white/40 border border-secondary-200 hover:border-secondary-300 shadow-md hover:cursor-pointer hover:bg-secondary-100/90 text-secondary-500 font-bold text-lg disabled:opacity-50 transition-all duration-150"
                            onClick={() =>
                              setDeviceCounts((prev) => ({
                                ...prev,
                                [plan.id]: Math.min(
                                  plan.maxDevices || 5,
                                  (prev[plan.id] || 1) + 1
                                ),
                              }))
                            }
                            disabled={
                              (deviceCounts[plan.id] || 1) >=
                              (plan.maxDevices || 5)
                            }
                            aria-label="Increase devices"
                          >
                            <FaPlus size={16} />
                          </button>
                        </div>
                      </div>
                      <div className="mt-auto w-full">
                        <div className="space-y-2 pl-5 md:pl-0 mb-3 md:mb-4 lg:mb-6">
                          {plan.features.map((feature, index) => {
                            // Check if feature contains '+ more'
                            const moreIndex = feature.indexOf("+ more");
                            if (moreIndex !== -1) {
                              const mainText = feature
                                .slice(0, moreIndex)
                                .trim();
                              return (
                                <div
                                  key={index}
                                  className="flex items-center text-sm"
                                >
                                  <PiChecksBold
                                    size={16}
                                    className="text-success-600 mr-2 flex-shrink-0"
                                  />
                                  <span className="text-gray-700">
                                    {mainText}{" "}
                                  </span>
                                  <span className="ml-2 md:ml-1 inline-block rounded-full bg-secondary-100 text-secondary-700 px-3 md:px-2 py-0.5 text-xs font-semibold align-middle">
                                    + more
                                  </span>
                                </div>
                              );
                            }
                            return (
                              <div
                                key={index}
                                className="flex items-center text-sm"
                              >
                                <PiChecksBold
                                  size={16}
                                  className="text-success-600 mr-2 flex-shrink-0"
                                />
                                <span className="text-gray-700">{feature}</span>
                              </div>
                            );
                          })}
                        </div>
                        <div className="pt-2">
                          <button
                            className={`w-full btn-primary py-2 px-4 rounded-lg text-base font-semibold flex items-center justify-center ${
                              selectedPlan?.id === plan.id
                                ? "bg-primary-600"
                                : ""
                            }`}
                            onClick={() => {
                              setSelectedPlan(plan);
                              setPaymentStep("payment");
                            }}
                          >
                            Select this plan
                            <TbArrowRight size={18} className="ml-2" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}

          {paymentStep === "payment" && (
            <>
              <h2 className="text-responsive-2xl font-extrabold text-secondary-400 text-center mb-5 lg:mb-8">
                Complete Your Plan Payment
              </h2>
              <div className="flex justify-center">
                <Card className="w-full max-w-xl">
                  {selectedPlan && (
                    <div className="bg-primary-50 border border-primary-200 rounded-lg px-3.5 py-4 md:p-4 mb-4 md:mb-6">
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="font-lexend font-semibold text-primary-700 text-sm md:text-[0.9rem]">
                            {selectedPlan.name} -{" "}
                            <span className="text-sm md:text-[0.9rem] text-primary-600">
                              {deviceCounts[selectedPlan.id] || 1} device
                              {(deviceCounts[selectedPlan.id] || 1) > 1
                                ? "s"
                                : ""}
                            </span>
                          </h3>
                          <p className="font-lexend font-semibold text-[0.75rem] md:text-[0.83rem] text-primary-600">
                            {selectedPlan.durationDisplay ||
                              `${selectedPlan.durationHours} Hours`}{" "}
                            •{" "}
                            <span className="text-gray-500">
                              {selectedPlan.dataLimitDisplay ||
                                "Unlimited Internet"}
                            </span>
                          </p>
                        </div>
                        <div className="text-right font-lexend">
                          <p className="text-[1.4rem] lg:text-3xl font-bold text-secondary-500">
                            Kshs.{" "}
                            {getPlanPriceSync(
                              selectedPlan,
                              deviceCounts[selectedPlan.id] || 1
                            )}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                  <div className="space-y-4">
                    <Input
                      label="Your Registered Mpesa Number"
                      type="tel"
                      className="pl-[5.5rem] tracking-wide focus:outline-none placeholder:font-normal font-medium text-gray-700 font-lexend"
                      maxLength={12}
                      placeholder="07XXXXXXXX"
                      value={phoneNumber}
                      onChange={(e) =>
                        setPhoneNumber(formatPhoneNumber(e.target.value))
                      }
                      icon={<MpesaIcon width={60} height={20} />}
                      helperText="You'll receive an Mpesa STK Push request on this number"
                    />
                    <div className="flex space-x-3">
                      <Button
                        variant="secondary2"
                        onClick={() => setPaymentStep("plans")}
                        className="flex-1"
                      >
                        <TbArrowLeft size={18} className="mr-2" />
                        Back
                      </Button>
                      <Button
                        variant="gradient"
                        onClick={handlePayment}
                        disabled={!phoneNumber || phoneNumber.length < 12}
                        className="flex-1 min-w-fit"
                      >
                        <FaCreditCard className="mr-2 w-4 h-4 md:w-5 md:h-5" />
                        Pay Kshs.{" "}
                        {getPlanPriceSync(
                          selectedPlan,
                          deviceCounts[selectedPlan.id] || 1
                        )}
                        <FaChevronRight className="ml-2" />
                      </Button>
                    </div>
                  </div>
                  {/* <div className="mt-6 text-xs text-gray-500 text-center">
                    <p>
                      You will receive WiFi login credentials via SMS after successful
                      payment
                    </p>
                  </div> */}
                </Card>
              </div>
            </>
          )}

          {paymentStep === "processing" && (
            <div className="flex justify-center">
              <Card className="w-full max-w-xl text-center">
                <div className="animate-spin w-12 h-12 border-4 border-secondary-200 border-t-secondary-500 rounded-full mx-auto mb-2 md:mb-4"></div>
                <h2 className="text-xl md:text-2xl font-bold text-secondary-500 mb-2">
                  Processing Payment
                </h2>
                <p className="text-gray-600 text-[0.9rem] md:text-[0.95rem] lg:text-base mb-2">
                  Please complete the M-Pesa payment on your phone
                </p>
                <div className="bg-secondary-50 border border-secondary-200 rounded-lg p-4 mb-6">
                  <p className="text-sm text-gray-600 font-medium">
                    Amount:
                    <span className="ml-2 text-secondary-600 font-semibold font-lexend">
                      Kshs.{" "}
                      {getPlanPriceSync(
                        selectedPlan,
                        deviceCounts[selectedPlan.id] || 1
                      )}
                    </span>{" "}
                  </p>
                  <p className="text-sm text-gray-600 font-medium">
                    Plan:
                    <span className="ml-2 text-secondary-600 font-semibold font-lexend">
                      {selectedPlan?.name} -{" "}
                      {selectedPlan?.durationDisplay ||
                        `${selectedPlan?.durationHours} Hours`}
                    </span>{" "}
                  </p>
                  <p className="text-sm text-gray-600 font-medium">
                    Phone:
                    <span className="ml-2 text-secondary-600 font-semibold font-lexend">
                      +{phoneNumber}
                    </span>{" "}
                  </p>
                </div>
                <p className="text-xs md:text-[0.8rem] text-gray-500">
                  Check your phone for the M-Pesa STK Push request and confirm
                </p>
              </Card>
            </div>
          )}

          {paymentStep === "success" && (
            <div className="flex justify-center">
              <Card className="w-full max-w-xl text-center">
                <div className="flex justify-center mx-auto mb-2 mt-3">
                  <FiCheckCircle className="text-success-600 w-12 h-12" />
                </div>
                <h2 className="text-xl md:text-2xl font-bold text-success-600 mb-3">
                  Payment Successful!
                </h2>
                <p className="text-gray-600 text-[0.9rem] md:text-[0.95rem] lg:text-base mb-4">
                  Your WiFi login credentials have also been sent to your phone
                  via SMS. Keep this info. safe
                </p>
                <div className="bg-success-50/40 border border-success-200 rounded-lg py-4 px-6 mb-3 md:mb-4">
                  <h3 className="font-semibold text-success-800 mb-3">
                    WiFi Credentials (VukaWiFi_Guest)
                  </h3>
                  <div className="space-y-1 md:space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-success-700">Username:</span>
                      <span className="font-mono text-success-900">
                        {/* User's phone number */}
                        {phoneNumber}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-success-700">Password:</span>
                      <span className="font-mono text-success-900">
                        temp_xyz789
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-success-700">Valid Until:</span>
                      <span className="font-mono text-success-900">
                        {new Date(
                          Date.now() +
                            (selectedPlan?.name === "1 Hour"
                              ? 3600000
                              : selectedPlan?.name === "1 Day"
                              ? 86400000
                              : selectedPlan?.name === "1 Week"
                              ? 604800000
                              : 2592000000)
                        ).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="text-xs text-gray-500 space-y-1">
                  <p>• Connect to the WiFi network using these credentials</p>
                  <p>
                    • Your access will automatically expire after{" "}
                    {selectedPlan?.duration?.toLowerCase()}
                  </p>
                </div>
              </Card>
            </div>
          )}
        </div>
      </div>

      {/* Sticky Footer Area */}
      <footer className="mt-auto w-full">
        {/* Features Section */}
        <div className="glass-dark border-t border-white/20 py-12 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div className="text-white">
                <ClockIcon size={48} className="mx-auto mb-4 text-white/80" />
                <h3 className="text-lg font-semibold mb-2 text-secondary-400">
                  Instant Internet Access
                </h3>
                <p className="text-white/90 text-sm">
                  Connect immediately after payment
                </p>
              </div>

              <div className="text-white">
                <MpesaIcon
                  variant="white"
                  width={80}
                  height={20}
                  className="mx-auto mb-4 md:h-12 text-white/80"
                />
                <h3 className="text-lg font-semibold mb-2 text-secondary-400">
                  Fast Secure Payments
                </h3>
                <p className="text-white/90 text-sm">
                  Secure, fast and convenient mobile payment
                </p>
              </div>

              <div className="text-white">
                <WifiIcon size={48} className="mx-auto mb-4 text-white/80" />
                <h3 className="text-lg font-semibold mb-2 text-secondary-400">
                  High-Speed WiFi
                </h3>
                <p className="text-white/90 text-sm">
                  Reliable connection for all your needs
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Strip Bar */}
        <div className="w-full bg-white/10 border-t border-white/20 py-3 px-8 flex flex-col md:flex-row items-center justify-between text-xs md:text-[0.8rem] lg:text-[0.83rem] text-white md:font-medium backdrop-blur-sm">
          <div className="mb-2 md:mb-0 flex-1 text-left">
            &copy; {new Date().getFullYear()} VukaWiFi. All rights reserved.
          </div>
          <div className="flex-1 flex justify-end space-x-4">
            <a
              href="tel:+254790193402"
              className="hover:underline hover:text-secondary-300 transition-colors"
            >
              Customer Support:{" "}
              <span className="ml-1 text-secondary-400 font-semibold">
                +254790193402
              </span>
            </a>
            <a
              href="#"
              className="hover:underline hover:text-secondary-300 transition-colors"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="hover:underline hover:text-secondary-300 transition-colors"
            >
              {/* Terms &amp; Conditions */}
              FAQs
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};
