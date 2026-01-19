import React from 'react';
import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import Login from '../pages/auth/Login';
import EventsList from '../pages/events/EventsList';
import EventDetails from '../pages/events/EventDetails';
import CreateEvent from '../pages/events/CreateEvent';
import Teams from '../pages/events/Teams';
import FinanceDashboard from '../pages/finance/FinanceDashboard';
import Certificates from '../pages/finance/Certificates';
import DashboardLayout from '../components/common/DashboardLayout';

const ProtectedRoute = ({ children, roles }) => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) return <Navigate to="/login" />;
    if (roles && !roles.includes(user.role)) return <Navigate to="/" />;
    return children;
};

const AppRoutes = () => {
    return (
        <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<Login />} />
            
            {/* Dashboard Routes */}
            <Route element={<DashboardLayout><Outlet /></DashboardLayout>}>
                <Route path="/" element={<EventsList />} />
                <Route path="/events/:id" element={<EventDetails />} />
                <Route path="/events/:id/teams" element={<Teams />} />
                
                <Route path="/create-event" element={
                    <ProtectedRoute roles={['ClubAdmin', 'SuperAdmin']}>
                        <CreateEvent />
                    </ProtectedRoute>
                } />

                <Route path="/finance" element={
                    <ProtectedRoute roles={['FinanceHead', 'ClubAdmin', 'SuperAdmin']}>
                        <FinanceDashboard />
                    </ProtectedRoute>
                } />

                <Route path="/certificates" element={
                    <ProtectedRoute>
                        <Certificates />
                    </ProtectedRoute>
                } />
            </Route>

            {/* Catch-all */}
            <Route path="*" element={<Navigate to="/" />} />
        </Routes>
    );
};

export default AppRoutes;
