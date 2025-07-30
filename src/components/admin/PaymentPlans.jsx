import React, { useState } from "react";
import {
  FiPlus,
  FiEdit,
  FiTrash2,
  FiTag,
  FiClock,
  FiZap,
  FiBarChart2,
} from "react-icons/fi";

// Mock Data
const initialPlans = [
  {
    id: 1,
    name: "Standard Daily",
    price: 50,
    duration: "24 Hours",
    speed: "10 Mbps",
    dataLimit: "Unlimited",
    color: "blue",
  },
  {
    id: 2,
    name: "Express 2-Hour",
    price: 20,
    duration: "2 Hours",
    speed: "15 Mbps",
    dataLimit: "Unlimited",
    color: "green",
  },
  {
    id: 3,
    name: "Weekly Power User",
    price: 300,
    duration: "7 Days",
    speed: "25 Mbps",
    dataLimit: "100 GB",
    color: "purple",
  },
  {
    id: 4,
    name: "Monthly Pro",
    price: 1000,
    duration: "30 Days",
    speed: "50 Mbps",
    dataLimit: "500 GB",
    color: "orange",
  },
];

const planColorSchemes = {
  blue: {
    bg: "bg-blue-500",
    text: "text-blue-500",
    shadow: "shadow-blue-500/30",
    gradient: "from-blue-500 to-blue-600",
  },
  green: {
    bg: "bg-emerald-500",
    text: "text-emerald-500",
    shadow: "shadow-emerald-500/30",
    gradient: "from-emerald-500 to-emerald-600",
  },
  purple: {
    bg: "bg-purple-500",
    text: "text-purple-500",
    shadow: "shadow-purple-500/30",
    gradient: "from-purple-500 to-purple-600",
  },
  orange: {
    bg: "bg-amber-500",
    text: "text-amber-500",
    shadow: "shadow-amber-500/30",
    gradient: "from-amber-500 to-amber-600",
  },
};

const PlanCard = ({ plan }) => {
  const colorScheme = planColorSchemes[plan.color] || planColorSchemes.blue;

  return (
    <div
      className={`group relative overflow-hidden backdrop-blur-xl bg-white/70 rounded-2xl border border-white/30 shadow-xl shadow-blue-500/5 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-300 flex flex-col`}
    >
      <div
        className={`absolute top-0 left-0 w-full h-2 bg-gradient-to-r ${colorScheme.gradient}`}
      ></div>
      <div className="p-6 flex-grow">
        <div className="flex justify-between items-start mb-4">
          <h3 className={`text-xl font-bold font-lexend ${colorScheme.text}`}>
            {plan.name}
          </h3>
          <div className={`text-3xl font-bold font-lexend ${colorScheme.text}`}>
            <span className="text-lg align-top">Kshs.</span>
            {plan.price}
          </div>
        </div>
        <div className="space-y-3 text-slate-600">
          <div className="flex items-center gap-3">
            <FiClock className={colorScheme.text} />
            <span>
              Duration: <strong>{plan.duration}</strong>
            </span>
          </div>
          <div className="flex items-center gap-3">
            <FiZap className={colorScheme.text} />
            <span>
              Speed: <strong>{plan.speed}</strong>
            </span>
          </div>
          <div className="flex items-center gap-3">
            <FiBarChart2 className={colorScheme.text} />
            <span>
              Data: <strong>{plan.dataLimit}</strong>
            </span>
          </div>
        </div>
      </div>
      <div className="p-4 bg-slate-50/50 border-t border-slate-100 flex items-center justify-end gap-2">
        <button className="p-2 text-slate-500 hover:text-primary-600 hover:bg-slate-200 rounded-full transition-colors">
          <FiEdit size={16} />
        </button>
        <button className="p-2 text-slate-500 hover:text-red-500 hover:bg-slate-200 rounded-full transition-colors">
          <FiTrash2 size={16} />
        </button>
      </div>
    </div>
  );
};

const PaymentPlans = () => {
  const [plans, setPlans] = useState(initialPlans);

  return (
    <div className="min-h-screen bg-slate-100 p-6">
      {/* Header with Glass Effect */}
      <div className="sticky top-0 z-50 backdrop-blur-xl bg-white/80 border-b border-white/20 shadow-lg shadow-blue-500/5">
        <div className="py-2 px-4">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="space-y-1.5">
              <h1 className="text-[1.3rem] font-lexend leading-tight tracking-tight font-bold text-primary-600">
                Payment Plans
              </h1>
              <p className="text-slate-500 font-medium">
                Manage your WiFi subscription packages and pricing
              </p>
            </div>
            <div className="flex items-center gap-4">
              <button className="px-4 py-2.5 bg-white/90 backdrop-blur-sm border border-gray-200 rounded-lg text-slate-700 font-medium shadow-lg shadow-blue-500/5 hover:shadow-xl transition-all duration-200 flex items-center gap-2">
                <FiRefreshCw size={18} className="animate-spin-slow" />
                <span>Refresh</span>
              </button>
              <button className="px-4 py-2.5 bg-primary-600 text-white rounded-lg font-medium shadow-lg hover:shadow-primary-400/50 transition-shadow flex items-center gap-2">
                <FiPlus /> Add New Plan
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Plans Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {plans.map((plan) => (
          <PlanCard key={plan.id} plan={plan} />
        ))}
      </div>
    </div>
  );
};

export default PaymentPlans;
