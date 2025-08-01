import React, { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { RouterIcon } from "../ui/Icons";
import { LuLogOut } from "react-icons/lu";
import {
  FiActivity,
  FiUsers,
  FiPackage,
  FiCreditCard,
  FiServer,
  FiMessageSquare,
} from "react-icons/fi";
import { FcWiFiLogo } from "react-icons/fc";
import {
  TbCalendarDollar,
  TbCoins,
  TbMessage,
  TbPresentationAnalytics,
  TbSettings,
  TbChevronLeft,
  TbChevronRight,
  TbLayoutSidebarLeftCollapse,
  TbLayoutSidebarRightCollapse,
  TbRouter,
  TbServer2,
} from "react-icons/tb";
import { MdSpaceDashboard } from "react-icons/md";
import { AuthContext } from "../../context/AuthContext";
import { PiComputerTowerDuotone, PiUsersThreeDuotone } from "react-icons/pi";

// Sidebar navigation items (no submenus)
const navItems = [
  {
    category: null,
    items: [
      {
        name: "Dashboard",
        icon: MdSpaceDashboard,
        path: "/admin/dashboard",
        end: true,
      },
    ],
  },
  {
    category: "Management",
    items: [
      {
        name: "Active Sessions",
        icon: RouterIcon,
        path: "/admin/sessions",
      },
      {
        name: "User Management",
        icon: PiUsersThreeDuotone,
        path: "/admin/users",
      },
      {
        name: "Payment Plans",
        icon: TbCalendarDollar,
        path: "/admin/plans",
      },
      {
        name: "Payments",
        icon: TbCoins,
        path: "/admin/payments",
      },
      {
        name: "Router Management",
        icon: TbRouter,
        path: "/admin/routers",
      },
      {
        name: "SMS Logs",
        icon: TbMessage,
        path: "/admin/sms-logs",
      },
    ],
  },
  {
    category: "Reports",
    items: [
      {
        name: "Analytics",
        icon: TbPresentationAnalytics,
        path: "/admin/analytics",
      },
    ],
  },
  {
    category: null,
    items: [
      {
        name: "Settings",
        icon: TbSettings,
        path: "/admin/settings",
      },
      {
        name: "System Status",
        icon: PiComputerTowerDuotone,
        path: "/admin/system-status",
      },
    ],
  },
];

const AdminSidebar = ({
  collapsed: initialCollapsed = false,
  onToggleCollapse,
}) => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(initialCollapsed);

  const handleLogout = () => {
    logout();
    navigate("/admin");
  };

  const handleToggleCollapse = () => {
    const newCollapsedState = !collapsed;
    setCollapsed(newCollapsedState);
    if (onToggleCollapse) {
      onToggleCollapse(newCollapsedState);
    }
  };

  return (
    <aside
      className={`flex flex-col bg-gradient-to-b from-primary-700 via-primary-800 to-primary-700 border-r border-white/10 font-lexend transition-all duration-500 ease-in-out ${
        collapsed ? "w-20" : "w-[285px]"
      }`}
    >
      {/* Sidebar content */}
      <div className="flex-1 overflow-y-auto py-4 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
        {/* Toggle button and logo/title */}
        <div className="transition-all duration-500 ease-in-out">
          {collapsed ? (
            <div className="flex flex-col items-center mb-4">
              <button
                onClick={handleToggleCollapse}
                className="text-white transition-all duration-200 hover:scale-105 mb-2"
                title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
              >
                <TbLayoutSidebarRightCollapse size={30} />
              </button>
              <FcWiFiLogo size={55} className="text-primary-400" />
            </div>
          ) : (
            <div className="flex items-center justify-between pl-4 pr-4 mb-2">
              <div className="flex items-center">
                <FcWiFiLogo size={60} className="text-primary-400" />
                <span className="font-bold text-primary-100 text-lg tracking-wide ml-2 transition-opacity duration-300">
                  VukaWiFi
                </span>
              </div>
              <button
                onClick={handleToggleCollapse}
                className="text-white transition-all duration-200 hover:scale-105"
                title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
              >
                <TbLayoutSidebarLeftCollapse size={30} />
              </button>
            </div>
          )}
          <hr className="text-white/10  mx-4" />
        </div>
        <nav className="transition-all duration-500 ease-in-out pt-4">
          {navItems.map((category, index) => (
            <div key={index} className="mb-1 px-3">
              {/* Category label */}
              {category.category && !collapsed && (
                <div className="text-[0.65rem] uppercase tracking-wider text-white/40 font-medium px-3 py-1 transition-opacity duration-300">
                  {category.category}
                </div>
              )}
              {/* Category items */}
              <div className="space-y-1">
                {category.items.map((item) => (
                  <NavLink
                    key={item.name}
                    to={item.path}
                    end={item.end}
                    className={({ isActive }) =>
                      `flex items-center ${
                        collapsed ? "px-3.5 py-3" : "px-4 py-3.5"
                      } rounded-[0.7rem] transition-all duration-200 group gap-2
                      ${
                        isActive
                          ? "bg-gradient-to-r from-secondary-500/70 to-secondary-500/60 text-secondary-300 font-bold shadow-glow"
                          : "text-white/80 hover:text-white hover:bg-white/10"
                      }`
                    }
                  >
                    <item.icon
                      size={22}
                      className={`flex-shrink-0 transition-all duration-200 ${
                        collapsed ? "h-7 w-7" : "h-[1.4rem] w-[1.4rem]"
                      } group-hover:text-secondary-400`}
                    />
                    {!collapsed && (
                      <span className="text-sm ml-2 transition-opacity duration-300">
                        {item.name}
                      </span>
                    )}
                  </NavLink>
                ))}
              </div>
              {/* Category separator */}
              {index < navItems.length - 1 && (
                <div
                  className={`${
                    collapsed ? "mx-3" : "mx-1"
                  } my-3 border-t border-white/5 transition-all duration-300`}
                ></div>
              )}
            </div>
          ))}
        </nav>
      </div>
      {/* Bottom section with user profile and logout */}
      <div className="border-t border-white/10 px-3 py-4 transition-all duration-300 ease-in-out">
        <div className="rounded-xl bg-white/10 backdrop-blur-sm p-1.5 border border-white/5">
          <button
            onClick={handleLogout}
            className={`flex w-full justify-center items-center rounded-lg ${
              !collapsed ? "px-4 space-x-2" : "px-0 justify-center"
            } py-2.5 text-left text-sm font-medium text-white hover:bg-red-500 hover:text-white transition-all duration-200`}
          >
            <LuLogOut className="w-5 h-5" />
            {!collapsed && (
              <span className="transition-opacity duration-300">Logout</span>
            )}
          </button>
        </div>
      </div>
    </aside>
  );
};

export default AdminSidebar;
