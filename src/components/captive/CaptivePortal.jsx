import { useState } from "react";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";
import { Card } from "../ui/Card";
import { WifiIcon, PhoneIcon, ClockIcon, CheckIcon } from "../ui/Icons";

// Demo data for plans
const demoPlans = [
  {
    id: "1",
    name: "1 Hour",
    duration: "1 Hour",
    price: 20,
    dataLimit: "500 MB",
    speed: "10 Mbps",
    popular: false,
    features: ["High Speed Internet", "Basic Streaming", "Social Media Access"],
  },
  {
    id: "2",
    name: "1 Day",
    duration: "24 Hours",
    price: 150,
    dataLimit: "5 GB",
    speed: "15 Mbps",
    popular: true,
    features: [
      "High Speed Internet",
      "HD Streaming",
      "Video Calls",
      "File Downloads",
    ],
  },
  {
    id: "3",
    name: "1 Week",
    duration: "7 Days",
    price: 800,
    dataLimit: "25 GB",
    speed: "20 Mbps",
    popular: false,
    features: [
      "Ultra High Speed",
      "Unlimited Streaming",
      "Gaming Support",
      "Priority Support",
    ],
  },
  {
    id: "4",
    name: "1 Month",
    duration: "30 Days",
    price: 2500,
    dataLimit: "Unlimited",
    speed: "25 Mbps",
    popular: false,
    features: [
      "Maximum Speed",
      "Unlimited Everything",
      "Premium Gaming",
      "24/7 Support",
    ],
  },
];

