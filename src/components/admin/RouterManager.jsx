import React, { useState, useMemo, useEffect } from "react";
import {
  FiPlus,
  FiWifi,
  FiAlertTriangle,
  FiCheckCircle,
  FiArrowUp,
  FiArrowDown,
  FiMoreVertical,
  FiSettings,
  FiEye,
  FiRefreshCw,
  FiAlertCircle,
  FiMapPin,
  FiCpu,
  FiHardDrive,
  FiThermometer,
  FiActivity,
  FiUsers,
  FiClock,
} from "react-icons/fi";
import {
  TbRefresh,
  TbFilterFilled,
  TbSearch,
  TbCheck,
  TbRouter,
} from "react-icons/tb";
import { PiCaretDownDuotone } from "react-icons/pi";
import { RiSearchLine } from "react-icons/ri";
import { FiFilter } from "react-icons/fi";
import Checkbox from "../ui/Checkbox";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";
import RouterCard from "./RouterCard";
import RouterModal from "./RouterModal";

// Enhanced Mock Data
const routersData = [
  {
    id: "RTR-001",
    name: "Main Hub Router",
    model: "MikroTik hEX S",
    ipAddress: "192.168.1.1",
    macAddress: "4C:5E:0C:12:34:56",
    status: "Online",
    uptime: "12d 4h 32m",
    uptimeSeconds: 1062720,
    clients: 45,
    firmware: "v7.6",
    location: "Main Office",
    bandwidth: "1000 Mbps",
    cpu: 12,
    memory: 78,
    temperature: 42,
    voltage: 24.1,
    lastSeen: "2023-10-26T10:00:00Z",
    totalTraffic: "2.4 TB",
    isManaged: true,
    notes: "Primary gateway router",
    radiusEnabled: true,
    hotspotEnabled: true,
  },
  {
    id: "RTR-002",
    name: "Sector A Repeater",
    model: "MikroTik cAP ac",
    ipAddress: "192.168.1.2",
    macAddress: "4C:5E:0C:12:34:57",
    status: "Online",
    uptime: "8d 2h 15m",
    uptimeSeconds: 696900,
    clients: 22,
    firmware: "v7.5",
    location: "Building A",
    bandwidth: "300 Mbps",
    cpu: 8,
    memory: 45,
    temperature: 38,
    voltage: 24.0,
    lastSeen: "2023-10-26T10:00:00Z",
    totalTraffic: "1.2 TB",
    isManaged: true,
    notes: "Wireless access point for sector A",
    radiusEnabled: true,
    hotspotEnabled: true,
  },
  {
    id: "RTR-003",
    name: "Sector B Hotspot",
    model: "MikroTik RB4011",
    ipAddress: "192.168.1.3",
    macAddress: "4C:5E:0C:12:34:58",
    status: "Offline",
    uptime: "0m",
    uptimeSeconds: 0,
    clients: 0,
    firmware: "v7.4",
    location: "Building B",
    bandwidth: "100 Mbps",
    cpu: 0,
    memory: 0,
    temperature: 0,
    voltage: 0,
    lastSeen: "2023-10-25T14:30:00Z",
    totalTraffic: "845 GB",
    isManaged: true,
    notes: "Router experiencing connectivity issues",
    radiusEnabled: false,
    hotspotEnabled: false,
  },
  {
    id: "RTR-004",
    name: "Library Access Point",
    model: "MikroTik wAP ac",
    ipAddress: "192.168.2.1",
    macAddress: "4C:5E:0C:12:34:59",
    status: "Warning",
    uptime: "3d 1h 5m",
    uptimeSeconds: 263100,
    clients: 67,
    firmware: "v7.2",
    location: "Library",
    bandwidth: "150 Mbps",
    cpu: 45,
    memory: 89,
    temperature: 58,
    voltage: 23.8,
    lastSeen: "2023-10-26T09:58:00Z",
    totalTraffic: "1.8 TB",
    isManaged: true,
    notes: "High memory usage detected",
    radiusEnabled: true,
    hotspotEnabled: true,
  },
  {
    id: "RTR-005",
    name: "Outdoor Bridge",
    model: "MikroTik SXT LTE6",
    ipAddress: "192.168.1.5",
    macAddress: "4C:5E:0C:12:34:60",
    status: "Online",
    uptime: "25d 12h 8m",
    uptimeSeconds: 2214480,
    clients: 12,
    firmware: "v7.6",
    location: "Outdoor Unit",
    bandwidth: "50 Mbps",
    cpu: 6,
    memory: 35,
    temperature: 35,
    voltage: 12.2,
    lastSeen: "2023-10-26T10:00:00Z",
    totalTraffic: "456 GB",
    isManaged: true,
    notes: "Backup internet connection",
    radiusEnabled: false,
    hotspotEnabled: false,
  },
  {
    id: "RTR-006",
    name: "Conference Room AP",
    model: "MikroTik cAP lite",
    ipAddress: "192.168.3.1",
    macAddress: "4C:5E:0C:12:34:61",
    status: "Online",
    uptime: "2d 14h 22m",
    uptimeSeconds: 224520,
    clients: 8,
    firmware: "v7.5",
    location: "Conference Room",
    bandwidth: "100 Mbps",
    cpu: 3,
    memory: 28,
    temperature: 40,
    voltage: 24.1,
    lastSeen: "2023-10-26T10:00:00Z",
    totalTraffic: "89 GB",
    isManaged: true,
    notes: "Dedicated conference room access",
    radiusEnabled: true,
    hotspotEnabled: false,
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
            Filter Routers
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

const RouterManager = () => {
  const [routers, setRouters] = useState(routersData);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRouters, setSelectedRouters] = useState([]);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [showRouterModal, setShowRouterModal] = useState(false);
  const [selectedRouter, setSelectedRouter] = useState(null);
  const [modalMode, setModalMode] = useState("add");
  const [filters, setFilters] = useState({ status: [], location: [] });
  const [sortConfig, setSortConfig] = useState({
    key: "name",
    direction: "ascending",
  });

  const availableOptions = useMemo(
    () => ({
      status: [...new Set(routers.map((r) => r.status))],
      location: [...new Set(routers.map((r) => r.location))],
    }),
    [routers]
  );

  // Calculate stats
  const stats = useMemo(() => {
    const onlineCount = routers.filter((r) => r.status === "Online").length;
    const totalClients = routers.reduce((sum, r) => sum + r.clients, 0);
    const offlineCount = routers.filter((r) => r.status === "Offline").length;
    const warningCount = routers.filter((r) => r.status === "Warning").length;

    return {
      onlineCount,
      totalClients,
      offlineCount,
      warningCount,
      totalRouters: routers.length,
    };
  }, [routers]);

  const filteredRouters = useMemo(() => {
    return routers.filter((router) => {
      const matchesSearch =
        router.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        router.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
        router.ipAddress.toLowerCase().includes(searchTerm.toLowerCase()) ||
        router.location.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus =
        filters.status.length === 0 || filters.status.includes(router.status);

      const matchesLocation =
        filters.location.length === 0 ||
        filters.location.includes(router.location);

      return matchesSearch && matchesStatus && matchesLocation;
    });
  }, [routers, searchTerm, filters]);

  const sortedRouters = useMemo(() => {
    let sortableItems = [...filteredRouters];
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
  }, [filteredRouters, sortConfig]);

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
      setSelectedRouters(sortedRouters.map((r) => r.id));
    } else {
      setSelectedRouters([]);
    }
  };

  const handleSelectRouter = (routerId, checked) => {
    if (checked) {
      setSelectedRouters((prev) => [...prev, routerId]);
    } else {
      setSelectedRouters((prev) => prev.filter((id) => id !== routerId));
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
    console.log(`Performing ${action} on routers:`, selectedRouters);

    if (action === "reboot") {
      // Simulate reboot action
      setRouters((prev) =>
        prev.map((router) =>
          selectedRouters.includes(router.id) && router.status === "Online"
            ? { ...router, uptime: "Just rebooted", uptimeSeconds: 0 }
            : router
        )
      );
    } else if (action === "configure") {
      // Open configuration interface
      console.log("Opening configuration for selected routers");
    }

    setSelectedRouters([]);
  };

  const handleRouterAction = (action, routerId) => {
    const router = routers.find((r) => r.id === routerId);

    if (action === "view") {
      setSelectedRouter(router);
      setShowRouterModal(true);
    } else if (action === "edit") {
      setSelectedRouter(router);
      setModalMode("edit");
      setShowRouterModal(true);
    } else if (action === "reboot" && router.status === "Online") {
      setRouters((prev) =>
        prev.map((r) =>
          r.id === routerId
            ? { ...r, uptime: "Just rebooted", uptimeSeconds: 0 }
            : r
        )
      );
    } else if (action === "configure") {
      console.log("Opening configuration for router:", routerId);
    } else if (action === "delete") {
      setRouters((prev) => prev.filter((r) => r.id !== routerId));
    }
  };

  const handleSaveRouter = (routerData, mode, routerId) => {
    if (mode === "edit") {
      setRouters((prev) =>
        prev.map((r) => (r.id === routerId ? { ...r, ...routerData } : r))
      );
    } else {
      const newRouter = {
        ...routerData,
        id: `RTR-${Date.now()}`, // Generate unique string ID
        createdAt: new Date().toISOString(),
      };
      setRouters((prev) => [...prev, newRouter]);
    }
  };

  const getStatusChip = (status) => {
    switch (status) {
      case "Online":
        return "bg-emerald-100 text-emerald-700 border border-emerald-200/80";
      case "Offline":
        return "bg-red-100 text-red-700 border border-red-200/80";
      case "Warning":
        return "bg-amber-100 text-amber-600 border border-amber-200/80";
      default:
        return "bg-gray-100 text-gray-700 border border-gray-200/80";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "Online":
        return <FiCheckCircle className="text-emerald-600" size={16} />;
      case "Offline":
        return <FiAlertCircle className="text-red-600" size={16} />;
      case "Warning":
        return <FiAlertTriangle className="text-amber-600" size={16} />;
      default:
        return <FiAlertCircle className="text-gray-600" size={16} />;
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
                Router Management
              </h1>
              <p className="text-slate-500 font-lexend text-sm">
                Monitor and manage network infrastructure devices.
              </p>
            </div>
            <div className="flex items-center gap-4">
              <button className="px-4 py-2.5 bg-white/90 backdrop-blur-sm border border-gray-200 rounded-lg text-slate-700 font-medium shadow-lg shadow-blue-500/5 hover:shadow-xl transition-all duration-200 flex items-center gap-2">
                <TbRefresh size={18} />
                <span>Refresh</span>
              </button>
              <Button
                variant="gradient"
                onClick={() => {
                  setModalMode("add");
                  setSelectedRouter(null);
                  setShowRouterModal(true);
                }}
                className="flex items-center gap-2"
              >
                <FiPlus size={18} />
                <span>Add Router</span>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 m-6 mb-0">
        <StatCard
          title="Total Routers"
          value={stats.totalRouters.toString()}
          change="+5.2%"
          changeType="increase"
          icon={<TbRouter />}
          gradient="from-blue-500 to-blue-600"
        />
        <StatCard
          title="Online"
          value={stats.onlineCount.toString()}
          change="+2.1%"
          changeType="increase"
          icon={<FiCheckCircle />}
          gradient="from-emerald-500 to-emerald-600"
        />
        <StatCard
          title="Active Clients"
          value={stats.totalClients.toString()}
          change="+18.3%"
          changeType="increase"
          icon={<FiWifi />}
          gradient="from-purple-500 to-purple-600"
        />
        <StatCard
          title="Issues"
          value={(stats.offlineCount + stats.warningCount).toString()}
          change="-12.4%"
          changeType="decrease"
          icon={<FiAlertTriangle />}
          gradient="from-red-500 to-red-600"
        />
      </div>

      {/* Main Content */}
      <div className="backdrop-blur-xl bg-white/70 rounded-[1.5rem] border border-white/30 shadow-xl shadow-blue-500/5 m-6 p-6">
        {/* Toolbar */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-12">
          {/* Table Info */}
          <div className="flex items-center gap-3 text-slate-600">
            <div className="flex items-center gap-2">
              <span className="text-lg font-lexend font-semibold text-secondary-600 whitespace-nowrap">
                {sortedRouters.length} Network Routers
              </span>
            </div>
            <div className="h-6 border-l border-slate-300/70"></div>
            <p className="text-sm text-slate-500 font-lexend">
              Monitor and manage network infrastructure
            </p>
          </div>

          {/* Search and Filter Section */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 flex-1 md:max-w-[50%] min-w-0">
            {/* Filter Button */}
            <div className="relative filter-dropdown flex-shrink-0">
              <button
                onClick={() => setShowFilterModal(!showFilterModal)}
                className="pl-3 pr-2 py-[0.6rem] bg-white/90 border-2 border-gray-200 rounded-lg text-gray-600 font-lexend text-sm md:text-[0.9rem] font-semibold shadow-inner hover:shadow-md transition-all duration-200 flex items-center whitespace-nowrap"
              >
                <FiFilter size={20} className="mr-2 text-primary-600" />
                {filters.status.length > 0 && (
                  <span className="bg-primary-600 text-white text-xs px-2 mr-2 py-0.5 rounded-full">
                    {filters.status.length}
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
                onClear={() => setFilters({ status: [], location: [] })}
                filters={filters}
                onToggle={handleFilterToggle}
                availableOptions={availableOptions}
              />
            </div>

            {/* Search Input */}
            <div className="relative flex-1 min-w-0">
              <RiSearchLine className="absolute top-1/2 left-3 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                placeholder="Search by router name, IP, or location....."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-[0.6rem] w-full border-2 border-gray-200 rounded-[0.6rem] text-[0.95rem] font-medium focus:border-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition"
              />
            </div>
          </div>
        </div>

        {/* Routers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 px-6 gap-6">
          {sortedRouters.map((router) => (
            <RouterCard
              key={router.id}
              router={router}
              onRouterAction={handleRouterAction}
            />
          ))}
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between pt-4 px-2">
          <span className="text-sm font-lexend  font-medium text-gray-500">
            Showing {sortedRouters.length} of {routers.length} routers
          </span>
        </div>
      </div>

      {/* Router Modal */}
      <RouterModal
        isOpen={showRouterModal}
        onClose={() => setShowRouterModal(false)}
        router={selectedRouter}
        onSave={handleSaveRouter}
        mode={modalMode}
      />
    </div>
  );
};

export default RouterManager;
