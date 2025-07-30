import React, { useState } from "react";
import {
  FiPlus,
  FiCpu,
  FiHardDrive,
  FiWifi,
  FiRefreshCw,
  FiAlertTriangle,
  FiCheckCircle,
} from "react-icons/fi";

// Mock Data
const routersData = [
  {
    id: "RTR-001",
    name: "Main Hub Router",
    model: "Vuka-Router Pro",
    ipAddress: "192.168.1.1",
    status: "Online",
    uptime: "12d 4h 32m",
    clients: 45,
    firmware: "v2.3.1",
  },
  {
    id: "RTR-002",
    name: "Sector A Repeater",
    model: "Vuka-Extend Lite",
    ipAddress: "192.168.1.2",
    status: "Online",
    uptime: "8d 2h 15m",
    clients: 22,
    firmware: "v1.8.5",
  },
  {
    id: "RTR-003",
    name: "Sector B Hotspot",
    model: "Vuka-Router Pro",
    ipAddress: "192.168.1.3",
    status: "Offline",
    uptime: "0m",
    clients: 0,
    firmware: "v2.3.0",
  },
  {
    id: "RTR-004",
    name: "Library AP",
    model: "Vuka-AP One",
    ipAddress: "192.168.2.1",
    status: "Warning",
    uptime: "3d 1h 5m",
    clients: 67,
    firmware: "v1.5.2",
  },
  // ... add more mock data
];

const getStatusIndicator = (status) => {
  switch (status) {
    case "Online":
      return (
        <div className="flex items-center gap-1.5 text-emerald-500">
          <FiCheckCircle size={14} />
          <span className="font-semibold">Online</span>
        </div>
      );
    case "Offline":
      return (
        <div className="flex items-center gap-1.5 text-red-500">
          <FiAlertTriangle size={14} />
          <span className="font-semibold">Offline</span>
        </div>
      );
    case "Warning":
      return (
        <div className="flex items-center gap-1.5 text-amber-500">
          <FiAlertTriangle size={14} />
          <span className="font-semibold">Warning</span>
        </div>
      );
    default:
      return (
        <div className="flex items-center gap-1.5 text-slate-500">
          <FiAlertTriangle size={14} />
          <span className="font-semibold">Unknown</span>
        </div>
      );
  }
};

const RouterCard = ({ router }) => (
  <div className="group relative overflow-hidden backdrop-blur-xl bg-white/70 rounded-2xl border border-white/30 shadow-xl shadow-blue-500/5 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-300">
    <div className="p-5">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="font-lexend text-lg font-bold text-slate-800">
            {router.name}
          </h3>
          <p className="text-sm text-slate-500 font-mono">{router.ipAddress}</p>
        </div>
        {getStatusIndicator(router.status)}
      </div>

      <div className="grid grid-cols-2 gap-4 text-sm mb-4">
        <div className="flex items-center gap-2">
          <FiCpu className="text-primary-500" />
          <span>{router.model}</span>
        </div>
        <div className="flex items-center gap-2">
          <FiHardDrive className="text-primary-500" />
          <span>FW: {router.firmware}</span>
        </div>
        <div className="flex items-center gap-2">
          <FiWifi className="text-primary-500" />
          <span>{router.clients} Clients</span>
        </div>
        <div className="flex items-center gap-2">
          <FiRefreshCw className="text-primary-500" />
          <span>Up: {router.uptime}</span>
        </div>
      </div>

      <div className="flex items-center justify-end gap-2 pt-4 border-t border-slate-200/60">
        <button className="px-3 py-1 text-xs font-semibold text-slate-600 bg-slate-100 rounded-md hover:bg-slate-200 transition">
          Details
        </button>
        <button className="px-3 py-1 text-xs font-semibold text-amber-700 bg-amber-100 rounded-md hover:bg-amber-200 transition">
          Reboot
        </button>
      </div>
    </div>
  </div>
);

const RouterManager = () => {
  return (
    <div className="min-h-screen bg-slate-100 p-6">
      {/* Header with Glass Effect */}
      <div className="sticky top-0 z-50 backdrop-blur-xl bg-white/80 border-b border-white/20 shadow-lg shadow-blue-500/5">
        <div className="py-2 px-4">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="space-y-1.5">
              <h1 className="text-[1.3rem] font-lexend leading-tight tracking-tight font-bold text-primary-600">
                Router Management
              </h1>
              <p className="text-slate-500 font-medium">
                Monitor and manage network hardware and infrastructure
              </p>
            </div>
            <div className="flex items-center gap-4">
              <button className="px-4 py-2.5 bg-white/90 backdrop-blur-sm border border-gray-200 rounded-lg text-slate-700 font-medium shadow-lg shadow-blue-500/5 hover:shadow-xl transition-all duration-200 flex items-center gap-2">
                <FiRefreshCw size={18} className="animate-spin-slow" />
                <span>Refresh</span>
              </button>
              <button className="px-4 py-2.5 bg-primary-600 text-white rounded-lg font-medium shadow-lg hover:shadow-primary-400/50 transition-shadow flex items-center gap-2">
                <FiPlus /> Add New Router
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Router Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {routersData.map((router) => (
          <RouterCard key={router.id} router={router} />
        ))}
      </div>
    </div>
  );
};

export default RouterManager;
