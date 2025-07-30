import React from "react";
import AdminSidebar from "./AdminSidebar";
import { Outlet } from "react-router-dom";

const AdminLayout = () => {
  return (
    <div className="flex h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 transition-colors duration-300">
      <AdminSidebar />
      <main className="flex-1 bg-transparent animate-fade-in overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
