import React, { useState, useMemo, useEffect } from "react";
import {
  FiPlus,
  FiEdit3,
  FiTrash2,
  FiMoreVertical,
  FiDollarSign,
  FiWifi,
  FiClock,
  FiUsers,
  FiArrowUp,
  FiArrowDown,
  FiEye,
  FiCopy,
} from "react-icons/fi";
import {
  TbFilterFilled,
  TbSearch,
  TbCheck,
  TbDevices,
  TbWifi,
  TbSpeedboat,
  TbCurrencyDollar,
} from "react-icons/tb";
import { FaPlus, FaMinus } from "react-icons/fa";
import Checkbox from "../ui/Checkbox";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";
import { Card } from "../ui/Card";

// Mock Data - Replace with API calls
const mockPlans = [
  {
    id: 1,
    name: "Basic Hour",
    description: "Perfect for quick browsing and social media",
    basePrice: 20,
    durationHours: 1,
    bandwidthLimit: "2M/1M",
    maxDevices: 3,
    isActive: true,
    isPopular: false,
    features: ["Basic speed", "1 hour access", "Up to 3 devices"],
    createdAt: "2023-10-15T10:00:00Z",
    subscribers: 145,
  },
  {
    id: 2,
    name: "Standard Day",
    description: "Great for work and entertainment all day long",
    basePrice: 50,
    durationHours: 24,
    bandwidthLimit: "5M/3M",
    maxDevices: 5,
    isActive: true,
    isPopular: true,
    features: [
      "Fast speed",
      "24 hours access",
      "Up to 5 devices",
      "Priority support",
    ],
    createdAt: "2023-10-14T14:30:00Z",
    subscribers: 892,
  },
  {
    id: 3,
    name: "Premium Week",
    description: "Ultimate experience for heavy users and families",
    basePrice: 300,
    durationHours: 168,
    bandwidthLimit: "10M/5M",
    maxDevices: 10,
    isActive: true,
    isPopular: false,
    features: [
      "Ultra-fast speed",
      "7 days access",
      "Up to 10 devices",
      "24/7 support",
      "Data backup",
    ],
    createdAt: "2023-10-13T09:15:00Z",
    subscribers: 234,
  },
  {
    id: 4,
    name: "Student Special",
    description: "Affordable option for students",
    basePrice: 15,
    durationHours: 6,
    bandwidthLimit: "3M/2M",
    maxDevices: 2,
    isActive: false,
    isPopular: false,
    features: ["Student discount", "6 hours access", "Up to 2 devices"],
    createdAt: "2023-10-12T16:45:00Z",
    subscribers: 67,
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
            Filter Plans
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
                onChange={(e) =>
                  handleInputChange("isActive", e.target.checked)
                }
              />
              <span className="text-sm font-medium text-slate-700">
                Active Plan
              </span>
            </label>
            <label className="flex items-center gap-2">
              <Checkbox
                checked={formData.isPopular}
                onChange={(e) =>
                  handleInputChange("isPopular", e.target.checked)
                }
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

const PaymentPlans = () => {
  const [plans, setPlans] = useState(mockPlans);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPlans, setSelectedPlans] = useState([]);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [showPlanModal, setShowPlanModal] = useState(false);
  const [modalMode, setModalMode] = useState("add");
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [filters, setFilters] = useState({ status: [], duration: [] });
  const [sortConfig, setSortConfig] = useState({
    key: "createdAt",
    direction: "descending",
  });

  const availableOptions = useMemo(
    () => ({
      status: ["Active", "Inactive"],
      duration: [
        ...new Set(
          plans.map((p) => {
            if (p.durationHours <= 6) return "Short Term";
            if (p.durationHours <= 24) return "Daily";
            if (p.durationHours <= 168) return "Weekly";
            return "Long Term";
          })
        ),
      ],
    }),
    [plans]
  );

  const filteredPlans = useMemo(() => {
    return plans.filter((plan) => {
      const matchesSearch =
        plan.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        plan.description.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus =
        filters.status.length === 0 ||
        filters.status.includes(plan.isActive ? "Active" : "Inactive");

      const planDuration =
        plan.durationHours <= 6
          ? "Short Term"
          : plan.durationHours <= 24
          ? "Daily"
          : plan.durationHours <= 168
          ? "Weekly"
          : "Long Term";
      const matchesDuration =
        filters.duration.length === 0 ||
        filters.duration.includes(planDuration);

      return matchesSearch && matchesStatus && matchesDuration;
    });
  }, [plans, searchTerm, filters]);

  const sortedPlans = useMemo(() => {
    let sortableItems = [...filteredPlans];
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
  }, [filteredPlans, sortConfig]);

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
      setSelectedPlans(sortedPlans.map((p) => p.id));
    } else {
      setSelectedPlans([]);
    }
  };

  const handleSelectPlan = (planId, checked) => {
    if (checked) {
      setSelectedPlans((prev) => [...prev, planId]);
    } else {
      setSelectedPlans((prev) => prev.filter((id) => id !== planId));
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
    console.log(`Performing ${action} on plans:`, selectedPlans);

    if (action === "activate") {
      setPlans((prev) =>
        prev.map((plan) =>
          selectedPlans.includes(plan.id) ? { ...plan, isActive: true } : plan
        )
      );
    } else if (action === "deactivate") {
      setPlans((prev) =>
        prev.map((plan) =>
          selectedPlans.includes(plan.id) ? { ...plan, isActive: false } : plan
        )
      );
    } else if (action === "delete") {
      setPlans((prev) =>
        prev.filter((plan) => !selectedPlans.includes(plan.id))
      );
    }

    setSelectedPlans([]);
  };

  const handlePlanAction = (action, planId) => {
    const plan = plans.find((p) => p.id === planId);

    if (action === "edit") {
      setSelectedPlan(plan);
      setModalMode("edit");
      setShowPlanModal(true);
    } else if (action === "delete") {
      setPlans((prev) => prev.filter((p) => p.id !== planId));
    } else if (action === "duplicate") {
      const newPlan = {
        ...plan,
        id: Math.max(...plans.map((p) => p.id)) + 1,
        name: `${plan.name} (Copy)`,
        createdAt: new Date().toISOString(),
        subscribers: 0,
      };
      setPlans((prev) => [...prev, newPlan]);
    } else if (action === "toggle") {
      setPlans((prev) =>
        prev.map((p) => (p.id === planId ? { ...p, isActive: !p.isActive } : p))
      );
    }
  };

  const handleSavePlan = (planData, mode, planId) => {
    if (mode === "edit") {
      setPlans((prev) =>
        prev.map((p) => (p.id === planId ? { ...p, ...planData } : p))
      );
    } else {
      const newPlan = {
        ...planData,
        id: Math.max(...plans.map((p) => p.id)) + 1,
        createdAt: new Date().toISOString(),
        subscribers: 0,
      };
      setPlans((prev) => [...prev, newPlan]);
    }
  };

  const formatDuration = (hours) => {
    if (hours < 24) return `${hours} hour${hours > 1 ? "s" : ""}`;
    if (hours < 168)
      return `${Math.floor(hours / 24)} day${
        Math.floor(hours / 24) > 1 ? "s" : ""
      }`;
    return `${Math.floor(hours / 168)} week${
      Math.floor(hours / 168) > 1 ? "s" : ""
    }`;
  };

  const getStatusChip = (isActive) => {
    return isActive
      ? "bg-emerald-100 text-emerald-700 border border-emerald-200/80"
      : "bg-red-100 text-red-700 border border-red-200/80";
  };

  const calculatePlanPrice = (plan, deviceCount) => {
    if (deviceCount <= 1) return plan.basePrice;
    return Math.round(plan.basePrice * (1 + 0.6 * (deviceCount - 1)));
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
                Payment Plans
              </h1>
              <p className="text-slate-500 font-lexend text-sm">
                Manage WiFi subscription plans and pricing.
              </p>
            </div>
            <div className="flex items-center gap-4">
              <Button
                variant="gradient"
                onClick={() => {
                  setModalMode("add");
                  setSelectedPlan(null);
                  setShowPlanModal(true);
                }}
                className="flex items-center gap-2"
              >
                <FiPlus size={18} />
                <span>Add Plan</span>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 m-6 mb-0">
        <StatCard
          title="Total Plans"
          value={plans.length.toString()}
          change="+12.5%"
          changeType="increase"
          icon={<TbWifi />}
          gradient="from-blue-500 to-blue-600"
        />
        <StatCard
          title="Active Plans"
          value={plans.filter((p) => p.isActive).length.toString()}
          change="+8.2%"
          changeType="increase"
          icon={<FiWifi />}
          gradient="from-emerald-500 to-emerald-600"
        />
        <StatCard
          title="Total Subscribers"
          value={plans
            .reduce((sum, p) => sum + p.subscribers, 0)
            .toLocaleString()}
          change="+23.1%"
          changeType="increase"
          icon={<FiUsers />}
          gradient="from-purple-500 to-purple-600"
        />
        <StatCard
          title="Revenue/Month"
          value={`Kshs. ${(
            plans.reduce((sum, p) => sum + p.basePrice * p.subscribers, 0) /
            1000
          ).toFixed(1)}K`}
          change="+18.7%"
          changeType="increase"
          icon={<FiDollarSign />}
          gradient="from-amber-500 to-amber-600"
        />
      </div>

      {/* Main Content */}
      <div className="backdrop-blur-xl bg-white/70 rounded-[1.5rem] border border-white/30 shadow-xl shadow-blue-500/5 m-6 p-6">
        {/* Toolbar */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
          <div
            className={`flex items-center gap-6 pl-4 pr-[0.3rem] py-[0.35rem] rounded-lg border ${
              selectedPlans.length > 0
                ? "border-primary-200/50"
                : "border-transparent"
            } flex-shrink-0`}
          >
            {selectedPlans.length > 0 ? (
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2.5">
                  <TbCheck className="text-primary-600 w-4 h-4" />
                  <div className="text-[0.9rem] font-medium text-primary-700 whitespace-nowrap">
                    <span className="font-lexend">{selectedPlans.length} </span>
                    {selectedPlans.length > 1 ? "plans" : "plan"} selected
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleBulkAction("activate")}
                    className="px-4 py-1.5 text-xs font-lexend font-medium text-emerald-700 bg-emerald-200 border border-emerald-400 rounded-lg hover:bg-emerald-300 hover:text-emerald-800 transition-colors flex items-center gap-1 whitespace-nowrap"
                  >
                    <TbCheck size={12} className="mr-1" />
                    Activate
                  </button>
                  <button
                    onClick={() => handleBulkAction("deactivate")}
                    className="px-4 py-1.5 text-xs font-lexend font-medium text-amber-700 bg-amber-200 border border-amber-400 rounded-lg hover:bg-amber-300 hover:text-amber-800 transition-colors flex items-center gap-1 whitespace-nowrap"
                  >
                    <FiClock size={12} className="mr-1" />
                    Deactivate
                  </button>
                  <button
                    onClick={() => handleBulkAction("delete")}
                    className="px-4 py-1.5 text-xs font-lexend font-medium text-red-700 bg-red-200 border border-red-400 rounded-lg hover:bg-red-300 hover:text-red-800 transition-colors flex items-center gap-1 whitespace-nowrap"
                  >
                    <FiTrash2 size={12} className="mr-1" />
                    Delete
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-3 text-slate-600 min-w-[30rem]">
                <div className="flex items-center gap-2">
                  <span className="text-lg font-lexend font-semibold text-secondary-600 whitespace-nowrap">
                    {sortedPlans.length} Plans
                  </span>
                </div>
                <div className="h-6 border-l border-slate-300/70"></div>
                <p className="text-sm text-slate-500 font-lexend">
                  Manage your WiFi subscription plans
                </p>
              </div>
            )}
          </div>

          <div className="flex items-center gap-2.5">
            <div className="relative">
              <TbSearch
                className="absolute top-1/2 left-4 -translate-y-1/2 text-slate-400 z-10"
                size={18}
              />
              <input
                type="text"
                placeholder="Search plans..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-11 pr-4 py-2.5 w-64 bg-white/80 border border-slate-200/90 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all shadow-sm"
              />
            </div>
            <div className="relative filter-dropdown-container">
              <button
                onClick={() => setShowFilterModal(!showFilterModal)}
                className="p-3 bg-white/80 border border-slate-200/90 rounded-lg text-slate-600 hover:bg-slate-100/70 transition-colors shadow-sm"
              >
                {filters.status.length > 0 || filters.duration.length > 0 ? (
                  <TbFilterFilled className="text-primary-600" size={20} />
                ) : (
                  <TbFilterFilled size={20} />
                )}
              </button>
              <FilterDropdown
                isOpen={showFilterModal}
                onClose={() => setShowFilterModal(false)}
                onClear={() => setFilters({ status: [], duration: [] })}
                filters={filters}
                onToggle={handleFilterToggle}
                availableOptions={availableOptions}
              />
            </div>
          </div>
        </div>

        {/* Plans Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-slate-500">
            <thead className="text-xs text-slate-700 uppercase bg-slate-100/80">
              <tr>
                <th scope="col" className="p-4">
                  <Checkbox
                    id="select-all"
                    onChange={(e) => handleSelectAll(e.target.checked)}
                    checked={
                      selectedPlans.length === sortedPlans.length &&
                      sortedPlans.length > 0
                    }
                  />
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 cursor-pointer"
                  onClick={() => handleSort("name")}
                >
                  Plan Name {getSortIcon("name")}
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 cursor-pointer"
                  onClick={() => handleSort("basePrice")}
                >
                  Base Price {getSortIcon("basePrice")}
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 cursor-pointer"
                  onClick={() => handleSort("durationHours")}
                >
                  Duration {getSortIcon("durationHours")}
                </th>
                <th scope="col" className="px-6 py-3">
                  Bandwidth
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 cursor-pointer"
                  onClick={() => handleSort("maxDevices")}
                >
                  Max Devices {getSortIcon("maxDevices")}
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 cursor-pointer"
                  onClick={() => handleSort("subscribers")}
                >
                  Subscribers {getSortIcon("subscribers")}
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 cursor-pointer"
                  onClick={() => handleSort("isActive")}
                >
                  Status {getSortIcon("isActive")}
                </th>
                <th scope="col" className="px-6 py-3 text-right">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {sortedPlans.map((plan) => (
                <tr
                  key={plan.id}
                  className={`bg-white border-b border-slate-200/80 hover:bg-slate-50/70 ${
                    selectedPlans.includes(plan.id) ? "bg-primary-50/50" : ""
                  }`}
                >
                  <td className="w-4 p-4">
                    <Checkbox
                      id={`select-${plan.id}`}
                      onChange={(e) =>
                        handleSelectPlan(plan.id, e.target.checked)
                      }
                      checked={selectedPlans.includes(plan.id)}
                    />
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div>
                        <div className="font-semibold text-slate-900 flex items-center gap-2">
                          {plan.name}
                          {plan.isPopular && (
                            <span className="px-2 py-0.5 text-xs font-medium bg-amber-100 text-amber-700 rounded-full">
                              Popular
                            </span>
                          )}
                        </div>
                        <div className="text-xs text-slate-500 max-w-xs truncate">
                          {plan.description}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-semibold text-slate-800">
                    Kshs. {plan.basePrice}
                  </td>
                  <td className="px-6 py-4 font-medium text-slate-700">
                    {formatDuration(plan.durationHours)}
                  </td>
                  <td className="px-6 py-4 font-medium text-slate-700">
                    {plan.bandwidthLimit}
                  </td>
                  <td className="px-6 py-4 font-medium text-slate-700">
                    {plan.maxDevices}
                  </td>
                  <td className="px-6 py-4 font-semibold text-slate-800">
                    {plan.subscribers.toLocaleString()}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-2.5 py-1 text-xs font-semibold rounded-full ${getStatusChip(
                        plan.isActive
                      )}`}
                    >
                      {plan.isActive ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center gap-1 justify-end">
                      <button
                        onClick={() => handlePlanAction("edit", plan.id)}
                        className="p-2 text-slate-500 hover:text-primary-600 hover:bg-slate-200/70 rounded-full transition-colors"
                        title="Edit plan"
                      >
                        <FiEdit3 size={16} />
                      </button>
                      <button
                        onClick={() => handlePlanAction("duplicate", plan.id)}
                        className="p-2 text-slate-500 hover:text-blue-600 hover:bg-slate-200/70 rounded-full transition-colors"
                        title="Duplicate plan"
                      >
                        <FiCopy size={16} />
                      </button>
                      <button
                        onClick={() => handlePlanAction("toggle", plan.id)}
                        className="p-2 text-slate-500 hover:text-amber-600 hover:bg-slate-200/70 rounded-full transition-colors"
                        title={plan.isActive ? "Deactivate" : "Activate"}
                      >
                        <FiEye size={16} />
                      </button>
                      <button
                        onClick={() => handlePlanAction("delete", plan.id)}
                        className="p-2 text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors"
                        title="Delete plan"
                      >
                        <FiTrash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between pt-4">
          <span className="text-sm text-slate-600">
            Showing {sortedPlans.length} of {plans.length} plans
          </span>
        </div>
      </div>

      {/* Plan Modal */}
      <PlanModal
        isOpen={showPlanModal}
        onClose={() => setShowPlanModal(false)}
        plan={selectedPlan}
        onSave={handleSavePlan}
        mode={modalMode}
      />
    </div>
  );
};

export default PaymentPlans;
