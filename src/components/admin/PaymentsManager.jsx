import React, { useState, useMemo } from "react";
import {
  FiSearch,
  FiArrowUp,
  FiArrowDown,
} from "react-icons/fi";
import { TbFileExport, TbRefresh } from "react-icons/tb";

// Mock Data
const paymentsData = [
  {
    id: "TXN73292N",
    user: "John Doe",
    email: "john.doe@example.com",
    plan: "1 Day Plan",
    amount: 50,
    status: "Completed",
    date: "2023-10-26T10:00:00Z",
    gateway: "M-Pesa",
  },
  {
    id: "TXN73293N",
    user: "Jane Smith",
    email: "jane.smith@example.com",
    plan: "1 Week Plan",
    amount: 300,
    status: "Completed",
    date: "2023-10-26T11:30:00Z",
    gateway: "Card",
  },
  {
    id: "TXN73294N",
    user: "Mike Johnson",
    email: "mike.j@work.com",
    plan: "2 Hours Plan",
    amount: 20,
    status: "Pending",
    date: "2023-10-26T12:15:00Z",
    gateway: "M-Pesa",
  },
  {
    id: "TXN73295N",
    user: "Emily Davis",
    email: "emily.d@university.edu",
    plan: "3 Hours Plan",
    amount: 30,
    status: "Failed",
    date: "2023-10-25T14:00:00Z",
    gateway: "Card",
  },
  // ... add more mock data as needed
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

const PaymentsManager = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({
    key: "date",
    direction: "descending",
  });

  const sortedPayments = useMemo(() => {
    let sortableItems = [...paymentsData];
    if (sortConfig !== null) {
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
  }, [paymentsData, sortConfig]);

  const filteredPayments = sortedPayments.filter(
    (payment) =>
      payment.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const requestSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const getSortIcon = (key) => {
    if (sortConfig.key !== key) return null;
    if (sortConfig.direction === "ascending")
      return <FiArrowUp className="ml-1" />;
    return <FiArrowDown className="ml-1" />;
  };

  const getStatusChip = (status) => {
    switch (status) {
      case "Completed":
        return "bg-emerald-100 text-emerald-700";
      case "Pending":
        return "bg-amber-100 text-amber-700";
      case "Failed":
        return "bg-red-100 text-red-700";
      default:
        return "bg-slate-100 text-slate-700";
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 p-6">
      {/* Header with Glass Effect */}
      <div className="sticky top-0 z-50 backdrop-blur-xl bg-white/80 border-b border-white/20 shadow-lg shadow-blue-500/5">
        <div className="py-2 px-4">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="space-y-1.5">
              <h1 className="text-[1.3rem] font-lexend leading-tight tracking-tight font-bold text-primary-600">
                Payments Manager
              </h1>
              <p className="text-slate-500 font-medium">
                Track and manage all payment transactions and revenue
              </p>
            </div>
            <div className="flex items-center gap-4">
              <button className="px-4 py-2.5 bg-white/90 backdrop-blur-sm border border-gray-200 rounded-lg text-slate-700 font-medium shadow-lg shadow-blue-500/5 hover:shadow-xl transition-all duration-200 flex items-center gap-2">
                <TbFileExport /> Export
              </button>
              <button className="px-4 py-2.5 bg-primary-600 text-white rounded-lg font-medium shadow-lg hover:shadow-primary-400/50 transition-shadow flex items-center gap-2">
                <TbRefresh /> Refresh
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <StatCard
          title="Total Revenue"
          value="Kshs. 45,680"
          change="+15.2%"
          changeType="increase"
          icon={<FiArrowUp />}
          gradient="from-emerald-500 to-emerald-600"
        />
        <StatCard
          title="Transactions"
          value="1,289"
          change="+21.7%"
          changeType="increase"
          icon={<FiArrowUp />}
          gradient="from-blue-500 to-blue-600"
        />
        <StatCard
          title="Pending Payments"
          value="Kshs. 1,200"
          change="-5.4%"
          changeType="decrease"
          icon={<FiArrowDown />}
          gradient="from-amber-500 to-amber-600"
        />
        <StatCard
          title="Failed Payments"
          value="32"
          change="+2.1%"
          changeType="increase"
          icon={<FiArrowUp />}
          gradient="from-red-500 to-red-600"
        />
      </div>

      {/* Main Content */}
      <div className="backdrop-blur-xl bg-white/70 rounded-2xl border border-white/30 shadow-xl shadow-blue-500/5 p-6">
        {/* Toolbar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
          <div className="relative w-full md:w-auto">
            <FiSearch className="absolute top-1/2 left-3 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search by user, email or ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-full md:w-80 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition"
            />
          </div>
          <div className="flex items-center gap-3">
            {/* Filter buttons can be added here */}
          </div>
        </div>

        {/* Payments Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-slate-500">
            <thead className="text-xs text-slate-700 uppercase bg-slate-50">
              <tr>
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
                  User {getSortIcon("user")}
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
                <th scope="col" className="px-6 py-3">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredPayments.map((payment) => (
                <tr
                  key={payment.id}
                  className="bg-white border-b hover:bg-slate-50"
                >
                  <td className="px-6 py-4 font-medium text-slate-900 whitespace-nowrap">
                    {payment.id}
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-semibold">{payment.user}</div>
                    <div className="text-xs text-slate-500">
                      {payment.email}
                    </div>
                  </td>
                  <td className="px-6 py-4">{payment.plan}</td>
                  <td className="px-6 py-4 font-semibold">
                    Kshs. {payment.amount}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusChip(
                        payment.status
                      )}`}
                    >
                      {payment.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {new Date(payment.date).toLocaleString()}
                  </td>
                  <td className="px-6 py-4">
                    <button className="font-medium text-primary-600 hover:underline">
                      Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between pt-4">
          <span className="text-sm text-slate-600">
            Showing 1 to {filteredPayments.length} of {paymentsData.length}{" "}
            results
          </span>
          {/* Pagination component can be added here */}
        </div>
      </div>
    </div>
  );
};

export default PaymentsManager;
