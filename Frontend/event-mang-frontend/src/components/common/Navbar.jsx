import { useState } from "react";
import ThemeSelector from "../theme/ThemeSelector";

const Navbar = ({ onMenuClick, activeSection }) => {
  const menuItems = [
    { id: "dashboard", name: "Dashboard", icon: "📊" },
    { id: "events", name: "Events", icon: "📅" },
    { id: "registrations", name: "Registrations", icon: "👥" },
    { id: "finance", name: "Finance", icon: "💰" },
    { id: "settings", name: "Settings", icon: "⚙️" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50
                    glass px-8 py-4 shadow-xl
                    backdrop-blur-xl border-b border-white/30
                    transition-all duration-300">
      
      <div className="max-w-full mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-400 to-teal-600 
                          flex items-center justify-center text-white font-black text-lg
                          shadow-lg">
            CE
          </div>
          <div className="text-xl font-black" style={{ color: 'rgb(var(--text-main))' }}>
            CampusEvents
          </div>
        </div>

        {/* Navigation Items */}
        <div className="flex items-center gap-2">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onMenuClick(item.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl
                         transition-all duration-200 hover:scale-105
                         font-bold text-sm
                         ${activeSection === item.id 
                           ? 'bg-gradient-to-r from-teal-500 to-teal-600 text-white shadow-lg' 
                           : 'hover:bg-teal-50 dark:hover:bg-teal-900/20 hover:text-teal-700 dark:hover:text-teal-300'}`}
              style={{ color: activeSection === item.id ? 'white' : 'rgb(var(--text-secondary))' }}
            >
              <span className="text-lg">{item.icon}</span>
              <span>{item.name}</span>
            </button>
          ))}
        </div>

        {/* Right Controls */}
        <div className="flex items-center gap-3 pl-6 border-l border-white/20">
          {/* Theme Selector */}
          <ThemeSelector />

          {/* Toggle Dark Mode */}
          <button
            onClick={() => document.documentElement.classList.toggle("dark")}
            className="w-10 h-10 rounded-xl bg-gradient-to-r from-teal-500 to-teal-600
                       text-white font-bold hover:from-teal-600 hover:to-teal-700
                       transition-all duration-200 hover:scale-105 active:scale-95
                       shadow-lg flex items-center justify-center"
          >
            🌙
          </button>

          {/* User Avatar */}
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-400 to-teal-600
                          flex items-center justify-center text-white font-black
                          cursor-pointer hover:scale-110 transition-all shadow-lg">
            A
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
