import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { FiUsers, FiBox, FiMenu } from "react-icons/fi";
import { FaLaptop } from "react-icons/fa";

const SidebarLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const category = params.get("category");

  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="flex h-screen">
      <div
        className={`bg-black text-white flex flex-col p-4 shadow-lg transition-all duration-300 
        ${isCollapsed ? "w-20" : "w-64"}`}
      >
        <button
          className={`text-white mb-4 p-2 rounded-lg hover:bg-gray-700 transition-all duration-300
          ${isCollapsed ? "self-center" : "self-end mr-2"}`}
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          <FiMenu size={24} />
        </button>
        {!isCollapsed && <h1 className="text-2xl font-normal mb-6 text-center">Dashboard</h1>}
        <nav className="space-y-2">
          <NavLink
            to="/users"
            className={({ isActive }) =>
              `flex items-center px-4 py-2 rounded-lg transition ${
                isActive ? "bg-yellow text-black font-bold" : "hover:bg-grey hover:text-black"
              }`
            }
          >
            <span className="flex justify-center w-8">
              <FiUsers size={20} />
            </span>
            {!isCollapsed && <span className="ml-3">Users</span>}
          </NavLink>
          <div className="space-y-1">
            {!isCollapsed && <span className="block px-4 py-2 text-gray-400">Products</span>}

            <NavLink
              to="/products?category=all"
              className={({ isActive }) =>
                `flex items-center px-4 py-2 rounded-lg transition ${
                  category === "all" || (!category && isActive)
                    ? "bg-yellow text-black font-bold"
                    : "hover:bg-grey hover:text-black"
                }`
              }
            >
              <span className="flex justify-center w-8">
                <FiBox size={20} />
              </span>
              {!isCollapsed && <span className="ml-3">All</span>}
            </NavLink>

            <NavLink
              to="/products?category=laptops"
              className={({ isActive }) =>
                `flex items-center px-4 py-2 rounded-lg transition ${
                  category === "laptops" ? "bg-yellow text-black font-bold" : "hover:bg-grey hover:text-black"
                }`
              }
            >
              <span className="flex justify-center w-8">
                <FaLaptop size={20} />
              </span>
              {!isCollapsed && <span className="ml-3">Laptops</span>}
            </NavLink>
          </div>
        </nav>
      </div>
      <div className="flex-1 p-6 overflow-auto">{children}</div>
    </div>
  );
};

export default SidebarLayout;
