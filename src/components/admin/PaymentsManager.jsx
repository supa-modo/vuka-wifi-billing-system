import React, { useEffect, useState } from "react";
import apiService from "../../services/api";
import { Card } from "../ui/Card";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";
import {
  FiDollarSign,
  FiCheckCircle,
  FiClock,
  FiAlertCircle,
  FiTrendingUp,
  FiTrendingDown,
  FiArrowUp,
  FiArrowDown,
  FiSearch,
  FiFilter,
  FiDownload,
  FiRefreshCw,
  FiEye,
  FiMoreVertical,
  FiCalendar,
  FiSmartphone,
  FiCreditCard,
  FiActivity,
} from "react-icons/fi";
import { TbMoneybag, TbPresentationAnalytics } from "react-icons/tb";
import { PiCaretDownDuotone } from "react-icons/pi";

const statusColors = {
  completed: {
    bg: "bg-gradient-to-r from-emerald-50 to-emerald-100",
    text: "text-emerald-700",
    border: "border-emerald-200",
    icon: "text-emerald-600",
    badge: "bg-emerald-100 text-emerald-700",
  },
  pending: {
    bg: "bg-gradient-to-r from-amber-50 to-amber-100",
    text: "text-amber-700",
    border: "border-amber-200",
    icon: "text-amber-600",
    badge: "bg-amber-100 text-amber-700",
  },
  failed: {
    bg: "bg-gradient-to-r from-red-50 to-red-100",
    text: "text-red-700",
    border: "border-red-200",
    icon: "text-red-600",
    badge: "bg-red-100 text-red-700",
  },
  processing: {
    bg: "bg-gradient-to-r from-blue-50 to-blue-100",
    text: "text-blue-700",
    border: "border-blue-200",
    icon: "text-blue-600",
    badge: "bg-blue-100 text-blue-700",
  },
};

const statusIcons = {
  completed: <FiCheckCircle size={16} className="text-emerald-600" />,
  pending: <FiClock size={16} className="text-amber-600" />,
  failed: <FiAlertCircle size={16} className="text-red-600" />,
  processing: <FiActivity size={16} className="text-blue-600" />,
};

