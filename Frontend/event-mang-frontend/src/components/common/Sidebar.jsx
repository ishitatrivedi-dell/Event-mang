import { useTheme } from "../../context/ThemeContext";

const Sidebar = ({ isOpen, onClose, activeSection }) => {
  const { theme } = useTheme();

  const menuItems = [
    { id: "dashboard", name: "Dashboard", icon: "📊", description: "Overview and stats" },
    { id: "events", name: "Events", icon: "📅", description: "Manage events" },
    { id: "registrations", name: "Registrations", icon: "👥", description: "User registrations" },
    { id: "finance", name: "Finance", icon: "💰", description: "Revenue and expenses" },
    { id: "settings", name: "Settings", icon: "⚙️", description: "App settings" },
  ];

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 transition-opacity duration-300"
        onClick={onClose}
      />
      
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 h-full w-80 glass backdrop-blur-xl shadow-2xl
                        border-r border-white/30 z-50
                        transform transition-transform duration-300 ease-out
                        animate-slide-in">
        
        {/* Header */}
        <div className="p-6 border-b border-white/20">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-teal-400 to-teal-600 
                              flex items-center justify-center text-white font-black text-lg
                              shadow-lg">
                CE
              </div>
              <div>
                <h2 className="text-xl font-black" style={{ color: 'rgb(var(--text-main))' }}>CampusEvents</h2>
                <p className="text-sm font-bold" style={{ color: 'rgb(var(--text-muted))' }}>Event Management</p>
              </div>
            </div>
            
            {/* Close Button */}
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 
                         flex items-center justify-center font-bold
                         transition-all duration-200 hover:scale-110"
              style={{ color: 'rgb(var(--text-muted))' }}
            >
              ✕
            </button>
          </div>
        </div>

        {/* Menu Items */}
        <div className="p-4 space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onClose()}
              className={`w-full flex items-center gap-4 p-4 rounded-xl
                         transition-all duration-200 hover:scale-[1.02]
                         ${activeSection === item.id 
                           ? 'bg-gradient-to-r from-teal-500 to-teal-600 text-white shadow-lg' 
                           : 'hover:bg-teal-50 dark:hover:bg-teal-900/20'}`}
              style={{ color: activeSection === item.id ? 'white' : 'rgb(var(--text-main))' }}
            >
              <span className="text-2xl">{item.icon}</span>
              <div className="flex-1 text-left">
                <div className="font-black">{item.name}</div>
                <div className="text-sm font-bold" style={{ 
                  color: activeSection === item.id ? 'rgba(255, 255, 255, 0.9)' : 'rgb(var(--text-muted))' 
                }}>
                  {item.description}
                </div>
              </div>
              {activeSection === item.id && (
                <div className="w-2 h-2 rounded-full bg-white shadow-lg"></div>
              )}
            </button>
          ))}
        </div>

        {/* Footer */}
        <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-white/20">
          <div className="flex items-center gap-3 p-4 rounded-xl bg-gradient-to-r from-teal-50 to-teal-100 dark:from-teal-900/20 dark:to-teal-800/20">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-400 to-teal-600
                            flex items-center justify-center text-white font-black shadow-lg">
              A
            </div>
            <div className="flex-1">
              <div className="font-black" style={{ color: 'rgb(var(--text-main))' }}>Admin User</div>
              <div className="text-sm font-bold" style={{ color: 'rgb(var(--text-muted))' }}>admin@campusevents.com</div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
