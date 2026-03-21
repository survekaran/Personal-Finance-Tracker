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
  User
} from 'lucide-react';
import { Avatar, AvatarFallback } from '../components/ui/avatar';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';

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

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
              <Wallet className="w-5 h-5 text-white" />
            </div>
            <span className="font-semibold text-lg">FinanceTracker</span>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-1">
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
                <Icon className="w-5 h-5" />
                <span className="text-sm font-medium">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center gap-3 px-4 py-3 rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 text-white">
            <Plus className="w-5 h-5" />
            <span className="text-sm font-medium">Quick Add</span>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex-1 max-w-xl">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Search transactions, goals..."
                  className="pl-10 bg-gray-50 border-gray-200"
                />
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Button variant="outline" size="sm" className="gap-2">
                <Plus className="w-4 h-4" />
                Add Transaction
              </Button>

              <button className="relative p-2 rounded-lg hover:bg-gray-50 transition-colors">
                <Bell className="w-5 h-5 text-gray-600" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>

              <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
                <div className="text-right">
                  <div className="text-sm font-medium text-gray-900">Sarah Chen</div>
                  <div className="text-xs text-gray-500">Premium Member</div>
                </div>
                <Avatar>
                  <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                    SC
                  </AvatarFallback>
                </Avatar>
              </div>
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
