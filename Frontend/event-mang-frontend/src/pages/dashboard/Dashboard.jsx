import { useState } from "react";
import Navbar from "../../components/common/Navbar";
import Sidebar from "../../components/common/Sidebar";

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("dashboard");

  const handleMenuClick = (sectionId) => {
    setActiveSection(sectionId);
    setIsSidebarOpen(true); // Open sidebar when navbar item is clicked
  };

  const handleCloseSidebar = () => {
    setIsSidebarOpen(false);
  };

  const renderContent = () => {
    switch (activeSection) {
      case "dashboard":
        return (
          <div className="h-full w-full p-8 space-y-8">
            <div>
              <h1 className="text-4xl font-black mb-2" style={{ color: 'rgb(var(--text-main))' }}>
                Dashboard Overview
              </h1>
              <p className="text-lg font-semibold" style={{ color: 'rgb(var(--text-secondary))' }}>
                Welcome back! Here's what's happening with your events today.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { name: "Total Events", value: "24", change: "+12%", icon: "📅", color: "from-teal-400 to-teal-600" },
                { name: "Registrations", value: "1,429", change: "+23%", icon: "👥", color: "from-emerald-400 to-emerald-600" },
                { name: "Revenue", value: "$8,432", change: "+18%", icon: "💰", color: "from-cyan-400 to-cyan-600" },
              ].map((stat) => (
                <div
                  key={stat.name}
                  className="glass-card p-6 rounded-2xl"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} 
                                    flex items-center justify-center text-white text-xl shadow-lg`}>
                      {stat.icon}
                    </div>
                    <span className="text-sm font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-900/20 px-2 py-1 rounded-lg">
                      {stat.change}
                    </span>
                  </div>
                  <h3 className="text-3xl font-black mb-1" style={{ color: 'rgb(var(--text-main))' }}>{stat.value}</h3>
                  <p className="text-base font-semibold" style={{ color: 'rgb(var(--text-secondary))' }}>{stat.name}</p>
                </div>
              ))}
            </div>

            {/* Additional Stats Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="glass-card p-6 rounded-2xl">
                <h3 className="text-xl font-bold mb-4" style={{ color: 'rgb(var(--text-main))' }}>Recent Activity</h3>
                <div className="space-y-3">
                  {[
                    { event: "Tech Summit 2024", time: "2 hours ago", status: "completed" },
                    { event: "Career Fair", time: "5 hours ago", status: "ongoing" },
                    { event: "Workshop: React", time: "1 day ago", status: "upcoming" },
                  ].map((activity, index) => (
                    <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-800/50">
                      <div>
                        <p className="font-bold" style={{ color: 'rgb(var(--text-main))' }}>{activity.event}</p>
                        <p className="text-sm font-medium" style={{ color: 'rgb(var(--text-muted))' }}>{activity.time}</p>
                      </div>
                      <span className={`px-2 py-1 rounded-lg text-xs font-bold ${
                        activity.status === 'completed' ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/20 dark:text-emerald-300' :
                        activity.status === 'ongoing' ? 'bg-teal-100 text-teal-800 dark:bg-teal-900/20 dark:text-teal-300' :
                        'bg-gray-100 text-gray-800 dark:bg-gray-700/20 dark:text-gray-300'
                      }`}>
                        {activity.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="glass-card p-6 rounded-2xl">
                <h3 className="text-xl font-bold mb-4" style={{ color: 'rgb(var(--text-main))' }}>Quick Actions</h3>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { name: "Create Event", icon: "➕", color: "from-teal-500 to-teal-600" },
                    { name: "View Reports", icon: "📊", color: "from-emerald-500 to-emerald-600" },
                    { name: "Manage Users", icon: "👥", color: "from-cyan-500 to-cyan-600" },
                    { name: "Settings", icon: "⚙️", color: "from-gray-500 to-gray-600" },
                  ].map((action, index) => (
                    <button
                      key={index}
                      className={`p-4 rounded-xl bg-gradient-to-r ${action.color} 
                                 text-white font-bold hover:scale-105 transition-all duration-200
                                 shadow-lg hover:shadow-xl flex flex-col items-center gap-2`}
                    >
                      <span className="text-2xl">{action.icon}</span>
                      <span className="text-sm font-bold">{action.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case "events":
        return (
          <div className="h-full w-full p-8 space-y-8">
            <div>
              <h1 className="text-4xl font-black mb-2" style={{ color: 'rgb(var(--text-main))' }}>Events</h1>
              <p className="text-lg font-semibold" style={{ color: 'rgb(var(--text-secondary))' }}>Manage and track all your campus events</p>
            </div>
            <div className="glass-card p-8 rounded-2xl h-full flex items-center justify-center">
              <div className="text-center">
                <div className="w-20 h-20 rounded-xl bg-gradient-to-br from-teal-400 to-teal-600 
                                flex items-center justify-center text-white text-3xl mx-auto mb-4">
                  📅
                </div>
                <h3 className="text-xl font-bold mb-2" style={{ color: 'rgb(var(--text-main))' }}>Events Management</h3>
                <p className="text-base font-semibold" style={{ color: 'rgb(var(--text-secondary))' }}>Create, edit, and manage your campus events</p>
              </div>
            </div>
          </div>
        );

      case "registrations":
        return (
          <div className="h-full w-full p-8 space-y-8">
            <div>
              <h1 className="text-4xl font-black mb-2" style={{ color: 'rgb(var(--text-main))' }}>Registrations</h1>
              <p className="text-lg font-semibold" style={{ color: 'rgb(var(--text-secondary))' }}>View and manage event registrations</p>
            </div>
            <div className="glass-card p-8 rounded-2xl h-full flex items-center justify-center">
              <div className="text-center">
                <div className="w-20 h-20 rounded-xl bg-gradient-to-br from-emerald-400 to-emerald-600 
                                flex items-center justify-center text-white text-3xl mx-auto mb-4">
                  👥
                </div>
                <h3 className="text-xl font-bold mb-2" style={{ color: 'rgb(var(--text-main))' }}>Registration Management</h3>
                <p className="text-base font-semibold" style={{ color: 'rgb(var(--text-secondary))' }}>Track and manage user registrations</p>
              </div>
            </div>
          </div>
        );

      case "finance":
        return (
          <div className="h-full w-full p-8 space-y-8">
            <div>
              <h1 className="text-4xl font-black mb-2" style={{ color: 'rgb(var(--text-main))' }}>Finance</h1>
              <p className="text-lg font-semibold" style={{ color: 'rgb(var(--text-secondary))' }}>Track revenue and expenses</p>
            </div>
            <div className="glass-card p-8 rounded-2xl h-full flex items-center justify-center">
              <div className="text-center">
                <div className="w-20 h-20 rounded-xl bg-gradient-to-br from-cyan-400 to-cyan-600 
                                flex items-center justify-center text-white text-3xl mx-auto mb-4">
                  💰
                </div>
                <h3 className="text-xl font-bold mb-2" style={{ color: 'rgb(var(--text-main))' }}>Financial Overview</h3>
                <p className="text-base font-semibold" style={{ color: 'rgb(var(--text-secondary))' }}>Monitor revenue, expenses, and financial reports</p>
              </div>
            </div>
          </div>
        );

      case "settings":
        return (
          <div className="h-full w-full p-8 space-y-8">
            <div>
              <h1 className="text-4xl font-black mb-2" style={{ color: 'rgb(var(--text-main))' }}>Settings</h1>
              <p className="text-lg font-semibold" style={{ color: 'rgb(var(--text-secondary))' }}>Manage your application settings</p>
            </div>
            <div className="glass-card p-8 rounded-2xl h-full flex items-center justify-center">
              <div className="text-center">
                <div className="w-20 h-20 rounded-xl bg-gradient-to-br from-gray-400 to-gray-600 
                                flex items-center justify-center text-white text-3xl mx-auto mb-4">
                  ⚙️
                </div>
                <h3 className="text-xl font-bold mb-2" style={{ color: 'rgb(var(--text-main))' }}>Application Settings</h3>
                <p className="text-base font-semibold" style={{ color: 'rgb(var(--text-secondary))' }}>Configure system preferences and options</p>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="h-screen w-screen gradient-bg transition-colors duration-500">
      {/* Static Navbar */}
      <Navbar onMenuClick={handleMenuClick} activeSection={activeSection} />

      {/* Toggleable Sidebar */}
      <Sidebar isOpen={isSidebarOpen} onClose={handleCloseSidebar} activeSection={activeSection} />

      {/* Full Height/Width Content */}
      <main className="h-full w-full pt-16">
        {renderContent()}
      </main>
    </div>
  );
};

export default Dashboard;
