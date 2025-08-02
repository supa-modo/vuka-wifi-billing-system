import React from "react";
import {
  FiEdit3,
  FiCopy,
  FiTrash2,
  FiUsers,
  FiClock,
  FiWifi,
  FiCheck,
} from "react-icons/fi";
import { PiChecksBold, PiUsersThreeDuotone } from "react-icons/pi";
import { TbDevices, TbEdit } from "react-icons/tb";
import ToggleSwitch from "../ui/ToggleSwitch";

const PlanCard = ({ plan, onPlanAction, formatDuration }) => {
  return (
    <div
      className={`rounded-3xl border-2 p-4 shadow-card hover:shadow-float transition-all duration-300 hover:border-primary-200 relative flex flex-col h-full ${
        plan.isPopular
          ? "border-secondary-400 bg-secondary-50"
          : "border-gray-200"
      }`}
    >
      {/* Card Header - Three Part Layout */}
      <div className="relative pb-4">
        <div className="flex items-center justify-between">
          {/* Left Side - Subscribers */}
          <div className="flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-blue-100 to-blue-50 rounded-full border border-blue-200/50">
            <PiUsersThreeDuotone className="w-4 h-4 text-blue-600" />
            <span className="text-xs font-semibold font-lexend text-blue-700">
              {plan.subscribers.toLocaleString()}
            </span>
          </div>

          <div className="flex items-center">
            <ToggleSwitch
              checked={plan.isActive}
              onChange={() => onPlanAction("toggle", plan.id)}
              variant="success"
              title={plan.isActive ? "Deactivate Plan" : "Activate Plan"}
            />
          </div>
        </div>
      </div>

      {/* Center - Plan Name */}
      <div className="flex-1 text-center px-4">
        <h3 className="text-xl font-bold font-lexend text-secondary-500 leading-tight">
          {plan.name}
        </h3>
      </div>

      <div className="text-center mb-4">
        <div className="text-3xl font-lexend font-extrabold text-primary-600 mb-1">
          Kshs. {plan.basePrice}
        </div>
        <div className="flex items-center justify-center gap-2">
          <div className="text-sm font-lexend font-semibold text-gray-500 mb-2">
            {plan.bandwidthLimit}
          </div>
          <div className="w-1 h-1 mb-1.5 bg-secondary-500 rounded-full"></div>
          <div className="text-sm font-lexend font-semibold text-gray-500 mb-2">
            {plan.durationHours} {plan.durationHours === 1 ? "Hour" : "Hours"}
          </div>
          <div className="w-1 h-1 mb-1.5 bg-secondary-500 rounded-full"></div>
          <div className="text-sm font-lexend font-semibold text-gray-500 mb-2">
            <span className="text-[0.7rem]">Max</span> {plan.maxDevices} Devices
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div
        className={`w-full border  rounded-lg p-4 mb-4 ${
          plan.isPopular
            ? "bg-secondary-100 border-secondary-200/80"
            : "bg-slate-50 border-primary-100/70"
        }`}
      >
        <div className="space-y-2">
          {plan.features.slice(0, 4).map((feature, index) => {
            // Check if feature contains '+ more'
            const moreIndex = feature.indexOf("+ more");
            if (moreIndex !== -1) {
              const mainText = feature.slice(0, moreIndex).trim();
              return (
                <div key={index} className="flex items-center text-sm">
                  <PiChecksBold
                    size={16}
                    className="text-success-600 mr-2 flex-shrink-0"
                  />
                  <span className="text-gray-700">{mainText} </span>
                  <span
                    className={`ml-2 md:ml-1 inline-block rounded-full ${
                      plan.isPopular
                        ? "bg-secondary-200 text-secondary-700"
                        : "bg-primary-100 text-primary-700"
                    } px-3 md:px-2 py-0.5 text-xs font-semibold align-middle`}
                  >
                    + more
                  </span>
                </div>
              );
            }
            return (
              <div key={index} className="flex items-center text-sm">
                <PiChecksBold
                  size={16}
                  className="text-success-600 mr-2 flex-shrink-0"
                />
                <span className="text-gray-700">{feature}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-auto">
        <div className="flex items-center gap-2 mt-2">
          <button
            onClick={() => onPlanAction("edit", plan.id)}
            className={`flex-1 px-4 py-3 text-white text-sm font-medium rounded-xl shadow-lg  hover:shadow-xl  transition-all duration-300 flex items-center justify-center gap-2 group/btn ${
              plan.isPopular
                ? "bg-gradient-to-r from-secondary-500 to-secondary-600  hover:from-secondary-600 hover:to-secondary-700 shadow-secondary-500/25 hover:shadow-secondary-500/30"
                : "bg-gradient-to-r from-primary-600 to-primary-700 shadow-primary-500/25 hover:from-primary-700 hover:to-primary-800"
            }`}
            title="Edit plan"
          >
            <TbEdit
              size={17}
              className="group-hover/btn:scale-110 transition-transform"
            />
            Edit Plan
          </button>
          <button
            onClick={() => onPlanAction("duplicate", plan.id)}
            className="p-3 bg-white/80 backdrop-blur-sm text-slate-600 rounded-xl border border-white/60 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200 transition-all duration-300 shadow-sm hover:shadow-md"
            title="Duplicate plan"
          >
            <FiCopy size={14} />
          </button>
          <button
            onClick={() => onPlanAction("delete", plan.id)}
            className="p-3 bg-white/80 backdrop-blur-sm text-slate-600 rounded-xl border border-white/60 hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-all duration-300 shadow-sm hover:shadow-md"
            title="Delete plan"
          >
            <FiTrash2 size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlanCard;
