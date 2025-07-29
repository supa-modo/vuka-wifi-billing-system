import React, { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
} from "recharts";
import {
  FiUsers,
  FiDollarSign,
  FiWifi,
  FiClock,
  FiActivity,
  FiTrendingUp,
  FiTrendingDown,
  FiArrowUp,
  FiArrowDown,
  FiEye,
  FiDownload,
  FiRefreshCw,
  FiZap,
  FiShield,
  FiCheckCircle,
  FiAlertCircle,
  FiMoreVertical,
  FiChevronRight,
  FiStar,
  FiMonitor,
  FiSmartphone,
  FiTablet,
  FiPieChart,
} from "react-icons/fi";
import { RiUserAddLine } from "react-icons/ri";
import {
  PiCaretDownDuotone,
  PiUsersDuotone,
  PiUsersThreeDuotone,
} from "react-icons/pi";
import { Button } from "../ui/Button";
import {
  TbCash,
  TbClock,
  TbMessageShare,
  TbMoneybag,
  TbPresentationAnalytics,
  TbRouter,
  TbSettings,
} from "react-icons/tb";
import { RouterIcon } from "../ui/Icons";
import { MdLibraryAdd } from "react-icons/md";

// mock data with more realistic metrics
const statsData = [
  {
    name: "Total Users",
    value: "2,847",
    change: "+12.5%",
    changeType: "increase",
    icon: <PiUsersDuotone size={24} />,
    gradient: "from-primary-500 via-primary-600 to-primary-700",
    bgColor: "bg-gradient-to-br from-primary-100 to-primary-200",
    iconBg: "bg-gradient-to-br from-primary-500 to-primary-600",
    period: "vs last month",
  },
  {
    name: "Revenue",
    value: "Kshs. 45,230",
    change: "+24.3%",
    changeType: "increase",
    icon: <TbMoneybag size={24} />,
    gradient: "from-emerald-500 via-emerald-600 to-emerald-700",
    bgColor: "bg-gradient-to-br from-emerald-50 to-emerald-100",
    iconBg: "bg-gradient-to-br from-emerald-500 to-emerald-600",
    period: "vs last month",
  },
  {
    name: "Active Sessions",
    value: "156",
    change: "-3.2%",
    changeType: "decrease",
    icon: <RouterIcon size={24} />,
    gradient: "from-purple-500 via-purple-600 to-purple-700",
    bgColor: "bg-gradient-to-br from-purple-50 to-purple-100",
    iconBg: "bg-gradient-to-br from-purple-500 to-purple-600",
    period: "vs last week",
  },
  {
    name: "Avg. Session",
    value: "3h 24m",
    change: "+8.7%",
    changeType: "increase",
    icon: <TbClock size={24} />,
    gradient: "from-amber-500 via-amber-600 to-amber-700",
    bgColor: "bg-gradient-to-br from-amber-50 to-amber-100",
    iconBg: "bg-gradient-to-br from-amber-500 to-amber-600",
    period: "vs last week",
  },
];

const revenueData = [
  { name: "Mon", revenue: 4200, users: 180, sessions: 120 },
  { name: "Tue", revenue: 3800, users: 165, sessions: 135 },
  { name: "Wed", revenue: 5200, users: 210, sessions: 145 },
  { name: "Thu", revenue: 4800, users: 195, sessions: 155 },
  { name: "Fri", revenue: 6100, users: 240, sessions: 170 },
  { name: "Sat", revenue: 7200, users: 280, sessions: 185 },
  { name: "Sun", revenue: 6800, users: 260, sessions: 175 },
];

const deviceData = [
  { name: "Mobile", value: 65, color: "#3B82F6", icon: <FiSmartphone /> },
  { name: "Desktop", value: 25, color: "#8B5CF6", icon: <FiMonitor /> },
  { name: "Tablet", value: 10, color: "#F59E0B", icon: <FiTablet /> },
];

const planSubscriptionData = [
  {
    name: "2 Hours Plan",
    value: 450,
    users: 450,
    color: "#3B82F6",
    revenue: 4500,
    price: "Kshs. 10",
    icon: "⏰",
    description: "Quick browsing sessions",
    percentage: 25.3,
  },
  {
    name: "3 Hours Plan",
    value: 320,
    users: 320,
    color: "#8B5CF6",
    revenue: 6400,
    price: "Kshs. 20",
    icon: "📱",
    description: "Extended browsing",
    percentage: 18.0,
  },
  {
    name: "1 Day Plan",
    value: 780,
    users: 780,
    color: "#10B981",
    revenue: 27300,
    price: "Kshs. 35",
    icon: "🌅",
    description: "Most popular choice",
    percentage: 43.8,
  },
  {
    name: "1 Week Plan",
    value: 230,
    users: 230,
    color: "#F59E0B",
    revenue: 69000,
    price: "Kshs. 300",
    icon: "📅",
    description: "Premium long-term",
    percentage: 12.9,
  },
];

