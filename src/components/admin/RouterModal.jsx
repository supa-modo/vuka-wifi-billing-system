import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiPlus,
  FiTrash2,
  FiX,
  FiCheck,
  FiWifi,
  FiClock,
  FiUsers,
  FiDollarSign,
  FiEdit3,
  FiMapPin,
  FiCpu,
  FiHardDrive,
  FiThermometer,
} from "react-icons/fi";
import {
  TbCheck,
  TbX,
  TbInfoCircle,
  TbShieldCheck,
  TbDevices,
  TbBrandSpeedtest,
  TbCalendarTime,
  TbClockEdit,
  TbTrash,
  TbPlus,
  TbSparkles,
  TbRouter,
  TbBuildingBroadcastTower,
} from "react-icons/tb";
import {
  PiCaretDownDuotone,
  PiChecksBold,
  PiSparkleDuotone,
  PiUsersThreeDuotone,
} from "react-icons/pi";
import { FaPlus, FaMinus } from "react-icons/fa";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";
import Checkbox from "../ui/Checkbox";
import ToggleSwitch from "../ui/ToggleSwitch";
import { MdOutlineLibraryAdd } from "react-icons/md";
import { RiSparkling2Line } from "react-icons/ri";

const RouterModal = ({ isOpen, onClose, router, onSave, mode = "add" }) => {
  const [formData, setFormData] = useState({
    name: "",
    model: "",
    ipAddress: "",
    macAddress: "",
    location: "",
    bandwidth: "",
    firmware: "",
    notes: "",
    isManaged: true,
    radiusEnabled: true,
    hotspotEnabled: true,
  });

  useEffect(() => {
    if (router && mode === "edit") {
      setFormData({
        name: router.name,
        model: router.model,
        ipAddress: router.ipAddress,
        macAddress: router.macAddress,
        location: router.location,
        bandwidth: router.bandwidth,
        firmware: router.firmware,
        notes: router.notes || "",
        isManaged: router.isManaged,
        radiusEnabled: router.radiusEnabled,
        hotspotEnabled: router.hotspotEnabled,
      });
    } else if (mode === "add") {
      setFormData({
        name: "",
        model: "",
        ipAddress: "",
        macAddress: "",
        location: "",
        bandwidth: "",
        firmware: "",
        notes: "",
        isManaged: true,
        radiusEnabled: true,
        hotspotEnabled: true,
      });
    }
  }, [router, mode, isOpen]);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const processedData = {
      ...formData,
      // Add default values for new routers
      status: mode === "add" ? "Online" : router.status,
      clients: mode === "add" ? 0 : router.clients,
      uptime: mode === "add" ? "0m" : router.uptime,
      uptimeSeconds: mode === "add" ? 0 : router.uptimeSeconds,
      cpu: mode === "add" ? 0 : router.cpu,
      memory: mode === "add" ? 0 : router.memory,
      temperature: mode === "add" ? 0 : router.temperature,
      voltage: mode === "add" ? 0 : router.voltage,
      lastSeen: mode === "add" ? new Date().toISOString() : router.lastSeen,
      totalTraffic: mode === "add" ? "0 GB" : router.totalTraffic,
    };
    onSave(processedData, mode, router?.id);
    onClose();
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="fixed inset-0 bg-black/50 backdrop-blur-[1.5px] flex items-start justify-end z-50 p-3 font-lexend"
          onClick={handleBackdropClick}
        >
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="w-[680px] h-[calc(100vh-24px)] bg-white shadow-2xl overflow-hidden rounded-3xl border border-gray-200"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-primary-600 to-primary-700 px-6 py-4 relative">
              <div className="relative flex justify-between items-center z-10">
                <div className="flex items-center p-1.5">
                  <TbRouter size={40} className="text-white mr-3" />
                  <div>
                    <h2 className="text-white font-semibold text-lg font-lexend">
                      {mode === "edit"
                        ? `Edit Router - ${router.name}`
                        : "Add New Router"}
                    </h2>
                    <p className="text-white/80 text-sm font-outfit">
                      {mode === "edit"
                        ? "Update router configuration and settings"
                        : "Add a new router to the network"}
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

            {/* Form Content */}
            <form
              onSubmit={handleSubmit}
              className="flex flex-col h-[calc(100vh-120px)] md:h-[calc(100vh-115px)]"
            >
              <div className="overflow-y-auto flex-1 px-6 py-5">
                <div className="space-y-6">
                  {/* Basic Information */}
                  <div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Router Name */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Router Name <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <TbRouter
                            className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                            size={18}
                          />
                          <input
                            type="text"
                            value={formData.name}
                            onChange={(e) =>
                              handleInputChange("name", e.target.value)
                            }
                            required
                            placeholder="e.g., Main Hub Router"
                            className="w-full font-lexend text-[0.93rem] bg-neutral-100 text-gray-600 font-medium rounded-lg border border-gray-300 pl-12 pr-4 py-2.5 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-colors"
                          />
                        </div>
                      </div>

                      {/* Model */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Model <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <TbBuildingBroadcastTower
                            className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                            size={18}
                          />
                          <input
                            type="text"
                            value={formData.model}
                            onChange={(e) =>
                              handleInputChange("model", e.target.value)
                            }
                            required
                            placeholder="e.g., MikroTik hEX S"
                            className="w-full font-lexend text-[0.93rem] bg-neutral-100 text-gray-600 font-medium rounded-lg border border-gray-300 pl-12 pr-4 py-2.5 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-colors"
                          />
                        </div>
                      </div>
                    </div>

                    {/* IP Address */}
                    <div className="mt-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        IP Address <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <FiWifi
                          className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                          size={18}
                        />
                        <input
                          type="text"
                          value={formData.ipAddress}
                          onChange={(e) =>
                            handleInputChange("ipAddress", e.target.value)
                          }
                          required
                          placeholder="192.168.1.1"
                          className="w-full font-lexend text-[0.93rem] bg-neutral-100 text-gray-600 font-medium rounded-lg border border-gray-300 pl-12 pr-4 py-2.5 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-colors"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Network Configuration */}
                  <div className="border-t border-gray-200 pt-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* MAC Address */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          MAC Address
                        </label>
                        <div className="relative">
                          <TbDevices
                            className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                            size={20}
                          />
                          <input
                            type="text"
                            value={formData.macAddress}
                            onChange={(e) =>
                              handleInputChange("macAddress", e.target.value)
                            }
                            placeholder="4C:5E:0C:12:34:56"
                            className="w-full font-lexend text-[0.93rem] bg-neutral-100 text-gray-600 font-medium rounded-lg border border-gray-300 pl-12 pr-4 py-2.5 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-colors"
                          />
                        </div>
                      </div>

                      {/* Bandwidth */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Bandwidth
                        </label>
                        <div className="relative">
                          <TbBrandSpeedtest
                            className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                            size={20}
                          />
                          <input
                            type="text"
                            value={formData.bandwidth}
                            onChange={(e) =>
                              handleInputChange("bandwidth", e.target.value)
                            }
                            placeholder="1000 Mbps"
                            className="w-full font-lexend text-[0.93rem] bg-neutral-100 text-gray-600 font-medium rounded-lg border border-gray-300 pl-12 pr-4 py-2.5 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-colors"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Location and Firmware */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                      {/* Location */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Location
                        </label>
                        <div className="relative">
                          <FiMapPin
                            className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                            size={18}
                          />
                          <input
                            type="text"
                            value={formData.location}
                            onChange={(e) =>
                              handleInputChange("location", e.target.value)
                            }
                            placeholder="e.g., Main Office"
                            className="w-full font-lexend text-[0.93rem] bg-neutral-100 text-gray-600 font-medium rounded-lg border border-gray-300 pl-12 pr-4 py-2.5 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-colors"
                          />
                        </div>
                      </div>

                      {/* Firmware */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Firmware Version
                        </label>
                        <div className="relative">
                          <TbClockEdit
                            className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                            size={20}
                          />
                          <input
                            type="text"
                            value={formData.firmware}
                            onChange={(e) =>
                              handleInputChange("firmware", e.target.value)
                            }
                            placeholder="v7.6"
                            className="w-full font-lexend text-[0.93rem] bg-neutral-100 text-gray-600 font-medium rounded-lg border border-gray-300 pl-12 pr-4 py-2.5 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-colors"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Notes */}
                  <div className="border-t border-gray-200 pt-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Notes
                    </label>
                    <textarea
                      value={formData.notes}
                      onChange={(e) =>
                        handleInputChange("notes", e.target.value)
                      }
                      placeholder="Additional notes about this router..."
                      rows={3}
                      className="w-full font-lexend text-[0.93rem] bg-neutral-100 text-gray-600 font-medium rounded-lg border border-gray-300 px-4 py-2.5 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-colors resize-none"
                    />
                  </div>

                  {/* Router Settings */}
                  <div className="border-t border-gray-200 pt-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-center justify-between pl-4 pr-6 py-4 border border-gray-200 rounded-full bg-white hover:bg-gray-50 transition-colors">
                        <div className="flex items-center">
                          <div className="w-10 h-10 rounded-full border border-blue-300 bg-blue-200/70 flex items-center justify-center mr-3">
                            <TbShieldCheck
                              className="text-blue-500"
                              size={22}
                            />
                          </div>
                          <div>
                            <label className="text-sm font-semibold text-gray-600 cursor-pointer">
                              RADIUS Enabled
                            </label>
                            <p className="text-xs font-sans text-gray-500">
                              Authentication via RADIUS
                            </p>
                          </div>
                        </div>
                        <ToggleSwitch
                          checked={formData.radiusEnabled}
                          onChange={() =>
                            handleInputChange(
                              "radiusEnabled",
                              !formData.radiusEnabled
                            )
                          }
                          variant="default"
                          title={
                            formData.radiusEnabled
                              ? "Disable RADIUS"
                              : "Enable RADIUS"
                          }
                        />
                      </div>

                      <div className="flex items-center justify-between pl-4 pr-6 py-4 border border-gray-200 rounded-full bg-white hover:bg-gray-50 transition-colors">
                        <div className="flex items-center">
                          <div className="w-10 h-10 rounded-full border border-secondary-300 bg-secondary-200/70 flex items-center justify-center mr-3">
                            <RiSparkling2Line
                              className="text-secondary-500"
                              size={22}
                            />
                          </div>
                          <div>
                            <label className="text-sm font-semibold text-gray-600 cursor-pointer">
                              Hotspot Enabled
                            </label>
                            <p className="text-xs font-sans text-gray-500">
                              Captive portal access
                            </p>
                          </div>
                        </div>
                        <ToggleSwitch
                          checked={formData.hotspotEnabled}
                          onChange={() =>
                            handleInputChange(
                              "hotspotEnabled",
                              !formData.hotspotEnabled
                            )
                          }
                          variant="secondary"
                          title={
                            formData.hotspotEnabled
                              ? "Disable Hotspot"
                              : "Enable Hotspot"
                          }
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Sticky Footer */}
              <div className="border-t border-gray-200 bg-white px-6 py-5">
                <div className="flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-6 py-2.5 text-sm border border-gray-300 rounded-[0.6rem] text-gray-700 bg-white hover:bg-gray-50 transition-colors font-semibold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 text-sm bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-[0.6rem] hover:from-primary-700 hover:to-primary-800 transition-all duration-300 flex items-center font-semibold shadow-lg shadow-primary-500/25"
                  >
                    <TbRouter className="mr-2 h-4 w-4" />
                    {mode === "edit" ? "Update Router" : "Add Router"}
                  </button>
                </div>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default RouterModal;
