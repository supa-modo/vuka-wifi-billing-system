import React, { useState, useMemo, useEffect } from "react";
import { FiPlus, FiArrowUp, FiArrowDown, FiFilter, FiCheck } from "react-icons/fi";
import {
  TbCalendarDollar,
  TbBuildingBroadcastTower,
  TbCoins,
  TbCheck,
} from "react-icons/tb";

import { Button } from "../ui/Button";
import { PiCaretDownDuotone, PiUsersThreeDuotone } from "react-icons/pi";
import { RiSearchLine } from "react-icons/ri";
import PlanCard from "./PlanCard";
import PlanModal from "./PlanModal";
import apiService from "../../services/api";
import { useNotification } from "../../hooks/useNotification.jsx";

const StatCard = ({ title, value, change, changeType, icon, gradient }) => (
  <div className="group relative overflow-hidden backdrop-blur-xl bg-white/30 rounded-2xl border-2 border-white shadow-xl shadow-blue-500/5 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-300">
    <div
      className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-[6%] transition-opacity duration-300`}
    ></div>
    <div className="relative flex justify-between p-5">
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <p className="text-sm font-medium text-slate-500">{title}</p>
          <p className="text-2xl font-bold font-lexend text-slate-800">
            {value}
          </p>
        </div>
      </div>
      <div className="flex flex-col items-end">
        {/* <div
          className={`p-3 rounded-xl bg-secondary-600 text-white ${gradient}`}
        > */}
        <div className="p-2 text-secondary-600">{icon}</div>

        <div
          className={`flex items-center gap-1 text-sm font-semibold ${
            changeType === "increase" ? "text-emerald-500" : "text-red-500"
          }`}
        >
          {changeType === "increase" ? <FiArrowUp /> : <FiArrowDown />}
          <span>{change} this month</span>
        </div>
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

const PaymentPlans = () => {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const { showSuccess, showError, showDeleteConfirm } = useNotification();

  const [showFilterModal, setShowFilterModal] = useState(false);
  const [showPlanModal, setShowPlanModal] = useState(false);
  const [modalMode, setModalMode] = useState("add");
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [filters, setFilters] = useState({ status: [], duration: [] });
  const [sortConfig, setSortConfig] = useState({
    key: "createdAt",
    direction: "descending",
  });

  // Fetch plans on component mount
  useEffect(() => {
    const fetchPlans = async () => {
      try {
        setLoading(true);
        const response = await apiService.getPaymentPlans(false); // Get all plans, not just active ones
        if (response.success) {
          setPlans(response.data);
        } else {
          showError(
            "Failed to Load Plans",
            "Unable to fetch payment plans. Please refresh the page or try again later."
          );
        }
      } catch (error) {
        console.error("Error fetching plans:", error);
        showError(
          "Connection Error",
          "Unable to connect to the server. Please check your internet connection and try again."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchPlans();
  }, [showError]);

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


  const handleFilterToggle = (key, value) => {
    setFilters((prev) => {
      const newValues = prev[key].includes(value)
        ? prev[key].filter((v) => v !== value)
        : [...prev[key], value];
      return { ...prev, [key]: newValues };
    });
  };

  const handlePlanAction = async (action, planId) => {
    const plan = plans.find((p) => p.id === planId);

    if (action === "edit") {
      setSelectedPlan(plan);
      setModalMode("edit");
      setShowPlanModal(true);
    } else if (action === "delete") {
      showDeleteConfirm(
        "Delete Payment Plan",
        `Are you sure you want to delete "${plan.name}"? This action cannot be undone and will affect all users currently subscribed to this plan.`,
        async () => {
          try {
            const response = await apiService.deletePaymentPlan(planId);
            if (response.success) {
              setPlans((prev) => prev.filter((p) => p.id !== planId));
              showSuccess(
                "Plan Deleted",
                `"${plan.name}" has been successfully deleted.`
              );
            } else {
              showError(
                "Delete Failed",
                response.message ||
                  "Failed to delete the plan. Please try again."
              );
            }
          } catch (error) {
            console.error("Error deleting plan:", error);
            showError(
              "Delete Error",
              "An unexpected error occurred while deleting the plan. Please check your connection and try again."
            );
          }
        }
      );
    } else if (action === "duplicate") {
      try {
        const duplicateData = {
          ...plan,
          name: `${plan.name} (Copy)`,
        };
        delete duplicateData.id; // Remove ID for new plan
        delete duplicateData.createdAt;
        delete duplicateData.updatedAt;

        const response = await apiService.createPaymentPlan(duplicateData);
        if (response.success) {
          setPlans((prev) => [...prev, response.data]);
          showSuccess(
            "Plan Duplicated",
            `"${duplicateData.name}" has been created successfully.`
          );
        } else {
          showError(
            "Duplication Failed",
            response.message ||
              "Failed to duplicate the plan. Please try again."
          );
        }
      } catch (error) {
        console.error("Error duplicating plan:", error);
        showError(
          "Duplication Error",
          "An unexpected error occurred while duplicating the plan. Please check your connection and try again."
        );
      }
    } else if (action === "toggle") {
      try {
        const response = await apiService.togglePlanStatus(planId);
        if (response.success) {
          setPlans((prev) =>
            prev.map((p) => (p.id === planId ? response.data : p))
          );
          const status = response.data.isActive ? "activated" : "deactivated";
          showSuccess(
            "Status Updated",
            `"${plan.name}" has been ${status} successfully.`
          );
        } else {
          showError(
            "Status Update Failed",
            response.message ||
              "Failed to update plan status. Please try again."
          );
        }
      } catch (error) {
        console.error("Error toggling plan status:", error);
        showError(
          "Status Update Error",
          "An unexpected error occurred while updating the plan status. Please check your connection and try again."
        );
      }
    }
  };

  const handleSavePlan = async (planData, mode, planId) => {
    try {
      if (mode === "edit") {
        // Update existing plan via API
        const response = await apiService.updatePaymentPlan(planId, planData);
        if (response.success) {
          // Update local state with the response data
          setPlans((prev) =>
            prev.map((p) => (p.id === planId ? response.data : p))
          );
          showSuccess(
            "Plan Updated",
            `"${planData.name}" has been updated successfully.`
          );
        } else {
          showError(
            "Update Failed",
            response.message || "Failed to update the plan. Please try again."
          );
        }
      } else {
        // Create new plan via API
        const response = await apiService.createPaymentPlan(planData);
        if (response.success) {
          // Add new plan to local state
          setPlans((prev) => [...prev, response.data]);
          showSuccess(
            "Plan Created",
            `"${planData.name}" has been created successfully.`
          );
        } else {
          showError(
            "Creation Failed",
            response.message || "Failed to create the plan. Please try again."
          );
        }
      }
    } catch (error) {
      console.error("Error saving plan:", error);
      if (error.message.includes("Authorization")) {
        showError(
          "Authentication Required",
          "You need to be logged in as an admin to perform this action. Please log in and try again."
        );
      } else {
        showError(
          "Save Error",
          "An unexpected error occurred while saving the plan. Please check your connection and try again."
        );
      }
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
          value={loading ? "..." : plans.length.toString()}
          change="+12.5%"
          changeType="increase"
          icon={<TbCalendarDollar size={34} />}
          gradient="from-blue-500 to-blue-600"
        />
        <StatCard
          title="Active Plans"
          value={
            loading ? "..." : plans.filter((p) => p.isActive).length.toString()
          }
          change="+8.2%"
          changeType="increase"
          icon={<TbBuildingBroadcastTower size={34} />}
          gradient="from-emerald-500 to-emerald-600"
        />
        <StatCard
          title="Total Subscribers"
          value={
            loading
              ? "..."
              : plans
                  .reduce((sum, p) => sum + p.subscribers, 0)
                  .toLocaleString()
          }
          change="+23.1%"
          changeType="increase"
          icon={<PiUsersThreeDuotone size={38} />}
          gradient="from-purple-500 to-purple-600"
        />
        <StatCard
          title="Revenue/Month"
          value={
            loading
              ? "..."
              : `Kshs. ${(
                  plans.reduce(
                    (sum, p) => sum + p.basePrice * p.subscribers,
                    0
                  ) / 1000
                ).toFixed(1)}K`
          }
          change="+18.7%"
          changeType="increase"
          icon={<TbCoins size={34} />}
          gradient="from-amber-500 to-amber-600"
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
                {loading ? "Loading..." : `${sortedPlans.length} Hotspot Plans`}
              </span>
            </div>
            <div className="h-6 border-l border-slate-300/70"></div>
            <p className="text-sm text-slate-500 font-lexend">
              Manage and edit your WiFi subscription plans
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
                {/* <span className="mr-1">Filters</span> */}
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
                onClear={() => setFilters({ status: [], duration: [] })}
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
                placeholder="Search by user name, email, or phone number....."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-[0.6rem] w-full border-2 border-gray-200 rounded-[0.6rem] text-[0.95rem] font-medium focus:border-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition"
              />
            </div>
          </div>
        </div>

        {/* Plans Grid */}
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="text-center">
              <div className="animate-spin w-8 h-8 border-4 border-primary-200 border-t-primary-600 rounded-full mx-auto mb-4"></div>
              <p className="text-gray-600 font-medium">Loading plans. Please wait...</p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 px-6 gap-6">
            {sortedPlans.map((plan) => (
              <PlanCard
                key={plan.id}
                plan={plan}
                onPlanAction={handlePlanAction}
                formatDuration={formatDuration}
              />
            ))}
          </div>
        )}

        {/* Pagination */}
        <div className="flex items-center justify-between pt-4 px-2">
          <span className="text-sm font-lexend  font-medium text-gray-500">
            {loading
              ? "Loading..."
              : `Showing ${sortedPlans.length} of ${plans.length} plans`}
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
