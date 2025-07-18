import { useState } from "react";
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
import { FaChevronRight, FaCreditCard } from "react-icons/fa";
import { RiAdminLine } from "react-icons/ri";

// Demo data for plans
const demoPlans = [
  {
    id: "1",
    name: "1 Hour",
    duration: "1 Hour",
    price: 15,
    dataLimit: "500 MB",
    speed: "10 Mbps",
    popular: false,
    features: [
      "High Speed Internet Access",
      "HD Video Streaming",
      "Unlimited Internet, Youtube, Tiktok",
    ],
  },
  {
    id: "2",
    name: "1 Day",
    duration: "24 Hours",
    price: 50,
    dataLimit: "5 GB",
    speed: "15 Mbps",
    popular: true,
    features: [
      "High Speed Internet Access",
      "UHD Video Streaming",
      "Unlimited Internet, Youtube, Tiktok",
    ],
  },
  {
    id: "3",
    name: "1 Week",
    duration: "7 Days",
    price: 350,
    dataLimit: "25 GB",
    speed: "20 Mbps",
    popular: false,
    features: [
      "Ultra High Speed Internet Access",
      "Online Gaming Support",
      "Unlimited Internet, Youtube, Tiktok",
    ],
  },
  {
    id: "4",
    name: "1 Month",
    duration: "30 Days",
    price: 1000,
    dataLimit: "Unlimited",
    speed: "25 Mbps",
    popular: false,
    features: [
      "Maximum Internet Speed",
      "Premium Online Gaming Speeds",
      "24/7 Customer Support",
    ],
  },
];

