import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
    Calendar, 
    PieChart, 
    Shield, 
    LayoutDashboard, 
    PlusCircle, 
    FileBadge,
    LogOut,
    Menu,
    ChevronLeft
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const Sidebar = ({ isOpen, toggleSidebar }) => {
    const location = useLocation();
    const user = JSON.parse(localStorage.getItem('user'));

    const navItems = [
        { icon: LayoutDashboard, label: 'Events List', path: '/', roles: ['Student', 'ClubAdmin', 'SuperAdmin', 'FinanceHead'] },
        { icon: PlusCircle, label: 'Create Event', path: '/create-event', roles: ['ClubAdmin', 'SuperAdmin'] },
        { icon: PieChart, label: 'Finance', path: '/finance', roles: ['FinanceHead', 'ClubAdmin', 'SuperAdmin'] },
        { icon: FileBadge, label: 'Certificates', path: '/certificates', roles: ['Student', 'ClubAdmin', 'SuperAdmin', 'FinanceHead'] },
    ];

    const filteredItems = navItems.filter(item => !item.roles || (user && item.roles.includes(user.role)));

    return (
        <aside className={cn(
            "fixed inset-y-0 left-0 z-50 flex flex-col bg-card border-r transition-all duration-300 ease-in-out",
            isOpen ? "w-64" : "w-20"
        )}>
            <div className="flex items-center justify-between h-16 px-4 border-b">
                <Link to="/" className={cn("flex items-center gap-2 font-bold text-primary transition-all overflow-hidden whitespace-nowrap", !isOpen && "w-0")}>
                    <Shield className="h-6 w-6" />
                    <span>CampusEvents</span>
                </Link>
                <Button variant="ghost" size="icon" onClick={toggleSidebar}>
                    {isOpen ? <ChevronLeft className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                </Button>
            </div>

            <nav className="flex-1 px-3 py-4 space-y-1">
                {filteredItems.map((item) => {
                    const isActive = location.pathname === item.path;
                    return (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={cn(
                                "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all group relative",
                                isActive 
                                    ? "bg-primary text-primary-foreground" 
                                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                            )}
                        >
                            <item.icon className={cn("h-5 w-5 shrink-0", isActive ? "text-primary-foreground" : "text-primary")} />
                            <span className={cn("transition-all duration-300", !isOpen && "opacity-0 invisible")}>
                                {item.label}
                            </span>
                            {!isOpen && (
                                <div className="absolute left-14 bg-popover text-popover-foreground px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap border shadow-sm z-50">
                                    {item.label}
                                </div>
                            )}
                        </Link>
                    );
                })}
            </nav>

            {user && (
                <div className="p-4 border-t">
                    <div className={cn("flex items-center gap-3", !isOpen && "justify-center")}>
                        <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                            {user.role[0]}
                        </div>
                        {isOpen && (
                            <div className="flex-1 overflow-hidden">
                                <p className="text-sm font-medium truncate">{user.role}</p>
                                <p className="text-xs text-muted-foreground truncate">University Member</p>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </aside>
    );
};

export default Sidebar;
