import { useState, useEffect, useRef } from 'react';
import { Link, Outlet, useLocation } from 'react-router';
import { 
  LayoutDashboard, 
  ArrowLeftRight, 
  Wallet, 
  Target, 
  Receipt, 
  CreditCard, 
  BarChart3, 
  Settings,
  Bell,
  Search,
  Plus,
  Menu,
  X,
  LogOut,
  ChevronDown
} from 'lucide-react';
import { Avatar, AvatarFallback } from '../components/ui/avatar';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { supabase } from '../../lib/supabase';

const navItems = [
  { path: '/', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/transactions', label: 'Transactions', icon: ArrowLeftRight },
  { path: '/budget', label: 'Budget', icon: Wallet },
  { path: '/goals', label: 'Goals', icon: Target },
  { path: '/bills', label: 'Bills & Subscriptions', icon: Receipt },
  { path: '/debt', label: 'Debt', icon: CreditCard },
  { path: '/reports', label: 'Reports & Insights', icon: BarChart3 },
  { path: '/settings', label: 'Settings', icon: Settings },
];

export function Layout() {
  const location = useLocation();

  // Mobile sidebar open/close
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // User dropdown open/close
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Real logged-in user from Supabase
  const [user, setUser] = useState(null);

  // Ref to close dropdown when clicking outside
  const dropdownRef = useRef(null);

  // Get current user on mount
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close sidebar when route changes on mobile
  useEffect(() => {
    setSidebarOpen(false);
  }, [location.pathname]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  // Get initials from email or name
  const getUserInitials = () => {
    if (!user) return 'U';
    const email = user.email || '';
    const name = user.user_metadata?.full_name || email;
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  // Get display name from email or metadata
  const getUserName = () => {
    if (!user) return 'User';
    return user.user_metadata?.full_name || user.email?.split('@')[0] || 'User';
  };

  const SidebarContent = () => (
    <>
      {/* Logo */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
            <Wallet className="w-5 h-5 text-white" />
          </div>
          <span className="font-semibold text-lg">FinanceTracker</span>
        </div>
      </div>

      {/* Nav Links */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;

          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all ${
                isActive
                  ? 'bg-blue-50 text-blue-600'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <Icon className="w-5 h-5 flex-shrink-0" />
              <span className="text-sm font-medium">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Quick Add Button */}
      <div className="p-4 border-t border-gray-200">
        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:opacity-90 transition-opacity">
          <Plus className="w-5 h-5" />
          <span className="text-sm font-medium">Quick Add</span>
        </button>
      </div>
    </>
  );

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar — hidden on mobile, slides in when open */}
      <aside className={`
        fixed lg:static inset-y-0 left-0 z-30
        w-64 bg-white border-r border-gray-200 flex flex-col
        transform transition-transform duration-300 ease-in-out
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0
      `}>
        {/* Close button — mobile only */}
        <button
          className="absolute top-4 right-4 lg:hidden p-1 rounded-lg hover:bg-gray-100"
          onClick={() => setSidebarOpen(false)}
        >
          <X className="w-5 h-5 text-gray-600" />
        </button>

        <SidebarContent />
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden min-w-0">

        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-4 md:px-8 py-4 flex-shrink-0">
          <div className="flex items-center justify-between gap-4">

            {/* Left — Hamburger + Search */}
            <div className="flex items-center gap-3 flex-1 min-w-0">
              {/* Hamburger — mobile only */}
              <button
                className="lg:hidden p-2 rounded-lg hover:bg-gray-50 transition-colors flex-shrink-0"
                onClick={() => setSidebarOpen(true)}
              >
                <Menu className="w-5 h-5 text-gray-600" />
              </button>

              {/* Search — hidden on small mobile */}
              <div className="relative flex-1 max-w-xl hidden sm:block">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Search transactions, goals..."
                  className="pl-10 bg-gray-50 border-gray-200 w-full"
                />
              </div>
            </div>

            {/* Right — Actions + User */}
            <div className="flex items-center gap-2 md:gap-4 flex-shrink-0">

              {/* Add Transaction — hidden on mobile */}
              <Button variant="outline" size="sm" className="gap-2 hidden md:flex">
                <Plus className="w-4 h-4" />
                Add Transaction
              </Button>

              {/* Notifications */}
              <button className="relative p-2 rounded-lg hover:bg-gray-50 transition-colors">
                <Bell className="w-5 h-5 text-gray-600" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>

              {/* User Dropdown */}
              <div className="relative pl-2 md:pl-4 border-l border-gray-200" ref={dropdownRef}>
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-2 md:gap-3 hover:opacity-80 transition-opacity"
                >
                  {/* Name — hidden on small mobile */}
                  <div className="text-right hidden md:block">
                    <div className="text-sm font-medium text-gray-900">{getUserName()}</div>
                    <div className="text-xs text-gray-500">{user?.email}</div>
                  </div>

                  <Avatar>
                    <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white text-sm">
                      {getUserInitials()}
                    </AvatarFallback>
                  </Avatar>

                  <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform hidden md:block ${dropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                {/* Dropdown Menu */}
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-xl shadow-lg z-50 overflow-hidden">
                    {/* User info */}
                    <div className="px-4 py-3 border-b border-gray-100">
                      <p className="text-sm font-medium text-gray-900">{getUserName()}</p>
                      <p className="text-xs text-gray-500 truncate">{user?.email}</p>
                    </div>

                    {/* Menu items */}
                    <div className="p-1">
                      <Link
                        to="/settings"
                        className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg"
                        onClick={() => setDropdownOpen(false)}
                      >
                        <Settings className="w-4 h-4" />
                        Settings
                      </Link>

                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <LogOut className="w-4 h-4" />
                        Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Mobile Search — shown below header on small screens */}
          <div className="mt-3 sm:hidden">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search..."
                className="pl-10 bg-gray-50 border-gray-200 w-full"
              />
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}