import React, { useEffect, useState } from "react";
import apiService from "../../services/api";
import { Card } from "../ui/Card";
import { AlertIcon, CheckIcon, ClockIcon } from "../ui/Icons";

const statusColors = {
  sent: "bg-success-100 text-success-700",
  delivered: "bg-success-100 text-success-700",
  failed: "bg-danger-100 text-danger-700",
  pending: "bg-warning-100 text-warning-700",
};

const statusIcons = {
  sent: <CheckIcon size={16} className="text-success-600 mr-1" />,
  delivered: <CheckIcon size={16} className="text-success-600 mr-1" />,
  failed: <AlertIcon size={16} className="text-danger-600 mr-1" />,
  pending: <ClockIcon size={16} className="text-warning-600 mr-1" />,
};

const SMSLogs = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        setLoading(true);
        const response = await apiService.get("/admin/sms");
        if (response.success) {
          setLogs(response.data);
        } else {
          setError("Failed to load SMS logs");
        }
      } catch (err) {
        setError("Failed to connect to server");
      } finally {
        setLoading(false);
      }
    };
    fetchLogs();
  }, []);

  return (
    <div className="space-y-8 animate-fade-in">
      <Card className="glass p-0 overflow-x-auto">
        <table className="min-w-full bg-transparent rounded-xl">
          <thead>
            <tr className="bg-primary-50">
              <th className="px-4 py-3 text-left text-primary-700 font-semibold">
                Phone
              </th>
              <th className="px-4 py-3 text-left text-primary-700 font-semibold">
                Message
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
                  colSpan={4}
                  className="text-center py-8 text-secondary-500 animate-fade-in"
                >
                  Loading SMS logs...
                </td>
              </tr>
            )}
            {error && !loading && (
              <tr>
                <td
                  colSpan={4}
                  className="text-center py-8 text-danger-500 animate-fade-in"
                >
                  {error}
                </td>
              </tr>
            )}
            {!loading && !error && logs.length === 0 && (
              <tr>
                <td
                  colSpan={4}
                  className="text-center py-8 text-gray-400 animate-fade-in"
                >
                  No SMS logs found.
                </td>
              </tr>
            )}
            {!loading &&
              !error &&
              logs.map((log, idx) => (
                <tr
                  key={idx}
                  className="border-b border-gray-100 hover:bg-primary-50/40 transition-all"
                >
                  <td className="px-4 py-3 font-mono text-primary-800">
                    {log.phoneNumber}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700 max-w-xs truncate">
                    {log.message}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`status-badge ${
                        statusColors[log.status] || "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {statusIcons[log.status]}
                      <span className="capitalize ml-1">{log.status}</span>
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-500">
                    {log.sentAt ? new Date(log.sentAt).toLocaleString() : "-"}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
};

export default SMSLogs;
