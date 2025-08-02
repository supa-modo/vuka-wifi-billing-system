import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiPlus,
  FiTrash2,
  FiX,
  FiCheck,
  FiUser,
  FiMail,
  FiPhone,
  FiDollarSign,
  FiEdit3,
  FiUserCheck,
  FiUserX,
} from "react-icons/fi";
import {
  TbCheck,
  TbX,
  TbUserPlus,
  TbInfoCircle,
  TbShieldCheck,
  TbCoins,
  TbDevices,
  TbCalendarTime,
  TbCalendarDollar,
  TbClockEdit,
  TbTrash,
  TbPlus,
  TbSparkles,
  TbUserEdit,
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

const UserModal = ({ isOpen, onClose, user, onSave, mode = "add" }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    status: "Active",
    plan: "",
    planBandwidth: "",
    devicesConnected: 1,
    totalSpent: "",
    notes: "",
    isActive: true,
    isPremium: false,
  });

  useEffect(() => {
    if (user && mode === "edit") {
      setFormData({
        name: user.name,
        email: user.email,
        phone: user.phone,
        status: user.status,
        plan: user.plan,
        planBandwidth: user.planBandwidth.toString(),
        devicesConnected: user.devicesConnected,
        totalSpent: user.totalSpent.toString(),
        notes: user.notes || "",
        isActive: user.status === "Active",
        isPremium: user.isPremium || false,
      });
    } else if (mode === "add") {
      setFormData({
        name: "",
        email: "",
        phone: "",
        status: "Active",
        plan: "",
        planBandwidth: "",
        devicesConnected: 1,
        totalSpent: "",
        notes: "",
        isActive: true,
        isPremium: false,
      });
    }
  }, [user, mode, isOpen]);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const processedData = {
      ...formData,
      planBandwidth: parseInt(formData.planBandwidth) || 0,
      totalSpent: parseFloat(formData.totalSpent) || 0,
      devicesConnected: parseInt(formData.devicesConnected),
    };
    onSave(processedData, mode, user?.id);
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
                  <TbUserEdit size={40} className="text-white mr-3" />
                  <div>
                    <h2 className="text-white font-semibold text-lg font-lexend">
                      {mode === "edit"
                        ? `Edit User - ${user.name}`
                        : "Add New User"}
                    </h2>
                    <p className="text-white/80 text-sm font-outfit">
                      {mode === "edit"
                        ? "Update user information and settings"
                        : "Create a new user account"}
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
                      {/* User Name */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Full Name <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <FiUser
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
                            placeholder="e.g., John Doe"
                            className="w-full font-lexend text-[0.93rem] bg-neutral-100 text-gray-600 font-medium rounded-lg border border-gray-300 pl-12 pr-4 py-2.5 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-colors"
                          />
                        </div>
                      </div>

                      {/* Email */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Email Address <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <FiMail
                            className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                            size={18}
                          />
                          <input
                            type="email"
                            value={formData.email}
                            onChange={(e) =>
                              handleInputChange("email", e.target.value)
                            }
                            required
                            placeholder="john.doe@example.com"
                            className="w-full font-lexend text-[0.93rem] bg-neutral-100 text-gray-600 font-medium rounded-lg border border-gray-300 pl-12 pr-4 py-2.5 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-colors"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Phone Number */}
                    <div className="mt-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <FiPhone
                          className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                          size={18}
                        />
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) =>
                            handleInputChange("phone", e.target.value)
                          }
                          required
                          placeholder="254712345678"
                          className="w-full font-lexend text-[0.93rem] bg-neutral-100 text-gray-600 font-medium rounded-lg border border-gray-300 pl-12 pr-4 py-2.5 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-colors"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Plan Settings */}
                  <div className="border-t border-gray-200 pt-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {/* Current Plan */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Current Plan
                        </label>
                        <div className="relative">
                          <TbCalendarDollar
                            className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                            size={20}
                          />
                          <input
                            type="text"
                            value={formData.plan}
                            onChange={(e) =>
                              handleInputChange("plan", e.target.value)
                            }
                            placeholder="e.g., 1 Day Plan"
                            className="w-full font-lexend text-[0.93rem] bg-neutral-100 text-gray-600 font-medium rounded-lg border border-gray-300 pl-12 pr-4 py-2.5 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-colors"
                          />
                        </div>
                      </div>

                      {/* Bandwidth */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Bandwidth (Mbps)
                        </label>
                        <div className="relative">
                          <TbDevices
                            className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                            size={20}
                          />
                          <input
                            type="number"
                            value={formData.planBandwidth}
                            onChange={(e) =>
                              handleInputChange("planBandwidth", e.target.value)
                            }
                            placeholder="10"
                            className="w-full font-lexend text-[0.93rem] bg-neutral-100 text-gray-600 font-medium rounded-lg border border-gray-300 pl-12 pr-4 py-2.5 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-colors"
                          />
                        </div>
                      </div>

                      {/* Devices Connected */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Devices Connected
                        </label>
                        <div className="flex items-center gap-2 bg-neutral-100 rounded-lg border border-gray-300 justify-center py-2">
                          <button
                            type="button"
                            onClick={() =>
                              handleInputChange(
                                "devicesConnected",
                                Math.max(0, formData.devicesConnected - 1)
                              )
                            }
                            className="p-1.5 rounded-md hover:bg-gray-200 transition-colors"
                          >
                            <FaMinus size={14} className="text-gray-600" />
                          </button>
                          <span className="px-3 py-1 text-center min-w-[40px] font-lexend font-semibold text-secondary-500 bg-slate-50 rounded-md">
                            {formData.devicesConnected}
                          </span>
                          <button
                            type="button"
                            onClick={() =>
                              handleInputChange(
                                "devicesConnected",
                                Math.min(10, formData.devicesConnected + 1)
                              )
                            }
                            className="p-1.5 rounded-md hover:bg-gray-200 transition-colors"
                          >
                            <FaPlus size={14} className="text-gray-600" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Financial Information */}
                  <div className="border-t border-gray-200 pt-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Total Spent */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Total Spent (Kshs)
                        </label>
                        <div className="relative">
                          <TbCoins
                            className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                            size={20}
                          />
                          <input
                            type="number"
                            value={formData.totalSpent}
                            onChange={(e) =>
                              handleInputChange("totalSpent", e.target.value)
                            }
                            placeholder="0"
                            className="w-full font-lexend text-[0.93rem] bg-neutral-100 text-gray-600 font-medium rounded-lg border border-gray-300 pl-12 pr-4 py-2.5 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-colors"
                          />
                        </div>
                      </div>

                      {/* Status */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Account Status
                        </label>
                        <div className="relative">
                          <select
                            value={formData.status}
                            onChange={(e) =>
                              handleInputChange("status", e.target.value)
                            }
                            className="w-full font-lexend text-[0.93rem] bg-neutral-100 text-gray-600 font-medium rounded-lg border border-gray-300 px-4 py-2.5 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-colors"
                          >
                            <option value="Active">Active</option>
                            <option value="Inactive">Inactive</option>
                            <option value="Banned">Banned</option>
                          </select>
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
                      placeholder="Additional notes about this user..."
                      rows={3}
                      className="w-full font-lexend text-[0.93rem] bg-neutral-100 text-gray-600 font-medium rounded-lg border border-gray-300 px-4 py-2.5 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-colors resize-none"
                    />
                  </div>

                  {/* User Settings */}
                  <div className="border-t border-gray-200 pt-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-center justify-between pl-8 pr-6 py-4 border border-gray-200 rounded-full bg-white hover:bg-gray-50 transition-colors">
                        <div className="flex items-center">
                          <div>
                            <label className="text-sm font-semibold text-gray-600 cursor-pointer">
                              Active Account
                            </label>
                            <p className="text-xs font-sans text-gray-500">
                              User can access the network
                            </p>
                          </div>
                        </div>
                        <ToggleSwitch
                          checked={formData.isActive}
                          onChange={() =>
                            handleInputChange("isActive", !formData.isActive)
                          }
                          variant="success"
                          title={
                            formData.isActive
                              ? "Deactivate Account"
                              : "Activate Account"
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
                              Premium User
                            </label>
                            <p className="text-xs font-sans text-gray-500">
                              Special privileges and features
                            </p>
                          </div>
                        </div>
                        <ToggleSwitch
                          checked={formData.isPremium}
                          onChange={() =>
                            handleInputChange("isPremium", !formData.isPremium)
                          }
                          variant="secondary"
                          title={
                            formData.isPremium
                              ? "Remove Premium Status"
                              : "Mark as Premium"
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
                    <TbUserEdit className="mr-2 h-4 w-4" />
                    {mode === "edit" ? "Update User" : "Create User"}
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

export default UserModal;