export const CaptivePortal = () => {
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [paymentStep, setPaymentStep] = useState("plans"); // 'plans', 'payment', 'processing', 'success'

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

  if (paymentStep === "processing") {
    return (
      <div className="min-h-screen gradient-hero flex items-center justify-center p-4">
        <Card className="w-full max-w-md text-center">
          <div className="animate-spin w-16 h-16 border-4 border-primary-200 border-t-primary-600 rounded-full mx-auto mb-6"></div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Processing Payment
          </h2>
          <p className="text-gray-600 mb-4">
            Please complete the M-Pesa payment on your phone
          </p>
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <p className="text-sm text-gray-700">
              <strong>Amount:</strong> KSH {selectedPlan?.price}
            </p>
            <p className="text-sm text-gray-700">
              <strong>Plan:</strong> {selectedPlan?.name} -{" "}
              {selectedPlan?.duration}
            </p>
            <p className="text-sm text-gray-700">
              <strong>Phone:</strong> +{phoneNumber}
            </p>
          </div>
          <p className="text-xs text-gray-500">
            Check your phone for the M-Pesa payment request
          </p>
        </Card>
      </div>
    );
  }

  if (paymentStep === "success") {
    return (
      <div className="min-h-screen gradient-hero flex items-center justify-center p-4">
        <Card className="w-full max-w-md text-center">
          <div className="w-16 h-16 bg-success-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckIcon size={32} className="text-white" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Payment Successful!
          </h2>
          <p className="text-gray-600 mb-6">
            Your WiFi credentials have been sent to your phone via SMS
          </p>

          <div className="bg-success-50 border border-success-200 rounded-lg p-6 mb-6">
            <h3 className="font-semibold text-success-800 mb-3">
              WiFi Credentials
            </h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-success-700">Network:</span>
                <span className="font-mono text-success-900">
                  VukaWiFi_Guest
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-success-700">Username:</span>
                <span className="font-mono text-success-900">user_abc123</span>
              </div>
              <div className="flex justify-between">
                <span className="text-success-700">Password:</span>
                <span className="font-mono text-success-900">temp_xyz789</span>
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
            <p>• Keep this information safe</p>
          </div>
        </Card>
      </div>
    );
  }

  if (paymentStep === "payment") {
    return (
      <div className="min-h-screen gradient-hero flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <div className="text-center mb-6">
            <WifiIcon size={48} className="text-primary-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Complete Payment
            </h2>
            <p className="text-gray-600">
              Enter your phone number to pay via M-Pesa
            </p>
          </div>

          {selectedPlan && (
            <div className="bg-primary-50 border border-primary-200 rounded-lg p-4 mb-6">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-semibold text-primary-900">
                    {selectedPlan.name}
                  </h3>
                  <p className="text-sm text-primary-700">
                    {selectedPlan.duration} • {selectedPlan.dataLimit}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-primary-900">
                    KSH {selectedPlan.price}
                  </p>
                </div>
              </div>
            </div>
          )}

          <div className="space-y-4">
            <Input
              label="Phone Number"
              type="tel"
              placeholder="07XXXXXXXX or 254XXXXXXXXX"
              value={phoneNumber}
              onChange={(e) =>
                setPhoneNumber(formatPhoneNumber(e.target.value))
              }
              icon={<PhoneIcon size={20} />}
              helperText="You'll receive an M-Pesa payment request on this number"
            />

            <div className="flex space-x-3">
              <Button
                variant="secondary"
                onClick={() => setPaymentStep("plans")}
                className="flex-1"
              >
                Back
              </Button>
              <Button
                variant="gradient"
                onClick={handlePayment}
                disabled={!phoneNumber || phoneNumber.length < 12}
                className="flex-1"
              >
                Pay KSH {selectedPlan?.price}
              </Button>
            </div>
          </div>

          <div className="mt-6 text-xs text-gray-500 text-center">
            <p>Secure payment powered by M-Pesa</p>
            <p>
              You will receive WiFi credentials via SMS after successful payment
            </p>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen gradient-hero">
      {/* Header */}
      <div className="text-center pt-12 pb-8 px-4">
        <div className="animate-float mb-6">
          <WifiIcon size={64} className="text-white mx-auto" />
        </div>
        <h1 className="text-responsive-3xl font-bold text-white mb-4">
          Welcome to VukaWiFi
        </h1>
        <p className="text-responsive-lg text-white/90 max-w-3xl mx-auto">
          Get instant high speed internet access with our flexible plans. Pay with M-Pesa
          and connect immediately!
        </p>
      </div>

      {/* Plans Grid */}
      <div className="px-4 pb-12">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-responsive-2xl font-bold text-white text-center mb-8">
            Choose Your Plan
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {demoPlans.map((plan) => (
              <div
                key={plan.id}
                className={`plan-card relative ${
                  selectedPlan?.id === plan.id ? "selected" : ""
                }`}
                onClick={() => handlePlanSelect(plan)}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-warning-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="text-center mb-4">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {plan.name}
                  </h3>
                  <div className="text-3xl font-bold text-primary-600 mb-1">
                    KSH {plan.price}
                  </div>
                  <p className="text-gray-600 text-sm">{plan.duration}</p>
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Data Limit:</span>
                    <span className="font-medium">{plan.dataLimit}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Speed:</span>
                    <span className="font-medium">{plan.speed}</span>
                  </div>
                </div>

                <div className="space-y-2 mb-6">
                  {plan.features.map((feature, index) => (
                    <div key={index} className="flex items-center text-sm">
                      <CheckIcon
                        size={16}
                        className="text-success-500 mr-2 flex-shrink-0"
                      />
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-auto">
                  {selectedPlan?.id === plan.id ? (
                    <div className="text-center text-primary-600 font-medium">
                      <CheckIcon size={20} className="inline mr-2" />
                      Selected
                    </div>
                  ) : (
                    <div className="text-center text-gray-500 text-sm">
                      Click to select
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {selectedPlan && (
            <div className="mt-8 text-center animate-slide-up">
              <Button
                variant="gradient"
                size="lg"
                onClick={handleProceedToPayment}
                className="px-12"
              >
                Proceed to Payment
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Features Section */}
      <div className="glass-dark border-t border-white/20 py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="text-white">
              <ClockIcon size={48} className="mx-auto mb-4 text-white/80" />
              <h3 className="text-lg font-semibold mb-2">Instant Access</h3>
              <p className="text-white/80 text-sm">
                Connect immediately after payment confirmation
              </p>
            </div>
            <div className="text-white">
              <PhoneIcon size={48} className="mx-auto mb-4 text-white/80" />
              <h3 className="text-lg font-semibold mb-2">M-Pesa Payment</h3>
              <p className="text-white/80 text-sm">
                Secure and convenient mobile payment
              </p>
            </div>
            <div className="text-white">
              <WifiIcon size={48} className="mx-auto mb-4 text-white/80" />
              <h3 className="text-lg font-semibold mb-2">High-Speed WiFi</h3>
              <p className="text-white/80 text-sm">
                Reliable connection for all your needs
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