const PaymentsManager = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [timeRange, setTimeRange] = useState("all");

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        setLoading(true);
        const response = await apiService.get("/admin/payments");
        if (response.success) {
          setPayments(response.data);
        } else {
          setError("Failed to load payments");
        }
      } catch (err) {
        setError("Failed to connect to server");
      } finally {
        setLoading(false);
      }
    };
    fetchPayments();
  }, []);

  // Enhanced Analytics
  const totalRevenue = payments
    .filter((p) => p.status === "completed")
    .reduce((sum, p) => sum + Number(p.amount), 0);

  const today = new Date().toDateString();
  const todayRevenue = payments
    .filter(
      (p) =>
        p.status === "completed" && new Date(p.paidAt).toDateString() === today
    )
    .reduce((sum, p) => sum + Number(p.amount), 0);

  const thisWeek = new Date();
  thisWeek.setDate(thisWeek.getDate() - 7);
  const weekRevenue = payments
    .filter((p) => p.status === "completed" && new Date(p.paidAt) >= thisWeek)
    .reduce((sum, p) => sum + Number(p.amount), 0);

  const completedCount = payments.filter(
    (p) => p.status === "completed"
  ).length;
  const failedCount = payments.filter((p) => p.status === "failed").length;
  const pendingCount = payments.filter((p) => p.status === "pending").length;
  const processingCount = payments.filter(
    (p) => p.status === "processing"
  ).length;

  // Calculate growth percentages (mock data for now)
  const revenueGrowth = 24.3;
  const completedGrowth = 12.5;
  const failedGrowth = -8.2;
  const pendingGrowth = 5.7;

  // Filtered payments
  const filtered = payments.filter((p) => {
    const matchesSearch =
      p.phoneNumber?.includes(search) ||
      p.paymentPlan?.name?.toLowerCase().includes(search.toLowerCase()) ||
      p.id?.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = status === "all" || p.status === status;
    return matchesSearch && matchesStatus;
  });

  const analyticsData = [
    {
      name: "Total Revenue",
      value: `Kshs. ${totalRevenue.toLocaleString()}`,
      change: `+${revenueGrowth}%`,
      changeType: "increase",
      icon: <TbMoneybag size={24} />,
      gradient: "from-emerald-500 via-emerald-600 to-emerald-700",
      bgColor: "bg-gradient-to-br from-emerald-50 to-emerald-100",
      iconBg: "bg-gradient-to-br from-emerald-500 to-emerald-600",
      period: "vs last month",
    },
    {
      name: "Today's Revenue",
      value: `Kshs. ${todayRevenue.toLocaleString()}`,
      change: `+${Math.round((todayRevenue / (totalRevenue / 30)) * 100)}%`,
      changeType: "increase",
      icon: <FiTrendingUp size={24} />,
      gradient: "from-blue-500 via-blue-600 to-blue-700",
      bgColor: "bg-gradient-to-br from-blue-50 to-blue-100",
      iconBg: "bg-gradient-to-br from-blue-500 to-blue-600",
      period: "vs yesterday",
    },
    {
      name: "Completed Payments",
      value: completedCount.toString(),
      change: `+${completedGrowth}%`,
      changeType: "increase",
      icon: <FiCheckCircle size={24} />,
      gradient: "from-green-500 via-green-600 to-green-700",
      bgColor: "bg-gradient-to-br from-green-50 to-green-100",
      iconBg: "bg-gradient-to-br from-green-500 to-green-600",
      period: "vs last week",
    },
    {
      name: "Failed Payments",
      value: failedCount.toString(),
      change: `${failedGrowth}%`,
      changeType: "decrease",
      icon: <FiAlertCircle size={24} />,
      gradient: "from-red-500 via-red-600 to-red-700",
      bgColor: "bg-gradient-to-br from-red-50 to-red-100",
      iconBg: "bg-gradient-to-br from-red-500 to-red-600",
      period: "vs last week",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-100">
      {/* Header with Glass Effect */}
      <div className="sticky top-0 z-50 backdrop-blur-xl bg-white/80 border-b border-white/20 shadow-lg shadow-blue-500/5">
        <div className="p-4">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="space-y-2">
              <h1 className="text-2xl font-bold text-slate-900">
                Payment Management
              </h1>
              <p className="text-slate-600">
                Monitor and manage all payment transactions across your network
              </p>
              <div className="flex items-center gap-2 text-sm text-slate-500">
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                <span>Last updated: just now</span>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative">
                <select
                  value={timeRange}
                  onChange={(e) => setTimeRange(e.target.value)}
                  className="appearance-none pl-3 pr-8 py-2 bg-white/90 backdrop-blur-sm border border-gray-200 rounded-lg text-slate-700 font-medium shadow-lg shadow-blue-500/5 focus:ring-1 focus:ring-primary-500 focus:border-primary-500 focus:outline-none transition-all duration-200 hover:shadow-xl"
                >
                  <option value="all">All Time</option>
                  <option value="today">Today</option>
                  <option value="week">This Week</option>
                  <option value="month">This Month</option>
                </select>
                <PiCaretDownDuotone
                  className="absolute right-2.5 top-1/3 text-slate-400 pointer-events-none"
                  size={16}
                />
              </div>
              <Button variant="primary" size="sm" className="px-4 py-2.5">
                <FiRefreshCw size={18} className="animate-spin-slow mr-2" />
                <span>Refresh</span>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-8">
        {/* Analytics Cards with Glass Morphism */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {analyticsData.map((stat, index) => (
            <div
              key={index}
              className="group relative overflow-hidden backdrop-blur-xl bg-white/70 rounded-2xl border border-white/30 shadow-xl shadow-blue-500/5 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-300"
            >
              {/* Animated Background Gradient */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-0 group-hover:opacity-[6%] transition-opacity duration-300`}
              ></div>

              <div className="relative p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <div
                      className={`p-3 rounded-xl ${stat.iconBg} text-white shadow-lg`}
                    >
                      {stat.icon}
                    </div>
                    <p className="text-[1.6rem] pl-2 font-lexend font-bold text-gray-600">
                      {stat.value}
                    </p>
                  </div>

                  <div className="text-right">
                    <div
                      className={`flex items-center gap-1 text-[0.8rem] font-lexend font-semibold px-2 py-1 rounded-lg ${
                        stat.changeType === "increase"
                          ? "text-emerald-700 bg-emerald-100"
                          : "text-red-700 bg-red-100"
                      }`}
                    >
                      {stat.changeType === "increase" ? (
                        <FiArrowUp size={14} />
                      ) : (
                        <FiArrowDown size={14} />
                      )}
                      {stat.change}
                    </div>
                    <p className="text-xs text-slate-500 mt-1">{stat.period}</p>
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-600 mb-1">
                    {stat.name}
                  </p>

                  <div className="w-full bg-slate-200 rounded-full h-1">
                    <div
                      className={`h-1 rounded-full bg-gradient-to-r ${stat.gradient} transition-all duration-1000`}
                      style={{ width: "75%" }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Enhanced Filters */}
        <div className="backdrop-blur-xl bg-white/70 rounded-2xl border border-white/20 shadow-xl shadow-blue-500/5 p-6">
          <div className="flex flex-col lg:flex-row items-center gap-4">
            <div className="flex-1 w-full">
              <div className="relative">
                <FiSearch
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400"
                  size={18}
                />
                <Input
                  placeholder="Search by phone, plan, or payment ID..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-10 bg-white/90 backdrop-blur-sm border border-gray-200 rounded-lg focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
                />
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="relative">
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="appearance-none pl-3 pr-8 py-2 bg-white/90 backdrop-blur-sm border border-gray-200 rounded-lg text-slate-700 font-medium shadow-lg shadow-blue-500/5 focus:ring-1 focus:ring-primary-500 focus:border-primary-500 focus:outline-none transition-all duration-200"
                >
                  <option value="all">All Statuses</option>
                  <option value="completed">Completed</option>
                  <option value="pending">Pending</option>
                  <option value="processing">Processing</option>
                  <option value="failed">Failed</option>
                </select>
                <PiCaretDownDuotone
                  className="absolute right-2.5 top-1/3 text-slate-400 pointer-events-none"
                  size={16}
                />
              </div>
              <Button variant="outline" size="sm" className="px-4 py-2">
                <FiDownload size={16} className="mr-2" />
                Export
              </Button>
            </div>
          </div>
        </div>

        {/* Enhanced Payments Table */}
        <div className="backdrop-blur-xl bg-white/70 rounded-2xl border border-white/20 shadow-xl shadow-blue-500/5 overflow-hidden">
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold text-slate-900">
                  Payment Transactions
                </h3>
                <p className="text-slate-600 text-sm mt-1">
                  {filtered.length} payments found
                </p>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1 text-sm text-slate-500">
                  <FiSmartphone size={14} />
                  <span>Mobile Payments</span>
                </div>
                <div className="w-px h-4 bg-gray-300"></div>
                <div className="flex items-center gap-1 text-sm text-slate-500">
                  <FiCreditCard size={14} />
                  <span>Card Payments</span>
                </div>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="bg-gradient-to-r from-slate-50 to-slate-100 border-b border-gray-200">
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                    <div className="flex items-center gap-2">
                      <FiSmartphone size={16} />
                      Phone Number
                    </div>
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                    <div className="flex items-center gap-2">
                      <TbPresentationAnalytics size={16} />
                      Plan
                    </div>
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                    <div className="flex items-center gap-2">
                      <FiDollarSign size={16} />
                      Amount
                    </div>
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                    <div className="flex items-center gap-2">
                      <FiActivity size={16} />
                      Status
                    </div>
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                    <div className="flex items-center gap-2">
                      <FiCalendar size={16} />
                      Date
                    </div>
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {loading && (
                  <tr>
                    <td
                      colSpan={6}
                      className="text-center py-12 text-slate-500 animate-fade-in"
                    >
                      <div className="flex flex-col items-center gap-3">
                        <div className="relative">
                          <div className="w-8 h-8 border-4 border-primary-200 rounded-full animate-spin"></div>
                          <div className="absolute top-0 left-0 w-8 h-8 border-4 border-primary-600 rounded-full animate-spin border-t-transparent"></div>
                        </div>
                        <p className="text-sm font-medium">
                          Loading payments...
                        </p>
                      </div>
                    </td>
                  </tr>
                )}
                {error && !loading && (
                  <tr>
                    <td
                      colSpan={6}
                      className="text-center py-12 text-red-500 animate-fade-in"
                    >
                      <div className="flex flex-col items-center gap-3">
                        <FiAlertCircle size={32} className="text-red-400" />
                        <p className="text-sm font-medium">{error}</p>
                      </div>
                    </td>
                  </tr>
                )}
                {!loading && !error && filtered.length === 0 && (
                  <tr>
                    <td
                      colSpan={6}
                      className="text-center py-12 text-slate-400 animate-fade-in"
                    >
                      <div className="flex flex-col items-center gap-3">
                        <FiDollarSign size={32} className="text-slate-300" />
                        <p className="text-sm font-medium">No payments found</p>
                        <p className="text-xs text-slate-400">
                          Try adjusting your search criteria
                        </p>
                      </div>
                    </td>
                  </tr>
                )}
                {!loading &&
                  !error &&
                  filtered.map((p) => (
                    <tr
                      key={p.id}
                      className="border-b border-gray-100 hover:bg-gradient-to-r hover:from-slate-50 hover:to-slate-100 transition-all duration-200 group"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                            {p.phoneNumber?.slice(-2) || "NA"}
                          </div>
                          <div>
                            <p className="font-mono text-slate-800 font-medium">
                              {p.phoneNumber}
                            </p>
                            <p className="text-xs text-slate-500">
                              Payment ID: {p.id}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-lg flex items-center justify-center text-white text-xs font-bold">
                            {p.paymentPlan?.name?.charAt(0) || "P"}
                          </div>
                          <div>
                            <p className="font-medium text-slate-800">
                              {p.paymentPlan?.name || "Unknown Plan"}
                            </p>
                            <p className="text-xs text-slate-500">
                              {p.paymentPlan?.duration || "N/A"}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 bg-gradient-to-br from-amber-500 to-amber-600 rounded-lg flex items-center justify-center text-white text-xs font-bold">
                            K
                          </div>
                          <div>
                            <p className="font-bold text-slate-800 text-lg">
                              {p.amount}
                            </p>
                            <p className="text-xs text-slate-500">
                              Kenyan Shillings
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div
                          className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border ${
                            statusColors[p.status]?.bg
                          } ${statusColors[p.status]?.border}`}
                        >
                          {statusIcons[p.status]}
                          <span
                            className={`text-sm font-medium capitalize ${
                              statusColors[p.status]?.text
                            }`}
                          >
                            {p.status}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-col">
                          <p className="text-sm font-medium text-slate-800">
                            {new Date(p.createdAt).toLocaleDateString()}
                          </p>
                          <p className="text-xs text-slate-500">
                            {new Date(p.createdAt).toLocaleTimeString()}
                          </p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                          <Button variant="ghost" size="sm" className="p-2">
                            <FiEye size={16} />
                          </Button>
                          <Button variant="ghost" size="sm" className="p-2">
                            <FiMoreVertical size={16} />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentsManager;
