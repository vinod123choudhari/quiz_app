import { Link, Outlet, useLocation, useNavigate } from "react-router";
import { useState, useEffect } from "react";
import { LogOut, Home, LayoutDashboard, Brain, Award, User, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Toaster } from "sonner";

export const Layout = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("quizzo_user") || "null");

  const handleLogout = () => {
    localStorage.removeItem("quizzo_user");
    navigate("/");
  };

  const navItems = [
    { name: "Home", path: "/", icon: <Home className="w-5 h-5" /> },
    { name: "Dashboard", path: "/dashboard", icon: <LayoutDashboard className="w-5 h-5" />, protected: true },
  ];

  return (
    <div className="min-h-screen bg-[#F8F9FE] text-slate-800 font-sans">
      <Toaster position="top-center" richColors />
      
      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-indigo-100 px-4 md:px-8 py-4 flex items-center justify-between shadow-sm">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="bg-indigo-600 p-2 rounded-xl group-hover:rotate-12 transition-transform duration-300 shadow-indigo-200 shadow-lg">
            <Brain className="w-6 h-6 text-white" />
          </div>
          <span className="text-2xl font-black bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">Quizzo</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            (!item.protected || user) && (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-2 font-medium transition-colors ${
                  location.pathname === item.path ? "text-indigo-600" : "text-slate-500 hover:text-indigo-600"
                }`}
              >
                {item.icon}
                {item.name}
              </Link>
            )
          ))}
          {user ? (
            <div className="flex items-center gap-4 pl-4 border-l border-slate-200">
              <div className="flex items-center gap-2 bg-indigo-50 px-3 py-1.5 rounded-full border border-indigo-100">
                <User className="w-4 h-4 text-indigo-600" />
                <span className="text-sm font-semibold text-indigo-700">{user.username}</span>
              </div>
              <button 
                onClick={handleLogout}
                className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                title="Log Out"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          ) : (
            <Link 
              to="/auth" 
              className="bg-indigo-600 text-white px-6 py-2 rounded-xl font-bold hover:bg-indigo-700 transition-all shadow-md shadow-indigo-100"
            >
              Sign In
            </Link>
          )}
        </div>

        {/* Mobile menu button */}
        <button className="md:hidden p-2 text-slate-600" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-[72px] left-0 right-0 bg-white border-b border-indigo-100 p-4 md:hidden z-40 shadow-xl"
          >
            <div className="flex flex-col gap-4">
              {navItems.map((item) => (
                (!item.protected || user) && (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsMenuOpen(false)}
                    className={`flex items-center gap-3 p-3 rounded-xl transition-colors ${
                      location.pathname === item.path ? "bg-indigo-50 text-indigo-600" : "text-slate-600 hover:bg-indigo-50"
                    }`}
                  >
                    {item.icon}
                    <span className="font-semibold">{item.name}</span>
                  </Link>
                )
              ))}
              {!user && (
                <Link 
                  to="/auth" 
                  onClick={() => setIsMenuOpen(false)}
                  className="bg-indigo-600 text-white p-3 rounded-xl font-bold text-center shadow-lg shadow-indigo-100"
                >
                  Sign In
                </Link>
              )}
              {user && (
                <button 
                  onClick={() => { handleLogout(); setIsMenuOpen(false); }}
                  className="flex items-center gap-3 p-3 rounded-xl text-red-600 hover:bg-red-50 transition-colors"
                >
                  <LogOut className="w-5 h-5" />
                  <span className="font-semibold">Log Out</span>
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main>
        <Outlet />
      </main>

      <footer className="bg-white border-t border-indigo-100 py-12 mt-20">
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <div className="bg-indigo-600 p-2 rounded-xl shadow-lg shadow-indigo-200">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-black bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">Quizzo</span>
          </div>
          <p className="text-slate-400 font-medium">© 2026 Quizzo Learning System. All rights reserved.</p>
          <div className="flex gap-6 text-slate-500 font-medium">
            <a href="#" className="hover:text-indigo-600">Privacy</a>
            <a href="#" className="hover:text-indigo-600">Terms</a>
            <a href="#" className="hover:text-indigo-600">Help Center</a>
          </div>
        </div>
      </footer>
    </div>
  );
};
