import React, { useState, useMemo, useEffect } from "react";
import {
  FiArrowUp,
  FiArrowDown,
  FiMoreVertical,
  FiMessageSquare,
  FiCheckCircle,
  FiXCircle,
  FiClock,
  FiRefreshCw,
  FiDownload,
  FiEye,
  FiAlertCircle,
  FiSend,
  FiUsers,
} from "react-icons/fi";
import {
  TbFilterFilled,
  TbSearch,
  TbCheck,
  TbMessage,
  TbDeviceMobile,
  TbBell,
  TbFileExport,
  TbRefresh,
} from "react-icons/tb";
import Checkbox from "../ui/Checkbox";

// Enhanced Mock Data for SMS Logs
const smsLogsData = [
  {
    id: "SMS-001",
    recipient: "+254712345678",
    recipientName: "John Doe",
    message:
      "Your WiFi credentials: Username: 254712345678, Password: temp_xyz789. Valid until 2023-10-27 14:30:00",
    type: "credentials",
    status: "delivered",
    sentAt: "2023-10-26T10:30:00Z",
    deliveredAt: "2023-10-26T10:30:15Z",
    cost: 1.5,
    provider: "Safaricom",
    messageId: "MSG123456789",
    planName: "Standard Day",
    paymentId: "TXN7329201",
  },
  {
    id: "SMS-002",
    recipient: "+254798765432",
    recipientName: "Jane Smith",
    message:
      "Payment confirmation: Kshs. 300 received for Premium Week plan. Your session will start shortly.",
    type: "payment_confirmation",
    status: "delivered",
    sentAt: "2023-10-26T11:32:00Z",
    deliveredAt: "2023-10-26T11:32:08Z",
    cost: 1.5,
    provider: "Safaricom",
    messageId: "MSG123456790",
    planName: "Premium Week",
    paymentId: "TXN7329202",
  },
  {
    id: "SMS-003",
    recipient: "+254723456789",
    recipientName: "Mike Johnson",
    message:
      "Your WiFi session will expire in 30 minutes. Extend your session or purchase a new plan.",
    type: "expiry_warning",
    status: "pending",
    sentAt: "2023-10-26T12:15:00Z",
    deliveredAt: null,
    cost: 1.5,
    provider: "Safaricom",
    messageId: "MSG123456791",
    planName: "Basic Hour",
    paymentId: null,
  },
  {
    id: "SMS-004",
    recipient: "+254734567890",
    recipientName: "Emily Davis",
    message:
      "Payment failed for Student Special plan. Please try again or use a different payment method.",
    type: "payment_failed",
    status: "failed",
    sentAt: "2023-10-25T14:05:00Z",
    deliveredAt: null,
    cost: 0,
    provider: "Safaricom",
    messageId: "MSG123456792",
    planName: "Student Special",
    paymentId: "TXN7329204",
    failureReason: "Network timeout",
  },
  {
    id: "SMS-005",
    recipient: "+254745678901",
    recipientName: "David Wilson",
    message:
      "Welcome to VukaWiFi! Your 5-device Premium Week plan is now active. Happy browsing!",
    type: "welcome",
    status: "delivered",
    sentAt: "2023-10-25T09:22:00Z",
    deliveredAt: "2023-10-25T09:22:12Z",
    cost: 1.5,
    provider: "Safaricom",
    messageId: "MSG123456793",
    planName: "Premium Week",
    paymentId: "TXN7329205",
  },
  {
    id: "SMS-006",
    recipient: "+254756789012",
    recipientName: "Sarah Brown",
    message:
      "Your refund of Kshs. 80 has been processed successfully. Amount will reflect in your M-Pesa account within 24 hours.",
    type: "refund_notification",
    status: "delivered",
    sentAt: "2023-10-25T10:35:00Z",
    deliveredAt: "2023-10-25T10:35:18Z",
    cost: 1.5,
    provider: "Safaricom",
    messageId: "MSG123456794",
    planName: "Standard Day",
    paymentId: "TXN7329206",
  },
  {
    id: "SMS-007",
    recipient: "+254767890123",
    recipientName: "Robert Kim",
    message:
      "System maintenance scheduled for tonight 2:00-4:00 AM. Your session will be temporarily suspended.",
    type: "maintenance_alert",
    status: "delivered",
    sentAt: "2023-10-25T18:00:00Z",
    deliveredAt: "2023-10-25T18:00:05Z",
    cost: 1.5,
    provider: "Safaricom",
    messageId: "MSG123456795",
    planName: null,
    paymentId: null,
  },
  {
    id: "SMS-008",
    recipient: "+254778901234",
    recipientName: "Lisa Chen",
    message:
      "Your WiFi session has expired. Purchase a new plan to continue browsing.",
    type: "session_expired",
    status: "delivered",
    sentAt: "2023-10-24T16:00:00Z",
    deliveredAt: "2023-10-24T16:00:11Z",
    cost: 1.5,
    provider: "Safaricom",
    messageId: "MSG123456796",
    planName: "Basic Hour",
    paymentId: null,
  },
];

