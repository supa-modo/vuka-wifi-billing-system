import React, { useState } from "react";
import SMSLogs from "./SMSLogs";
import RouterManager from "./RouterManager";
import PaymentsManager from "./PaymentsManager";
import AdminLayout from "./AdminLayout";
import AdminSettings from "./AdminSettings";

export const AdminDashboard = () => {
  const [currentView, setCurrentView] = useState("payments");

  let content = null;
  if (currentView === "payments") content = <PaymentsManager />;
  else if (currentView === "sms-logs") content = <SMSLogs />;
  else if (currentView === "router") content = <RouterManager />;
  else if (currentView === "settings") content = <AdminSettings />;
  else if (currentView === "analytics")
    content = (
      <div className="glass p-8 rounded-2xl shadow-glow text-center text-primary-700">
        <h2 className="text-2xl font-bold mb-4">Analytics Coming Soon</h2>
        <p className="text-lg">
          Charts and advanced analytics will appear here.
        </p>
      </div>
    );
  else if (currentView === "users")
    content = (
      <div className="glass p-8 rounded-2xl shadow-glow text-center text-primary-700">
        <h2 className="text-2xl font-bold mb-4">
          Users Management Coming Soon
        </h2>
        <p className="text-lg">Users Management will appear here.</p>
      </div>
    );
  else if (currentView === "payment-plans")
    content = (
      <div className="glass p-8 rounded-2xl shadow-glow text-center text-primary-700">
        <h2 className="text-2xl font-bold mb-4">Payment Plans Coming Soon</h2>
        <p className="text-lg">Payment Plans will appear here.</p>
      </div>
    );

  return (
    <AdminLayout currentView={currentView} onViewChange={setCurrentView}>
      <div className="overflow-y-auto">{content}</div>
    </AdminLayout>
  );
};

export default AdminDashboard;
