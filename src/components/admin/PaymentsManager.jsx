import React, { useState, useMemo, useEffect } from "react";
import {
  FiArrowUp,
  FiArrowDown,
  FiMoreVertical,
  FiDollarSign,
  FiCheckCircle,
  FiXCircle,
  FiClock,
  FiRefreshCw,
  FiDownload,
  FiEye,
  FiPrinter,
  FiAlertCircle,
} from "react-icons/fi";
import {
  TbFileExport,
  TbRefresh,
  TbFilterFilled,
  TbSearch,
  TbCheck,
  TbCreditCard,
  TbDeviceMobile,
  TbReceipt,
} from "react-icons/tb";
import { FaPaypal } from "react-icons/fa";
import Checkbox from "../ui/Checkbox";
import MpesaIcon from "../ui/MpesaIcon";

// Enhanced Mock Data with more realistic transactions
const paymentsData = [
  {
    id: "TXN7329201",
    user: "John Doe",
    email: "john.doe@example.com",
    phone: "+254712345678",
    plan: "Standard Day",
    planDuration: "24 hours",
    amount: 50,
    deviceCount: 1,
    status: "Completed",
    date: "2023-10-26T10:00:00Z",
    completedAt: "2023-10-26T10:02:15Z",
    gateway: "M-Pesa",
    mpesaCode: "QK12345678",
    transactionFee: 2.5,
    netAmount: 47.5,
    reference: "REF001234",
  },
  {
    id: "TXN7329202",
    user: "Jane Smith",
    email: "jane.smith@example.com",
    phone: "+254798765432",
    plan: "Premium Week",
    planDuration: "7 days",
    amount: 300,
    deviceCount: 3,
    status: "Completed",
    date: "2023-10-26T11:30:00Z",
    completedAt: "2023-10-26T11:32:45Z",
    gateway: "M-Pesa",
    mpesaCode: "QK87654321",
    transactionFee: 15,
    netAmount: 285,
    reference: "REF001235",
  },
  {
    id: "TXN7329203",
    user: "Mike Johnson",
    email: "mike.j@work.com",
    phone: "+254723456789",
    plan: "Basic Hour",
    planDuration: "2 hours",
    amount: 25,
    deviceCount: 2,
    status: "Pending",
    date: "2023-10-26T12:15:00Z",
    completedAt: null,
    gateway: "M-Pesa",
    mpesaCode: null,
    transactionFee: 0,
    netAmount: 0,
    reference: "REF001236",
  },
  {
    id: "TXN7329204",
    user: "Emily Davis",
    email: "emily.d@university.edu",
    phone: "+254734567890",
    plan: "Student Special",
    planDuration: "6 hours",
    amount: 30,
    deviceCount: 1,
    status: "Failed",
    date: "2023-10-25T14:00:00Z",
    completedAt: null,
    gateway: "PayPal",
    mpesaCode: null,
    transactionFee: 0,
    netAmount: 0,
    reference: "REF001237",
    failureReason: "Insufficient balance",
  },
  {
    id: "TXN7329205",
    user: "David Wilson",
    email: "d.wilson@company.com",
    phone: "+254745678901",
    plan: "Premium Week",
    planDuration: "7 days",
    amount: 450,
    deviceCount: 5,
    status: "Completed",
    date: "2023-10-25T09:20:00Z",
    completedAt: "2023-10-25T09:22:10Z",
    gateway: "M-Pesa",
    mpesaCode: "QK11223344",
    transactionFee: 22.5,
    netAmount: 427.5,
    reference: "REF001238",
  },
  {
    id: "TXN7329206",
    user: "Sarah Brown",
    email: "sarah.b@email.com",
    phone: "+254756789012",
    plan: "Standard Day",
    planDuration: "24 hours",
    amount: 80,
    deviceCount: 2,
    status: "Refunded",
    date: "2023-10-24T16:45:00Z",
    completedAt: "2023-10-24T16:47:30Z",
    gateway: "M-Pesa",
    mpesaCode: "QK55667788",
    transactionFee: 4,
    netAmount: 76,
    reference: "REF001239",
    refundReason: "Service downtime",
    refundedAt: "2023-10-25T10:30:00Z",
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
            Filter Payments
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

// Payment Details Modal
const PaymentDetailsModal = ({ isOpen, onClose, payment }) => {
  if (!isOpen || !payment) return null;

  const getGatewayIcon = (gateway) => {
    switch (gateway) {
      case "M-Pesa":
        return <MpesaIcon width={60} height={20} />;
      case "PayPal":
        return <FaPaypal className="text-blue-600" size={20} />;
      default:
        return <TbCreditCard className="text-slate-500" size={20} />;
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-slate-200">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold font-lexend text-slate-800">
              Payment Details
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
            >
              ✕
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Transaction Info */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-slate-600">
                Transaction ID
              </span>
              <span className="font-mono text-sm font-semibold text-slate-800">
                {payment.id}
              </span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-slate-600">Status</span>
              <span
                className={`px-2.5 py-1 text-xs font-semibold rounded-full ${
                  payment.status === "Completed"
                    ? "bg-emerald-100 text-emerald-700"
                    : payment.status === "Pending"
                    ? "bg-amber-100 text-amber-600"
                    : payment.status === "Failed"
                    ? "bg-red-100 text-red-700"
                    : payment.status === "Refunded"
                    ? "bg-blue-100 text-blue-700"
                    : "bg-gray-100 text-gray-700"
                }`}
              >
                {payment.status}
              </span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-slate-600">Amount</span>
              <span className="font-lexend font-bold text-lg text-slate-800">
                Kshs. {payment.amount}
              </span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-slate-600">
                Payment Gateway
              </span>
              <div className="flex items-center gap-2">
                {getGatewayIcon(payment.gateway)}
                <span className="text-sm font-medium text-slate-700">
                  {payment.gateway}
                </span>
              </div>
            </div>

            {payment.mpesaCode && (
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-slate-600">
                  M-Pesa Code
                </span>
                <span className="font-mono text-sm font-semibold text-emerald-700">
                  {payment.mpesaCode}
                </span>
              </div>
            )}
          </div>

          {/* Customer Info */}
          <div className="border-t border-slate-200 pt-6">
            <h3 className="text-lg font-semibold text-slate-800 mb-4">
              Customer Information
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm font-medium text-slate-600">Name</span>
                <span className="text-sm text-slate-800">{payment.user}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm font-medium text-slate-600">
                  Email
                </span>
                <span className="text-sm text-slate-800">{payment.email}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm font-medium text-slate-600">
                  Phone
                </span>
                <span className="text-sm text-slate-800">{payment.phone}</span>
              </div>
            </div>
          </div>

          {/* Plan Info */}
          <div className="border-t border-slate-200 pt-6">
            <h3 className="text-lg font-semibold text-slate-800 mb-4">
              Plan Details
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm font-medium text-slate-600">Plan</span>
                <span className="text-sm text-slate-800">{payment.plan}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm font-medium text-slate-600">
                  Duration
                </span>
                <span className="text-sm text-slate-800">
                  {payment.planDuration}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm font-medium text-slate-600">
                  Devices
                </span>
                <span className="text-sm text-slate-800">
                  {payment.deviceCount} device
                  {payment.deviceCount > 1 ? "s" : ""}
                </span>
              </div>
            </div>
          </div>

          {/* Timestamps */}
          <div className="border-t border-slate-200 pt-6">
            <h3 className="text-lg font-semibold text-slate-800 mb-4">
              Timeline
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm font-medium text-slate-600">
                  Created
                </span>
                <span className="text-sm text-slate-800">
                  {new Date(payment.date).toLocaleString()}
                </span>
              </div>
              {payment.completedAt && (
                <div className="flex justify-between">
                  <span className="text-sm font-medium text-slate-600">
                    Completed
                  </span>
                  <span className="text-sm text-slate-800">
                    {new Date(payment.completedAt).toLocaleString()}
                  </span>
                </div>
              )}
              {payment.refundedAt && (
                <div className="flex justify-between">
                  <span className="text-sm font-medium text-slate-600">
                    Refunded
                  </span>
                  <span className="text-sm text-slate-800">
                    {new Date(payment.refundedAt).toLocaleString()}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Failure/Refund Reason */}
          {(payment.failureReason || payment.refundReason) && (
            <div className="border-t border-slate-200 pt-6">
              <h3 className="text-lg font-semibold text-slate-800 mb-4">
                Additional Information
              </h3>
              {payment.failureReason && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-1">
                    <FiAlertCircle className="text-red-500" size={16} />
                    <span className="text-sm font-medium text-red-700">
                      Failure Reason
                    </span>
                  </div>
                  <p className="text-sm text-red-600">
                    {payment.failureReason}
                  </p>
                </div>
              )}
              {payment.refundReason && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-1">
                    <FiRefreshCw className="text-blue-500" size={16} />
                    <span className="text-sm font-medium text-blue-700">
                      Refund Reason
                    </span>
                  </div>
                  <p className="text-sm text-blue-600">
                    {payment.refundReason}
                  </p>
                </div>
              )}
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
          <button className="flex-1 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium flex items-center justify-center gap-2">
            <FiPrinter size={16} />
            Print Receipt
          </button>
        </div>
      </div>
    </div>
  );
};

const PaymentsManager = () => {
  const [payments, setPayments] = useState(paymentsData);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPayments, setSelectedPayments] = useState([]);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [filters, setFilters] = useState({ status: [], gateway: [] });
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState({
    key: "date",
    direction: "descending",
  });

  const itemsPerPage = 10;
  const availableOptions = useMemo(
    () => ({
      status: [...new Set(payments.map((p) => p.status))],
      gateway: [...new Set(payments.map((p) => p.gateway))],
    }),
    [payments]
  );

  // Calculate stats
  const stats = useMemo(() => {
    const totalRevenue = payments
      .filter((p) => p.status === "Completed")
      .reduce((sum, p) => sum + p.amount, 0);

    const completedCount = payments.filter(
      (p) => p.status === "Completed"
    ).length;
    const pendingAmount = payments
      .filter((p) => p.status === "Pending")
      .reduce((sum, p) => sum + p.amount, 0);
    const failedCount = payments.filter((p) => p.status === "Failed").length;

    return {
      totalRevenue,
      completedCount,
      pendingAmount,
      failedCount,
    };
  }, [payments]);

  const sortedPayments = useMemo(() => {
    let sortableItems = [...payments];
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
  }, [payments, sortConfig]);

  const filteredPayments = sortedPayments.filter((payment) => {
    const matchesSearch =
      payment.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.phone.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      filters.status.length === 0 || filters.status.includes(payment.status);
    const matchesGateway =
      filters.gateway.length === 0 || filters.gateway.includes(payment.gateway);

    return matchesSearch && matchesStatus && matchesGateway;
  });

  const paginatedPayments = filteredPayments.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const requestSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const getSortIcon = (key) => {
    if (sortConfig.key !== key) return "";
    return sortConfig.direction === "ascending" ? "↑" : "↓";
  };

  const getStatusChip = (status) => {
    switch (status) {
      case "Completed":
        return "bg-emerald-100 text-emerald-700 border border-emerald-200/80";
      case "Pending":
        return "bg-amber-100 text-amber-600 border border-amber-200/80";
      case "Failed":
        return "bg-red-100 text-red-700 border border-red-200/80";
      case "Refunded":
        return "bg-blue-100 text-blue-700 border border-blue-200/80";
      default:
        return "bg-gray-100 text-gray-700 border border-gray-200/90";
    }
  };

  const getGatewayIcon = (gateway) => {
    switch (gateway) {
      case "M-Pesa":
        return <MpesaIcon width={40} height={16} />;
      case "PayPal":
        return <FaPaypal className="text-blue-600" size={16} />;
      default:
        return <TbCreditCard className="text-slate-500" size={16} />;
    }
  };

  const handleSelectAll = (checked) => {
    if (checked) {
      setSelectedPayments(paginatedPayments.map((p) => p.id));
    } else {
      setSelectedPayments([]);
    }
  };

  const handleSelectPayment = (paymentId, checked) => {
    if (checked) {
      setSelectedPayments((prev) => [...prev, paymentId]);
    } else {
      setSelectedPayments((prev) => prev.filter((id) => id !== paymentId));
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
    console.log(`Performing ${action} on payments:`, selectedPayments);

    if (action === "complete") {
      setPayments((prev) =>
        prev.map((payment) =>
          selectedPayments.includes(payment.id) && payment.status === "Pending"
            ? {
                ...payment,
                status: "Completed",
                completedAt: new Date().toISOString(),
              }
            : payment
        )
      );
    } else if (action === "refund") {
      setPayments((prev) =>
        prev.map((payment) =>
          selectedPayments.includes(payment.id) &&
          payment.status === "Completed"
            ? {
                ...payment,
                status: "Refunded",
                refundedAt: new Date().toISOString(),
                refundReason: "Admin refund",
              }
            : payment
        )
      );
    }

    setSelectedPayments([]);
  };

  const handlePaymentAction = (action, paymentId) => {
    const payment = payments.find((p) => p.id === paymentId);

    if (action === "view") {
      setSelectedPayment(payment);
      setShowPaymentModal(true);
    } else if (action === "complete" && payment.status === "Pending") {
      setPayments((prev) =>
        prev.map((p) =>
          p.id === paymentId
            ? {
                ...p,
                status: "Completed",
                completedAt: new Date().toISOString(),
              }
            : p
        )
      );
    } else if (action === "refund" && payment.status === "Completed") {
      setPayments((prev) =>
        prev.map((p) =>
          p.id === paymentId
            ? {
                ...p,
                status: "Refunded",
                refundedAt: new Date().toISOString(),
                refundReason: "Admin refund",
              }
            : p
        )
      );
    }
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
                Payments Manager
              </h1>
              <p className="text-slate-500 font-lexend text-sm">
                Track and manage all payment transactions and revenue.
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
          title="Total Revenue"
          value={`Kshs. ${stats.totalRevenue.toLocaleString()}`}
          change="+15.2%"
          changeType="increase"
          icon={<FiDollarSign />}
          gradient="from-emerald-500 to-emerald-600"
        />
        <StatCard
          title="Completed"
          value={stats.completedCount.toString()}
          change="+21.7%"
          changeType="increase"
          icon={<FiCheckCircle />}
          gradient="from-blue-500 to-blue-600"
        />
        <StatCard
          title="Pending"
          value={`Kshs. ${stats.pendingAmount.toLocaleString()}`}
          change="-5.4%"
          changeType="decrease"
          icon={<FiClock />}
          gradient="from-amber-500 to-amber-600"
        />
        <StatCard
          title="Failed"
          value={stats.failedCount.toString()}
          change="+2.1%"
          changeType="increase"
          icon={<FiXCircle />}
          gradient="from-red-500 to-red-600"
        />
      </div>

      {/* Main Content */}
      <div className="backdrop-blur-xl bg-white/70 rounded-[1.5rem] border border-white/30 shadow-xl shadow-blue-500/5 m-6 p-6">
        {/* Toolbar */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
          <div
            className={`flex items-center gap-6 pl-4 pr-[0.3rem] py-[0.35rem] rounded-lg border ${
              selectedPayments.length > 0
                ? "border-primary-200/50"
                : "border-transparent"
            } flex-shrink-0`}
          >
            {selectedPayments.length > 0 ? (
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2.5">
                  <TbCheck className="text-primary-600 w-4 h-4" />
                  <div className="text-[0.9rem] font-medium text-primary-700 whitespace-nowrap">
                    <span className="font-lexend">
                      {selectedPayments.length}{" "}
                    </span>
                    {selectedPayments.length > 1 ? "payments" : "payment"}{" "}
                    selected
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleBulkAction("complete")}
                    className="px-4 py-1.5 text-xs font-lexend font-medium text-emerald-700 bg-emerald-200 border border-emerald-400 rounded-lg hover:bg-emerald-300 hover:text-emerald-800 transition-colors flex items-center gap-1 whitespace-nowrap"
                  >
                    <FiCheckCircle size={12} className="mr-1" />
                    Complete Pending
                  </button>
                  <button
                    onClick={() => handleBulkAction("refund")}
                    className="px-4 py-1.5 text-xs font-lexend font-medium text-blue-700 bg-blue-200 border border-blue-400 rounded-lg hover:bg-blue-300 hover:text-blue-800 transition-colors flex items-center gap-1 whitespace-nowrap"
                  >
                    <FiRefreshCw size={12} className="mr-1" />
                    Refund
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-3 text-slate-600 min-w-[30rem]">
                <div className="flex items-center gap-2">
                  <span className="text-lg font-lexend font-semibold text-secondary-600 whitespace-nowrap">
                    {filteredPayments.length} Payments
                  </span>
                </div>
                <div className="h-6 border-l border-slate-300/70"></div>
                <p className="text-sm text-slate-500 font-lexend">
                  Browse and manage all transactions
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
                placeholder="Search payments..."
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
                {filters.status.length > 0 || filters.gateway.length > 0 ? (
                  <TbFilterFilled className="text-primary-600" size={20} />
                ) : (
                  <TbFilterFilled size={20} />
                )}
              </button>
              <FilterDropdown
                isOpen={showFilterModal}
                onClose={() => setShowFilterModal(false)}
                onClear={() => setFilters({ status: [], gateway: [] })}
                filters={filters}
                onToggle={handleFilterToggle}
                availableOptions={availableOptions}
              />
            </div>
          </div>
        </div>

        {/* Payments Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-slate-500">
            <thead className="text-xs text-slate-700 uppercase bg-slate-100/80">
              <tr>
                <th scope="col" className="p-4">
                  <Checkbox
                    id="select-all"
                    onChange={(e) => handleSelectAll(e.target.checked)}
                    checked={
                      selectedPayments.length === paginatedPayments.length &&
                      paginatedPayments.length > 0
                    }
                  />
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 cursor-pointer"
                  onClick={() => requestSort("id")}
                >
                  Transaction ID {getSortIcon("id")}
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 cursor-pointer"
                  onClick={() => requestSort("user")}
                >
                  Customer {getSortIcon("user")}
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 cursor-pointer"
                  onClick={() => requestSort("plan")}
                >
                  Plan {getSortIcon("plan")}
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 cursor-pointer"
                  onClick={() => requestSort("amount")}
                >
                  Amount {getSortIcon("amount")}
                </th>
                <th scope="col" className="px-6 py-3">
                  Gateway
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 cursor-pointer"
                  onClick={() => requestSort("status")}
                >
                  Status {getSortIcon("status")}
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 cursor-pointer"
                  onClick={() => requestSort("date")}
                >
                  Date {getSortIcon("date")}
                </th>
                <th scope="col" className="px-6 py-3 text-right">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {paginatedPayments.map((payment) => (
                <tr
                  key={payment.id}
                  className={`bg-white border-b border-slate-200/80 hover:bg-slate-50/70 ${
                    selectedPayments.includes(payment.id)
                      ? "bg-primary-50/50"
                      : ""
                  }`}
                >
                  <td className="w-4 p-4">
                    <Checkbox
                      id={`select-${payment.id}`}
                      onChange={(e) =>
                        handleSelectPayment(payment.id, e.target.checked)
                      }
                      checked={selectedPayments.includes(payment.id)}
                    />
                  </td>
                  <td className="px-6 py-4 font-mono text-xs font-medium text-slate-800 whitespace-nowrap">
                    {payment.id}
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-semibold text-slate-900">
                      {payment.user}
                    </div>
                    <div className="text-xs text-slate-500">
                      {payment.phone}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-medium text-slate-700">
                      {payment.plan}
                    </div>
                    <div className="text-xs text-slate-500">
                      {payment.deviceCount} device
                      {payment.deviceCount > 1 ? "s" : ""}
                    </div>
                  </td>
                  <td className="px-6 py-4 font-semibold text-slate-800">
                    Kshs. {payment.amount.toFixed(2)}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      {getGatewayIcon(payment.gateway)}
                      <span className="text-xs font-medium text-slate-600">
                        {payment.gateway}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-2.5 py-1 text-xs font-semibold rounded-full ${getStatusChip(
                        payment.status
                      )}`}
                    >
                      {payment.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-slate-600">
                    {new Date(payment.date).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center gap-1 justify-end">
                      <button
                        onClick={() => handlePaymentAction("view", payment.id)}
                        className="p-2 text-slate-500 hover:text-primary-600 hover:bg-slate-200/70 rounded-full transition-colors"
                        title="View details"
                      >
                        <FiEye size={16} />
                      </button>
                      {payment.status === "Pending" && (
                        <button
                          onClick={() =>
                            handlePaymentAction("complete", payment.id)
                          }
                          className="p-2 text-slate-500 hover:text-emerald-600 hover:bg-emerald-50 rounded-full transition-colors"
                          title="Mark as completed"
                        >
                          <FiCheckCircle size={16} />
                        </button>
                      )}
                      {payment.status === "Completed" && (
                        <button
                          onClick={() =>
                            handlePaymentAction("refund", payment.id)
                          }
                          className="p-2 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
                          title="Process refund"
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
            Showing {paginatedPayments.length} of {filteredPayments.length}{" "}
            payments
          </span>
        </div>
      </div>

      {/* Payment Details Modal */}
      <PaymentDetailsModal
        isOpen={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
        payment={selectedPayment}
      />
    </div>
  );
};

export default PaymentsManager;