export const CaptivePortal = ({ onNavigateToAdmin }) => {
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [paymentStep, setPaymentStep] = useState("plans"); // 'plans', 'payment', 'processing', 'success'
  const navigate = useNavigate();
  const location = useLocation();

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

  //   if (paymentStep === "processing") {
  //     return (
  //       <div className="min-h-screen gradient-hero flex items-center justify-center p-4">
  //         <Card className="w-full max-w-md text-center">
  //           <div className="animate-spin w-16 h-16 border-4 border-primary-200 border-t-primary-600 rounded-full mx-auto mb-6"></div>
  //           <h2 className="text-2xl font-bold text-gray-900 mb-4">
  //             Processing Payment
  //           </h2>
  //           <p className="text-gray-600 mb-4">
  //             Please complete the M-Pesa payment on your phone
  //           </p>
  //           <div className="bg-gray-50 rounded-lg p-4 mb-6">
  //             <p className="text-sm text-gray-700">
  //               <strong>Amount:</strong> KSH {selectedPlan?.price}
  //             </p>
  //             <p className="text-sm text-gray-700">
  //               <strong>Plan:</strong> {selectedPlan?.name} -{" "}
  //               {selectedPlan?.duration}
  //             </p>
  //             <p className="text-sm text-gray-700">
  //               <strong>Phone:</strong> +{phoneNumber}
  //             </p>
  //           </div>
  //           <p className="text-xs text-gray-500">
  //             Check your phone for the M-Pesa payment request
  //           </p>
  //         </Card>
  //       </div>
  //     );
  //   }

  //   if (paymentStep === "success") {
  //     return (
  //       <div className="min-h-screen gradient-hero flex items-center justify-center p-4">
  //         <Card className="w-full max-w-md text-center">
  //           <div className="w-16 h-16 bg-success-500 rounded-full flex items-center justify-center mx-auto mb-6">
  //             <CheckIcon size={32} className="text-white" />
  //           </div>
  //           <h2 className="text-2xl font-bold text-gray-900 mb-4">
  //             Payment Successful!
  //           </h2>
  //           <p className="text-gray-600 mb-6">
  //             Your WiFi credentials have been sent to your phone via SMS
  //           </p>

  //           <div className="bg-success-50 border border-success-200 rounded-lg p-6 mb-6">
  //             <h3 className="font-semibold text-success-800 mb-3">
  //               WiFi Credentials
  //             </h3>
  //             <div className="space-y-2 text-sm">
  //               <div className="flex justify-between">
  //                 <span className="text-success-700">Network:</span>
  //                 <span className="font-mono text-success-900">
  //                   VukaWiFi_Guest
  //                 </span>
  //               </div>
  //               <div className="flex justify-between">
  //                 <span className="text-success-700">Username:</span>
  //                 <span className="font-mono text-success-900">user_abc123</span>
  //               </div>
  //               <div className="flex justify-between">
  //                 <span className="text-success-700">Password:</span>
  //                 <span className="font-mono text-success-900">temp_xyz789</span>
  //               </div>
  //               <div className="flex justify-between">
  //                 <span className="text-success-700">Valid Until:</span>
  //                 <span className="font-mono text-success-900">
  //                   {new Date(
  //                     Date.now() +
  //                       (selectedPlan?.name === "1 Hour"
  //                         ? 3600000
  //                         : selectedPlan?.name === "1 Day"
  //                         ? 86400000
  //                         : selectedPlan?.name === "1 Week"
  //                         ? 604800000
  //                         : 2592000000)
  //                   ).toLocaleString()}
  //                 </span>
  //               </div>
  //             </div>
  //           </div>

  //           <div className="text-xs text-gray-500 space-y-1">
  //             <p>• Connect to the WiFi network using these credentials</p>
  //             <p>
  //               • Your access will automatically expire after{" "}
  //               {selectedPlan?.duration.toLowerCase()}
  //             </p>
  //             <p>• Keep this information safe</p>
  //           </div>
  //         </Card>
  //       </div>
  //     );
  //   }

  //   if (paymentStep === "payment") {
  //     return (
  //       <div className="min-h-screen gradient-hero flex flex-col items-center justify-center p-4">
  //         {/* Payment Header */}
  //         <div className="w-full max-w-md mx-auto flex flex-col items-center text-center mb-6">
  //           <MpesaIcon variant="white" width={56} height={36} className="mb-3" />
  //           <h2 className="text-2xl lg:text-3xl font-bold text-primary-600 mb-1">
  //             Pay with M-Pesa
  //           </h2>
  //           <p className="text-primary-100 text-base max-w-xs mx-auto mb-2 font-medium">
  //             Enter your phone number to receive a payment prompt
  //           </p>
  //         </div>
  //         {/* Original Payment Card */}
  //         <Card className="w-full max-w-md">
  //           <div className="text-center mb-6">
  //             <WifiIcon size={48} className="text-primary-600 mx-auto mb-4" />
  //             <h2 className="text-2xl font-bold text-gray-900 mb-2">
  //               Complete Payment
  //             </h2>
  //             <p className="text-gray-600">
  //               Enter your phone number to pay via M-Pesa
  //             </p>
  //           </div>

  //           {selectedPlan && (
  //             <div className="bg-primary-50 border border-primary-200 rounded-lg p-4 mb-6">
  //               <div className="flex justify-between items-center">
  //                 <div>
  //                   <h3 className="font-semibold text-primary-900">
  //                     {selectedPlan.name}
  //                   </h3>
  //                   <p className="text-sm text-primary-700">
  //                     {selectedPlan.duration} • {selectedPlan.dataLimit}
  //                   </p>
  //                 </div>
  //                 <div className="text-right">
  //                   <p className="text-2xl font-bold text-primary-900">
  //                     KSH {selectedPlan.price}
  //                   </p>
  //                 </div>
  //               </div>
  //             </div>
  //           )}

  //           <div className="space-y-4">
  //             <Input
  //               label="Phone Number"
  //               type="tel"
  //               placeholder="07XXXXXXXX or 254XXXXXXXXX"
  //               value={phoneNumber}
  //               onChange={(e) =>
  //                 setPhoneNumber(formatPhoneNumber(e.target.value))
  //               }
  //               icon={<PhoneIcon size={20} />}
  //               helperText="You'll receive an M-Pesa payment request on this number"
  //             />

  //             <div className="flex space-x-3">
  //               <Button
  //                 variant="secondary"
  //                 onClick={() => setPaymentStep("plans")}
  //                 className="flex-1"
  //               >
  //                 Back
  //               </Button>
  //               <Button
  //                 variant="gradient"
  //                 onClick={handlePayment}
  //                 disabled={!phoneNumber || phoneNumber.length < 12}
  //                 className="flex-1"
  //               >
  //                 Pay KSH {selectedPlan?.price}
  //               </Button>
  //             </div>
  //           </div>

  //           <div className="mt-6 text-xs text-gray-500 text-center">
  //             <p>Secure payment powered by M-Pesa</p>
  //             <p>
  //               You will receive WiFi credentials via SMS after successful payment
  //             </p>
  //           </div>
  //         </Card>
  //         {/* Bottom Strip Bar */}
  //         <div className="w-full max-w-md mx-auto bg-white/10 border-t border-white/20 py-3 px-8 flex flex-col md:flex-row items-center justify-between text-xs md:text-[0.8rem] lg:text-[0.83rem] text-white md:font-medium backdrop-blur-sm mt-6">
  //           <div className="mb-2 md:mb-0 flex-1 text-left">
  //             &copy; {new Date().getFullYear()} VukaWiFi. All rights reserved.
  //           </div>
  //           <div className="flex-1 flex justify-end space-x-4">
  //             <a
  //               href="#"
  //               className="hover:underline hover:text-secondary-300 transition-colors"
  //             >
  //               Privacy Policy
  //             </a>
  //             <a
  //               href="#"
  //               className="hover:underline hover:text-secondary-300 transition-colors"
  //             >
  //               Terms &amp; Conditions
  //             </a>
  //           </div>
  //         </div>
  //       </div>
  //     );
  //   }

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
          onClick={onNavigateToAdmin}
          className="flex items-center justify-center bg-white/10 border border-white/20 text-white hover:bg-white/20 px-3.5 md:px-4 py-1 md:py-2 rounded-lg backdrop-blur transition-colors font-medium text-[0.8rem] lg:text-sm lg:font-medium"
        >
          <RiAdminLine className="w-3.5 h-3.5 md:w-4 lg:w-5 md:h-4 lg:h-5 mr-2" />
          Admin Login
          <TbChevronRight className="w-4 h-4 ml-1" />
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

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {demoPlans.map((plan) => (
                  <div
                    key={plan.id}
                    className={`plan-card relative flex flex-col h-full ${
                      selectedPlan?.id === plan.id ? "selected" : ""
                    }`}
                  >
                    {plan.popular && (
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
                        Kshs. {plan.price}
                      </div>
                      <p className="text-gray-500 font-medium text-sm">
                        {plan.duration}
                      </p>
                    </div>
                    <div className="mt-auto w-full">
                      <div className="space-y-2 pl-4 mb-3 md:mb-4 lg:mb-6">
                        {plan.features.map((feature, index) => (
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
                        ))}
                      </div>
                      <div className="pt-2">
                        <button
                          className={`w-full btn-primary py-2 px-4 rounded-lg text-base font-semibold flex items-center justify-center ${
                            selectedPlan?.id === plan.id ? "bg-primary-600" : ""
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
                          <h3 className="font-lexend font-semibold text-primary-900">
                            {selectedPlan.name}
                          </h3>
                          <p className="font-lexend font-medium text-[0.78rem] md:text-sm text-primary-700">
                            {selectedPlan.duration} •{" "}
                            <span className="text-gray-500">
                              Unlimited Internet
                            </span>
                          </p>
                        </div>
                        <div className="text-right font-lexend">
                          <p className="text-[1.4rem] lg:text-3xl font-bold text-secondary-500">
                            Kshs. {selectedPlan.price}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                  <div className="space-y-4">
                    <Input
                      label="Phone Number"
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
                        className="flex-1"
                      >
                        <FaCreditCard className="mr-2 w-4 h-4 md:w-5 md:h-5" />
                        Pay Kshs. {selectedPlan?.price}
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
                      Kshs. {selectedPlan?.price}
                    </span>{" "}
                  </p>
                  <p className="text-sm text-gray-600 font-medium">
                    Plan:
                    <span className="ml-2 text-secondary-600 font-semibold font-lexend">
                      {selectedPlan?.name} - {selectedPlan?.duration}
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
                  <div className="space-y-2 text-sm">
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
                    {selectedPlan?.duration.toLowerCase()}
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
              Terms &amp; Conditions
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};
