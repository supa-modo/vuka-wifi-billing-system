import React, { useState } from "react";
import SMSLogs from "./SMSLogs";
import RouterManager from "./RouterManager";
import PaymentsManager from "./PaymentsManager";
import AdminLayout from "./AdminLayout";

export const AdminDashboard = () => {
  const [currentView, setCurrentView] = useState("payments");

  let content = null;
  if (currentView === "payments") content = <PaymentsManager />;
  else if (currentView === "sms-logs") content = <SMSLogs />;
  else if (currentView === "router") content = <RouterManager />;
  else if (currentView === "analytics")
    content = (
      <div className="glass p-8 rounded-2xl shadow-glow text-center text-primary-700">
        <h2 className="text-2xl font-bold mb-4">Analytics Coming Soon</h2>
        <p className="text-lg">
          Charts and advanced analytics will appear here.
        </p>
      </div>
    );

  return (
    <AdminLayout currentView={currentView} onViewChange={setCurrentView}>
      {content}
    </AdminLayout>
  );
};

export default AdminDashboard;
