import React from "react";
import {
  FiEdit3,
  FiCopy,
  FiTrash2,
  FiUsers,
  FiClock,
  FiWifi,
  FiCheck,
  FiSettings,
  FiRefreshCw,
  FiEye,
} from "react-icons/fi";
import { PiChecksBold, PiUsersThreeDuotone } from "react-icons/pi";
import { TbRouter, TbEdit, TbDevices } from "react-icons/tb";
import ToggleSwitch from "../ui/ToggleSwitch";

const RouterCard = ({ router, onRouterAction }) => {
  const getStatusChip = (status) => {
    switch (status) {
      case "Online":
        return "bg-green-100 text-green-700 border border-green-200/80";
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
        return <FiCheck className="text-green-600" size={16} />;
      case "Offline":
        return <FiWifi className="text-red-600" size={16} />;
      case "Warning":
        return <FiWifi className="text-amber-600" size={16} />;
      default:
        return <FiWifi className="text-gray-600" size={16} />;
    }
  };

  return (
    <div
      className={`rounded-3xl border-2 p-4 shadow-card hover:shadow-float transition-all duration-300 hover:border-primary-200 relative flex flex-col h-full ${
        router.status === "Online"
          ? "border-green-500 bg-green-50/70"
          : router.status === "Warning"
          ? "border-amber-400 bg-amber-50/60"
          : "border-red-200 bg-red-50/60"
      }`}
    >
      {/* Card Header - Three Part Layout */}
      <div className="relative pb-4">
        <div className="flex items-center justify-between">
          {/* Left Side - Clients */}
          <div className="flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-blue-100 to-blue-50 rounded-full border border-blue-200/50">
            <PiUsersThreeDuotone className="w-4 h-4 text-blue-600" />
            <span className="text-xs font-semibold font-lexend text-blue-700">
              {router.clients} clients
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span
              className={`px-2.5 py-1 text-xs font-lexend font-semibold rounded-full ${getStatusChip(
                router.status
              )}`}
            >
              {router.status}
            </span>
            {getStatusIcon(router.status)}
          </div>
        </div>
      </div>

      {/* Center - Router Name */}
      <div className="flex-1 text-center px-4">
        <h3
          className={`text-xl font-bold font-lexend ${
            router.status === "Online"
              ? "text-green-700"
              : router.status === "Warning"
              ? "text-amber-600"
              : "text-red-500"
          } leading-tight`}
        >
          {router.name}
        </h3>
      </div>

      <div className="text-center mb-4">
        <div className="flex items-center justify-center gap-2 my-2">
          <div className="text-sm font-lexend font-semibold text-gray-500">
            {router.location} -
          </div>
          <div className="text-sm font-lexend font-semibold text-slate-500">
            {router.ipAddress}
          </div>
        </div>

        <div className="flex items-center justify-center gap-2">
          <div className="text-sm font-lexend font-semibold text-gray-500 mb-2">
            {router.model}
          </div>
          <div className="w-1 h-4 mb-1.5 bg-primary-500 rounded-full"></div>
          <div className="text-sm font-lexend font-semibold text-primary-500 mb-2">
            {router.bandwidth}
          </div>
          {/* <div className="w-1 h-1 mb-1.5 bg-secondary-500 rounded-full"></div> */}
        </div>
      </div>

      {/* System Resources Section */}
      <div
        className={`w-full border rounded-[0.7rem] p-4 mb-4 ${
          router.status === "Online"
            ? "bg-green-50 border-green-200/80"
            : router.status === "Warning"
            ? "bg-amber-50 border-amber-200/80"
            : "bg-slate-50 border-primary-100/70"
        }`}
      >
        <div className="space-y-3 font-sans">
          {/* CPU Usage */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span className="text-[0.8rem] text-gray-700">CPU</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-16 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full ${
                    router.cpu < 30
                      ? "bg-green-600"
                      : router.cpu < 70
                      ? "bg-yellow-500"
                      : "bg-red-500"
                  }`}
                  style={{ width: `${router.cpu}%` }}
                ></div>
              </div>
              <span className="text-xs font-lexend font-semibold text-gray-700">
                {router.cpu}%
              </span>
            </div>
          </div>

          {/* Memory Usage */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <span className="text-[0.8rem] text-gray-700">Memory</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-16 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full ${
                    router.memory < 50
                      ? "bg-green-600"
                      : router.memory < 80
                      ? "bg-yellow-500"
                      : "bg-red-500"
                  }`}
                  style={{ width: `${router.memory}%` }}
                ></div>
              </div>
              <span className="text-xs font-lexend font-semibold text-gray-700">
                {router.memory}%
              </span>
            </div>
          </div>

          {/* Temperature */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
              <span className="text-[0.8rem] text-gray-700">Temp</span>
            </div>
            <span
              className={`text-xs font-lexend font-semibold ${
                router.temperature < 50
                  ? "text-green-600"
                  : router.temperature < 70
                  ? "text-yellow-600"
                  : "text-red-600"
              }`}
            >
              {router.temperature}°C
            </span>
          </div>

          {/* Uptime */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FiClock className="w-3 h-3 text-gray-500" />
              <span className="text-[0.8rem] text-gray-700">Uptime</span>
            </div>
            <span className="text-xs font-lexend font-semibold text-gray-700">
              {router.uptime}
            </span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-auto">
        <div className="flex items-center gap-2 mt-2">
          <button
            onClick={() => onRouterAction("view", router.id)}
            className={`flex-1 px-4 py-3 text-white text-sm font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 group/btn ${
              router.status === "Online"
                ? "bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 shadow-green-500/25 hover:shadow-green-500/30"
                : router.status === "Warning"
                ? "bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 shadow-amber-500/25 hover:shadow-amber-500/30"
                : "bg-gradient-to-r from-red-600 to-red-700 shadow-red-500/25 hover:from-red-700 hover:to-red-800"
            }`}
            title="View router details"
          >
            <FiEye
              size={17}
              className="group-hover/btn:scale-110 transition-transform"
            />
            Router Details
          </button>
          <button
            onClick={() => onRouterAction("configure", router.id)}
            className="p-3 bg-white/80 backdrop-blur-sm text-slate-600 rounded-xl border border-white/60 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200 transition-all duration-300 shadow-sm hover:shadow-md"
            title="Configure router"
          >
            <FiSettings size={14} />
          </button>
          {router.status === "Online" && (
            <button
              onClick={() => onRouterAction("reboot", router.id)}
              className="p-3 bg-white/80 backdrop-blur-sm text-slate-600 rounded-xl border border-white/60 hover:bg-amber-50 hover:text-amber-600 hover:border-amber-200 transition-all duration-300 shadow-sm hover:shadow-md"
              title="Reboot router"
            >
              <FiRefreshCw size={14} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default RouterCard;
