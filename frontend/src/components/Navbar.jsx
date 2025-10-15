import { useState, useRef, useEffect, useCallback } from "react";
import { Settings, ChevronDown, LogOut, Zap } from "lucide-react";
import { useNavigate } from "react-router-dom";

/**
 * Navbar - Smart Task
 *
 * Props:
 * - user: { name?, email?, avatar? }
 * - onLogout: () => void   // called when user chooses to logout
 *
 * Notes:
 * - Visible app name changed to "Smart Task"
 * - Dropdown closes when clicking outside or pressing Escape
 * - Keeps existing behavior; minimal surface to change later for cookies
 */

const Navbar = ({ user = {}, onLogout }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const menuRef = useRef(null);

  const handleMenuToggle = useCallback(() => setMenuOpen((s) => !s), []);
  const closeMenu = useCallback(() => setMenuOpen(false), []);
  const handleLogout = useCallback(() => {
    closeMenu();
    onLogout && onLogout();
  }, [onLogout, closeMenu]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        closeMenu();
      }
    };
    const handleEscape = (e) => {
      if (e.key === "Escape") closeMenu();
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [closeMenu]);

  return (
    <header className="sticky top-0 z-50 bg-slate-950/95 backdrop-blur-xl shadow-2xl shadow-pink-500/10 border-b border-pink-500/20">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-3 flex items-center justify-between">
        {/* Left: Logo + Brand */}
        <button
          type="button"
          onClick={() => navigate("/")}
          className="flex items-center gap-3 group focus:outline-none"
          aria-label="Go to dashboard"
        >
          <div className="relative w-10 h-10 rounded-xl flex items-center justify-center bg-gradient-to-br from-pink-600 via-rose-500 to-pink-600 shadow-lg shadow-pink-500/50">
            <Zap className="w-5 h-5 text-white" />
            <span className="sr-only">Smart Task logo</span>
            <span className="absolute -bottom-1.5 -right-1.5 w-2.5 h-2.5 bg-pink-400 rounded-full shadow-lg shadow-pink-500/50 animate-ping" />
          </div>

          <span className="text-2xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-rose-400 to-pink-500">
            Smart Task
          </span>
        </button>

        {/* Right: Controls */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => navigate("/profile")}
            aria-label="Open profile settings"
            className="p-2 rounded-xl hover:bg-pink-500/20 transition-all duration-300 text-gray-400 hover:text-pink-400"
          >
            <Settings className="w-5 h-5" />
          </button>

          {/* User menu */}
          <div ref={menuRef} className="relative">
            <button
              type="button"
              onClick={handleMenuToggle}
              aria-haspopup="menu"
              aria-expanded={menuOpen}
              className="flex items-center gap-3 px-3 py-2 rounded-xl border border-pink-500/20 hover:bg-pink-500/10 hover:border-pink-500/30 transition-all duration-300"
            >
              <div className="relative">
                {user.avatar ? (
                  <img
                    src={user.avatar}
                    alt={`${user.name || "User"} avatar`}
                    className="w-9 h-9 rounded-full object-cover shadow-lg shadow-pink-500/30"
                  />
                ) : (
                  <div className="w-9 h-9 rounded-full flex items-center justify-center bg-gradient-to-br from-pink-600 to-rose-600 text-white font-bold shadow-lg shadow-pink-500/50">
                    {user.name?.[0]?.toUpperCase() ?? "U"}
                  </div>
                )}

                <span className="absolute -bottom-1 -right-1 w-3 h-3 rounded-full bg-emerald-400 border-2 border-slate-950 shadow-lg shadow-emerald-400/50" />
              </div>

              {/* Hidden on small screens */}
              <div className="text-left hidden md:block">
                <p className="text-sm font-bold text-white">{user.name || "Guest User"}</p>
                <p className="text-xs text-gray-400">{user.email || "user@smarttask.com"}</p>
              </div>

              <ChevronDown className={`w-4 h-4 text-pink-400 transition-transform duration-300 ${menuOpen ? "rotate-180" : ""}`} />
            </button>

            {menuOpen && (
              <ul
                role="menu"
                aria-label="User menu"
                className="absolute right-0 mt-3 w-56 bg-slate-900/95 backdrop-blur-xl rounded-2xl shadow-2xl shadow-pink-500/20 border border-pink-500/30 overflow-hidden z-50 animate-fadeIn"
              >
                <li className="px-2 py-1">
                  <button
                    type="button"
                    role="menuitem"
                    onClick={() => {
                      closeMenu();
                      navigate("/profile");
                    }}
                    className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-300 hover:bg-pink-500/20 hover:text-pink-300 rounded-xl transition-all duration-300 font-medium"
                  >
                    <Settings className="w-4 h-4" />
                    Profile settings
                  </button>
                </li>

                <li className="px-2 py-1">
                  <button
                    type="button"
                    role="menuitem"
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2 px-3 py-2 text-sm text-rose-400 hover:bg-rose-500/20 hover:text-rose-300 rounded-xl transition-all duration-300 font-medium"
                  >
                    <LogOut className="w-4 h-4" />
                    Sign out
                  </button>
                </li>
              </ul>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;