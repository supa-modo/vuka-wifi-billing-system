import React, { useState, useMemo, useEffect } from "react";
import {
  FiArrowUp,
  FiArrowDown,
  FiMoreVertical,
  FiDollarSign,
  FiCheckCircle,
  FiXCircle,
  FiClock,
} from "react-icons/fi";
import {
  TbFileExport,
  TbRefresh,
  TbFilterFilled,
  TbSearch,
  TbCheck,
} from "react-icons/tb";
import Checkbox from "../ui/Checkbox";

// Mock Data
const paymentsData = [
  {
    id: "TXN73292N",
    user: "John Doe",
    email: "john.doe@example.com",
    plan: "1 Day Plan",
    amount: 50,
    status: "Completed",
    date: "2023-10-26T10:00:00Z",
    gateway: "M-Pesa",
  },
  {
    id: "TXN73293N",
    user: "Jane Smith",
    email: "jane.smith@example.com",
    plan: "1 Week Plan",
    amount: 300,
    status: "Completed",
    date: "2023-10-26T11:30:00Z",
    gateway: "Card",
  },
  {
    id: "TXN73294N",
    user: "Mike Johnson",
    email: "mike.j@work.com",
    plan: "2 Hours Plan",
    amount: 20,
    status: "Pending",
    date: "2023-10-26T12:15:00Z",
    gateway: "M-Pesa",
  },
  {
    id: "TXN73295N",
    user: "Emily Davis",
    email: "emily.d@university.edu",
    plan: "3 Hours Plan",
    amount: 30,
    status: "Failed",
    date: "2023-10-25T14:00:00Z",
    gateway: "Card",
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
            Filter Payments
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
                    {isSelected && <TbCheck size={12} className="text-primary-600" />}
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

const PaymentsManager = () => {
  const [payments, setPayments] = useState(paymentsData);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPayments, setSelectedPayments] = useState([]);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [filters, setFilters] = useState({ status: [], gateway: [] });
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState({
    key: "date",
    direction: "descending",
  });

  const itemsPerPage = 10;
  const availableOptions = useMemo(() => ({
    status: [...new Set(payments.map((p) => p.status))],
    gateway: [...new Set(payments.map((p) => p.gateway))],
  }), [payments]);

  const sortedPayments = useMemo(() => {
    let sortableItems = [...payments];
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
  }, [payments, sortConfig]);

  const filteredPayments = sortedPayments.filter((payment) => {
    const matchesSearch =
      payment.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      filters.status.length === 0 || filters.status.includes(payment.status);
    const matchesGateway =
      filters.gateway.length === 0 || filters.gateway.includes(payment.gateway);

    return matchesSearch && matchesStatus && matchesGateway;
  });

  const paginatedPayments = filteredPayments.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const requestSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const getSortIcon = (key) => {
    if (sortConfig.key !== key) return "";
    return sortConfig.direction === "ascending" ? "↑" : "↓";
  };

  const getStatusChip = (status) => {
    switch (status) {
      case "Completed":
        return "bg-emerald-100 text-emerald-700 border border-emerald-200/80";
      case "Pending":
        return "bg-amber-100 text-amber-600 border border-amber-200/80";
      case "Failed":
        return "bg-red-100 text-red-700 border border-red-200/80";
      default:
        return "bg-gray-100 text-gray-700 border border-gray-200/90";
    }
  };

  const handleSelectAll = (checked) => {
    if (checked) {
      setSelectedPayments(paginatedPayments.map((p) => p.id));
    } else {
      setSelectedPayments([]);
    }
  };

  const handleSelectPayment = (paymentId, checked) => {
    if (checked) {
      setSelectedPayments((prev) => [...prev, paymentId]);
    } else {
      setSelectedPayments((prev) => prev.filter((id) => id !== paymentId));
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
    console.log(`Performing ${action} on payments:`, selectedPayments);
    setSelectedPayments([]);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showFilterModal && !event.target.closest(".filter-dropdown-container")) {
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
                Payments Manager
              </h1>
              <p className="text-slate-500 font-lexend text-sm">
                Track and manage all payment transactions and revenue.
              </p>
            </div>
            <div className="flex items-center gap-4">
              <button className="px-4 py-2.5 bg-white/90 backdrop-blur-sm border border-gray-200 rounded-lg text-slate-700 font-medium shadow-lg shadow-blue-500/5 hover:shadow-xl transition-all duration-200 flex items-center gap-2">
                <TbFileExport size={18} />
                <span>Export</span>
              </button>
              <button className="px-4 py-2.5 bg-primary-600 text-white rounded-lg font-medium shadow-lg hover:shadow-primary-400/50 transition-shadow flex items-center gap-2">
                <TbRefresh size={18} />
                <span>Refresh</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 m-6 mb-0">
        <StatCard title="Total Revenue" value="Kshs. 45,680" change="+15.2%" changeType="increase" icon={<FiDollarSign />} gradient="from-emerald-500 to-emerald-600" />
        <StatCard title="Completed" value="1,289" change="+21.7%" changeType="increase" icon={<FiCheckCircle />} gradient="from-blue-500 to-blue-600" />
        <StatCard title="Pending" value="Kshs. 1,200" change="-5.4%" changeType="decrease" icon={<FiClock />} gradient="from-amber-500 to-amber-600" />
        <StatCard title="Failed" value="32" change="+2.1%" changeType="increase" icon={<FiXCircle />} gradient="from-red-500 to-red-600" />
      </div>

      {/* Main Content */}
      <div className="backdrop-blur-xl bg-white/70 rounded-[1.5rem] border border-white/30 shadow-xl shadow-blue-500/5 m-6 p-6">
        {/* Toolbar */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
          <div className={`flex items-center gap-6 pl-4 pr-[0.3rem] py-[0.35rem] rounded-lg border ${selectedPayments.length > 0 ? "border-primary-200/50" : "border-transparent"} flex-shrink-0`}>
            {selectedPayments.length > 0 ? (
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2.5">
                  <TbCheck className="text-primary-600 w-4 h-4" />
                  <div className="text-[0.9rem] font-medium text-primary-700 whitespace-nowrap">
                    <span className="font-lexend">{selectedPayments.length} </span>
                    {selectedPayments.length > 1 ? "payments" : "payment"} selected
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={() => handleBulkAction("complete")} className="px-4 py-1.5 text-xs font-lexend font-medium text-emerald-700 bg-emerald-200 border border-emerald-400 rounded-lg hover:bg-emerald-300 hover:text-emerald-800 transition-colors flex items-center gap-1 whitespace-nowrap">
                    <FiCheckCircle size={12} className="mr-1" />
                    Mark as Completed
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-3 text-slate-600 min-w-[30rem]">
                <div className="flex items-center gap-2">
                  <span className="text-lg font-lexend font-semibold text-secondary-600 whitespace-nowrap">{filteredPayments.length} Payments</span>
                </div>
                <div className="h-6 border-l border-slate-300/70"></div>
                <p className="text-sm text-slate-500 font-lexend">
                  Browse and manage all transactions
                </p>
              </div>
            )}
          </div>

          <div className="flex items-center gap-2.5">
            <div className="relative">
              <TbSearch className="absolute top-1/2 left-4 -translate-y-1/2 text-slate-400 z-10" size={18} />
              <input type="text" placeholder="Search payments..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="pl-11 pr-4 py-2.5 w-64 bg-white/80 border border-slate-200/90 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all shadow-sm" />
            </div>
            <div className="relative filter-dropdown-container">
              <button onClick={() => setShowFilterModal(!showFilterModal)} className="p-3 bg-white/80 border border-slate-200/90 rounded-lg text-slate-600 hover:bg-slate-100/70 transition-colors shadow-sm">
                {filters.status.length > 0 || filters.gateway.length > 0 ? <TbFilterFilled className="text-primary-600" size={20} /> : <TbFilterFilled size={20} />}
              </button>
              <FilterDropdown isOpen={showFilterModal} onClose={() => setShowFilterModal(false)} onClear={() => setFilters({ status: [], gateway: [] })} filters={filters} onToggle={handleFilterToggle} availableOptions={availableOptions} />
            </div>
          </div>
        </div>

        {/* Payments Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-slate-500">
            <thead className="text-xs text-slate-700 uppercase bg-slate-100/80">
              <tr>
                <th scope="col" className="p-4">
                  <Checkbox id="select-all" onChange={(e) => handleSelectAll(e.target.checked)} checked={selectedPayments.length === paginatedPayments.length && paginatedPayments.length > 0} />
                </th>
                <th scope="col" className="px-6 py-3 cursor-pointer" onClick={() => requestSort("id")}>Transaction ID {getSortIcon("id")}</th>
                <th scope="col" className="px-6 py-3 cursor-pointer" onClick={() => requestSort("user")}>User {getSortIcon("user")}</th>
                <th scope="col" className="px-6 py-3 cursor-pointer" onClick={() => requestSort("plan")}>Plan {getSortIcon("plan")}</th>
                <th scope="col" className="px-6 py-3 cursor-pointer" onClick={() => requestSort("amount")}>Amount {getSortIcon("amount")}</th>
                <th scope="col" className="px-6 py-3 cursor-pointer" onClick={() => requestSort("status")}>Status {getSortIcon("status")}</th>
                <th scope="col" className="px-6 py-3 cursor-pointer" onClick={() => requestSort("date")}>Date {getSortIcon("date")}</th>
                <th scope="col" className="px-6 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedPayments.map((payment) => (
                <tr key={payment.id} className={`bg-white border-b border-slate-200/80 hover:bg-slate-50/70 ${selectedPayments.includes(payment.id) ? "bg-primary-50/50" : ""}`}>
                  <td className="w-4 p-4">
                    <Checkbox id={`select-${payment.id}`} onChange={(e) => handleSelectPayment(payment.id, e.target.checked)} checked={selectedPayments.includes(payment.id)} />
                  </td>
                  <td className="px-6 py-4 font-mono text-xs font-medium text-slate-800 whitespace-nowrap">{payment.id}</td>
                  <td className="px-6 py-4">
                    <div className="font-semibold text-slate-900">{payment.user}</div>
                    <div className="text-xs text-slate-500">{payment.email}</div>
                  </td>
                  <td className="px-6 py-4 font-medium text-slate-700">{payment.plan}</td>
                  <td className="px-6 py-4 font-semibold text-slate-800">Kshs. {payment.amount.toFixed(2)}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 text-xs font-semibold rounded-full ${getStatusChip(payment.status)}`}>{payment.status}</span>
                  </td>
                  <td className="px-6 py-4 text-slate-600">{new Date(payment.date).toLocaleString()}</td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-2 text-slate-500 hover:text-primary-600 hover:bg-slate-200/70 rounded-full transition-colors">
                      <FiMoreVertical />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between pt-4">
          <span className="text-sm text-slate-600">
            Showing 1 to {paginatedPayments.length} of {filteredPayments.length} results
          </span>
          {/* Pagination component can be added here */}
        </div>
      </div>
    </div>
  );
};

export default PaymentsManager;
