import React, { useEffect, useState } from "react";
import apiService from "../../services/api";
import { Card } from "../ui/Card";
import { CheckIcon, AlertIcon, ClockIcon } from "../ui/Icons";

const statusColors = {
  active: "bg-success-100 text-success-700",
  expired: "bg-danger-100 text-danger-700",
  suspended: "bg-warning-100 text-warning-700",
  revoked: "bg-danger-100 text-danger-700",
};

const statusIcons = {
  active: <CheckIcon size={16} className="text-success-600 mr-1" />,
  expired: <AlertIcon size={16} className="text-danger-600 mr-1" />,
  suspended: <ClockIcon size={16} className="text-warning-600 mr-1" />,
  revoked: <AlertIcon size={16} className="text-danger-600 mr-1" />,
};

const RouterManager = () => {
  const [creds, setCreds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCreds = async () => {
      try {
        setLoading(true);
        const response = await apiService.get("/admin/router/wifi-credentials");
        if (response.success) {
          setCreds(response.data);
        } else {
          setError("Failed to load WiFi credentials");
        }
      } catch (err) {
        setError("Failed to connect to server");
      } finally {
        setLoading(false);
      }
    };
    fetchCreds();
  }, []);

  return (
    <div className="space-y-8 animate-fade-in">
      <Card className="glass p-0 overflow-x-auto">
        <table className="min-w-full bg-transparent rounded-xl">
          <thead>
            <tr className="bg-primary-50">
              <th className="px-4 py-3 text-left text-primary-700 font-semibold">
                Username
              </th>
              <th className="px-4 py-3 text-left text-primary-700 font-semibold">
                Devices
              </th>
              <th className="px-4 py-3 text-left text-primary-700 font-semibold">
                Expires
              </th>
              <th className="px-4 py-3 text-left text-primary-700 font-semibold">
                Status
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
                  Loading WiFi credentials...
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
            {!loading && !error && creds.length === 0 && (
              <tr>
                <td
                  colSpan={4}
                  className="text-center py-8 text-gray-400 animate-fade-in"
                >
                  No WiFi credentials found.
                </td>
              </tr>
            )}
            {!loading &&
              !error &&
              creds.map((cred) => (
                <tr
                  key={cred.id}
                  className="border-b border-gray-100 hover:bg-primary-50/40 transition-all"
                >
                  <td className="px-4 py-3 font-mono text-primary-800">
                    {cred.username}
                  </td>
                  <td className="px-4 py-3">{cred.deviceCount}</td>
                  <td className="px-4 py-3 text-sm text-gray-500">
                    {new Date(cred.expiresAt).toLocaleString()}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`status-badge ${
                        statusColors[cred.status] || "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {statusIcons[cred.status]}
                      <span className="capitalize ml-1">{cred.status}</span>
                    </span>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
};

export default RouterManager;
