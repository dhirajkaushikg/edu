import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Wrench, User, Mail, Moon, Sun, Menu, X, Trophy } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const Sidebar = () => {
  const { isDark, toggleTheme } = useTheme();
  const location = useLocation();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const menuItems = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'Tools', path: '/tools', icon: Wrench },
    { name: 'Games', path: '/games', icon: Trophy },
    { name: 'About', path: '/about', icon: User },
    { name: 'Contact', path: '/contact', icon: Mail },
  ];

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-xl bg-black/20 backdrop-blur-md border border-purple-500/30 text-purple-300 hover:text-white transition-colors"
        onClick={() => setIsMobileOpen(!isMobileOpen)}
      >
        {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <div className={`fixed left-0 top-0 h-full w-64 ${isDark ? 'bg-black/20' : 'bg-white/20'} backdrop-blur-md border-r border-purple-500/30 transition-transform duration-300 z-40 ${
        isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      }`}>
        <div className="flex flex-col h-full p-6">
          {/* Logo */}
          <div className="mb-8 pt-14 lg:pt-0">
            <h1 className={`text-2xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>Edurance Hub</h1>
            <p className={`text-sm ${isDark ? 'text-purple-300' : 'text-purple-600'}`}>Modern Utility Hub</p>
          </div>

          {/* Navigation - Scrollable Y-axis only */}
          <nav className="flex-1 overflow-y-auto overflow-x-hidden">
            <ul className="space-y-2">
              {menuItems.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.path}
                    onClick={() => setIsMobileOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group ${
                      isActive(item.path)
                        ? `${isDark ? 'bg-purple-600/30 text-white' : 'bg-purple-600/20 text-purple-700'} border border-purple-500/50 shadow-lg shadow-purple-500/20`
                        : `${isDark ? 'text-purple-300 hover:text-white' : 'text-purple-600 hover:text-purple-800'} hover:bg-purple-500/20 hover:shadow-md hover:shadow-purple-500/10`
                    }`}
                  >
                    <item.icon size={20} className={`transition-all duration-300 ${
                      isActive(item.path) ? 'text-purple-400' : `${isDark ? 'text-purple-400 group-hover:text-purple-300' : 'text-purple-500 group-hover:text-purple-600'}`
                    }`} />
                    <span className="font-medium">{item.name}</span>
                    {isActive(item.path) && (
                      <div className="w-2 h-2 rounded-full bg-purple-400 ml-auto animate-pulse" />
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Theme Toggle */}
          <div className="border-t border-purple-500/30 pt-6">
            <button
              onClick={toggleTheme}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl w-full ${isDark ? 'text-purple-300 hover:text-white' : 'text-purple-600 hover:text-purple-800'} hover:bg-purple-500/20 transition-all duration-300 group`}
            >
              {isDark ? <Sun size={20} className={`${isDark ? 'text-purple-400 group-hover:text-purple-300' : 'text-purple-500 group-hover:text-purple-600'}`} /> : <Moon size={20} className={`${isDark ? 'text-purple-400 group-hover:text-purple-300' : 'text-purple-500 group-hover:text-purple-600'}`} />}
              <span className="font-medium">{isDark ? 'Light Mode' : 'Dark Mode'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-30"
          onClick={() => setIsMobileOpen(false)}
        />
      )}
    </>
  );
};

export default Sidebar;