const recentActivity = [
  {
    id: 1,
    type: "payment",
    title: "Payment received",
    description: "Kshs. 35 for 1 Day plan",
    time: "2 minutes ago",
    status: "success",
    amount: "+35",
    user: "254712345678",
  },
  {
    id: 2,
    type: "user",
    title: "New user registered",
    description: "254712345678 joined",
    time: "5 minutes ago",
    status: "info",
    user: "254712345678",
  },
  {
    id: 3,
    type: "session",
    title: "Session started",
    description: "User 254723456789 connected",
    time: "8 minutes ago",
    status: "success",
    user: "254723456789",
  },
  {
    id: 4,
    type: "alert",
    title: "Low bandwidth alert",
    description: "Router 1 experiencing high load",
    time: "12 minutes ago",
    status: "warning",
    severity: "medium",
  },
  {
    id: 5,
    type: "payment",
    title: "Payment failed",
    description: "Kshs. 300 for 1 Week plan",
    time: "15 minutes ago",
    status: "error",
    amount: "-300",
    user: "254734567890",
  },
];

const quickStats = [
  {
    title: "Today's Revenue",
    value: "Kshs. 8,450",
    change: "+15.2%",
    changeType: "increase",
    icon: <FiTrendingUp className="text-emerald-500" size={20} />,
    bgColor: "bg-gradient-to-r from-emerald-50 to-emerald-100",
  },
  {
    title: "Active Users",
    value: "156",
    change: "+8.4%",
    changeType: "increase",
    icon: <PiUsersThreeDuotone className="text-blue-500" size={20} />,
    bgColor: "bg-gradient-to-r from-blue-50 to-blue-100",
  },
  {
    title: "System Health",
    value: "98.5%",
    change: "+0.3%",
    changeType: "increase",
    icon: <FiShield className="text-emerald-500" size={20} />,
    bgColor: "bg-gradient-to-r from-emerald-50 to-emerald-100",
  },
];

// Custom label function for pie chart
const renderCustomLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
}) => {
  const RADIAN = Math.PI / 180;
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return percent > 0.05 ? (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
      fontSize="12"
      fontWeight="600"
    >
      {`${(percent * 100).toFixed(1)}%`}
    </text>
  ) : null;
};

