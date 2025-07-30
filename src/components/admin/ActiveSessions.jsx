import React, { useState, useMemo, useEffect } from "react";
import {
  FaMobileAlt,
  FaTabletAlt,
  FaPowerOff,
  FaBan,
  FaCheck,
  FaSearch,
} from "react-icons/fa";
import { FaFilter } from "react-icons/fa6";
import {
  TbCheck,
  TbFilterFilled,
  TbFilterPlus,
  TbRefresh,
  TbSearch,
  TbX,
} from "react-icons/tb";
import { FaComputer, FaTv } from "react-icons/fa6";
import Checkbox from "../ui/Checkbox";
import { PiCaretDownDuotone } from "react-icons/pi";
import { RiSearchLine } from "react-icons/ri";
import { FiFilter } from "react-icons/fi";

// Mock Data
const initialSessions = [
  {
    id: "SESS-001",
    user: "John Doe",
    phone: "+2548134567890",
    ipAddress: "192.168.1.101",
    macAddress: "00:1B:44:11:3A:B7",
    deviceType: "Laptop",
    dataUsage: 1250, // in MB
    bandwidth: 2, // in Mbps
    sessionStart: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    sessionEnd: new Date(Date.now() + 2 * 60 * 60 * 1000), // 2 hours from session start
    plan: "1 Day Plan",
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
  },
  {
    id: "SESS-002",
    user: "Jane Smith",
    phone: "+254712345678",
    ipAddress: "192.168.1.102",
    macAddress: "A4:B1:C2:D3:E4:F5",
    deviceType: "Mobile",
    dataUsage: 340, // in MB
    bandwidth: 10, // in Mbps
    sessionStart: new Date(Date.now() - 45 * 60 * 1000), // 45 minutes ago
    sessionEnd: new Date(Date.now() + 45 * 60 * 1000), // 45 minutes from now
    plan: "1 Week Plan",
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
  },
  {
    id: "SESS-003",
    user: "Emily Davis",
    phone: "+254712345678",
    ipAddress: "192.168.1.103",
    macAddress: "F8:E7:D6:C5:B4:A3",
    deviceType: "Tablet",
    dataUsage: 812, // in MB
    bandwidth: 2, // in Mbps
    sessionStart: new Date(Date.now() - 5 * 60 * 60 * 1000), // 5 hours ago
    sessionEnd: new Date(Date.now() + 5 * 60 * 60 * 1000), // 5 hours from now
    plan: "3 Hours Plan",
    avatar: "https://i.pravatar.cc/150?u=a048581f4e29026701d",
  },
  {
    id: "SESS-004",
    user: "John Doe",
    phone: "+254712345678",
    ipAddress: "192.168.1.101",
    macAddress: "00:1B:44:11:3A:B7",
    deviceType: "TV",
    dataUsage: 812, // in MB
    bandwidth: 2, // in Mbps
    sessionStart: new Date(Date.now() - 5 * 60 * 60 * 1000), // 5 hours ago
    sessionEnd: new Date(Date.now() + 5 * 60 * 60 * 1000), // 5 hours from now
    plan: "3 Hours Plan",
    avatar: "https://i.pravatar.cc/150?u=a048581f4e29926701d",
  },
];

const getDeviceIcon = (deviceType) => {
  switch (deviceType) {
    case "Laptop":
      return <FaComputer size={22} />;
    case "Mobile":
      return <FaMobileAlt size={20} />;
    case "Tablet":
      return <FaTabletAlt size={19} />;
    default:
      return <FaTv size={20} />;
  }
};

const formatDataUsage = (mb) => {
  if (mb < 1024) return `${mb.toFixed(2)} MB`;
  return `${(mb / 1024).toFixed(2)} GB`;
};

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