const StatCard = ({ title, value, change, changeType, icon, gradient }) => (
  <div className="group relative overflow-hidden backdrop-blur-xl bg-white/70 rounded-2xl border border-white/30 shadow-xl shadow-blue-500/5 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-300">
    <div
      className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-[6%] transition-opacity duration-300`}
    ></div>
    <div className="relative p-5">
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <p className="text-sm font-medium text-slate-500">{title}</p>
          <p className="text-2xl font-bold font-lexend text-slate-800">
            {value}
          </p>
        </div>
        <div className={`p-3 rounded-xl text-white ${gradient}`}>{icon}</div>
      </div>
      <div
        className={`flex items-center gap-1 text-sm font-semibold mt-4 ${
          changeType === "increase" ? "text-emerald-500" : "text-red-500"
        }`}
      >
        {changeType === "increase" ? <FiArrowUp /> : <FiArrowDown />}
        <span>{change} vs last month</span>
      </div>
    </div>
  </div>
);

const FilterDropdown = ({
  isOpen,
  onClose,
  onClear,
  filters,
  onToggle,
  availableOptions,
}) => {
  if (!isOpen) return null;

  return (
    <div className="absolute top-full right-0 mt-2 min-w-[19rem] bg-white rounded-xl shadow-2xl border border-slate-200 z-50">
      <div className="p-3.5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold text-slate-600 font-lexend">
            Filter SMS Logs
          </h3>
          <button
            onClick={onClear}
            className="text-xs font-lexend font-semibold text-primary-600 hover:text-primary-800 transition-colors"
          >
            Clear all
          </button>
        </div>

        {Object.entries(availableOptions).map(([key, options]) => (
          <div key={key} className="mb-4">
            <h4 className="text-xs font-bold text-slate-500 uppercase mb-2">
              {key}
            </h4>
            <div className="flex flex-wrap gap-2">
              {options.map((option) => {
                const isSelected = filters[key]?.includes(option);
                return (
                  <button
                    key={option}
                    onClick={() => onToggle(key, option)}
                    className={`px-4 py-1.5 font-lexend rounded-full border transition-all duration-200 font-medium text-[0.83rem] text-center flex items-center gap-2 ${
                      isSelected
                        ? "border-primary-400 bg-primary-100 text-primary-700 shadow-sm"
                        : "border-gray-200 hover:border-primary-300 text-slate-700 hover:bg-slate-100"
                    }`}
                  >
                    {isSelected && (
                      <TbCheck size={12} className="text-primary-600" />
                    )}
                    <span>{option}</span>
                  </button>
                );
              })}
            </div>
          </div>
        ))}

        <div className="flex gap-2 mt-4 pt-2.5 border-t border-slate-200">
          <button
            onClick={onClose}
            className="flex-1 px-3 py-2 text-[0.78rem] font-lexend font-medium text-white bg-primary-600 rounded-lg hover:bg-primary-700 transition-colors"
          >
            <div className="flex items-center justify-center gap-2">
              <TbCheck size={12} className="text-white" />
              <span>Apply</span>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

const SMSDetailsModal = ({ isOpen, onClose, sms }) => {
  if (!isOpen || !sms) return null;

  const getStatusChip = (status) => {
    switch (status) {
      case "delivered":
        return "bg-emerald-100 text-emerald-700 border border-emerald-200/80";
      case "pending":
        return "bg-amber-100 text-amber-600 border border-amber-200/80";
      case "failed":
        return "bg-red-100 text-red-700 border border-red-200/80";
      default:
        return "bg-gray-100 text-gray-700 border border-gray-200/80";
    }
  };

  const getTypeLabel = (type) => {
    const typeLabels = {
      credentials: "WiFi Credentials",
      payment_confirmation: "Payment Confirmation",
      expiry_warning: "Expiry Warning",
      payment_failed: "Payment Failed",
      welcome: "Welcome Message",
      refund_notification: "Refund Notification",
      maintenance_alert: "Maintenance Alert",
      session_expired: "Session Expired",
    };
    return typeLabels[type] || type;
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-slate-200">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold font-lexend text-slate-800">
                SMS Details
              </h2>
              <p className="text-slate-500 font-mono">{sms.id}</p>
            </div>
            <div className="flex items-center gap-3">
              <span
                className={`px-3 py-1 text-sm font-semibold rounded-full ${getStatusChip(
                  sms.status
                )}`}
              >
                {sms.status.charAt(0).toUpperCase() + sms.status.slice(1)}
              </span>
              <button
                onClick={onClose}
                className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
              >
                ✕
              </button>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Message Content */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-slate-800">
              Message Content
            </h3>
            <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
              <p className="text-sm text-slate-700 leading-relaxed">
                {sms.message}
              </p>
            </div>
          </div>

          {/* Recipient Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-slate-800">
                Recipient Information
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm font-medium text-slate-600">
                    Name
                  </span>
                  <span className="text-sm text-slate-800">
                    {sms.recipientName}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm font-medium text-slate-600">
                    Phone
                  </span>
                  <span className="text-sm text-slate-800 font-mono">
                    {sms.recipient}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm font-medium text-slate-600">
                    Type
                  </span>
                  <span className="text-sm text-slate-800">
                    {getTypeLabel(sms.type)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm font-medium text-slate-600">
                    Provider
                  </span>
                  <span className="text-sm text-slate-800">{sms.provider}</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-slate-800">
                Delivery Information
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm font-medium text-slate-600">
                    Status
                  </span>
                  <span
                    className={`text-sm font-semibold ${
                      sms.status === "delivered"
                        ? "text-emerald-600"
                        : sms.status === "pending"
                        ? "text-amber-600"
                        : "text-red-600"
                    }`}
                  >
                    {sms.status.charAt(0).toUpperCase() + sms.status.slice(1)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm font-medium text-slate-600">
                    Sent At
                  </span>
                  <span className="text-sm text-slate-800">
                    {new Date(sms.sentAt).toLocaleString()}
                  </span>
                </div>
                {sms.deliveredAt && (
                  <div className="flex justify-between">
                    <span className="text-sm font-medium text-slate-600">
                      Delivered At
                    </span>
                    <span className="text-sm text-slate-800">
                      {new Date(sms.deliveredAt).toLocaleString()}
                    </span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-sm font-medium text-slate-600">
                    Cost
                  </span>
                  <span className="text-sm text-slate-800">
                    Kshs. {sms.cost.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm font-medium text-slate-600">
                    Message ID
                  </span>
                  <span className="text-sm text-slate-800 font-mono">
                    {sms.messageId}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Related Information */}
          {(sms.planName || sms.paymentId) && (
            <div className="border-t border-slate-200 pt-6">
              <h3 className="text-lg font-semibold text-slate-800 mb-4">
                Related Information
              </h3>
              <div className="space-y-3">
                {sms.planName && (
                  <div className="flex justify-between">
                    <span className="text-sm font-medium text-slate-600">
                      Plan
                    </span>
                    <span className="text-sm text-slate-800">
                      {sms.planName}
                    </span>
                  </div>
                )}
                {sms.paymentId && (
                  <div className="flex justify-between">
                    <span className="text-sm font-medium text-slate-600">
                      Payment ID
                    </span>
                    <span className="text-sm text-slate-800 font-mono">
                      {sms.paymentId}
                    </span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Failure Reason */}
          {sms.failureReason && (
            <div className="border-t border-slate-200 pt-6">
              <h3 className="text-lg font-semibold text-slate-800 mb-4">
                Failure Information
              </h3>
              <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                <div className="flex items-center gap-2 mb-1">
                  <FiAlertCircle className="text-red-500" size={16} />
                  <span className="text-sm font-medium text-red-700">
                    Failure Reason
                  </span>
                </div>
                <p className="text-sm text-red-600">{sms.failureReason}</p>
              </div>
            </div>
          )}
        </div>

        <div className="p-6 border-t border-slate-200 flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors font-medium"
          >
            Close
          </button>
          {sms.status === "failed" && (
            <button className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium flex items-center gap-2">
              <FiRefreshCw size={16} />
              Retry Send
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

const SMSLogs = () => {
  const [smsLogs, setSmsLogs] = useState(smsLogsData);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLogs, setSelectedLogs] = useState([]);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [showSMSModal, setShowSMSModal] = useState(false);
  const [selectedSMS, setSelectedSMS] = useState(null);
  const [filters, setFilters] = useState({ status: [], type: [] });
  const [sortConfig, setSortConfig] = useState({
    key: "sentAt",
    direction: "descending",
  });

  const availableOptions = useMemo(
    () => ({
      status: [...new Set(smsLogs.map((s) => s.status))],
      type: [...new Set(smsLogs.map((s) => s.type))],
    }),
    [smsLogs]
  );

  // Calculate stats
  const stats = useMemo(() => {
    const totalSent = smsLogs.length;
    const delivered = smsLogs.filter((s) => s.status === "delivered").length;
    const pending = smsLogs.filter((s) => s.status === "pending").length;
    const failed = smsLogs.filter((s) => s.status === "failed").length;
    const totalCost = smsLogs.reduce((sum, s) => sum + s.cost, 0);

    return {
      totalSent,
      delivered,
      pending,
      failed,
      totalCost,
      deliveryRate:
        totalSent > 0 ? ((delivered / totalSent) * 100).toFixed(1) : 0,
    };
  }, [smsLogs]);

  const filteredLogs = useMemo(() => {
    return smsLogs.filter((log) => {
      const matchesSearch =
        log.recipientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.recipient.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.id.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus =
        filters.status.length === 0 || filters.status.includes(log.status);

      const matchesType =
        filters.type.length === 0 || filters.type.includes(log.type);

      return matchesSearch && matchesStatus && matchesType;
    });
  }, [smsLogs, searchTerm, filters]);

  const sortedLogs = useMemo(() => {
    let sortableItems = [...filteredLogs];
    if (sortConfig.key) {
      sortableItems.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [filteredLogs, sortConfig]);

  const handleSort = (key) => {
    setSortConfig((prev) => ({
      key,
      direction:
        prev.key === key && prev.direction === "ascending"
          ? "descending"
          : "ascending",
    }));
  };

  const getSortIcon = (key) => {
    if (sortConfig.key !== key) return "";
    return sortConfig.direction === "ascending" ? "↑" : "↓";
  };

  const handleSelectAll = (checked) => {
    if (checked) {
      setSelectedLogs(sortedLogs.map((l) => l.id));
    } else {
      setSelectedLogs([]);
    }
  };

  const handleSelectLog = (logId, checked) => {
    if (checked) {
      setSelectedLogs((prev) => [...prev, logId]);
    } else {
      setSelectedLogs((prev) => prev.filter((id) => id !== logId));
    }
  };

  const handleFilterToggle = (key, value) => {
    setFilters((prev) => {
      const newValues = prev[key].includes(value)
        ? prev[key].filter((v) => v !== value)
        : [...prev[key], value];
      return { ...prev, [key]: newValues };
    });
  };

  const handleBulkAction = (action) => {
    console.log(`Performing ${action} on SMS logs:`, selectedLogs);

    if (action === "retry") {
      setSmsLogs((prev) =>
        prev.map((log) =>
          selectedLogs.includes(log.id) && log.status === "failed"
            ? { ...log, status: "pending" }
            : log
        )
      );
    } else if (action === "export") {
      console.log("Exporting selected SMS logs");
    }

    setSelectedLogs([]);
  };

  const handleLogAction = (action, logId) => {
    const log = smsLogs.find((l) => l.id === logId);

    if (action === "view") {
      setSelectedSMS(log);
      setShowSMSModal(true);
    } else if (action === "retry" && log.status === "failed") {
      setSmsLogs((prev) =>
        prev.map((l) => (l.id === logId ? { ...l, status: "pending" } : l))
      );
    }
  };

  const getStatusChip = (status) => {
    switch (status) {
      case "delivered":
        return "bg-emerald-100 text-emerald-700 border border-emerald-200/80";
      case "pending":
        return "bg-amber-100 text-amber-600 border border-amber-200/80";
      case "failed":
        return "bg-red-100 text-red-700 border border-red-200/80";
      default:
        return "bg-gray-100 text-gray-700 border border-gray-200/80";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "delivered":
        return <FiCheckCircle className="text-emerald-600" size={16} />;
      case "pending":
        return <FiClock className="text-amber-600" size={16} />;
      case "failed":
        return <FiXCircle className="text-red-600" size={16} />;
      default:
        return <FiAlertCircle className="text-gray-600" size={16} />;
    }
  };

  const getTypeIcon = (type) => {
    const typeIcons = {
      credentials: <FiMessageSquare className="text-blue-600" size={16} />,
      payment_confirmation: (
        <FiCheckCircle className="text-emerald-600" size={16} />
      ),
      expiry_warning: <FiClock className="text-amber-600" size={16} />,
      payment_failed: <FiXCircle className="text-red-600" size={16} />,
      welcome: <FiUsers className="text-purple-600" size={16} />,
      refund_notification: <FiRefreshCw className="text-blue-600" size={16} />,
      maintenance_alert: <TbBell className="text-orange-600" size={16} />,
      session_expired: <FiAlertCircle className="text-red-600" size={16} />,
    };
    return (
      typeIcons[type] || <FiMessageSquare className="text-gray-600" size={16} />
    );
  };

  const getTypeLabel = (type) => {
    const typeLabels = {
      credentials: "WiFi Credentials",
      payment_confirmation: "Payment Confirmation",
      expiry_warning: "Expiry Warning",
      payment_failed: "Payment Failed",
      welcome: "Welcome Message",
      refund_notification: "Refund Notification",
      maintenance_alert: "Maintenance Alert",
      session_expired: "Session Expired",
    };
    return typeLabels[type] || type;
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        showFilterModal &&
        !event.target.closest(".filter-dropdown-container")
      ) {
        setShowFilterModal(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showFilterModal]);

  return (
    <div className="min-h-screen bg-slate-100">
      {/* Header */}
      <div className="sticky top-0 z-40 backdrop-blur-xl bg-white/80 border-b border-white/20 shadow-lg shadow-blue-500/5">
        <div className="py-2 px-4">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="space-y-1.5">
              <h1 className="text-xl font-lexend leading-tight tracking-tight font-bold text-primary-600">
                SMS Logs
              </h1>
              <p className="text-slate-500 font-lexend text-sm">
                Monitor and manage SMS notifications and delivery status.
              </p>
            </div>
            <div className="flex items-center gap-4">
              <button className="px-4 py-2.5 bg-white/90 backdrop-blur-sm border border-gray-200 rounded-lg text-slate-700 font-medium shadow-lg shadow-blue-500/5 hover:shadow-xl transition-all duration-200 flex items-center gap-2">
                <TbFileExport size={18} />
                <span>Export</span>
              </button>
              <button className="px-4 py-2.5 bg-primary-600 text-white rounded-lg font-medium shadow-lg hover:shadow-primary-400/50 transition-shadow flex items-center gap-2">
                <TbRefresh size={18} />
                <span>Refresh</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 m-6 mb-0">
        <StatCard
          title="Total Sent"
          value={stats.totalSent.toString()}
          change="+12.3%"
          changeType="increase"
          icon={<TbMessage />}
          gradient="from-blue-500 to-blue-600"
        />
        <StatCard
          title="Delivered"
          value={`${stats.delivered} (${stats.deliveryRate}%)`}
          change="+8.7%"
          changeType="increase"
          icon={<FiCheckCircle />}
          gradient="from-emerald-500 to-emerald-600"
        />
        <StatCard
          title="Pending"
          value={stats.pending.toString()}
          change="-15.2%"
          changeType="decrease"
          icon={<FiClock />}
          gradient="from-amber-500 to-amber-600"
        />
        <StatCard
          title="Total Cost"
          value={`Kshs. ${stats.totalCost.toFixed(2)}`}
          change="+18.9%"
          changeType="increase"
          icon={<TbDeviceMobile />}
          gradient="from-purple-500 to-purple-600"
        />
      </div>

      {/* Main Content */}
      <div className="backdrop-blur-xl bg-white/70 rounded-[1.5rem] border border-white/30 shadow-xl shadow-blue-500/5 m-6 p-6">
        {/* Toolbar */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
          <div
            className={`flex items-center gap-6 pl-4 pr-[0.3rem] py-[0.35rem] rounded-lg border ${
              selectedLogs.length > 0
                ? "border-primary-200/50"
                : "border-transparent"
            } flex-shrink-0`}
          >
            {selectedLogs.length > 0 ? (
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2.5">
                  <TbCheck className="text-primary-600 w-4 h-4" />
                  <div className="text-[0.9rem] font-medium text-primary-700 whitespace-nowrap">
                    <span className="font-lexend">{selectedLogs.length} </span>
                    {selectedLogs.length > 1 ? "messages" : "message"} selected
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleBulkAction("retry")}
                    className="px-4 py-1.5 text-xs font-lexend font-medium text-amber-700 bg-amber-200 border border-amber-400 rounded-lg hover:bg-amber-300 hover:text-amber-800 transition-colors flex items-center gap-1 whitespace-nowrap"
                  >
                    <FiRefreshCw size={12} className="mr-1" />
                    Retry Failed
                  </button>
                  <button
                    onClick={() => handleBulkAction("export")}
                    className="px-4 py-1.5 text-xs font-lexend font-medium text-primary-700 bg-primary-200 border border-primary-400 rounded-lg hover:bg-primary-300 hover:text-primary-800 transition-colors flex items-center gap-1 whitespace-nowrap"
                  >
                    <TbFileExport size={12} className="mr-1" />
                    Export
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-3 text-slate-600 min-w-[30rem]">
                <div className="flex items-center gap-2">
                  <span className="text-lg font-lexend font-semibold text-secondary-600 whitespace-nowrap">
                    {sortedLogs.length} Messages
                  </span>
                </div>
                <div className="h-6 border-l border-slate-300/70"></div>
                <p className="text-sm text-slate-500 font-lexend">
                  Monitor SMS delivery and status
                </p>
              </div>
            )}
          </div>

          <div className="flex items-center gap-2.5">
            <div className="relative">
              <TbSearch
                className="absolute top-1/2 left-4 -translate-y-1/2 text-slate-400 z-10"
                size={18}
              />
              <input
                type="text"
                placeholder="Search messages..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-11 pr-4 py-2.5 w-64 bg-white/80 border border-slate-200/90 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all shadow-sm"
              />
            </div>
            <div className="relative filter-dropdown-container">
              <button
                onClick={() => setShowFilterModal(!showFilterModal)}
                className="p-3 bg-white/80 border border-slate-200/90 rounded-lg text-slate-600 hover:bg-slate-100/70 transition-colors shadow-sm"
              >
                {filters.status.length > 0 || filters.type.length > 0 ? (
                  <TbFilterFilled className="text-primary-600" size={20} />
                ) : (
                  <TbFilterFilled size={20} />
                )}
              </button>
              <FilterDropdown
                isOpen={showFilterModal}
                onClose={() => setShowFilterModal(false)}
                onClear={() => setFilters({ status: [], type: [] })}
                filters={filters}
                onToggle={handleFilterToggle}
                availableOptions={availableOptions}
              />
            </div>
          </div>
        </div>

        {/* SMS Logs Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-slate-500">
            <thead className="text-xs text-slate-700 uppercase bg-slate-100/80">
              <tr>
                <th scope="col" className="p-4">
                  <Checkbox
                    id="select-all"
                    onChange={handleSelectAll}
                    checked={
                      selectedLogs.length === sortedLogs.length &&
                      sortedLogs.length > 0
                    }
                  />
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 cursor-pointer"
                  onClick={() => handleSort("recipientName")}
                >
                  Recipient {getSortIcon("recipientName")}
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 cursor-pointer"
                  onClick={() => handleSort("type")}
                >
                  Type {getSortIcon("type")}
                </th>
                <th scope="col" className="px-6 py-3">
                  Message
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 cursor-pointer"
                  onClick={() => handleSort("status")}
                >
                  Status {getSortIcon("status")}
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 cursor-pointer"
                  onClick={() => handleSort("sentAt")}
                >
                  Sent At {getSortIcon("sentAt")}
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 cursor-pointer"
                  onClick={() => handleSort("cost")}
                >
                  Cost {getSortIcon("cost")}
                </th>
                <th scope="col" className="px-6 py-3 text-right">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {sortedLogs.map((log) => (
                <tr
                  key={log.id}
                  className={`bg-white border-b border-slate-200/80 hover:bg-slate-50/70 ${
                    selectedLogs.includes(log.id) ? "bg-primary-50/50" : ""
                  }`}
                >
                  <td className="w-4 p-4">
                    <Checkbox
                      id={`select-${log.id}`}
                      onChange={(checked) => handleSelectLog(log.id, checked)}
                      checked={selectedLogs.includes(log.id)}
                    />
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-primary-100 rounded-lg">
                        <TbDeviceMobile
                          className="text-primary-600"
                          size={16}
                        />
                      </div>
                      <div>
                        <div className="font-semibold text-slate-900">
                          {log.recipientName}
                        </div>
                        <div className="text-xs text-slate-500 font-mono">
                          {log.recipient}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      {getTypeIcon(log.type)}
                      <span className="text-sm font-medium text-slate-700">
                        {getTypeLabel(log.type)}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="max-w-xs">
                      <p className="text-sm text-slate-700 truncate">
                        {log.message}
                      </p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      {getStatusIcon(log.status)}
                      <span
                        className={`px-2.5 py-1 text-xs font-semibold rounded-full ${getStatusChip(
                          log.status
                        )}`}
                      >
                        {log.status.charAt(0).toUpperCase() +
                          log.status.slice(1)}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-medium text-slate-700">
                    {new Date(log.sentAt).toLocaleString()}
                  </td>
                  <td className="px-6 py-4 font-semibold text-slate-800">
                    Kshs. {log.cost.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center gap-1 justify-end">
                      <button
                        onClick={() => handleLogAction("view", log.id)}
                        className="p-2 text-slate-500 hover:text-primary-600 hover:bg-slate-200/70 rounded-full transition-colors"
                        title="View details"
                      >
                        <FiEye size={16} />
                      </button>
                      {log.status === "failed" && (
                        <button
                          onClick={() => handleLogAction("retry", log.id)}
                          className="p-2 text-slate-500 hover:text-amber-600 hover:bg-amber-50 rounded-full transition-colors"
                          title="Retry sending"
                        >
                          <FiRefreshCw size={16} />
                        </button>
                      )}
                      <button
                        className="p-2 text-slate-500 hover:text-slate-700 hover:bg-slate-200/70 rounded-full transition-colors"
                        title="More actions"
                      >
                        <FiMoreVertical size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between pt-4">
          <span className="text-sm text-slate-600">
            Showing {sortedLogs.length} of {smsLogs.length} messages
          </span>
        </div>
      </div>

      {/* SMS Details Modal */}
      <SMSDetailsModal
        isOpen={showSMSModal}
        onClose={() => setShowSMSModal(false)}
        sms={selectedSMS}
      />
    </div>
  );
};

export default SMSLogs;
