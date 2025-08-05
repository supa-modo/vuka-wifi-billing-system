import { useState } from "react";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";
import NotificationModal from "../ui/NotificationModal";
import apiService from "../../services/api";
import {
  TbWifiOff,
  TbClock,
  TbBrandSpeedtest,
  TbUser,
  TbDeviceMobile,
  TbRouter,
  TbId,
} from "react-icons/tb";
import { motion, AnimatePresence } from "framer-motion";
import { FiX } from "react-icons/fi";
import { RouterIcon } from "../ui/Icons";

const SessionActions = ({ session, onUpdate, onClose }) => {
  const [loading, setLoading] = useState(false);
  const [bandwidth, setBandwidth] = useState("");
  const [timeout, setTimeout] = useState("");
  const [reason, setReason] = useState("");

  // Notification modal states
  const [showNotification, setShowNotification] = useState(false);
  const [notificationConfig, setNotificationConfig] = useState({
    type: "info",
    title: "",
    message: "",
    onConfirm: null,
  });

  const handleDisconnect = async () => {
    setNotificationConfig({
      type: "confirm",
      title: "Disconnect User",
      message: `Are you sure you want to disconnect ${session.username}? This will immediately terminate their session.`,
      onConfirm: async () => {
        setLoading(true);
        try {
          const response = await apiService.disconnectUser(session.username, {
            reason: reason || "Admin-Request",
          });

          if (response.success) {
            setNotificationConfig({
              type: "success",
              title: "Disconnect Successful",
              message: `Successfully disconnected ${
                response.disconnectedSessions || 1
              } session(s)`,
              onConfirm: () => {
                onUpdate();
                onClose();
              },
            });
          } else {
            setNotificationConfig({
              type: "error",
              title: "Disconnect Failed",
              message: `Failed to disconnect: ${
                response.error || "Unknown error"
              }`,
              onConfirm: null,
            });
          }
        } catch (error) {
          console.error("Disconnect error:", error);
          setNotificationConfig({
            type: "error",
            title: "Disconnect Failed",
            message: "Failed to disconnect user. Please try again.",
            onConfirm: null,
          });
        } finally {
          setLoading(false);
        }
        setShowNotification(true);
      },
    });
    setShowNotification(true);
  };

  const handleUpdateBandwidth = async () => {
    if (!bandwidth) {
      setNotificationConfig({
        type: "warning",
        title: "Missing Bandwidth",
        message: "Please enter bandwidth limit (e.g., 1M/2M)",
        onConfirm: null,
      });
      setShowNotification(true);
      return;
    }

    setLoading(true);
    try {
      const response = await apiService.updateUserBandwidth(session.username, {
        bandwidth: bandwidth,
      });

      if (response.success) {
        setNotificationConfig({
          type: "success",
          title: "Bandwidth Updated",
          message: `Successfully updated bandwidth for ${
            response.updatedSessions || 1
          } session(s)`,
          onConfirm: () => {
            onUpdate();
            setBandwidth("");
          },
        });
      } else {
        setNotificationConfig({
          type: "error",
          title: "Update Failed",
          message: `Failed to update bandwidth: ${
            response.error || "Unknown error"
          }`,
          onConfirm: null,
        });
      }
    } catch (error) {
      console.error("Bandwidth update error:", error);
      setNotificationConfig({
        type: "error",
        title: "Update Failed",
        message: "Failed to update bandwidth. Please try again.",
        onConfirm: null,
      });
    } finally {
      setLoading(false);
    }
    setShowNotification(true);
  };

  const handleExtendSession = async () => {
    if (!timeout) {
      setNotificationConfig({
        type: "warning",
        title: "Missing Timeout",
        message: "Please enter timeout in seconds",
        onConfirm: null,
      });
      setShowNotification(true);
      return;
    }

    setLoading(true);
    try {
      const response = await apiService.extendUserSession(session.username, {
        timeoutSeconds: parseInt(timeout),
      });

      if (response.success) {
        setNotificationConfig({
          type: "success",
          title: "Session Extended",
          message: `Successfully extended session for ${
            response.updatedSessions || 1
          } session(s)`,
          onConfirm: () => {
            onUpdate();
            setTimeout("");
          },
        });
      } else {
        setNotificationConfig({
          type: "error",
          title: "Extension Failed",
          message: `Failed to extend session: ${
            response.error || "Unknown error"
          }`,
          onConfirm: null,
        });
      }
    } catch (error) {
      console.error("Session extend error:", error);
      setNotificationConfig({
        type: "error",
        title: "Extension Failed",
        message: "Failed to extend session. Please try again.",
        onConfirm: null,
      });
    } finally {
      setLoading(false);
    }
    setShowNotification(true);
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
        className="fixed inset-0 bg-black/50 backdrop-blur-[1.5px] flex items-center justify-center z-50 p-4 font-lexend"
        onClick={handleBackdropClick}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="w-full max-w-lg bg-white shadow-2xl overflow-hidden rounded-3xl border border-gray-200"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-primary-600 to-primary-700 px-6 py-4 relative">
            <div className="relative flex justify-between items-center z-10">
              <div className="flex items-center p-1.5">
                <RouterIcon size={32} className="text-white mr-3" />
                <div>
                  <h2 className="text-white font-semibold text-lg font-lexend">
                    Session Actions
                  </h2>
                  <p className="text-white/80 text-sm font-outfit">
                    {session.username}
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="text-white/80 hover:text-white transition-colors rounded-full p-1 hover:bg-white/10"
              >
                <FiX className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            <div className="space-y-5">
              {/* Session Info */}
              <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="flex items-center space-x-2">
                    <span className="text-slate-600 font-medium">Phone:</span>
                    <span className="text-slate-900">
                      {session.phoneNumber || "N/A"}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-slate-600 font-medium">NAS IP:</span>
                    <span className="text-slate-900">
                      {session.nasipaddress || "N/A"}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-slate-600 font-medium">MAC:</span>
                    <span className="text-slate-900 text-xs">
                      {session.callingstationid || "N/A"}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-slate-600 font-medium">Plan:</span>
                    <span className="text-slate-900">
                      {session.plan || "N/A"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="space-y-4">
                {/* Disconnect */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Disconnect Reason (Optional)
                  </label>
                  <input
                    type="text"
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    placeholder="e.g., Maintenance, Policy Violation"
                    className="w-full font-lexend text-sm bg-white text-gray-600 font-medium rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-colors"
                  />
                  <button
                    onClick={handleDisconnect}
                    disabled={loading}
                    className="w-full px-4 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-red-500 to-red-600 rounded-lg hover:from-red-600 hover:to-red-700 transition-all duration-300 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-red-500/25"
                  >
                    <TbWifiOff className="mr-2" size={16} />
                    {loading ? "Disconnecting..." : "Disconnect Session"}
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {/* Bandwidth */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Update Bandwidth
                    </label>
                    <div className="relative">
                      <TbBrandSpeedtest
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                        size={16}
                      />
                      <input
                        type="text"
                        value={bandwidth}
                        onChange={(e) => setBandwidth(e.target.value)}
                        placeholder="e.g., 1M/2M (upload/download)"
                        className="w-full font-lexend text-sm bg-white text-gray-600 font-medium rounded-lg border border-gray-300 pl-10 pr-3 py-2 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                      />
                    </div>
                    <button
                      onClick={handleUpdateBandwidth}
                      disabled={loading || !bandwidth}
                      className="w-full px-4 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-300 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-blue-500/25"
                    >
                      <TbBrandSpeedtest className="mr-2" size={16} />
                      {loading ? "Updating..." : "Update Bandwidth"}
                    </button>
                  </div>

                  {/* Extend Session */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Extend Session (Seconds)
                    </label>
                    <div className="relative">
                      <TbClock
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                        size={16}
                      />
                      <input
                        type="number"
                        value={timeout}
                        onChange={(e) => setTimeout(e.target.value)}
                        placeholder="e.g., 3600 for 1 hour"
                        className="w-full font-lexend text-sm bg-white text-gray-600 font-medium rounded-lg border border-gray-300 pl-10 pr-3 py-2 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors"
                      />
                    </div>
                    <button
                      onClick={handleExtendSession}
                      disabled={loading || !timeout}
                      className="w-full px-4 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-lg hover:from-emerald-600 hover:to-emerald-700 transition-all duration-300 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-emerald-500/25"
                    >
                      <TbClock className="mr-2" size={16} />
                      {loading ? "Extending..." : "Extend Session"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Notification Modal */}
          <NotificationModal
            isOpen={showNotification}
            onClose={() => setShowNotification(false)}
            type={notificationConfig.type}
            title={notificationConfig.title}
            message={notificationConfig.message}
            onConfirm={notificationConfig.onConfirm}
            confirmText={
              notificationConfig.type === "confirm" ? "Disconnect" : "OK"
            }
            cancelText="Cancel"
            showCancel={notificationConfig.type === "confirm"}
            autoClose={
              notificationConfig.type === "success" ||
              notificationConfig.type === "info"
            }
            autoCloseDelay={3000}
          />
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default SessionActions;