const FilterDropdown = ({
  isOpen,
  onClose,
  onClear, // Add this new prop
  selectedPlans,
  onPlanToggle,
  availablePlans,
}) => {
  if (!isOpen) return null;

  return (
    <div className="absolute top-full left-0 mt-2 min-w-[19rem] bg-white rounded-xl shadow-2xl border border-slate-200 z-50">
      <div className="p-3.5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold text-slate-600 font-lexend">
            Filter by Plan
          </h3>
          <button
            onClick={onClear} // Use the new onClear prop
            className="text-xs font-lexend font-semibold text-primary-600 hover:text-primary-800 transition-colors"
          >
            Clear all
          </button>
        </div>

        <div className="space-y-3">
          <div className="flex flex-wrap gap-2">
            {availablePlans.map((plan) => {
              const isSelected = selectedPlans.includes(plan);
              return (
                <button
                  key={plan}
                  onClick={() => onPlanToggle(plan)}
                  className={`px-4 py-1.5 font-lexend rounded-full border transition-all duration-200 font-medium text-[0.83rem] text-center flex items-center gap-2 ${
                    isSelected
                      ? "border-primary-400 bg-primary-100 text-primary-700 shadow-sm"
                      : "border-gray-200 hover:border-primary-300 text-slate-700 hover:bg-slate-100"
                  }`}
                >
                  {isSelected && (
                    <FaCheck size={12} className="text-primary-600" />
                  )}
                  <span>{plan}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex gap-2 mt-4 pt-2.5 border-t border-slate-200">
          <button
            onClick={() => onPlanToggle("all")}
            className="flex-1 px-3 py-2 text-[0.78rem] font-lexend font-semibold text-gray-500 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
          >
            Select All
          </button>
          <button
            onClick={onClose}
            className="flex-1 px-3 py-2 text-[0.78rem] font-lexend font-medium text-white bg-primary-600 rounded-lg hover:bg-primary-700 transition-colors"
          >
            <div className="flex items-center justify-center gap-2">
              <FaCheck size={12} className="text-white" />
              <span>Apply</span>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

const ActiveSessions = () => {
  const [sessions, setSessions] = useState(initialSessions);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSessions, setSelectedSessions] = useState([]);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [selectedPlans, setSelectedPlans] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState({
    key: "sessionStart",
    direction: "descending",
  });

  const itemsPerPage = 10;

  // Effect to update session duration periodically
  useEffect(() => {
    const interval = setInterval(() => {
      setSessions((prevSessions) => [...prevSessions]); // Trigger re-render
    }, 60000); // Update every minute
    return () => clearInterval(interval);
  }, []);

  // Get unique plans for filter
  const availablePlans = useMemo(() => {
    const plans = [...new Set(sessions.map((session) => session.plan))];
    return plans;
  }, [sessions]);

  const sortedSessions = useMemo(() => {
    let sortableItems = [...sessions];

    if (sortConfig.key) {
      sortableItems.sort((a, b) => {
        let aValue = a[sortConfig.key];
        let bValue = b[sortConfig.key];

        // Handle date sorting
        if (
          sortConfig.key === "sessionStart" ||
          sortConfig.key === "sessionEnd"
        ) {
          aValue = new Date(aValue).getTime();
          bValue = new Date(bValue).getTime();
        }

        // Handle data usage sorting
        if (sortConfig.key === "dataUsage") {
          aValue = parseFloat(aValue);
          bValue = parseFloat(bValue);
        }

        if (aValue < bValue) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }
        return 0;
      });
    }

    return sortableItems;
  }, [sessions, sortConfig]);

  const filteredSessions = sortedSessions.filter((session) => {
    const matchesSearch =
      session.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
      session.ipAddress.includes(searchTerm) ||
      session.macAddress.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesPlan =
      selectedPlans.length === 0 || selectedPlans.includes(session.plan);

    return matchesSearch && matchesPlan;
  });

  // Pagination
  const totalPages = Math.ceil(filteredSessions.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedSessions = filteredSessions.slice(startIndex, endIndex);

  const handleSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const getSortIcon = (key) => {
    if (sortConfig.key !== key) return null;
    return sortConfig.direction === "ascending" ? "↑" : "↓";
  };

  const handleSelectAll = (checked) => {
    if (checked) {
      setSelectedSessions(paginatedSessions.map((session) => session.id));
    } else {
      setSelectedSessions([]);
    }
  };

  const handleSelectSession = (sessionId, checked) => {
    if (checked) {
      setSelectedSessions((prev) => [...prev, sessionId]);
    } else {
      setSelectedSessions((prev) => prev.filter((id) => id !== sessionId));
    }
  };

  const handlePlanToggle = (plan) => {
    if (plan === "all") {
      setSelectedPlans(availablePlans);
    } else {
      setSelectedPlans((prev) =>
        prev.includes(plan) ? prev.filter((p) => p !== plan) : [...prev, plan]
      );
    }
  };

  const handleBulkAction = (action) => {
    console.log(`Performing ${action} on sessions:`, selectedSessions);
    // Implement bulk actions here
    setSelectedSessions([]);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showFilterModal && !event.target.closest(".filter-dropdown")) {
        setShowFilterModal(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showFilterModal]);

  return (
    <div className="min-h-screen bg-slate-100">
      {/* Header with Glass Effect */}
      <div className="sticky top-0 z-50 backdrop-blur-xl bg-white/80 border-b border-white/20 shadow-lg shadow-blue-500/5">
        <div className="py-2 px-4">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="space-y-1.5">
              <h1 className="text-xl font-lexend leading-tight tracking-tight font-bold text-primary-600">
                Current Active Sessions
              </h1>
              <p className="text-slate-500 font-lexend text-sm">
                Real-time view of connected users and their network activity
              </p>
            </div>
            <div className="flex items-center gap-4">
              <button className="px-4 py-2.5 bg-white/90 backdrop-blur-sm border border-gray-200 rounded-lg text-slate-700 font-medium shadow-lg shadow-blue-500/5 hover:shadow-xl transition-all duration-200 flex items-center gap-2">
                <TbRefresh size={18} className="animate-spin-slow" />
                <span>Refresh</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="backdrop-blur-xl bg-white/70 rounded-[1.5rem] border border-white/30 shadow-xl shadow-blue-500/5 m-6 p-6">
        {/* Toolbar */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
          {/* Right Side Section - Bulk Actions or Table Info */}
          <div
            className={`flex items-center gap-6 pl-4 pr-[0.3rem] py-[0.35rem] rounded-lg border ${
              selectedSessions.length > 0
                ? "border-primary-200/50"
                : "border-transparent"
            } flex-shrink-0`}
          >
            {selectedSessions.length > 0 ? (
              /* Bulk Actions */
              <div className="flex items-center gap-6 bg-primary-50/50 border-primary-200/50">
                <div className="flex items-center gap-2.5">
                  <FaCheck className="text-primary-600 w-3" />
                  <div className="text-[0.9rem] font-medium text-primary-700 whitespace-nowrap">
                    <span className="font-lexend">
                      {selectedSessions.length}{" "}
                    </span>
                    {selectedSessions.length > 1 ? "sessions" : "session"}{" "}
                    selected
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleBulkAction("disconnect")}
                    className="px-4 py-1.5 text-xs font-lexend font-medium text-red-700 bg-red-200 border border-red-300 rounded-lg hover:bg-red-300 hover:text-red-800 transition-colors flex items-center gap-1 whitespace-nowrap"
                  >
                    <FaPowerOff size={12} className="mr-1" />
                    Disconnect All
                  </button>
                  <button
                    onClick={() => handleBulkAction("block")}
                    className="px-4 py-1.5 text-xs font-lexend font-medium text-amber-700 bg-amber-200 border border-amber-400 rounded-lg hover:bg-amber-300 hover:text-amber-800 transition-colors flex items-center gap-1 whitespace-nowrap"
                  >
                    <FaBan size={12} className="mr-1" />
                    Block All
                  </button>
                </div>
              </div>
            ) : (
              /* Table Info */
              <div className="flex items-center gap-3 text-slate-600 min-w-[30rem]">
                <div className="flex items-center gap-2">
                  <span className="text-lg font-lexend font-semibold text-secondary-600 whitespace-nowrap">
                    Online & Connected Sessions
                  </span>
                  <span className="text-[0.8rem] text-slate-500 font-lexend tracking-tight font-semibold">
                    ({filteredSessions.length} sessions)
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Search and Filter Section */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 flex-1 min-w-0">
            {/* Filter Button */}
            <div className="relative filter-dropdown flex-shrink-0">
              <button
                onClick={() => setShowFilterModal(!showFilterModal)}
                className="pl-3 pr-2 py-[0.6rem] bg-white/90 border-2 border-gray-200 rounded-lg text-gray-600 font-lexend text-sm md:text-[0.9rem] font-semibold shadow-inner hover:shadow-md transition-all duration-200 flex items-center whitespace-nowrap"
              >
                <FiFilter size={20} className="mr-2 text-primary-600" />
                <span className="mr-1">Filters</span>
                {selectedPlans.length > 0 && (
                  <span className="bg-primary-600 text-white text-xs px-2 mr-2 py-0.5 rounded-full">
                    {selectedPlans.length}
                  </span>
                )}
                <PiCaretDownDuotone
                  size={18}
                  className="ml-2 text-gray-600 pointer-events-none"
                />
              </button>

              <FilterDropdown
                isOpen={showFilterModal}
                onClose={() => setShowFilterModal(false)}
                onClear={() => setSelectedPlans([])} // Add this prop
                selectedPlans={selectedPlans}
                onPlanToggle={handlePlanToggle}
                availablePlans={availablePlans}
              />
            </div>

            {/* Search Input */}
            <div className="relative flex-1 min-w-0">
              <RiSearchLine className="absolute top-1/2 left-3 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                placeholder="Search by user phone number, IP Address, or MAC Address....."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-[0.6rem] w-full border-2 border-gray-200 rounded-[0.6rem] text-[0.95rem] font-medium focus:border-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition"
              />
            </div>
          </div>
        </div>

        {/* Sessions Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-500/80">
            <thead className="text-xs text-secondary-600 uppercase bg-slate-200/50">
              <tr>
                <th
                  scope="col"
                  className="pl-6 py-3 text-secondary-600 rounded-l-xl"
                >
                  <Checkbox
                    checked={
                      selectedSessions.length === paginatedSessions.length &&
                      paginatedSessions.length > 0
                    }
                    onChange={handleSelectAll}
                    id="select-all"
                  />
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-secondary-600 cursor-pointer hover:text-primary-600 transition-colors"
                  onClick={() => handleSort("user")}
                >
                  <div className="flex items-center gap-1">
                    User
                    {getSortIcon("user") && (
                      <span className="text-primary-600">
                        {getSortIcon("user")}
                      </span>
                    )}
                  </div>
                </th>
                <th scope="col" className="px-6 py-3 text-secondary-600">
                  Connection Details
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-secondary-600 cursor-pointer hover:text-primary-600 transition-colors"
                  onClick={() => handleSort("sessionStart")}
                >
                  <div className="flex items-center gap-1">
                    Plan Start
                    {getSortIcon("sessionStart") && (
                      <span className="text-primary-600">
                        {getSortIcon("sessionStart")}
                      </span>
                    )}
                  </div>
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-secondary-600 cursor-pointer hover:text-primary-600 transition-colors"
                  onClick={() => handleSort("sessionStart")}
                >
                  <div className="flex items-center gap-1">
                    Duration
                    {getSortIcon("sessionStart") && (
                      <span className="text-primary-600">
                        {getSortIcon("sessionStart")}
                      </span>
                    )}
                  </div>
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-secondary-600 cursor-pointer hover:text-primary-600 transition-colors"
                  onClick={() => handleSort("sessionEnd")}
                >
                  <div className="flex items-center gap-1">
                    Plan Ends
                    {getSortIcon("sessionEnd") && (
                      <span className="text-primary-600">
                        {getSortIcon("sessionEnd")}
                      </span>
                    )}
                  </div>
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-secondary-600 cursor-pointer hover:text-primary-600 transition-colors"
                  onClick={() => handleSort("dataUsage")}
                >
                  <div className="flex items-center gap-1">
                    Data Usage
                    {getSortIcon("dataUsage") && (
                      <span className="text-primary-600">
                        {getSortIcon("dataUsage")}
                      </span>
                    )}
                  </div>
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
              {paginatedSessions.map((session) => {
                const { date, time } = formatDateTime(session.sessionStart);
                return (
                  <tr
                    key={session.id}
                    className="bg-white border-b hover:bg-slate-100"
                  >
                    <td className="pl-6 py-4">
                      <Checkbox
                        checked={selectedSessions.includes(session.id)}
                        onChange={(checked) =>
                          handleSelectSession(session.id, checked)
                        }
                        id={`session-${session.id}`}
                      />
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <img
                          className="w-10 h-10 rounded-full"
                          src={session.avatar}
                          alt={`${session.user} avatar`}
                        />
                        <div className="font-lexend">
                          <div className="font-semibold tracking-wide text-[0.9rem] text-slate-900">
                            {session.phone}
                          </div>
                          <div className="text-xs tracking-tight font-medium leading-relaxed text-gray-500/80">
                            {session.plan}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 font-mono text-xs">
                        <div className="mr-1.5">
                          {getDeviceIcon(session.deviceType)}
                        </div>
                        <div>
                          <div className="">
                            IP:
                            <span className="ml-1 font-lexend font-semibold text-primary-600">
                              {session.ipAddress}
                            </span>
                          </div>
                          <div className="">
                            MAC:
                            <span className="ml-1 ">{session.macAddress}</span>
                          </div>
                        </div>
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
                    <td className="px-6 py-4 font-semibold text-gray-500 font-lexend">
                      {formatDuration(session.sessionStart)}
                    </td>
                    <td className="px-6 py-4 font-lexend font-semibold">
                      {formatDuration(session.sessionEnd)}
                    </td>
                    <td className="px-6 py-4 font-semibold font-lexend text-primary-600">
                      <div className="">
                        <div className="">
                          {formatDataUsage(session.dataUsage)}
                        </div>
                        <div className="text-xs text-gray-500/80">
                          {session.bandwidth} Mbps
                        </div>
                      </div>
                    </td>
                    <td className="pr-6 py-4 text-right">
                      <button className="px-3 py-1 text-xs font-medium tracking-tight font-lexend text-red-700 bg-red-200/80 rounded-full hover:bg-red-300 hover:text-red-800 transition-colors">
                        <div className="flex items-center">
                          <FaPowerOff size={12} className="mr-1.5" />
                          Disconnect
                        </div>
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
          <span className="text-[0.83rem] font-lexend tracking-tight text-gray-500">
            Showing {startIndex + 1} to{" "}
            {Math.min(endIndex, filteredSessions.length)} of{" "}
            {filteredSessions.length} sessions
          </span>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-3 py-1.5 text-sm font-medium text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-primary-50 hover:border-primary-600/30 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Previous
            </button>

            <div className="flex items-center gap-1">
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                const pageNum = i + 1;
                return (
                  <button
                    key={pageNum}
                    onClick={() => setCurrentPage(pageNum)}
                    className={`px-3 py-1.5 font-lexend text-sm font-medium rounded-lg transition-colors ${
                      currentPage === pageNum
                        ? "bg-primary-600 text-white"
                        : "text-slate-600 bg-white border border-slate-200 hover:bg-primary-50 hover:border-primary-600/30"
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}
            </div>

            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className="px-3 py-1.5 font-lexend text-sm font-medium text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-primary-50 hover:border-primary-600/30 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActiveSessions;
