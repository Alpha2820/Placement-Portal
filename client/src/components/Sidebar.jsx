import { Link, useLocation } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

function Sidebar() {
  const location = useLocation();
  const { logout } = useContext(AuthContext);

  const isActive = (path) => location.pathname === path;

  const menuItems = [
    { path: '/dashboard', icon: '🏠', label: 'Overview' },
    { path: '/dashboard/submit', icon: '📝', label: 'Submit Placement' },
    { path: '/dashboard/my-placements', icon: '📊', label: 'My Placements' },
    { path: '/dashboard/profile', icon: '👤', label: 'My Profile' },
    { path: '/placements', icon: '🎯', label: 'Explore Placements' },
    { path: '/company-visits', icon: '🏢', label: 'Companies' },
  ];

  return (
    <div className="w-64 bg-gradient-to-b from-slate-900 to-slate-800 min-h-screen p-6 flex flex-col shadow-2xl">
      {/* Logo */}
      <div className="mb-10">
        <Link to="/" className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
            <span className="text-white font-bold text-xl">P</span>
          </div>
          <div>
            <h1 className="text-white font-bold text-lg">PlacementHub</h1>
            <p className="text-gray-400 text-xs">Student Portal</p>
          </div>
        </Link>
      </div>

      {/* Menu Items */}
      <nav className="flex-1 space-y-2">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
              isActive(item.path)
                ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg scale-105'
                : 'text-gray-300 hover:bg-slate-700 hover:text-white'
            }`}
          >
            <span className="text-2xl">{item.icon}</span>
            <span className="font-medium">{item.label}</span>
          </Link>
        ))}
      </nav>

      {/* Logout */}
      <button
        onClick={logout}
        className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-300 hover:bg-red-600 hover:text-white transition-all duration-200 mt-4"
      >
        <span className="text-2xl">🚪</span>
        <span className="font-medium">Logout</span>
      </button>
    </div>
  );
}

export default Sidebar;