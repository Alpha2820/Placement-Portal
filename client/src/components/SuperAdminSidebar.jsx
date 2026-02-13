import { Link, useLocation } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

function SuperAdminSidebar() {
  const location = useLocation();
  const { logout, user } = useContext(AuthContext);

  const isActive = (path) => location.pathname === path;

  const menuItems = [
    { path: '/superadmin/admins', icon: '👥', label: 'All Users & Admins' },
    { path: '/admin/company-visits', icon: '🏢', label: 'Company Visits' },
  ];

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="w-64 bg-gradient-to-b from-purple-900 to-indigo-900 min-h-screen p-6 flex flex-col shadow-2xl border-r border-purple-700">
      {/* Logo */}
      <div className="mb-10">
        <Link to="/superadmin" className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg">
            <span className="text-white font-bold text-xl">👑</span>
          </div>
          <div>
            <h1 className="text-white font-bold text-lg">Super Admin</h1>
            <p className="text-purple-300 text-xs">Master Control</p>
          </div>
        </Link>
      </div>

      {/* Super Admin Info */}
      <div className="mb-8 p-4 bg-purple-800 bg-opacity-50 rounded-xl border border-purple-600">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-full flex items-center justify-center text-white font-bold">
            {user?.name?.charAt(0).toUpperCase()}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-white font-semibold text-sm truncate">{user?.name}</p>
            <p className="text-purple-300 text-xs flex items-center gap-1">
              <span>👑</span> Super Admin
            </p>
          </div>
        </div>
      </div>

      {/* Menu Items */}
      <nav className="flex-1 space-y-2">
        <p className="text-purple-400 text-xs font-semibold uppercase tracking-wider mb-3 px-3">
          Main Menu
        </p>
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
              isActive(item.path)
                ? 'bg-gradient-to-r from-yellow-500 to-orange-600 text-white shadow-lg scale-105'
                : 'text-purple-200 hover:bg-purple-800 hover:bg-opacity-50 hover:text-white'
            }`}
          >
            <span className="text-2xl">{item.icon}</span>
            <span className="font-medium text-sm">{item.label}</span>
          </Link>
        ))}
      </nav>

      {/* Quick Info */}
      <div className="mb-4 p-4 bg-gradient-to-br from-yellow-600 to-orange-600 rounded-xl">
        <p className="text-yellow-100 text-xs font-semibold mb-2">🔒 Full Access</p>
        <p className="text-white text-sm">
          You have complete control over all users and admins.
        </p>
      </div>

      {/* Logout */}
      <button
        onClick={handleLogout}
        className="flex items-center gap-3 px-4 py-3 rounded-xl text-purple-200 hover:bg-red-600 hover:text-white transition-all duration-200 mt-4 w-full"
      >
        <span className="text-2xl">🚪</span>
        <span className="font-medium">Logout</span>
      </button>
    </div>
  );
}

export default SuperAdminSidebar;