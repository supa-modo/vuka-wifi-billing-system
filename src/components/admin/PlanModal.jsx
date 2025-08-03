import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiX,
  FiEdit3,
} from "react-icons/fi";
import {
    TbCoins,
  TbBrandSpeedtest,
  TbCalendarDollar,
  TbClockEdit,
  TbTrash,
} from "react-icons/tb";
import { PiChecksBold } from "react-icons/pi";
import { FaPlus, FaMinus } from "react-icons/fa";
import ToggleSwitch from "../ui/ToggleSwitch";
import { MdOutlineLibraryAdd } from "react-icons/md";
import { RiSparkling2Line } from "react-icons/ri";

const PlanModal = ({ isOpen, onClose, plan, onSave, mode = "add" }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    basePrice: "",
    durationHours: "",
    bandwidthLimit: "",
    maxDevices: 1,
    isActive: true,
    isPopular: false,
    features: [""],
  });

  useEffect(() => {
    if (plan && mode === "edit") {
      setFormData({
        name: plan.name,
        description: plan.description,
        basePrice: plan.basePrice.toString(),
        durationHours: plan.durationHours.toString(),
        bandwidthLimit: plan.bandwidthLimit,
        maxDevices: plan.maxDevices,
        isActive: plan.isActive,
        isPopular: plan.isPopular,
        features: plan.features.length > 0 ? plan.features : [""],
      });
    } else if (mode === "add") {
      setFormData({
        name: "",
        description: "",
        basePrice: "",
        durationHours: "",
        bandwidthLimit: "",
        maxDevices: 1,
        isActive: true,
        isPopular: false,
        features: [""],
      });
    }
  }, [plan, mode, isOpen]);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleFeatureChange = (index, value) => {
    const newFeatures = [...formData.features];
    newFeatures[index] = value;
    setFormData((prev) => ({ ...prev, features: newFeatures }));
  };

  const addFeature = () => {
    setFormData((prev) => ({ ...prev, features: [...prev.features, ""] }));
  };

  const removeFeature = (index) => {
    if (formData.features.length > 1) {
      const newFeatures = formData.features.filter((_, i) => i !== index);
      setFormData((prev) => ({ ...prev, features: newFeatures }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const processedData = {
      ...formData,
      basePrice: parseFloat(formData.basePrice),
      durationHours: parseInt(formData.durationHours),
      features: formData.features.filter((f) => f.trim() !== ""),
    };
    onSave(processedData, mode, plan?.id);
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
                  <TbCalendarDollar size={40} className="text-white mr-3" />
                  <div>
                    <h2 className="text-white font-semibold text-lg font-lexend">
                      {mode === "edit"
                        ? `Edit Hotspot Payment Plan - ${plan.name}`
                        : "Add New Payment Plan"}
                    </h2>
                    <p className="text-white/80 text-sm font-outfit">
                      {mode === "edit"
                        ? "Update and change plan details or features"
                        : "Create a new Hotspot payment plan"}
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
                      {/* Plan Name */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Plan Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          value={formData.name}
                          onChange={(e) =>
                            handleInputChange("name", e.target.value)
                          }
                          required
                          placeholder="e.g., Premium Day"
                          className="w-full font-lexend text-[0.93rem] bg-neutral-100 text-gray-600 font-medium rounded-lg border border-gray-300 px-4 py-2.5 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-colors"
                        />
                      </div>

                      {/* Base Price */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Base Price (Kshs){" "}
                          <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <TbCoins
                            className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                            size={18}
                          />
                          <input
                            type="number"
                            value={formData.basePrice}
                            onChange={(e) =>
                              handleInputChange("basePrice", e.target.value)
                            }
                            required
                            placeholder="50"
                            className="w-full font-lexend text-[0.93rem] bg-neutral-100 text-gray-600 font-medium rounded-lg border border-gray-300 pl-[3.2rem] pr-4 py-2.5 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-colors"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Description */}
                    <div className="mt-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Description <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        value={formData.description}
                        onChange={(e) =>
                          handleInputChange("description", e.target.value)
                        }
                        required
                        placeholder="Brief description of the plan"
                        rows={3}
                        className="w-full font-lexend text-[0.93rem] bg-neutral-100 text-gray-600 font-medium rounded-lg border border-gray-300 px-4 py-2.5 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-colors resize-none"
                      />
                    </div>
                  </div>

                  {/* Plan Settings */}
                  <div className="border-t border-gray-200 pt-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {/* Duration */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Duration (Hours){" "}
                          <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <TbClockEdit
                            className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                            size={20}
                          />
                          <input
                            type="number"
                            value={formData.durationHours}
                            onChange={(e) =>
                              handleInputChange("durationHours", e.target.value)
                            }
                            required
                            placeholder="24"
                            className="w-full font-lexend text-[0.93rem] bg-neutral-100 text-gray-600 font-medium rounded-lg border border-gray-300 pl-12 pr-4 py-2.5 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-colors"
                          />
                        </div>
                      </div>

                      {/* Bandwidth Limit */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Bandwidth Limit{" "}
                          <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <TbBrandSpeedtest
                            className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                            size={20}
                          />
                          <input
                            type="text"
                            value={formData.bandwidthLimit}
                            onChange={(e) =>
                              handleInputChange(
                                "bandwidthLimit",
                                e.target.value
                              )
                            }
                            required
                            placeholder="5M/3M"
                            className="w-full font-lexend text-[0.93rem] bg-neutral-100 text-gray-600 font-medium rounded-lg border border-gray-300 pl-12 pr-4 py-2.5 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-colors"
                          />
                        </div>
                      </div>

                      {/* Max Devices */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Max Devices
                        </label>
                        <div className="flex items-center gap-2 bg-neutral-100 rounded-lg border border-gray-300 justify-center py-2">
                          <button
                            type="button"
                            onClick={() =>
                              handleInputChange(
                                "maxDevices",
                                Math.max(1, formData.maxDevices - 1)
                              )
                            }
                            className="p-1.5 rounded-md hover:bg-gray-200 transition-colors"
                          >
                            <FaMinus size={14} className="text-gray-600" />
                          </button>
                          <span className="px-3 py-1 text-center min-w-[40px] font-lexend font-semibold text-secondary-500 bg-slate-50 rounded-md">
                            {formData.maxDevices}
                          </span>
                          <button
                            type="button"
                            onClick={() =>
                              handleInputChange(
                                "maxDevices",
                                Math.min(20, formData.maxDevices + 1)
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

                  {/* Features */}
                  <div className="border-t border-gray-200 pt-6">
                    <h3 className="font-semibold text-secondary-600 mb-4 flex items-center">
                      Plan Features
                    </h3>
                    <div className="space-y-3">
                      {formData.features.map((feature, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <div className="flex-1 relative">
                            <PiChecksBold
                              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                              size={16}
                            />
                            <input
                              type="text"
                              value={feature}
                              onChange={(e) =>
                                handleFeatureChange(index, e.target.value)
                              }
                              placeholder="Enter feature description"
                              className="w-full font-lexend text-[0.93rem] bg-neutral-100 text-gray-600 font-medium rounded-lg border border-gray-300 pl-10 pr-4 py-2.5 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-colors"
                            />
                          </div>
                          {formData.features.length > 1 && (
                            <button
                              type="button"
                              onClick={() => removeFeature(index)}
                              className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                            >
                              <TbTrash size={22} />
                            </button>
                          )}
                        </div>
                      ))}
                      <button
                        type="button"
                        onClick={addFeature}
                        className="text-sm text-primary-600 underline underline-offset-4 hover:text-primary-700 font-medium flex items-center gap-2 hover:bg-primary-50 px-3 py-2 rounded-lg transition-colors"
                      >
                        <MdOutlineLibraryAdd size={20} />
                        Add New Feature
                      </button>
                    </div>
                  </div>

                  {/* Plan Status */}
                  <div className="border-t border-gray-200 pt-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-center justify-between pl-8 pr-6 py-4 border border-gray-200 rounded-full bg-white hover:bg-gray-50 transition-colors">
                        <div className="flex items-center">
                          <div>
                            <label className="text-sm font-semibold text-gray-600 cursor-pointer">
                              Set Plan as Active
                            </label>
                            <p className="text-xs font-sans text-gray-500">
                              Plan is available in captive portal
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
                              ? "Deactivate Plan"
                              : "Activate Plan"
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
                              Mark as Popular
                            </label>
                            <p className="text-xs font-sans text-gray-500">
                              Highlight this plan to users
                            </p>
                          </div>
                        </div>
                        <ToggleSwitch
                          checked={formData.isPopular}
                          onChange={() =>
                            handleInputChange("isPopular", !formData.isPopular)
                          }
                          variant="secondary"
                          title={
                            formData.isPopular
                              ? "Remove Popular Mark"
                              : "Mark as Popular"
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
                    <FiEdit3 className="mr-2 h-4 w-4" />
                    {mode === "edit" ? "Update Plan" : "Create Plan"}
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

export default PlanModal;
