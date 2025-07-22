import React, { useEffect, useState } from "react";
import apiService from "../../services/api";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/Card";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";
import { DollarIcon, CheckIcon, ClockIcon, AlertIcon } from "../ui/Icons";

const statusColors = {
  completed: "bg-success-100 text-success-700",
  pending: "bg-warning-100 text-warning-700",
  failed: "bg-danger-100 text-danger-700",
  processing: "bg-secondary-100 text-secondary-700",
};

const statusIcons = {
  completed: <CheckIcon size={16} className="text-success-600 mr-1" />,
  pending: <ClockIcon size={16} className="text-warning-600 mr-1" />,
  failed: <AlertIcon size={16} className="text-danger-600 mr-1" />,
  processing: <ClockIcon size={16} className="text-secondary-600 mr-1" />,
};

const PaymentsManager = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        setLoading(true);
        const response = await apiService.get("/admin/payments");
        if (response.success) {
          setPayments(response.data);
        } else {
          setError("Failed to load payments");
        }
      } catch (err) {
        setError("Failed to connect to server");
      } finally {
        setLoading(false);
      }
    };
    fetchPayments();
  }, []);

  // Analytics
  const totalRevenue = payments
    .filter((p) => p.status === "completed")
    .reduce((sum, p) => sum + Number(p.amount), 0);
  const today = new Date().toDateString();
  const todayRevenue = payments
    .filter(
      (p) =>
        p.status === "completed" && new Date(p.paidAt).toDateString() === today
    )
    .reduce((sum, p) => sum + Number(p.amount), 0);
  const completedCount = payments.filter(
    (p) => p.status === "completed"
  ).length;
  const failedCount = payments.filter((p) => p.status === "failed").length;

  // Filtered payments
  const filtered = payments.filter((p) => {
    const matchesSearch =
      p.phoneNumber?.includes(search) ||
      p.paymentPlan?.name?.toLowerCase().includes(search.toLowerCase()) ||
      p.id?.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = status === "all" || p.status === status;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Analytics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="glass text-center">
          <div className="flex flex-col items-center">
            <DollarIcon size={32} className="text-primary-500 mb-2" />
            <div className="text-lg font-semibold text-primary-700">
              Total Revenue
            </div>
            <div className="text-2xl font-bold text-primary-900 mt-1">
              Kshs. {totalRevenue.toLocaleString()}
            </div>
          </div>
        </Card>
        <Card className="glass text-center">
          <div className="flex flex-col items-center">
            <DollarIcon size={32} className="text-secondary-500 mb-2" />
            <div className="text-lg font-semibold text-secondary-700">
              Today's Revenue
            </div>
            <div className="text-2xl font-bold text-secondary-900 mt-1">
              Kshs. {todayRevenue.toLocaleString()}
            </div>
          </div>
        </Card>
        <Card className="glass text-center">
          <div className="flex flex-col items-center">
            <CheckIcon size={32} className="text-success-500 mb-2" />
            <div className="text-lg font-semibold text-success-700">
              Completed
            </div>
            <div className="text-2xl font-bold text-success-900 mt-1">
              {completedCount}
            </div>
          </div>
        </Card>
        <Card className="glass text-center">
          <div className="flex flex-col items-center">
            <AlertIcon size={32} className="text-danger-500 mb-2" />
            <div className="text-lg font-semibold text-danger-700">Failed</div>
            <div className="text-2xl font-bold text-danger-900 mt-1">
              {failedCount}
            </div>
          </div>
        </Card>
      </div>

      {/* Filters */}
      <Card className="glass flex flex-col md:flex-row items-center gap-4 p-4 md:p-6">
        <div className="flex-1 w-full">
          <Input
            placeholder="Search by phone, plan, or payment ID..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            icon={<DollarIcon size={18} />}
            className="bg-white"
          />
        </div>
        <div className="w-full md:w-48">
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="input-field"
          >
            <option value="all">All Statuses</option>
            <option value="completed">Completed</option>
            <option value="pending">Pending</option>
            <option value="processing">Processing</option>
            <option value="failed">Failed</option>
          </select>
        </div>
      </Card>

      {/* Payments Table */}
      <Card className="glass p-0 overflow-x-auto">
        <table className="min-w-full bg-transparent rounded-xl">
          <thead>
            <tr className="bg-primary-50">
              <th className="px-4 py-3 text-left text-primary-700 font-semibold">
                Phone
              </th>
              <th className="px-4 py-3 text-left text-primary-700 font-semibold">
                Plan
              </th>
              <th className="px-4 py-3 text-left text-primary-700 font-semibold">
                Amount
              </th>
              <th className="px-4 py-3 text-left text-primary-700 font-semibold">
                Status
              </th>
              <th className="px-4 py-3 text-left text-primary-700 font-semibold">
                Date
              </th>
            </tr>
          </thead>
          <tbody>
            {loading && (
              <tr>
                <td
                  colSpan={5}
                  className="text-center py-8 text-secondary-500 animate-fade-in"
                >
                  Loading payments...
                </td>
              </tr>
            )}
            {error && !loading && (
              <tr>
                <td
                  colSpan={5}
                  className="text-center py-8 text-danger-500 animate-fade-in"
                >
                  {error}
                </td>
              </tr>
            )}
            {!loading && !error && filtered.length === 0 && (
              <tr>
                <td
                  colSpan={5}
                  className="text-center py-8 text-gray-400 animate-fade-in"
                >
                  No payments found.
                </td>
              </tr>
            )}
            {!loading &&
              !error &&
              filtered.map((p) => (
                <tr
                  key={p.id}
                  className="border-b border-gray-100 hover:bg-primary-50/40 transition-all"
                >
                  <td className="px-4 py-3 font-mono text-primary-800">
                    {p.phoneNumber}
                  </td>
                  <td className="px-4 py-3">{p.paymentPlan?.name || "-"}</td>
                  <td className="px-4 py-3 font-semibold">Kshs. {p.amount}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`status-badge ${
                        statusColors[p.status] || "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {statusIcons[p.status]}
                      <span className="capitalize ml-1">{p.status}</span>
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-500">
                    {new Date(p.createdAt).toLocaleString()}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
};

export default PaymentsManager;
