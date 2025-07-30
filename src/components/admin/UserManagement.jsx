import React, { useState, useMemo, useEffect } from "react";
import {
  FiPlus,
  FiUserCheck,
  FiUserX,
  FiTrendingUp,
  FiUsers,
  FiArrowUp,
  FiArrowDown,
  FiMoreVertical,
  FiTrash2,
} from "react-icons/fi";
import {
  TbRefresh,
  TbFilterFilled,
  TbSearch,
  TbCheck,
  TbX,
} from "react-icons/tb";
import Checkbox from "../ui/Checkbox";
import { RiUserForbidLine } from "react-icons/ri";

// Mock Data
const usersData = [
  {
    id: "USR-001",
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "254712345678",
    status: "Active",
    lastLogin: "2023-10-26T10:00:00Z",
    createdAt: "2023-10-26T10:00:00Z",
    totalSpent: 4500,
    connection: "Online",
    plan: "1 Day Plan",
    planBandwidth: 10,
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
  },
  {
    id: "USR-002",
    name: "Jane Smith",
    email: "jane.smith@example.com",
    phone: "254723456789",
    status: "Active",
    lastLogin: "2023-10-26T11:30:00Z",
    createdAt: "2023-10-26T10:00:00Z",
    totalSpent: 1000,
    connection: "Online",
    plan: "1 Week Plan",
    planBandwidth: 3,
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
  },
  {
    id: "USR-003",
    name: "Mike Johnson",
    email: "mike.j@work.com",
    phone: "254734567890",
    status: "Inactive",
    lastLogin: "2023-09-15T12:15:00Z",
    createdAt: "2023-10-26T10:00:00Z",
    totalSpent: 350,
    connection: "Offline",
    plan: "None",
    planBandwidth: 0,
    avatar: "https://i.pravatar.cc/150?u=a04258114e29026702d",
  },
  {
    id: "USR-004",
    name: "Emily Davis",
    email: "emily.d@university.edu",
    phone: "254745678901",
    status: "Banned",
    lastLogin: "2023-10-20T14:00:00Z",
    createdAt: "2023-10-26T10:00:00Z",
    totalSpent: 9870,
    connection: "Online",
    plan: "3 Hours Plan",
    planBandwidth: 3,
    avatar: "https://i.pravatar.cc/150?u=a048581f4e29026701d",
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
        <span>{change} this month</span>
      </div>
    </div>
  </div>
);

const FilterDropdown = ({
  isOpen,
  onClose,
  onClear,
  selectedStatuses,
  onStatusToggle,
  availableStatuses,
}) => {
  if (!isOpen) return null;

  return (
    <div className="absolute top-full right-0 mt-2 min-w-[19rem] bg-white rounded-xl shadow-2xl border border-slate-200 z-50">
      <div className="p-3.5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold text-slate-600 font-lexend">
            Filter by Status
          </h3>
          <button
            onClick={onClear}
            className="text-xs font-lexend font-semibold text-primary-600 hover:text-primary-800 transition-colors"
          >
            Clear all
          </button>
        </div>

        <div className="space-y-3">
          <div className="flex flex-wrap gap-2">
            {availableStatuses.map((status) => {
              const isSelected = selectedStatuses.includes(status);
              return (
                <button
                  key={status}
                  onClick={() => onStatusToggle(status)}
                  className={`px-4 py-1.5 font-lexend rounded-full border transition-all duration-200 font-medium text-[0.83rem] text-center flex items-center gap-2 ${
                    isSelected
                      ? "border-primary-400 bg-primary-100 text-primary-700 shadow-sm"
                      : "border-gray-200 hover:border-primary-300 text-slate-700 hover:bg-slate-100"
                  }`}
                >
                  {isSelected && (
                    <TbCheck size={12} className="text-primary-600" />
                  )}
                  <span>{status}</span>
                </button>
              );
            })}
          </div>
        </div>

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

const UserManagement = () => {
  const [users, setUsers] = useState(usersData);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [selectedStatuses, setSelectedStatuses] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState({
    key: "lastLogin",
    direction: "descending",
  });

  const itemsPerPage = 10;
  const availableStatuses = useMemo(() => [
    ...new Set(users.map((user) => user.status)),
  ]);

  const sortedUsers = useMemo(() => {
    let sortableItems = [...users];
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
  }, [users, sortConfig]);

  const filteredUsers = sortedUsers.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.phone.includes(searchTerm);
    const matchesStatus =
      selectedStatuses.length === 0 || selectedStatuses.includes(user.status);
    return matchesSearch && matchesStatus;
  });

  const paginatedUsers = filteredUsers.slice(
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
      case "Active":
        return "bg-green-100 text-green-700 border border-green-400";
      case "Inactive":
        return "bg-slate-100 text-slate-600 border border-slate-300";
      case "Banned":
        return "bg-red-100 text-red-700 border border-red-300";
      default:
        return "bg-gray-100 text-gray-700 border border-gray-300";
    }
  };

  const handleSelectAll = (checked) => {
    if (checked) {
      setSelectedUsers(paginatedUsers.map((user) => user.id));
    } else {
      setSelectedUsers([]);
    }
  };

  const handleSelectUser = (userId, checked) => {
    if (checked) {
      setSelectedUsers((prev) => [...prev, userId]);
    } else {
      setSelectedUsers((prev) => prev.filter((id) => id !== userId));
    }
  };

  const handleStatusToggle = (status) => {
    setSelectedStatuses((prev) =>
      prev.includes(status)
        ? prev.filter((s) => s !== status)
        : [...prev, status]
    );
  };

  const handleBulkAction = (action) => {
    console.log(`Performing ${action} on users:`, selectedUsers);
    // Implement bulk actions here
    setSelectedUsers([]);
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

  const formatDuration = (startTime) => {
    const diff = Date.now() - new Date(startTime).getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    return `${hours}h ${minutes}m`;
  };

  const formatDateTime = (date) => {
    const d = new Date(date);
    const dateStr = d.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
    const timeStr = d.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
    return { date: dateStr, time: timeStr };
  };

  return (
    <div className="min-h-screen bg-slate-100">
      {/* Header */}
      <div className="sticky top-0 z-40 backdrop-blur-xl bg-white/80 border-b border-white/20 shadow-lg shadow-blue-500/5">
        <div className="py-2 px-4">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="space-y-1.5">
              <h1 className="text-xl font-lexend leading-tight tracking-tight font-bold text-primary-600">
                User Management
              </h1>
              <p className="text-slate-500 font-lexend text-sm">
                View, manage, and monitor network users and their accounts.
              </p>
            </div>
            <div className="flex items-center gap-4">
              <button className="px-4 py-2.5 bg-white/90 backdrop-blur-sm border border-gray-200 rounded-lg text-slate-700 font-medium shadow-lg shadow-blue-500/5 hover:shadow-xl transition-all duration-200 flex items-center gap-2">
                <TbRefresh size={18} className="animate-spin-slow" />
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 m-6 mb-0">
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
      <div className="backdrop-blur-xl bg-white/70 rounded-[1.5rem] border border-white/30 shadow-xl shadow-blue-500/5 m-6 p-6">
        {/* Toolbar */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
          <div
            className={`flex items-center gap-6 pl-4 pr-[0.3rem] py-[0.35rem] rounded-lg border ${
              selectedUsers.length > 0
                ? "border-primary-200/50"
                : "border-transparent"
            } flex-shrink-0`}
          >
            {selectedUsers.length > 0 ? (
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2.5">
                  <TbCheck className="text-primary-600 w-4 h-4" />
                  <div className="text-[0.9rem] font-medium text-primary-700 whitespace-nowrap">
                    <span className="font-lexend">{selectedUsers.length} </span>
                    {selectedUsers.length > 1 ? "users" : "user"} selected
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleBulkAction("ban")}
                    className="px-4 py-1.5 text-xs font-lexend font-medium text-amber-700 bg-amber-200 border border-amber-400 rounded-lg hover:bg-amber-300 hover:text-amber-800 transition-colors flex items-center gap-1 whitespace-nowrap"
                  >
                    <RiUserForbidLine size={12} className="mr-1" />
                    Ban
                  </button>
                  <button
                    onClick={() => handleBulkAction("delete")}
                    className="px-4 py-1.5 text-xs font-lexend font-medium text-red-700 bg-red-200 border border-red-300 rounded-lg hover:bg-red-300 hover:text-red-800 transition-colors flex items-center gap-1 whitespace-nowrap"
                  >
                    <FiTrash2 size={12} className="mr-1" />
                    Delete
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-3 text-slate-600 min-w-[30rem]">
                <div className="flex items-center gap-2">
                  <span className="text-lg font-lexend font-semibold text-secondary-600 whitespace-nowrap">
                    {filteredUsers.length} Registered Users
                  </span>
                </div>
                <div className="h-6 border-l border-slate-300/70"></div>
                <p className="text-sm text-slate-500 font-lexend">
                  Manage all users connected to the network
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
                placeholder="Search users..."
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
                {selectedStatuses.length > 0 ? (
                  <TbFilterFilled className="text-primary-600" size={20} />
                ) : (
                  <TbFilterFilled size={20} />
                )}
              </button>
              <FilterDropdown
                isOpen={showFilterModal}
                onClose={() => setShowFilterModal(false)}
                onClear={() => setSelectedStatuses([])}
                selectedStatuses={selectedStatuses}
                onStatusToggle={handleStatusToggle}
                availableStatuses={availableStatuses}
              />
            </div>
          </div>
        </div>

        {/* Users Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-slate-500">
            <thead className="text-xs text-secondary-600 uppercase bg-slate-200/50">
              <tr>
                <th
                  scope="col"
                  className="pl-4 py-3 text-secondary-600 rounded-l-xl"
                >
                  <Checkbox
                    id="select-all"
                    onChange={(e) => handleSelectAll(e.target.checked)}
                    checked={
                      selectedUsers.length === paginatedUsers.length &&
                      paginatedUsers.length > 0
                    }
                  />
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-secondary-600 cursor-pointer hover:text-primary-600 transition-colors"
                  onClick={() => requestSort("name")}
                >
                  Registered User {getSortIcon("name")}
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-secondary-600 cursor-pointer hover:text-primary-600 transition-colors"
                  onClick={() => requestSort("connection")}
                >
                  Connection {getSortIcon("connection")}
                </th>

                <th
                  scope="col"
                  className="px-6 py-3 text-secondary-600 cursor-pointer hover:text-primary-600 transition-colors"
                  onClick={() => requestSort("plan")}
                >
                  Current Plan {getSortIcon("plan")}
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-secondary-600 cursor-pointer hover:text-primary-600 transition-colors"
                  onClick={() => requestSort("createdAt")}
                >
                  Registered On {getSortIcon("createdAt")}
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-secondary-600 cursor-pointer hover:text-primary-600 transition-colors"
                  onClick={() => requestSort("lastLogin")}
                >
                  Last Login {getSortIcon("lastLogin")}
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-secondary-600 cursor-pointer hover:text-primary-600 transition-colors"
                  onClick={() => requestSort("status")}
                >
                  Status {getSortIcon("status")}
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-secondary-600 cursor-pointer hover:text-primary-600 transition-colors"
                  onClick={() => requestSort("totalSpent")}
                >
                  Total Spent {getSortIcon("totalSpent")}
                </th>
                <th
                  scope="col"
                  className="pr-6 py-3 text-center text-secondary-600 rounded-r-xl"
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {paginatedUsers.map((user) => {
                const { date, time } = formatDateTime(user.createdAt);
                const { date: lastLoginDate, time: lastLoginTime } =
                  formatDateTime(user.lastLogin);
                return (
                  <tr
                    key={user.id}
                    className={`bg-white border-b border-slate-200/80 hover:bg-slate-50/70 ${
                      selectedUsers.includes(user.id) ? "bg-primary-50/50" : ""
                    }`}
                  >
                    <td className="w-4 p-4">
                      <Checkbox
                        id={`select-${user.id}`}
                        onChange={(e) =>
                          handleSelectUser(user.id, e.target.checked)
                        }
                        checked={selectedUsers.includes(user.id)}
                      />
                    </td>
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
                          <div className="font-semibold tracking-wide text-sm text-gray-500/80">
                            +{user.phone}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-medium text-slate-700">
                      {user.connection}
                    </td>

                    <td className="px-6 py-4 font-lexend tracking-tight font-medium text-slate-700">
                      {user.plan}
                      <div className="text-xs  font-medium text-slate-500/80">
                        {user.planBandwidth} Mbps
                      </div>
                    </td>
                    <td className="px-6 py-4 font-lexend">
                      <div className="space-y-1">
                        <div className="text-sm font-semibold tracking-tight text-gray-600">
                          {date}
                        </div>
                        <div className="text-xs font-medium text-slate-500/80 leading-2.5">
                          {time}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-lexend text-slate-600">
                      <div className="space-y-1">
                        <div className="text-sm font-semibold tracking-tight text-gray-600">
                          {lastLoginDate}
                        </div>
                        <div className="text-xs font-medium text-slate-500/80 leading-2.5">
                          {lastLoginTime}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-2.5 py-1 text-xs font-semibold rounded-full ${getStatusChip(
                          user.status
                        )}`}
                      >
                        {user.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-medium text-slate-700">
                      {user.totalSpent}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="p-2 text-slate-500 hover:text-primary-600 hover:bg-slate-200/70 rounded-full transition-colors">
                        <FiMoreVertical />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between pt-4">
          <span className="text-sm text-slate-600">
            Showing 1 to {paginatedUsers.length} of {filteredUsers.length}{" "}
            results
          </span>
          {/* Pagination component can be added here */}
        </div>
      </div>
    </div>
  );
};

export default UserManagement;
