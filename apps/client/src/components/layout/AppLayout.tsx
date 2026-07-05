import { useState } from "react";
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { getUser, clearAuth } from "../../utils/auth.utils";

export const AppLayout = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const user = getUser();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleLogout = () => {
    clearAuth();
    queryClient.clear();
    navigate("/login");
  };

  const navLinks = [
    { name: "Dashboard", path: "/dashboard" },
    ...(user?.role === "ADMIN"
      ? [{ name: "Employees", path: "/employees" }]
      : []),
    { name: "Tasks", path: "/tasks" },
    { name: "Reports", path: "/reports" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">
      {/* Mobile Header & Hamburger */}
      <div className="md:hidden flex items-center justify-between bg-white p-4 shadow-sm z-20">
        <h1 className="text-xl font-bold text-blue-600">TaskFlow</h1>
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="text-gray-600 focus:outline-none"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {isSidebarOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`fixed md:sticky top-0 left-0 h-screen w-64 bg-white shadow-lg border-r border-gray-100 transform transition-transform duration-300 ease-in-out z-10 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <div className="p-6 hidden md:block">
          <h1 className="text-2xl font-bold text-blue-600 tracking-tight">
            TaskFlow
          </h1>
        </div>
        <nav className="mt-6 md:mt-2 px-4 space-y-2">
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              onClick={() => setIsSidebarOpen(false)}
              className={({ isActive }) =>
                `block px-4 py-3 rounded-xl transition-all duration-200 font-medium ${
                  isActive
                    ? "bg-blue-50 text-blue-700 shadow-sm"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}
        </nav>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Sticky Navbar */}
        <header className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-gray-200 shadow-sm px-8 py-4 flex justify-end md:justify-between items-center md:flex">
          <div className="hidden md:block">
            {/* Can put page title here if dynamic, otherwise empty to push right */}
          </div>

          <div className="flex items-center space-x-6">
            {user && (
              <div className="flex items-center space-x-3">
                <div className="text-right">
                  <p className="text-sm font-semibold text-gray-900 leading-none">
                    {user.fullName}
                  </p>
                  <span className="inline-block mt-1 px-2 py-0.5 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                    {user.role}
                  </span>
                </div>
                <div className="h-10 w-10 rounded-full bg-linear-to-tr from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-lg shadow-md">
                  {user.fullName.charAt(0).toUpperCase()}
                </div>
              </div>
            )}

            <button
              onClick={handleLogout}
              className="text-sm font-medium text-red-600 hover:text-red-700 px-4 py-2 rounded-lg hover:bg-red-50 transition-colors border border-transparent hover:border-red-100"
            >
              Logout
            </button>
          </div>
        </header>

        {/* Mobile Header Logout (Since it's hidden on mobile navbar) */}
        <div className="md:hidden flex justify-between items-center p-4 bg-white border-b border-gray-200">
          <div className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-full bg-linear-to-tr from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-sm shadow-md">
              {user?.fullName.charAt(0).toUpperCase()}
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-900 leading-none">
                {user?.fullName}
              </p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="text-xs font-medium text-red-600 hover:text-red-700 px-3 py-1.5 rounded-lg hover:bg-red-50 border border-transparent hover:border-red-100"
          >
            Logout
          </button>
        </div>

        {/* Page Content */}
        <main className="flex-1 overflow-x-hidden">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
