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
  RadialBarChart,
  RadialBar,
} from "recharts";
import {
  FiArrowUp,
  FiArrowDown,
  FiRefreshCw,
  FiChevronRight,
} from "react-icons/fi";
import { RiUserAddLine } from "react-icons/ri";
import { PiCaretDownDuotone, PiUsersDuotone } from "react-icons/pi";
import { Button } from "../ui/Button";
import {
  TbClock,
  TbDeviceMobile,
  TbMessageShare,
  TbMoneybag,
  TbPresentationAnalytics,
  TbRouter,
  TbSettings,
} from "react-icons/tb";
import { FaComputer, FaMobile, FaTablet } from "react-icons/fa6";
import { RouterIcon } from "../ui/Icons";
import { MdLibraryAdd } from "react-icons/md";
import { BsTvFill } from "react-icons/bs";

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

// change device colors to different colors from those of the plans
const deviceData = [
  { name: "Mobile", value: 65, color: "#ff1a1a", icon: FaMobile },
  { name: "Desktop", value: 25, color: "#e855e8", icon: FaComputer },
  { name: "Tablet", value: 10, color: "#00abe9", icon: FaTablet },
  { name: "Other", value: 10, color: "#426f6f", icon: BsTvFill },
];

const planSubscriptionAnalysisData = [
  {
    name: "1 Day Plan",
    users: 780,
    color: "#10B981",
    revenue: 27300,
    percentage: 43.8,
  },
  {
    name: "2 Hours Plan",
    users: 450,
    color: "#3B82F6",
    revenue: 4500,
    percentage: 25.3,
  },
  {
    name: "3 Hours Plan",
    users: 320,
    color: "#8B5CF6",
    revenue: 6400,
    percentage: 18.0,
  },
  {
    name: "1 Week Plan",
    users: 230,
    color: "#F59E0B",
    revenue: 69000,
    percentage: 12.9,
  },
];

