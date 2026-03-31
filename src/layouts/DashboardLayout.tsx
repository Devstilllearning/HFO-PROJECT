import React from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '../components/ui/button';
import { BookOpen, LogOut, Home, Users, Calendar, Settings, Bell, Menu } from 'lucide-react';

export const DashboardLayout = () => {
  const { profile, signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = React.useState(false);

  const handleSignOut = async () => {
    await signOut();
    navigate('/login');
  };

  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: Home },
    { name: 'Classes', path: '/dashboard/classes', icon: BookOpen },
    { name: 'Calendar', path: '/dashboard/calendar', icon: Calendar },
  ];

  if (profile?.role === 'admin') {
    navItems.push({ name: 'Users', path: '/dashboard/users', icon: Users });
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">
      {/* Mobile Header */}
      <div className="md:hidden bg-white border-b p-4 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <img src="https://storage.googleapis.com/mms-attachments-prod/bW1zLWF0dGFjaG1lbnQvYzM3Y2YwOWUtYjA0Mi00MThjLWE3ZmEtYmQ2Nzg1N2YyNDM4LzE3NDM0ODk2MTQ2MjYvYmFkZ2UuanBn" alt="HFO SHS Logo" className="h-8 w-auto object-contain" referrerPolicy="no-referrer" />
          <span className="font-bold text-gray-900">SHS Portal</span>
        </div>
        <Button variant="ghost" size="icon" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
          <Menu className="h-6 w-6" />
        </Button>
      </div>

      {/* Sidebar */}
      <aside className={`
        fixed inset-y-0 left-0 z-40 w-64 bg-white border-r transform transition-transform duration-200 ease-in-out md:static md:translate-x-0
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="h-full flex flex-col">
          <div className="h-16 hidden md:flex items-center gap-3 px-6 border-b">
            <img src="https://storage.googleapis.com/mms-attachments-prod/bW1zLWF0dGFjaG1lbnQvYzM3Y2YwOWUtYjA0Mi00MThjLWE3ZmEtYmQ2Nzg1N2YyNDM4LzE3NDM0ODk2MTQ2MjYvYmFkZ2UuanBn" alt="HFO SHS Logo" className="h-8 w-auto object-contain" referrerPolicy="no-referrer" />
            <span className="text-xl font-bold text-gray-900">SHS Portal</span>
          </div>

          <div className="flex-1 overflow-y-auto py-4">
            <nav className="px-4 space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path || location.pathname.startsWith(`${item.path}/`);
                return (
                  <Link
                    key={item.name}
                    to={item.path}
                    onClick={() => setIsSidebarOpen(false)}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                      isActive 
                        ? 'bg-purple-50 text-purple-700' 
                        : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                    }`}
                  >
                    <Icon className={`h-5 w-5 ${isActive ? 'text-purple-700' : 'text-gray-400'}`} />
                    {item.name}
                  </Link>
                );
              })}
            </nav>
          </div>

          <div className="p-4 border-t">
            <div className="flex items-center gap-3 mb-4">
              {profile?.avatarUrl ? (
                <img src={profile.avatarUrl} alt={profile.name} className="h-10 w-10 rounded-full object-cover border" />
              ) : (
                <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-700 font-bold border border-purple-200">
                  {profile?.name?.charAt(0) || 'U'}
                </div>
              )}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">{profile?.name}</p>
                <p className="text-xs text-gray-500 truncate capitalize">{profile?.role}</p>
              </div>
            </div>
            <Button variant="outline" className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50" onClick={handleSignOut}>
              <LogOut className="h-4 w-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <header className="hidden md:flex h-16 bg-white border-b items-center justify-between px-8 sticky top-0 z-30">
          <h1 className="text-lg font-semibold text-gray-900 capitalize">
            {location.pathname.split('/').pop() || 'Dashboard'}
          </h1>
          <div className="flex items-center gap-4 relative">
            <Button variant="ghost" size="icon" className="relative" onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}>
              <Bell className="h-5 w-5 text-gray-500" />
              <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-red-500 border-2 border-white"></span>
            </Button>
            
            {isNotificationsOpen && (
              <div className="absolute top-12 right-12 w-80 bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden z-50">
                <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                  <h3 className="font-semibold text-gray-900">Notifications</h3>
                  <button className="text-xs text-purple-600 hover:text-purple-700 font-medium">Mark all as read</button>
                </div>
                <div className="max-h-96 overflow-y-auto">
                  <div className="p-4 border-b border-gray-50 hover:bg-gray-50 transition-colors cursor-pointer">
                    <div className="flex items-start gap-3">
                      <div className="h-8 w-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 flex-shrink-0">
                        <BookOpen className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-900 font-medium">New Assignment Posted</p>
                        <p className="text-xs text-gray-500 mt-0.5">Mr. Smith posted "Chapter 4 Review" in Mathematics.</p>
                        <p className="text-xs text-purple-600 mt-1 font-medium">2 hours ago</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 hover:bg-gray-50 transition-colors cursor-pointer">
                    <div className="flex items-start gap-3">
                      <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 flex-shrink-0">
                        <Calendar className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-900 font-medium">Upcoming Event</p>
                        <p className="text-xs text-gray-500 mt-0.5">School Assembly tomorrow at 8:00 AM.</p>
                        <p className="text-xs text-purple-600 mt-1 font-medium">1 day ago</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-3 border-t border-gray-100 text-center bg-gray-50">
                  <button className="text-sm text-gray-600 hover:text-gray-900 font-medium">View all notifications</button>
                </div>
              </div>
            )}

            <Link to="/dashboard/settings">
              <Button variant="ghost" size="icon">
                <Settings className="h-5 w-5 text-gray-500" />
              </Button>
            </Link>
          </div>
        </header>
        <div className="flex-1 overflow-y-auto p-4 md:p-8">
          <Outlet />
        </div>
      </main>

      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-gray-900/50 z-30 md:hidden" 
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
};
