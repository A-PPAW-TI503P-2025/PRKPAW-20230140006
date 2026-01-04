import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { Menu, X, LogOut } from "lucide-react";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  let user = null;

  const token = localStorage.getItem("token");
  if (token) {
    try {
      user = jwtDecode(token);
    } catch (err) {
      localStorage.removeItem("token");
      navigate("/login");
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  if (!user) return null;

  const isActive = (path) => location.pathname === path;

  const activeClass = "bg-blue-100 text-blue-700 font-semibold shadow-sm";
  const inactiveClass = "text-gray-600 hover:bg-gray-50 hover:text-gray-900";

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <div className="flex items-center">
            <Link to="/dashboard" className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center shadow-md">
                <span className="text-white font-bold text-lg">AP</span>
              </div>
              <span className="text-xl font-bold text-gray-800 hidden sm:block">
                Aplikasi Presensi
              </span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-3">
            <Link
              to="/dashboard"
              className={`px-6 py-2.5 rounded-full font-medium transition-all ${
                isActive("/dashboard") ? activeClass : inactiveClass
              }`}
            >
              Dashboard
            </Link>

            <Link
              to="/presensi"
              className={`px-6 py-2.5 rounded-full font-medium transition-all ${
                isActive("/presensi") ? activeClass : inactiveClass
              }`}
            >
              Presensi
            </Link>

            {/* admin only */}
            {user.role === "admin" && (
              <Link
                to="/reports"
                className={`px-6 py-2.5 rounded-full font-medium transition-all ${
                  isActive("/reports") ? activeClass : inactiveClass
                }`}
              >
                Laporan Admin
              </Link>
            )}

            {/* 🔥 Monitoring Suhu */}
            <Link
              to="/monitoring"
              className={`px-6 py-2.5 rounded-full font-medium transition-all ${
                isActive("/monitoring") ? activeClass : inactiveClass
              }`}
            >
              Monitoring Suhu
            </Link>
          </div>

          {/* Desktop User */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                {user.nama.charAt(0).toUpperCase()}
              </div>
              <div>
                <p className="text-sm font-semibold">{user.nama}</p>
                <p className="text-xs text-gray-500 capitalize">{user.role}</p>
              </div>
            </div>

            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 bg-red-500 hover:bg-red-600 text-white px-5 py-2.5 rounded-full font-medium"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </button>
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-gray-700"
          >
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 px-4 py-5 space-y-3">

          <Link
            to="/dashboard"
            className={`block px-6 py-3 rounded-full font-medium ${
              isActive("/dashboard") ? activeClass : inactiveClass
            }`}
            onClick={() => setMobileMenuOpen(false)}
          >
            Dashboard
          </Link>

          <Link
            to="/presensi"
            className={`block px-6 py-3 rounded-full font-medium ${
              isActive("/presensi") ? activeClass : inactiveClass
            }`}
            onClick={() => setMobileMenuOpen(false)}
          >
            Presensi
          </Link>

          {user.role === "admin" && (
            <Link
              to="/reports"
              className={`block px-6 py-3 rounded-full font-medium ${
                isActive("/reports") ? activeClass : inactiveClass
              }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Laporan Admin
            </Link>
          )}

          {/* 🔥 Monitoring di Mobile */}
          <Link
            to="/monitoring"
            className={`block px-6 py-3 rounded-full font-medium ${
              isActive("/monitoring") ? activeClass : inactiveClass
            }`}
            onClick={() => setMobileMenuOpen(false)}
          >
            Monitoring Suhu
          </Link>

          <button
            onClick={handleLogout}
            className="w-full bg-red-500 text-white py-3 rounded-full mt-4 font-medium"
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
