import React, { useState, useMemo } from "react";
import {
  FiSearch,
  FiPlus,
  FiMoreVertical,
  FiUserCheck,
  FiUserX,
  FiTrendingUp,
  FiUsers,
  FiArrowUp,
  FiArrowDown,
} from "react-icons/fi";

// Mock Data
const usersData = [
  {
    id: "USR-001",
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "254712345678",
    status: "Active",
    lastLogin: "2023-10-26T10:00:00Z",
    plan: "1 Day Plan",
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
  },
  {
    id: "USR-002",
    name: "Jane Smith",
    email: "jane.smith@example.com",
    phone: "254723456789",
    status: "Active",
    lastLogin: "2023-10-26T11:30:00Z",
    plan: "1 Week Plan",
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
  },
  {
    id: "USR-003",
    name: "Mike Johnson",
    email: "mike.j@work.com",
    phone: "254734567890",
    status: "Inactive",
    lastLogin: "2023-09-15T12:15:00Z",
    plan: "None",
    avatar: "https://i.pravatar.cc/150?u=a04258114e29026702d",
  },
  {
    id: "USR-004",
    name: "Emily Davis",
    email: "emily.d@university.edu",
    phone: "254745678901",
    status: "Banned",
    lastLogin: "2023-10-20T14:00:00Z",
    plan: "3 Hours Plan",
    avatar: "https://i.pravatar.cc/150?u=a048581f4e29026701d",
  },
  // ... add more mock data
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
        <span>{change} this month</span>
      </div>
    </div>
  </div>
);

const UserManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({
    key: "lastLogin",
    direction: "descending",
  });

  const sortedUsers = useMemo(() => {
    let sortableItems = [...usersData];
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
  }, [usersData, sortConfig]);

  const filteredUsers = sortedUsers.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.phone.includes(searchTerm)
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
      case "Active":
        return "bg-emerald-100 text-emerald-700";
      case "Inactive":
        return "bg-slate-100 text-slate-700";
      case "Banned":
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
                User Management
              </h1>
              <p className="text-slate-500 font-medium">
                View, manage, and monitor network users and their accounts
              </p>
            </div>
            <div className="flex items-center gap-4">
              <button className="px-4 py-2.5 bg-white/90 backdrop-blur-sm border border-gray-200 rounded-lg text-slate-700 font-medium shadow-lg shadow-blue-500/5 hover:shadow-xl transition-all duration-200 flex items-center gap-2">
                <FiRefreshCw size={18} className="animate-spin-slow" />
                <span>Refresh</span>
              </button>
              <button className="px-4 py-2.5 bg-primary-600 text-white rounded-lg font-medium shadow-lg hover:shadow-primary-400/50 transition-shadow flex items-center gap-2">
                <FiPlus /> Add New User
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <StatCard
          title="Total Users"
          value="2,847"
          change="+12.5%"
          changeType="increase"
          icon={<FiUsers />}
          gradient="from-primary-500 to-primary-600"
        />
        <StatCard
          title="Active Users"
          value="2,512"
          change="+8.2%"
          changeType="increase"
          icon={<FiUserCheck />}
          gradient="from-emerald-500 to-emerald-600"
        />
        <StatCard
          title="New Users"
          value="128"
          change="+30%"
          changeType="increase"
          icon={<FiTrendingUp />}
          gradient="from-blue-500 to-blue-600"
        />
        <StatCard
          title="Banned Users"
          value="32"
          change="-2"
          changeType="decrease"
          icon={<FiUserX />}
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
              placeholder="Search by name, email or phone..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-full md:w-80 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition"
            />
          </div>
          {/* Filter buttons can be added here */}
        </div>

        {/* Users Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-slate-500">
            <thead className="text-xs text-slate-700 uppercase bg-slate-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 cursor-pointer"
                  onClick={() => requestSort("name")}
                >
                  User
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 cursor-pointer"
                  onClick={() => requestSort("status")}
                >
                  Status
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 cursor-pointer"
                  onClick={() => requestSort("plan")}
                >
                  Current Plan
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 cursor-pointer"
                  onClick={() => requestSort("lastLogin")}
                >
                  Last Login
                </th>
                <th scope="col" className="px-6 py-3 text-right">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr
                  key={user.id}
                  className="bg-white border-b hover:bg-slate-50"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <img
                        className="w-10 h-10 rounded-full"
                        src={user.avatar}
                        alt={`${user.name} avatar`}
                      />
                      <div>
                        <div className="font-semibold text-slate-900">
                          {user.name}
                        </div>
                        <div className="text-xs text-slate-500">
                          {user.email}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusChip(
                        user.status
                      )}`}
                    >
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">{user.plan}</td>
                  <td className="px-6 py-4">
                    {new Date(user.lastLogin).toLocaleString()}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-2 text-slate-500 hover:text-primary-600 hover:bg-slate-200 rounded-full transition-colors">
                      <FiMoreVertical />
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
            Showing 1 to {filteredUsers.length} of {usersData.length} results
          </span>
          {/* Pagination component can be added here */}
        </div>
      </div>
    </div>
  );
};

export default UserManagement;
