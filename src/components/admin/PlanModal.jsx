import React, { useState, useEffect } from "react";
import { FiPlus, FiTrash2 } from "react-icons/fi";
import { FaPlus, FaMinus } from "react-icons/fa";
import { TbCheck } from "react-icons/tb";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";
import Checkbox from "../ui/Checkbox";

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

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-slate-200">
          <h2 className="text-xl font-bold font-lexend text-slate-800">
            {mode === "edit" ? "Edit Payment Plan" : "Add New Payment Plan"}
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Input
                label="Plan Name"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                required
                placeholder="e.g., Premium Day"
              />
            </div>
            <div>
              <Input
                label="Base Price (Kshs)"
                type="number"
                value={formData.basePrice}
                onChange={(e) => handleInputChange("basePrice", e.target.value)}
                required
                placeholder="50"
              />
            </div>
          </div>

          <div>
            <Input
              label="Description"
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              required
              placeholder="Brief description of the plan"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <Input
                label="Duration (Hours)"
                type="number"
                value={formData.durationHours}
                onChange={(e) =>
                  handleInputChange("durationHours", e.target.value)
                }
                required
                placeholder="24"
              />
            </div>
            <div>
              <Input
                label="Bandwidth Limit"
                value={formData.bandwidthLimit}
                onChange={(e) =>
                  handleInputChange("bandwidthLimit", e.target.value)
                }
                required
                placeholder="5M/3M"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Max Devices
              </label>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() =>
                    handleInputChange(
                      "maxDevices",
                      Math.max(1, formData.maxDevices - 1)
                    )
                  }
                  className="p-2 rounded-lg border border-slate-300 hover:bg-slate-100"
                >
                  <FaMinus size={12} />
                </button>
                <span className="px-4 py-2 text-center min-w-[60px] font-lexend font-semibold">
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
                  className="p-2 rounded-lg border border-slate-300 hover:bg-slate-100"
                >
                  <FaPlus size={12} />
                </button>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Features
            </label>
            <div className="space-y-3">
              {formData.features.map((feature, index) => (
                <div key={index} className="flex items-center gap-2">
                  <Input
                    value={feature}
                    onChange={(e) => handleFeatureChange(index, e.target.value)}
                    placeholder="Enter feature"
                    className="flex-1"
                  />
                  {formData.features.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeFeature(index)}
                      className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                    >
                      <FiTrash2 size={16} />
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={addFeature}
                className="text-sm text-primary-600 hover:text-primary-700 font-medium flex items-center gap-1"
              >
                <FiPlus size={14} />
                Add Feature
              </button>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <label className="flex items-center gap-2">
              <Checkbox
                checked={formData.isActive}
                onChange={(checked) => handleInputChange("isActive", checked)}
              />
              <span className="text-sm font-medium text-slate-700">
                Active Plan
              </span>
            </label>
            <label className="flex items-center gap-2">
              <Checkbox
                checked={formData.isPopular}
                onChange={(checked) => handleInputChange("isPopular", checked)}
              />
              <span className="text-sm font-medium text-slate-700">
                Mark as Popular
              </span>
            </label>
          </div>

          <div className="flex gap-3 pt-6 border-t border-slate-200">
            <Button
              type="button"
              variant="secondary2"
              onClick={onClose}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button type="submit" variant="gradient" className="flex-1">
              {mode === "edit" ? "Update Plan" : "Create Plan"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PlanModal;