export const AdminDashboard = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [timeRange, setTimeRange] = useState("7d");

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const getStatusIcon = (status) => {
    switch (status) {
      case "success":
        return <FiCheckCircle className="text-emerald-500" size={18} />;
      case "warning":
        return <FiAlertCircle className="text-amber-500" size={18} />;
      case "error":
        return <FiAlertCircle className="text-red-500" size={18} />;
      default:
        return <FiActivity className="text-blue-500" size={18} />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "success":
        return "bg-gradient-to-r from-emerald-50 to-emerald-100 border-emerald-200";
      case "warning":
        return "bg-gradient-to-r from-amber-50 to-amber-100 border-amber-200";
      case "error":
        return "bg-gradient-to-r from-red-50 to-red-100 border-red-200";
      default:
        return "bg-gradient-to-r from-blue-50 to-blue-100 border-blue-200";
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="flex flex-col items-center justify-center text-center">
          <div className="relative">
            <div className="w-8 lg:w-10 h-8 lg:h-10 border-4 border-primary-200 rounded-full animate-spin"></div>
            <div className="absolute top-0 left-0 w-8 lg:w-10 h-8 lg:h-10 border-4 border-primary-600 rounded-full animate-spin border-t-transparent"></div>
          </div>
          <p className="mt-4 text-sm md:text-base font-medium text-slate-500">
            Loading Dashboard...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100">
      {/* Header with Glass Effect */}
      <div className="sticky top-0 z-50 backdrop-blur-xl bg-white/80 border-b border-white/20 shadow-lg shadow-blue-500/5">
        <div className="p-4">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="space-y-2">
              <h1>Overview Dashboard</h1>
              <p className="text-slate-600 text-lg">
                Real-time insights into your Hotspot network performance
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
                  <option value="24h">Last 24 Hours</option>
                  <option value="7d">Last 7 Days</option>
                  <option value="30d">Last 30 Days</option>
                  <option value="90d">Last 90 Days</option>
                </select>
                <PiCaretDownDuotone
                  className="absolute right-2.5 top-1/3 text-slate-400 pointer-events-none"
                  size={16}
                />
              </div>
              <Button variant="primary" size="sm" className="px-4 py-2.5">
                <FiRefreshCw size={18} className="animate-spin-slow mr-2" />
                <span>Refresh Data</span>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-8">
        {/* Stats Cards with Glass Morphism */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {statsData.map((stat, index) => (
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

        {/* Charts Section */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          <div className="xl:col-span-2">
            {/* Main Revenue Chart */}
            <div className=" backdrop-blur-xl bg-white/70 rounded-2xl border border-white/20 shadow-xl shadow-blue-500/5 p-6">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h3 className="text-xl font-bold text-secondary-600 mb-1">
                    Performance Analytics
                  </h3>
                  <p className="text-slate-600">
                    Comprehensive overview of revenue, users, and active
                    sessions
                  </p>
                </div>
                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-600 rounded-full"></div>
                    <span className="text-sm font-medium text-slate-600">
                      Revenue
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-primary-500 rounded-full"></div>
                    <span className="text-sm font-medium text-slate-600">
                      Users
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                    <span className="text-sm font-medium text-slate-600">
                      Sessions
                    </span>
                  </div>
                </div>
              </div>
              <div className="h-96">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={revenueData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <defs>
                      <linearGradient
                        id="revenueGradient"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="5%"
                          stopColor="#10B981"
                          stopOpacity={0.4}
                        />
                        <stop
                          offset="95%"
                          stopColor="#10B981"
                          stopOpacity={0.05}
                        />
                      </linearGradient>
                      <linearGradient
                        id="usersGradient"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="5%"
                          stopColor="#3B82F6"
                          stopOpacity={0.4}
                        />
                        <stop
                          offset="95%"
                          stopColor="#3B82F6"
                          stopOpacity={0.05}
                        />
                      </linearGradient>
                      <linearGradient
                        id="sessionsGradient"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="5%"
                          stopColor="#8B5CF6"
                          stopOpacity={0.4}
                        />
                        <stop
                          offset="95%"
                          stopColor="#8B5CF6"
                          stopOpacity={0.05}
                        />
                      </linearGradient>
                    </defs>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      vertical={false}
                      stroke="#E2E8F0"
                      opacity={0.6}
                    />
                    <XAxis
                      dataKey="name"
                      axisLine={false}
                      tickLine={false}
                      tick={{
                        fill: "#64748B",
                        fontSize: 12,
                        fontWeight: 500,
                        fontFamily: "Lexend",
                      }}
                    />
                    <YAxis
                      axisLine={false}
                      tickLine={false}
                      tick={{
                        fill: "#64748B",
                        fontSize: 12,
                        fontWeight: 600,
                        fontFamily: "Lexend",
                      }}
                    />
                    <Tooltip
                      contentStyle={{
                        fontSize: "13px",
                        fontWeight: "500",
                        fontFamily: "Lexend",
                        backgroundColor: "rgba(255, 255, 255, 0.95)",
                        backdropFilter: "blur(10px)",
                        border: "1px solid rgba(226, 232, 240, 0.8)",
                        borderRadius: "12px",
                        boxShadow:
                          "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="revenue"
                      stroke="#10B981"
                      strokeWidth={3}
                      fill="url(#revenueGradient)"
                      name="Revenue (Kshs)"
                    />
                    <Area
                      type="monotone"
                      dataKey="users"
                      stroke="#3B82F6"
                      strokeWidth={3}
                      fill="url(#usersGradient)"
                      name="Users"
                    />
                    <Area
                      type="monotone"
                      dataKey="sessions"
                      stroke="#8B5CF6"
                      strokeWidth={3}
                      fill="url(#sessionsGradient)"
                      name="Sessions"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Elegant Plan Performance Summary */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm mt-4 p-6">
              <div className="text-center">
                <div>
                  <h3 className="text-xl font-bold text-primary-600 mb-1">
                    Plan Perfomance content will be displayed here
                  </h3>
                  <p className=" my-10 text-secondary-400 text-base">
                    //TODO: to be implemented later
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="backdrop-blur-xl bg-white/70 rounded-2xl border border-white/20 shadow-xl shadow-blue-500/5 p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold text-secondary-600 mb-2">
                  Plan Subscription Analysis
                </h3>
                <p className="text-slate-600">
                  User distribution across different subscription plans
                </p>
              </div>
            </div>

            {/* Pie Chart */}
            <div className="relative h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={planSubscriptionData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={renderCustomLabel}
                    outerRadius={120}
                    innerRadius={40}
                    fill="#8884d8"
                    dataKey="users"
                    paddingAngle={4}
                  >
                    {planSubscriptionData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={entry.color}
                        stroke="rgba(255,255,255,0.8)"
                        strokeWidth={3}
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "rgba(255, 255, 255, 0.95)",
                      backdropFilter: "blur(10px)",
                      border: "1px solid rgba(226, 232, 240, 0.8)",
                      borderRadius: "12px",
                      boxShadow:
                        "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                    }}
                    formatter={(value, name) => [`${value} users`, name]}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute bottom-8 right-6 flex items-center justify-center">
                <div className="text-[0.8rem] font-sans text-slate-500">
                  Total Users:
                  <span className="ml-2 font-bold font-lexend text-secondary-600">
                    {planSubscriptionData.reduce(
                      (sum, plan) => sum + plan.users,
                      0
                    )}
                  </span>
                </div>
              </div>
            </div>

            {/* Plan Details */}
            <div className="grid gap-4 shadow-inner px-5 py-4 rounded-2xl bg-white/80 backdrop-blur-sm border border-gray-200/50 transition-all duration-300">
              {planSubscriptionData.map((plan, index) => (
                <div key={index} className="relative overflow-hidden ">
                  {/* Glow effect */}
                  <div
                    className="absolute -inset-1 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                      background: `radial-gradient(300px circle at center, ${plan.color}25, transparent 70%)`,
                    }}
                  ></div>

                  <div className="relative z-10">
                    {/* Plan header */}
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 className="text-sm md:text-[0.95rem] font-semibold text-slate-500">
                          {plan.name}
                        </h4>
                        <div className="">
                          <p
                            className="text-[0.83rem] font-lexend font-bold"
                            style={{ color: plan.color }}
                          >
                            {plan.percentage}%
                          </p>
                        </div>
                      </div>

                      <div className="text-right">
                        <p className="text-[0.8rem] text-slate-500">
                          <span className=" text-sm font-semibold ">
                            Kshs.{" "}
                            <span className="text-[1.1rem] font-bold font-lexend ">
                              {plan.revenue.toLocaleString()}
                            </span>
                          </span>
                        </p>
                        <div className="flex items-center gap-2">
                          <span
                            className="px-2 py-0.5 text-xs font-lexend font-medium rounded-md"
                            style={{
                              backgroundColor: `${plan.color}20`,
                              color: plan.color,
                            }}
                          >
                            {plan.users}{" "}
                            <span className="text-xs font-normal font-sans text-slate-500">
                              users subscribed
                            </span>
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Progress bar with label */}
                    <div className="mt-1">
                      <div className="relative w-full h-2.5 rounded-full bg-slate-200 overflow-hidden">
                        <div
                          className="absolute top-0 left-0 h-full rounded-full transition-all duration-1000"
                          style={{
                            width: `${plan.percentage}%`,
                            backgroundColor: plan.color,
                            boxShadow: `0 2px 8px ${plan.color}80`,
                          }}
                        >
                          <div
                            className="absolute right-0 top-1/2 w-1 h-3 -mt-1.5 rounded-full bg-white"
                            style={{ boxShadow: `0 0 4px ${plan.color}` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions - Redesigned */}
        <div className="backdrop-blur-xl bg-white/70 rounded-2xl border border-white/20 shadow-xl shadow-blue-500/5 p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl font-bold text-slate-900 mb-1">
                Quick Actions
              </h3>
              <p className="text-slate-600 text-sm">
                Frequently used management tools
              </p>
            </div>
            <Button variant="ghost" size="sm" className="text-primary-600">
              View all <FiChevronRight className="ml-1" size={16} />
            </Button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {[
              {
                label: "Add User",
                icon: RiUserAddLine,
                color: "text-blue-600",
                bg: "bg-blue-50",
              },
              {
                label: "Create Plan",
                icon: MdLibraryAdd,
                color: "text-emerald-600",
                bg: "bg-emerald-50",
              },
              {
                label: "Send SMS",
                icon: TbMessageShare,
                color: "text-purple-600",
                bg: "bg-purple-50",
              },
              {
                label: "Router Config",
                icon: TbRouter,
                color: "text-amber-600",
                bg: "bg-amber-50",
              },
              {
                label: "Reports",
                icon: TbPresentationAnalytics,
                color: "text-indigo-600",
                bg: "bg-indigo-50",
              },
              {
                label: "Settings",
                icon: TbSettings,
                color: "text-slate-600",
                bg: "bg-slate-50",
              },
            ].map((action, index) => (
              <button
                key={index}
                className={`group flex flex-col items-center justify-center p-4 rounded-xl ${action.bg} border border-transparent hover:border-slate-200 transition-all duration-200 hover:shadow-sm`}
              >
                <div
                  className={`p-3 rounded-lg ${action.bg} mb-2 group-hover:scale-105 transition-transform`}
                >
                  <action.icon className={`${action.color} text-xl`} />
                </div>
                <span className="text-xs font-medium text-slate-700">
                  {action.label}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
