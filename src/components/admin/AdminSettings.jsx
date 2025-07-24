import { useEffect, useState } from "react";
import {
  TbShieldLock,
  TbCheck,
  TbX,
  TbSettings,
  TbCoins,
  TbUser,
  TbKey,
  TbWifi,
  TbBell,
  TbDatabase,
  TbChevronRight,
  TbEye,
  TbEyeOff,
  TbQrcode,
  TbCopy,
  TbRefresh,
  TbServer2,
} from "react-icons/tb";
import { Button } from "../ui/Button";
import { Card } from "../ui/Card";
import { Input } from "../ui/Input";
import { RouterIcon } from "../ui/Icons";
import { PiUserDuotone } from "react-icons/pi";
import React from "react"; // Added missing import for React

const AdminSettings = () => {
  // 2FA state
  const [twoFAStatus, setTwoFAStatus] = useState({
    enabled: false,
    hasSecret: false,
  });
  const [qrCode, setQrCode] = useState("");
  const [secret, setSecret] = useState("");
  const [code, setCode] = useState("");
  const [twoFAError, setTwoFAError] = useState("");
  const [twoFASuccess, setTwoFASuccess] = useState("");
  const [loading2FA, setLoading2FA] = useState(false);
  const [step, setStep] = useState("status");
  const [showPasswords, setShowPasswords] = useState({});
  const [activeTab, setActiveTab] = useState("profile");

  const adminEmail = "admin@company.com"; // Mock data for demo

  // Mock fetch for demo
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setTwoFAStatus({ enabled: false, hasSecret: false });
    }, 100);
  }, [twoFASuccess]);

  // Toggle password visibility
  const togglePasswordVisibility = (field) => {
    setShowPasswords((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  // Copy to clipboard
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  // 2FA Setup (mock)
  const handleSetup2FA = async () => {
    setLoading2FA(true);
    setTwoFAError("");
    setTwoFASuccess("");

    // Simulate API call
    setTimeout(() => {
      setQrCode(
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg=="
      );
      setSecret("JBSWY3DPEHPK3PXP");
      setStep("verify");
      setLoading2FA(false);
    }, 1000);
  };

  // 2FA Enable (mock)
  const handleEnable2FA = async (e) => {
    e.preventDefault();
    setLoading2FA(true);
    setTwoFAError("");
    setTwoFASuccess("");

    setTimeout(() => {
      if (code === "123456") {
        setTwoFASuccess("Two-factor authentication enabled successfully!");
        setStep("status");
        setTwoFAStatus({ enabled: true, hasSecret: true });
      } else {
        setTwoFAError("Invalid verification code. Please try again.");
      }
      setLoading2FA(false);
    }, 1000);
  };

  // 2FA Disable (mock)
  const handleDisable2FA = async () => {
    setLoading2FA(true);
    setTwoFAError("");
    setTwoFASuccess("");

    setTimeout(() => {
      setTwoFASuccess("Two-factor authentication disabled.");
      setTwoFAStatus({ enabled: false, hasSecret: false });
      setLoading2FA(false);
      setStep("status");
    }, 1000);
  };

  // New component for 6-digit input
  const SixDigitInput = ({ value, onChange, disabled }) => {
    const inputRefs = Array(6)
      .fill(0)
      .map(() => React.createRef());

    const handleChange = (index, e) => {
      const val = e.target.value.replace(/\D/g, "");
      if (val) {
        const newCode = value.split("");
        newCode[index] = val[val.length - 1];
        onChange(newCode.join(""));
        if (index < 5 && val) {
          inputRefs[index + 1].current.focus();
        }
      }
    };

    const handleKeyDown = (index, e) => {
      if (e.key === "Backspace" && !value[index] && index > 0) {
        inputRefs[index - 1].current.focus();
      }
    };

    const handlePaste = (e) => {
      e.preventDefault();
      const pastedData = e.clipboardData
        .getData("text")
        .replace(/\D/g, "")
        .slice(0, 6);
      onChange(pastedData);
      if (pastedData.length === 6) {
        inputRefs[5].current.focus();
      }
    };

    return (
      <div className="flex gap-3 justify-center">
        {Array(6)
          .fill(0)
          .map((_, index) => (
            <input
              key={index}
              ref={inputRefs[index]}
              type="text"
              maxLength={1}
              className="w-12 h-14 text-center text-2xl font-mono border-2 border-gray-300 rounded-lg focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition-all"
              value={value[index] || ""}
              onChange={(e) => handleChange(index, e)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              onPaste={handlePaste}
              disabled={disabled}
            />
          ))}
      </div>
    );
  };
  // Tab button
  const TabButton = ({ id, label, icon: Icon, active, onClick }) => (
    <button
      onClick={() => onClick(id)}
      className={`flex items-center gap-3 px-6 py-4 rounded-l-xl transition-all duration-200 w-full text-left relative ${
        active
          ? "bg-white text-primary-700 shadow-lg before:absolute before:right-0 before:top-0 before:w-1 before:h-full before:bg-primary-600"
          : "text-gray-600 hover:bg-white/50 hover:text-gray-900"
      }`}
    >
      <Icon size={22} />
      <span className="font-medium">{label}</span>
    </button>
  );

  const tabs = [
    { id: "profile", label: "Account & Security", icon: PiUserDuotone },
    { id: "payment", label: "Payment Gateway", icon: TbCoins },
    { id: "network", label: "Network & WiFi", icon: RouterIcon },
    { id: "system", label: "System Settings", icon: TbServer2 },
  ];

  return (
    <div className="flex gap-8">
      {/* Main Content */}
      <div className="flex-1 space-y-6">
        {/* Profile & Account Tab */}
        {activeTab === "profile" && (
          <div className="space-y-6">
            <Card className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <TbUser className="text-primary-600" size={24} />
                <h2 className="text-xl font-semibold text-gray-900">
                  Profile Information
                </h2>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                <Input
                  label="Full Name"
                  placeholder="John Doe"
                  defaultValue="John Doe"
                />
                <Input
                  label="Email Address"
                  placeholder="admin@company.com"
                  defaultValue={adminEmail}
                />
                <Input label="Phone Number" placeholder="+1 (555) 123-4567" />
              </div>
              <div className="mt-6 pt-6 border-t border-gray-200">
                <Button>Save Changes</Button>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <TbKey className="text-primary-600" size={24} />
                <h2 className="text-xl font-semibold text-gray-900">
                  Change Password
                </h2>
              </div>
              <div className="flex flex-col md:flex-row gap-4">
                <div className="w-full relative">
                  <Input
                    label="Current Password"
                    type={showPasswords.current ? "text" : "password"}
                    placeholder="Enter current password"
                    value={showPasswords.currentValue || ""}
                    onChange={(e) =>
                      setShowPasswords((prev) => ({
                        ...prev,
                        currentValue: e.target.value,
                      }))
                    }
                  />
                  <button
                    type="button"
                    onClick={() => togglePasswordVisibility("current")}
                    className="absolute right-3 top-9 text-gray-400 hover:text-gray-600"
                  >
                    {showPasswords.current ? (
                      <TbEyeOff size={20} />
                    ) : (
                      <TbEye size={20} />
                    )}
                  </button>
                </div>
                <div className="w-full relative">
                  <Input
                    label="New Password"
                    type={showPasswords.new ? "text" : "password"}
                    placeholder="Enter new password"
                    value={showPasswords.newValue || ""}
                    onChange={(e) =>
                      setShowPasswords((prev) => ({
                        ...prev,
                        newValue: e.target.value,
                      }))
                    }
                  />
                  <button
                    type="button"
                    onClick={() => togglePasswordVisibility("new")}
                    className="absolute right-3 top-9 text-gray-400 hover:text-gray-600"
                  >
                    {showPasswords.new ? (
                      <TbEyeOff size={20} />
                    ) : (
                      <TbEye size={20} />
                    )}
                  </button>
                </div>
                <div className="w-full relative">
                  <Input
                    label="Confirm New Password"
                    type={showPasswords.confirm ? "text" : "password"}
                    placeholder="Confirm new password"
                    value={showPasswords.confirmValue || ""}
                    onChange={(e) =>
                      setShowPasswords((prev) => ({
                        ...prev,
                        confirmValue: e.target.value,
                      }))
                    }
                  />
                  <button
                    type="button"
                    onClick={() => togglePasswordVisibility("confirm")}
                    className="absolute right-3 top-9 text-gray-400 hover:text-gray-600"
                  >
                    {showPasswords.confirm ? (
                      <TbEyeOff size={20} />
                    ) : (
                      <TbEye size={20} />
                    )}
                  </button>
                </div>
              </div>
              <div className="mt-6 pt-6 border-t border-gray-200">
                <Button>Update Password</Button>
              </div>
            </Card>

            {/* Enhanced 2FA Card */}
            <Card className="p-0 overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <TbShieldLock className="text-primary-600" size={24} />
                    <div>
                      <h2 className="text-xl font-semibold text-gray-900">
                        Two-Factor Authentication
                      </h2>
                      <p className="text-gray-600">
                        Add an extra layer of security to your account
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-opacity-10 ${twoFAStatus.enabled ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}">
                    <div
                      className={`w-3 h-3 rounded-full ${
                        twoFAStatus.enabled ? "bg-green-500" : "bg-red-500"
                      }`}
                    ></div>
                    <span className="font-medium">
                      {twoFAStatus.enabled ? "Enabled" : "Disabled"}
                    </span>
                  </div>
                </div>
              </div>

              {twoFAError && (
                <div className="mx-6 mt-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-3">
                  <TbX className="text-red-500 flex-shrink-0" />
                  <span className="text-red-700">{twoFAError}</span>
                </div>
              )}

              {twoFASuccess && (
                <div className="mx-6 mt-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-3">
                  <TbCheck className="text-green-500 flex-shrink-0" />
                  <span className="text-green-700">{twoFASuccess}</span>
                </div>
              )}

              {step === "status" && (
                <div className="p-6">
                  <div className="p-6 bg-gray-50 rounded-xl">
                    <p className="text-gray-700 mb-6 text-lg">
                      Two-factor authentication adds an extra layer of security
                      by requiring a code from your mobile device in addition to
                      your password.
                    </p>
                    <div className="flex gap-3">
                      {twoFAStatus.enabled ? (
                        <Button
                          variant="danger"
                          onClick={handleDisable2FA}
                          disabled={loading2FA}
                        >
                          Disable 2FA
                        </Button>
                      ) : (
                        <Button
                          onClick={handleSetup2FA}
                          disabled={loading2FA}
                          size="lg"
                        >
                          <TbQrcode size={20} />
                          Setup 2FA
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {step === "verify" && (
                <div className="flex min-h-[500px]">
                  {/* QR Code Section - Left Side */}
                  <div className="w-1/3 bg-gray-50 p-8 flex items-center justify-center border-r border-gray-200">
                    {qrCode && (
                      <div className="bg-white p-8 rounded-2xl shadow-sm">
                        <img
                          src={qrCode}
                          alt="QR Code"
                          className="w-full h-auto object-contain rounded"
                        />
                      </div>
                    )}
                  </div>

                  {/* Setup Instructions - Right Side */}
                  <div className="w-2/3 p-8">
                    <h3 className="text-2xl font-semibold text-gray-900 mb-6">
                      Setup Two-Factor Authentication
                    </h3>

                    <div className="space-y-8">
                      <div>
                        <h4 className="text-lg font-medium text-gray-900 mb-2">
                          1. Scan QR Code
                        </h4>
                        <p className="text-gray-600">
                          Use your authenticator app (Google Authenticator,
                          Authy, etc.) to scan the QR code shown on the left.
                        </p>
                      </div>

                      <div>
                        <h4 className="text-lg font-medium text-gray-900 mb-2">
                          2. Manual Setup (Optional)
                        </h4>
                        <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                          <p className="text-sm text-gray-600 mb-2">
                            If you can't scan the QR code, enter this secret
                            manually:
                          </p>
                          <div className="flex items-center justify-between bg-white rounded px-4 py-3">
                            <code className="font-mono text-lg">{secret}</code>
                            <button
                              type="button"
                              onClick={() => copyToClipboard(secret)}
                              className="text-primary-600 hover:text-primary-700 p-2 hover:bg-gray-50 rounded-lg transition-colors"
                            >
                              <TbCopy size={20} />
                            </button>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h4 className="text-lg font-medium text-gray-900 mb-4">
                          3. Enter Verification Code
                        </h4>
                        <SixDigitInput
                          value={code}
                          onChange={setCode}
                          disabled={loading2FA}
                        />
                      </div>

                      <div className="flex gap-3 pt-4">
                        <Button
                          onClick={handleEnable2FA}
                          disabled={loading2FA}
                          size="lg"
                        >
                          Enable 2FA
                        </Button>
                        <Button
                          variant="ghost"
                          onClick={() => setStep("status")}
                          size="lg"
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </Card>
          </div>
        )}

        {/* Payment Gateway Tab */}
        {activeTab === "payment" && (
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <TbCoins className="text-primary-600" size={24} />
              <h2 className="text-xl font-semibold text-gray-900">
                M-Pesa Integration
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input label="Business Short Code" placeholder="174379" />
              <Input label="Consumer Key" placeholder="Your consumer key" />
              <Input
                label="Consumer Secret"
                type={showPasswords.consumerSecret ? "text" : "password"}
                placeholder="Your consumer secret"
                value={showPasswords.consumerSecretValue || ""}
                onChange={(e) =>
                  setShowPasswords((prev) => ({
                    ...prev,
                    consumerSecretValue: e.target.value,
                  }))
                }
              />
              <button
                type="button"
                onClick={() => togglePasswordVisibility("consumerSecret")}
                className="absolute right-3 top-9 text-gray-400 hover:text-gray-600"
                style={{ right: "2.5rem", top: "2.5rem", position: "relative" }}
              >
                {showPasswords.consumerSecret ? (
                  <TbEyeOff size={20} />
                ) : (
                  <TbEye size={20} />
                )}
              </button>
              <Input
                label="Passkey"
                type={showPasswords.passkey ? "text" : "password"}
                placeholder="Your passkey"
                value={showPasswords.passkeyValue || ""}
                onChange={(e) =>
                  setShowPasswords((prev) => ({
                    ...prev,
                    passkeyValue: e.target.value,
                  }))
                }
              />
              <button
                type="button"
                onClick={() => togglePasswordVisibility("passkey")}
                className="absolute right-3 top-9 text-gray-400 hover:text-gray-600"
                style={{ right: "2.5rem", top: "2.5rem", position: "relative" }}
              >
                {showPasswords.passkey ? (
                  <TbEyeOff size={20} />
                ) : (
                  <TbEye size={20} />
                )}
              </button>
            </div>
            <div className="mt-6 pt-6 border-t border-gray-200 flex gap-3">
              <Button>Save Configuration</Button>
              <Button variant="ghost">
                <TbRefresh size={20} />
                Test Connection
              </Button>
            </div>
          </Card>
        )}

        {/* Network & WiFi Tab */}
        {activeTab === "network" && (
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <TbWifi className="text-primary-600" size={24} />
              <h2 className="text-xl font-semibold text-gray-900">
                Network Configuration
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input label="SSID (Network Name)" placeholder="CompanyWiFi" />
              <Input label="Router IP Address" placeholder="192.168.1.1" />
              <Input label="Router Username" placeholder="admin" />
              <Input
                label="Router Password"
                type={showPasswords.routerPassword ? "text" : "password"}
                placeholder="Router password"
                value={showPasswords.routerPasswordValue || ""}
                onChange={(e) =>
                  setShowPasswords((prev) => ({
                    ...prev,
                    routerPasswordValue: e.target.value,
                  }))
                }
              />
              <button
                type="button"
                onClick={() => togglePasswordVisibility("routerPassword")}
                className="absolute right-3 top-9 text-gray-400 hover:text-gray-600"
                style={{ right: "2.5rem", top: "2.5rem", position: "relative" }}
              >
                {showPasswords.routerPassword ? (
                  <TbEyeOff size={20} />
                ) : (
                  <TbEye size={20} />
                )}
              </button>
            </div>
            <div className="mt-6 pt-6 border-t border-gray-200">
              <Button>Update Network Settings</Button>
            </div>
          </Card>
        )}

        {/* System Settings Tab */}
        {activeTab === "system" && (
          <div className="space-y-6">
            <Card className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <TbBell className="text-primary-600" size={24} />
                <h2 className="text-xl font-semibold text-gray-900">
                  Notification Preferences
                </h2>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <h3 className="font-medium text-gray-900">
                      Email Notifications
                    </h3>
                    <p className="text-sm text-gray-600">
                      Receive notifications via email
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      defaultChecked
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                  </label>
                </div>
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <h3 className="font-medium text-gray-900">
                      SMS Notifications
                    </h3>
                    <p className="text-sm text-gray-600">
                      Receive notifications via SMS
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                  </label>
                </div>
              </div>
              <div className="mt-6 pt-6 border-t border-gray-200">
                <Button>Save Preferences</Button>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <TbDatabase className="text-primary-600" size={24} />
                <h2 className="text-xl font-semibold text-gray-900">
                  System Configuration
                </h2>
              </div>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input
                    label="System Timezone"
                    placeholder="UTC+3 (EAT)"
                    defaultValue="UTC+3 (EAT)"
                  />
                  <Input
                    label="Session Timeout (minutes)"
                    placeholder="30"
                    defaultValue="30"
                  />
                  <Input
                    label="Max Login Attempts"
                    placeholder="5"
                    defaultValue="5"
                  />
                  <Input
                    label="Backup Frequency"
                    placeholder="Daily"
                    defaultValue="Daily"
                  />
                </div>
                <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <h3 className="font-medium text-yellow-800 mb-2">
                    System Maintenance
                  </h3>
                  <p className="text-yellow-700 text-sm mb-4">
                    These actions will affect system performance and should be
                    done during maintenance windows.
                  </p>
                  <div className="flex gap-3">
                    <Button variant="secondary">Clear Cache</Button>
                    <Button variant="secondary">Optimize Database</Button>
                    <Button variant="danger">Restart System</Button>
                  </div>
                </div>
              </div>
              <div className="mt-6 pt-6 border-t border-gray-200">
                <Button>Save System Settings</Button>
              </div>
            </Card>
          </div>
        )}
      </div>

      {/* Right Sidebar Navigation */}
      <div className="w-72 flex-shrink-0">
        <div className="bg-gray-50 rounded-2xl p-4">
          <nav className="space-y-2">
            {tabs.map((tab) => (
              <TabButton
                key={tab.id}
                id={tab.id}
                label={tab.label}
                icon={tab.icon}
                active={activeTab === tab.id}
                onClick={setActiveTab}
              />
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
};

export default AdminSettings;
