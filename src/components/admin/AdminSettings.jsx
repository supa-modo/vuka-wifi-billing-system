import { useState } from "react";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";
import { Card } from "../ui/Card";
import {
  TbUser,
  TbShieldLock,
  TbWifi,
  TbBell,
  TbDatabase,
  TbCreditCard,
  TbEye,
  TbEyeOff,
  TbCopy,
  TbCheck,
  TbX,
  TbQrcode,
  TbRefresh,
  TbCoins,
} from "react-icons/tb";

// Helper components
const Section = ({ title, description, children, className = "" }) => (
  <div
    className={`bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mb-6 ${className}`}
  >
    <div className="px-6 py-4 border-b border-gray-100">
      <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
      {description && (
        <p className="mt-1 text-sm text-gray-500">{description}</p>
      )}
    </div>
    <div className="p-6">{children}</div>
  </div>
);

const ToggleSwitch = ({ enabled, onChange, label, description }) => (
  <div className="flex items-start">
    <button
      type="button"
      className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
        enabled ? "bg-blue-600" : "bg-gray-200"
      }`}
      onClick={() => onChange(!enabled)}
    >
      <span
        className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
          enabled ? "translate-x-5" : "translate-x-0"
        }`}
      />
    </button>
    <div className="ml-3">
      <label className="text-sm font-medium text-gray-700">{label}</label>
      {description && <p className="text-xs text-gray-500">{description}</p>}
    </div>
  </div>
);

const TABS = [
  { id: "profile", label: "Profile", icon: <TbUser className="mr-2" /> },
  {
    id: "security",
    label: "Security",
    icon: <TbShieldLock className="mr-2" />,
  },
  { id: "network", label: "Network", icon: <TbWifi className="mr-2" /> },
  {
    id: "notifications",
    label: "Notifications",
    icon: <TbBell className="mr-2" />,
  },
  { id: "payment", label: "Payment", icon: <TbCreditCard className="mr-2" /> },
  { id: "database", label: "Database", icon: <TbDatabase className="mr-2" /> },
];

const initialProfile = {
  name: "Admin User",
  email: "admin@vukawifi.online",
  phone: "+254 700 000000",
};
const initialSecurity = {
  twoFactorEnabled: false,
  twoFactorCode: "",
  twoFactorSecret: "JBSWY3DPEHPK3PXP",
  showTwoFactorSetup: false,
  sessionTimeout: 30,
};
const initialNetwork = {
  ssid: "VukaWiFi",
  password: "vuka1234",
  showPassword: false,
  bandwidthLimit: 1024,
  maxDevices: 5,
};
const initialNotifications = {
  email: true,
  sms: true,
  push: false,
  lowBalance: true,
  newLogin: true,
  paymentReceived: true,
};
const initialPayment = {
  mpesaEnabled: true,
  mpesaShortcode: "123456",
  mpesaPasskey: "your_mpesa_passkey",
  mpesaConsumerKey: "your_consumer_key",
  mpesaConsumerSecret: "your_consumer_secret",
  paypalEnabled: false,
  paypalClientId: "",
  paypalSecret: "",
  stripeEnabled: false,
  stripePublishableKey: "",
  stripeSecretKey: "",
};
const initialDatabase = {
  lastBackup: "2023-06-10T14:30:00Z",
  backupFrequency: "daily",
  backupLocation: "local",
  autoOptimize: true,
  maintenanceMode: false,
};

