import React from "react";
import AdminSidebar from "./AdminSidebar";
import { Outlet } from "react-router-dom";

const AdminLayout = () => {
  return (
    <div className="flex min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 transition-colors duration-300">
      <AdminSidebar />
      <main className="flex-1 p-6 md:p-10 lg:p-14 bg-transparent animate-fade-in overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