const planPerformanceData = [
  {
    name: "1 Day",
    dataUsage: 5.2,
    peakTime: "4 PM - 8 PM",
    color: "#10B981",
  },
  {
    name: "2 Hours",
    dataUsage: 0.8,
    peakTime: "12 PM - 2 PM",
    color: "#3B82F6",
  },
  {
    name: "3 Hours",
    dataUsage: 1.5,
    peakTime: "8 PM - 11 PM",
    color: "#8B5CF6",
  },
  {
    name: "1 Week",
    dataUsage: 25.0,
    peakTime: "All Day",
    color: "#F59E0B",
  },
].sort((a, b) => a.dataUsage - b.dataUsage);

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
        <div className="py-2 px-4">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="space-y-1.5">
              <h1 className="text-[1.3rem] font-lexend leading-tight tracking-tight font-bold text-primary-600">
                Admin Overview Dashboard
              </h1>
              <p className="text-slate-500 fo">
                Real-time insights into your Hotspot network performance
              </p>
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

                  <div className="w-full bg-gray-300/80 rounded-full h-1">
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
              <div className="flex items-center justify-between mb-4">
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
              <div className="h-[22rem]">
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

            {/* Plan Performance Section */}
            <div className="backdrop-blur-xl bg-white/70 rounded-2xl border border-white/30 shadow-xl shadow-blue-500/5 p-6 mt-4">
              {/* Main Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                {/* Device Connections Doughnut Chart */}
                <div className="lg:col-span-2 ">
                  <div className="relative flex flex-col ">
                    <p className="text-sm font-medium text-slate-500/80 mb-2">
                      Devices online on the network & data usage per plan
                    </p>
                    <div className="relative flex items-center">
                      <div className="relative w-full h-[210px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={deviceData}
                              cx="50%"
                              cy="50%"
                              innerRadius="65%"
                              outerRadius="85%"
                              fill="#8884d8"
                              paddingAngle={5}
                              dataKey="value"
                              cornerRadius={10}
                            >
                              {deviceData.map((entry, index) => (
                                <Cell
                                  key={`cell-${index}`}
                                  fill={entry.color}
                                  stroke={entry.color}
                                />
                              ))}
                            </Pie>
                            <Tooltip
                              cursor={{ fill: "transparent" }}
                              contentStyle={{
                                borderRadius: "12px",
                                border: "1px solid rgba(226, 232, 240, 0.8)",
                                backgroundColor: "rgba(255, 255, 255, 0.95)",
                              }}
                              formatter={(value, name) => [
                                `${value} Connections`,
                                name,
                              ]}
                            />
                          </PieChart>
                        </ResponsiveContainer>
                        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                          <p className="text-slate-400 font-lexend font-medium text-[0.8rem]">
                            Active Devices
                          </p>
                          <p className="text-3xl font-bold font-lexend text-secondary-700">
                            {deviceData.reduce(
                              (sum, item) => sum + item.value,
                              0
                            )}
                          </p>
                        </div>
                      </div>
                      <div className="space-y-2.5">
                        {deviceData.map((item) => (
                          <div
                            key={item.name}
                            className="flex items-center justify-between text-sm"
                          >
                            <div className="flex items-center">
                              {/* This should display each device's individual icon */}
                              <item.icon
                                className="mr-3"
                                style={{ color: item.color }}
                                size={16}
                              />
                              <span className="font-semibold text-gray-500/80">
                                {item.name}
                              </span>
                            </div>
                            <span className="font-bold font-lexend pl-3 text-secondary-600/80">
                              {item.value}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Plan Data Usage Bar Chart */}
                <div className="lg:col-span-3 ">
                  {/* <h4 className="font-bold text-secondary-600 mb-6">
                    Plan Data Usage & Peak Times
                  </h4> */}
                  <div className="h-[250px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={planPerformanceData}
                        layout="vertical"
                        margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
                        barCategoryGap="10%"
                      >
                        <CartesianGrid
                          stroke="rgba(203, 213, 225, 0.5)"
                          horizontal={false}
                        />
                        <XAxis
                          type="number"
                          stroke="#94a3b8"
                          fontSize={12}
                          fontFamily="Lexend"
                          tickLine={false}
                          axisLine={false}
                          tickFormatter={(value) => `${value} GB`}
                        />
                        <YAxis
                          dataKey="name"
                          type="category"
                          stroke="#64748B"
                          fontSize={12}
                          fontWeight={500}
                          fontFamily="Lexend"
                          tickLine={false}
                          axisLine={false}
                          width={80}
                          tick={{ transform: "translate(-10, 0)" }}
                        />
                        <Tooltip
                          cursor={{ fill: "rgba(241, 245, 249, 0.6)" }}
                          contentStyle={{
                            borderRadius: "12px",
                            border: "1px solid rgba(226, 232, 240, 0.8)",
                            backgroundColor: "rgba(255, 255, 255, 0.95)",
                            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                          }}
                          formatter={(value, name, props) => [
                            `${value.toFixed(1)} GB`,
                            `Data Usage`,
                          ]}
                          labelFormatter={(label) => (
                            <span className="font-bold text-secondary-600">
                              {label} Plan
                            </span>
                          )}
                          itemStyle={{ color: "#334155" }}
                        />
                        <Bar dataKey="dataUsage" radius={[0, 8, 8, 0]}>
                          {planPerformanceData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
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
                    data={planSubscriptionAnalysisData}
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
                    {planSubscriptionAnalysisData.map((entry, index) => (
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
                    {planSubscriptionAnalysisData.reduce(
                      (sum, plan) => sum + plan.users,
                      0
                    )}
                  </span>
                </div>
              </div>
            </div>

            {/* Plan Details */}
            <div className="grid gap-4 shadow-inner px-5 py-4 rounded-2xl bg-white/80 backdrop-blur-sm border border-gray-200/50 transition-all duration-300">
              {planSubscriptionAnalysisData.map((plan, index) => (
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

        {/* Quick Actions */}
        <div className="backdrop-blur-xl bg-white/70 rounded-2xl border border-white/20 shadow-xl shadow-blue-500/5 p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl font-bold text-secondary-600 mb-1">
                Quick Actions
              </h3>
              <p className="text-slate-600 text-sm">
                Quick links to frequently used management tools
              </p>
            </div>
            <Button variant="outline" size="sm" className="px-4 py-2">
              <FiChevronRight className="mr-1" size={16} />
              View all
            </Button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              {
                label: "Add User",
                icon: RiUserAddLine,
                color: "bg-primary-500",
                bg: "bg-primary-100",
                border: "border-primary-200",
              },
              {
                label: "Create Plan",
                icon: MdLibraryAdd,
                color: "bg-emerald-500",
                bg: "bg-emerald-50",
                border: "border-emerald-200",
              },
              {
                label: "Send SMS",
                icon: TbMessageShare,
                color: "bg-purple-500",
                bg: "bg-purple-50",
                border: "border-purple-200",
              },
              {
                label: "Router Config",
                icon: TbRouter,
                color: "bg-amber-500",
                bg: "bg-amber-100",
                border: "border-amber-200",
              },
              {
                label: "Reports",
                icon: TbPresentationAnalytics,
                color: "bg-pink-500",
                bg: "bg-pink-100",
                border: "border-pink-200",
              },
              {
                label: "Settings",
                icon: TbSettings,
                color: "bg-gray-500",
                bg: "bg-gray-200",
                border: "border-gray-300",
              },
            ].map((action, index) => (
              <button
                key={index}
                className={`group flex flex-col items-center justify-center p-4 rounded-xl ${action.bg} border ${action.border} hover:shadow-lg transition-all duration-200`}
              >
                <div
                  className={`w-12 h-12 ${action.color} rounded-xl flex items-center justify-center text-white mb-3 group-hover:scale-105 transition-transform`}
                >
                  <action.icon size={20} />
                </div>
                <span className="text-sm font-medium text-slate-700 text-center">
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
