import React, { useState, useMemo, useEffect } from "react";
import { FiSearch, FiWifi, FiPower } from "react-icons/fi";
import { FaMobileAlt, FaLaptop, FaTabletAlt, FaPowerOff } from "react-icons/fa";
import { TbRefresh, TbSearch } from "react-icons/tb";
import { PiPowerBold } from "react-icons/pi";
import { FaComputer, FaMobile, FaTablet, FaTv } from "react-icons/fa6";

// Mock Data
const initialSessions = [
  {
    id: "SESS-001",
    user: "John Doe",
    ipAddress: "192.168.1.101",
    macAddress: "00:1B:44:11:3A:B7",
    deviceType: "Laptop",
    dataUsage: 1250, // in MB
    sessionStart: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    plan: "1 Day Plan",
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
  },
  {
    id: "SESS-002",
    user: "Jane Smith",
    ipAddress: "192.168.1.102",
    macAddress: "A4:B1:C2:D3:E4:F5",
    deviceType: "Mobile",
    dataUsage: 340, // in MB
    sessionStart: new Date(Date.now() - 45 * 60 * 1000), // 45 minutes ago
    plan: "1 Week Plan",
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
  },
  {
    id: "SESS-003",
    user: "Emily Davis",
    ipAddress: "192.168.1.103",
    macAddress: "F8:E7:D6:C5:B4:A3",
    deviceType: "Tablet",
    dataUsage: 812, // in MB
    sessionStart: new Date(Date.now() - 5 * 60 * 60 * 1000), // 5 hours ago
    plan: "3 Hours Plan",
    avatar: "https://i.pravatar.cc/150?u=a048581f4e29026701d",
  },

  {
    id: "SESS-004",
    user: "John Doe",
    ipAddress: "192.168.1.101",
    macAddress: "00:1B:44:11:3A:B7",
    deviceType: "TV",
    dataUsage: 812, // in MB
    sessionStart: new Date(Date.now() - 5 * 60 * 60 * 1000), // 5 hours ago
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

const ActiveSessions = () => {
  const [sessions, setSessions] = useState(initialSessions);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({
    key: "sessionStart",
    direction: "descending",
  });

  // Effect to update session duration periodically
  useEffect(() => {
    const interval = setInterval(() => {
      setSessions((prevSessions) => [...prevSessions]); // Trigger re-render
    }, 60000); // Update every minute
    return () => clearInterval(interval);
  }, []);

  const sortedSessions = useMemo(() => {
    let sortableItems = [...sessions];
    // ... sorting logic ...
    return sortableItems;
  }, [sessions, sortConfig]);

  const filteredSessions = sortedSessions.filter(
    (session) =>
      session.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
      session.ipAddress.includes(searchTerm) ||
      session.macAddress.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-100">
      {/* Header with Glass Effect */}
      <div className="sticky top-0 z-50 backdrop-blur-xl bg-white/80 border-b border-white/20 shadow-lg shadow-blue-500/5">
        <div className="py-2 px-4">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="space-y-1.5">
              <h1 className="text-[1.3rem] font-lexend leading-tight tracking-tight font-bold text-primary-600">
                Active Sessions
              </h1>
              <p className="text-slate-500">
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
      <div className="backdrop-blur-xl bg-white/70 rounded-2xl border border-white/30 shadow-xl shadow-blue-500/5 m-6 p-6">
        {/* Toolbar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
          <div className="relative w-full md:w-auto">
            <TbSearch className="absolute top-1/2 left-3 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search by user, IP, or MAC..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-full md:w-80 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition"
            />
          </div>
        </div>

        {/* Sessions Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-slate-500">
            <thead className="text-xs text-slate-700 uppercase bg-slate-50">
              <tr>
                <th scope="col" className="px-6 py-3">
                  User
                </th>
                <th scope="col" className="px-6 py-3">
                  Connection Details
                </th>
                <th scope="col" className="px-6 py-3">
                  Data Usage
                </th>
                <th scope="col" className="px-6 py-3">
                  Duration
                </th>
                <th scope="col" className="px-6 py-3 text-right">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredSessions.map((session) => (
                <tr
                  key={session.id}
                  className="bg-white border-b hover:bg-slate-50"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <img
                        className="w-10 h-10 rounded-full"
                        src={session.avatar}
                        alt={`${session.user} avatar`}
                      />
                      <div>
                        <div className="font-semibold text-slate-900">
                          {session.user}
                        </div>
                        <div className="text-xs text-slate-500">
                          {session.plan}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 font-mono text-xs">
                      {getDeviceIcon(session.deviceType)}
                      <div>
                        <div>IP: {session.ipAddress}</div>
                        <div>MAC: {session.macAddress}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-semibold">
                    {formatDataUsage(session.dataUsage)}
                  </td>
                  <td className="px-6 py-4">
                    {formatDuration(session.sessionStart)}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="px-3 py-1 text-xs font-medium font-lexend text-red-700 bg-red-200/80 rounded-full hover:bg-red-300 hover:text-red-800 transition-colors flex items-center gap-1">
                      <FaPowerOff size={12} className="mr-1.5" />
                      Disconnect
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
            Showing {filteredSessions.length} active sessions
          </span>
        </div>
      </div>
    </div>
  );
};

export default ActiveSessions;