const AdminSettings = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const [profile, setProfile] = useState(initialProfile);
  const [security, setSecurity] = useState(initialSecurity);
  const [network, setNetwork] = useState(initialNetwork);
  const [notifications, setNotifications] = useState(initialNotifications);
  const [payment, setPayment] = useState(initialPayment);
  const [database, setDatabase] = useState(initialDatabase);
  const [showPassword, setShowPassword] = useState(false);
  const [twoFAError, setTwoFAError] = useState("");
  const [twoFASuccess, setTwoFASuccess] = useState("");
  const [loading2FA, setLoading2FA] = useState(false);

  // Handlers
  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };
  const handleSecurityChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSecurity((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };
  const handleNetworkChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNetwork((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };
  const handleNotificationChange = (e) => {
    const { name, checked } = e.target;
    setNotifications((prev) => ({ ...prev, [name]: checked }));
  };
  const handlePaymentChange = (e) => {
    const { name, value, type, checked } = e.target;
    setPayment((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };
  const handleDatabaseChange = (e) => {
    const { name, value, type, checked } = e.target;
    setDatabase((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // 2FA logic (demo)
  const handleEnableTwoFactor = (e) => {
    e.preventDefault();
    setLoading2FA(true);
    setTimeout(() => {
      setSecurity((prev) => ({
        ...prev,
        twoFactorEnabled: true,
        showTwoFactorSetup: false,
      }));
      setTwoFASuccess("Two-factor authentication enabled!");
      setTwoFAError("");
      setLoading2FA(false);
    }, 1000);
  };
  const handleDisableTwoFactor = () => {
    setLoading2FA(true);
    setTimeout(() => {
      setSecurity((prev) => ({
        ...prev,
        twoFactorEnabled: false,
        showTwoFactorSetup: false,
      }));
      setTwoFASuccess("Two-factor authentication disabled.");
      setTwoFAError("");
      setLoading2FA(false);
    }, 1000);
  };
  const toggleTwoFactorSetup = () => {
    setSecurity((prev) => ({
      ...prev,
      showTwoFactorSetup: !prev.showTwoFactorSetup,
    }));
    setTwoFAError("");
    setTwoFASuccess("");
  };

  // Password visibility
  const togglePasswordVisibility = () => setShowPassword((v) => !v);

  // Tab content renderers
  const renderProfileTab = () => (
    <Section
      title="Profile Information"
      description="Update your account's profile information and email address."
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="Full Name"
          name="name"
          value={profile.name}
          onChange={handleProfileChange}
          placeholder="Enter your full name"
        />
        <Input
          label="Email"
          name="email"
          type="email"
          value={profile.email}
          onChange={handleProfileChange}
          placeholder="Enter your email"
        />
        <Input
          label="Phone Number"
          name="phone"
          value={profile.phone}
          onChange={handleProfileChange}
          placeholder="+254 700 000000"
        />
      </div>
      <div className="mt-6 flex justify-end">
        <Button variant="primary">Save Changes</Button>
      </div>
    </Section>
  );

  const renderSecurityTab = () => (
    <Section
      title="Two-Factor Authentication"
      description="Add additional security to your account using two-factor authentication."
    >
      <div className="space-y-4">
        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <div>
            <h4 className="font-medium text-gray-900">
              Two-Factor Authentication
            </h4>
            <p className="text-sm text-gray-500">
              {security.twoFactorEnabled
                ? "Two-factor authentication is currently enabled."
                : "Two-factor authentication is not enabled yet."}
            </p>
          </div>
          {security.twoFactorEnabled ? (
            <Button
              variant="danger"
              onClick={handleDisableTwoFactor}
              disabled={loading2FA}
            >
              Disable
            </Button>
          ) : (
            <Button onClick={toggleTwoFactorSetup} disabled={loading2FA}>
              Enable
            </Button>
          )}
        </div>
        {security.showTwoFactorSetup && (
          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <h4 className="font-medium text-gray-900 mb-4">
              Set up two-factor authentication
            </h4>
            <div className="space-y-4">
              <p className="text-sm text-gray-600">
                Scan the QR code below with your authenticator app or enter the
                code manually:
              </p>
              <div className="flex flex-col items-center space-y-4 p-4 bg-white rounded border border-gray-200">
                <div className="p-2 bg-white rounded border">
                  <TbQrcode size={150} />
                </div>
                <div className="text-center">
                  <p className="text-sm font-mono bg-gray-100 p-2 rounded">
                    {security.twoFactorSecret}
                    <button
                      onClick={() =>
                        navigator.clipboard.writeText(security.twoFactorSecret)
                      }
                      className="ml-2 text-blue-600 hover:text-blue-800"
                      title="Copy to clipboard"
                    >
                      <TbCopy size={16} className="inline" />
                    </button>
                  </p>
                </div>
              </div>
              <div className="mt-4">
                <Input
                  label="Verification Code"
                  name="twoFactorCode"
                  value={security.twoFactorCode}
                  onChange={handleSecurityChange}
                  placeholder="Enter 6-digit code"
                  className="max-w-xs"
                />
              </div>
              <div className="flex space-x-3 pt-2">
                <Button
                  variant="primary"
                  onClick={handleEnableTwoFactor}
                  disabled={loading2FA}
                >
                  Verify & Enable
                </Button>
                <Button
                  variant="ghost"
                  onClick={toggleTwoFactorSetup}
                  disabled={loading2FA}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        )}
        {twoFAError && (
          <div className="text-red-600 text-sm mt-2">{twoFAError}</div>
        )}
        {twoFASuccess && (
          <div className="text-green-600 text-sm mt-2">{twoFASuccess}</div>
        )}
      </div>
    </Section>
  );

  const renderNetworkTab = () => (
    <Section
      title="Network Configuration"
      description="Manage your WiFi and router settings."
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="SSID (Network Name)"
          name="ssid"
          value={network.ssid}
          onChange={handleNetworkChange}
          placeholder="CompanyWiFi"
        />
        <Input
          label="WiFi Password"
          name="password"
          type={showPassword ? "text" : "password"}
          value={network.password}
          onChange={handleNetworkChange}
          placeholder="WiFi password"
        />
        <Input
          label="Bandwidth Limit (MB)"
          name="bandwidthLimit"
          value={network.bandwidthLimit}
          onChange={handleNetworkChange}
          placeholder="1024"
        />
        <Input
          label="Max Devices"
          name="maxDevices"
          value={network.maxDevices}
          onChange={handleNetworkChange}
          placeholder="5"
        />
      </div>
      <div className="mt-4 flex items-center">
        <Button variant="secondary" onClick={togglePasswordVisibility}>
          {showPassword ? <TbEyeOff /> : <TbEye />}{" "}
          {showPassword ? "Hide" : "Show"} Password
        </Button>
        <Button className="ml-4">Save Network Settings</Button>
      </div>
    </Section>
  );

  const renderNotificationsTab = () => (
    <Section
      title="Notification Preferences"
      description="Choose how you want to receive notifications."
    >
      <div className="space-y-4">
        <ToggleSwitch
          enabled={notifications.email}
          onChange={(v) => setNotifications((prev) => ({ ...prev, email: v }))}
          label="Email Notifications"
          description="Receive notifications via email"
        />
        <ToggleSwitch
          enabled={notifications.sms}
          onChange={(v) => setNotifications((prev) => ({ ...prev, sms: v }))}
          label="SMS Notifications"
          description="Receive notifications via SMS"
        />
        <ToggleSwitch
          enabled={notifications.push}
          onChange={(v) => setNotifications((prev) => ({ ...prev, push: v }))}
          label="Push Notifications"
          description="Receive push notifications on your device"
        />
        <ToggleSwitch
          enabled={notifications.lowBalance}
          onChange={(v) =>
            setNotifications((prev) => ({ ...prev, lowBalance: v }))
          }
          label="Low Balance Alerts"
          description="Get notified when your balance is low"
        />
        <ToggleSwitch
          enabled={notifications.newLogin}
          onChange={(v) =>
            setNotifications((prev) => ({ ...prev, newLogin: v }))
          }
          label="New Login Alerts"
          description="Be alerted when a new device logs in"
        />
        <ToggleSwitch
          enabled={notifications.paymentReceived}
          onChange={(v) =>
            setNotifications((prev) => ({ ...prev, paymentReceived: v }))
          }
          label="Payment Received"
          description="Get notified when a payment is received"
        />
      </div>
      <div className="mt-6 flex justify-end">
        <Button>Save Preferences</Button>
      </div>
    </Section>
  );

  const renderPaymentTab = () => (
    <Section
      title="Payment Gateway"
      description="Configure your payment integrations (demo only)"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="M-Pesa Shortcode"
          name="mpesaShortcode"
          value={payment.mpesaShortcode}
          onChange={handlePaymentChange}
          placeholder="174379"
        />
        <Input
          label="M-Pesa Consumer Key"
          name="mpesaConsumerKey"
          value={payment.mpesaConsumerKey}
          onChange={handlePaymentChange}
          placeholder="Your consumer key"
        />
        <Input
          label="M-Pesa Consumer Secret"
          name="mpesaConsumerSecret"
          value={payment.mpesaConsumerSecret}
          onChange={handlePaymentChange}
          placeholder="Your consumer secret"
        />
        <Input
          label="M-Pesa Passkey"
          name="mpesaPasskey"
          value={payment.mpesaPasskey}
          onChange={handlePaymentChange}
          placeholder="Your passkey"
        />
      </div>
      <div className="mt-6 flex gap-3">
        <Button>Save Configuration</Button>
        <Button variant="ghost">
          <TbRefresh size={20} />
          Test Connection
        </Button>
      </div>
    </Section>
  );

  const renderDatabaseTab = () => (
    <Section
      title="Database & System"
      description="Manage backups, maintenance, and system settings."
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="Last Backup"
          name="lastBackup"
          value={database.lastBackup}
          onChange={handleDatabaseChange}
          placeholder="2023-06-10T14:30:00Z"
        />
        <Input
          label="Backup Frequency"
          name="backupFrequency"
          value={database.backupFrequency}
          onChange={handleDatabaseChange}
          placeholder="daily"
        />
        <Input
          label="Backup Location"
          name="backupLocation"
          value={database.backupLocation}
          onChange={handleDatabaseChange}
          placeholder="local"
        />
        <ToggleSwitch
          enabled={database.autoOptimize}
          onChange={(v) =>
            setDatabase((prev) => ({ ...prev, autoOptimize: v }))
          }
          label="Auto Optimize"
          description="Automatically optimize the database"
        />
        <ToggleSwitch
          enabled={database.maintenanceMode}
          onChange={(v) =>
            setDatabase((prev) => ({ ...prev, maintenanceMode: v }))
          }
          label="Maintenance Mode"
          description="Put the system in maintenance mode"
        />
      </div>
      <div className="mt-6 flex gap-3">
        <Button>Backup Now</Button>
        <Button variant="secondary">Restore</Button>
        <Button variant="secondary">Optimize</Button>
      </div>
    </Section>
  );

  // Main render
  return (
    <div className="flex gap-8">
      <div className="w-72 flex-shrink-0">
        <div className="bg-gray-50 rounded-2xl p-4">
          <nav className="space-y-2">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-3 px-6 py-4 rounded-l-xl transition-all duration-200 w-full text-left relative ${
                  activeTab === tab.id
                    ? "bg-white text-primary-700 shadow-lg before:absolute before:right-0 before:top-0 before:w-1 before:h-full before:bg-primary-600"
                    : "text-gray-600 hover:bg-white/50 hover:text-gray-900"
                }`}
              >
                {tab.icon}
                <span className="font-medium">{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>
      </div>
      <div className="flex-1 space-y-6">
        {activeTab === "profile" && renderProfileTab()}
        {activeTab === "security" && renderSecurityTab()}
        {activeTab === "network" && renderNetworkTab()}
        {activeTab === "notifications" && renderNotificationsTab()}
        {activeTab === "payment" && renderPaymentTab()}
        {activeTab === "database" && renderDatabaseTab()}
      </div>
    </div>
  );
};

export default AdminSettings;
