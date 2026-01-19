import React, { useState } from 'react';
import Sidebar from './Sidebar';
import { Button } from "@/components/ui/button";
import { LogOut, Sun, Moon, Bell } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const DashboardLayout = ({ children }) => {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user'));

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/login');
    };

    return (
        <div className="min-h-screen bg-background text-foreground flex">
            {/* Sidebar */}
            <Sidebar isOpen={sidebarOpen} toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

            {/* Main Content Area */}
            <div className={`flex-1 flex flex-col transition-all duration-300 ease-in-out ${sidebarOpen ? 'ml-64' : 'ml-20'}`}>
                {/* Top Header */}
                <header className="h-16 border-b bg-card/70 backdrop-blur-md px-8 flex items-center justify-between sticky top-0 z-40 transition-all duration-500">
                    <h2 className="text-lg font-bold text-foreground/80 tracking-tight animate-in slide-in-from-left-4 duration-500">
                        {/* Dynamic breadcrumb or title can go here */}
                        Dashboard <span className="text-primary italic">Overview</span>
                    </h2>

                    <div className="flex items-center space-x-4 animate-in slide-in-from-right-4 duration-500">
                        <Button variant="ghost" size="icon" className="hover:bg-primary/10 hover:text-primary transition-colors">
                            <Bell className="h-5 w-5" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => document.documentElement.classList.toggle('dark')} className="hover:bg-primary/10 hover:text-primary transition-colors">
                            <Sun className="h-5 w-5 dark:hidden" />
                            <Moon className="h-5 w-5 hidden dark:block" />
                        </Button>
                        <div className="h-8 w-px bg-border/50 mx-2" />
                        <Button variant="ghost" size="sm" onClick={handleLogout} className="text-muted-foreground hover:bg-destructive/10 hover:text-destructive font-bold transition-all">
                            <LogOut className="h-4 w-4 mr-2" />
                            Logout
                        </Button>
                    </div>
                </header>

                {/* Content */}
                <main className="flex-1 p-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="container mx-auto max-w-7xl">
                        {children}
                    </div>
                </main>

                <footer className="p-6 border-t text-center text-xs text-muted-foreground">
                    &copy; 2026 CampusEvents Pro. All rights reserved.
                </footer>
            </div>
        </div>
    );
};

export default DashboardLayout;
