import React, { useEffect, useState } from 'react';
import { getEventReport, createBudget, requestExpense } from '../../services/finance.service';
import { getEvents } from '../../services/event.service';
import { PieChart, Plus, CheckCircle, XCircle, AlertCircle } from 'lucide-react';

const FinanceDashboard = () => {
    const [events, setEvents] = useState([]);
    const [selectedEventId, setSelectedEventId] = useState('');
    const [report, setReport] = useState(null);
    const [loading, setLoading] = useState(false);
    const user = JSON.parse(localStorage.getItem('user'));

    useEffect(() => {
        const fetchEvents = async () => {
            const data = await getEvents();
            setEvents(data.data.filter(e => e.status === 'UPCOMING'));
        };
        fetchEvents();
    }, []);

    useEffect(() => {
        if (selectedEventId) {
            fetchReport();
        }
    }, [selectedEventId]);

    const fetchReport = async () => {
        setLoading(true);
        try {
            const data = await getEventReport(selectedEventId);
            setReport(data.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-6xl mx-auto">
            <h1 className="text-3xl font-bold text-slate-900 mb-8 flex items-center">
                <PieChart size={32} className="mr-3 text-primary" /> Finance Control Center
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                <div className="md:col-span-1">
                    <div className="card">
                        <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">Select Event</h3>
                        <div className="space-y-2">
                            {events.map(event => (
                                <button
                                    key={event._id}
                                    onClick={() => setSelectedEventId(event._id)}
                                    className={`w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                                        selectedEventId === event._id 
                                        ? 'bg-primary text-white shadow-md' 
                                        : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
                                    }`}
                                >
                                    {event.name}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="md:col-span-3">
                    {!selectedEventId ? (
                        <div className="card text-center py-20 flex flex-col items-center">
                            <PieChart size={48} className="text-slate-200 mb-4" />
                            <p className="text-slate-400">Select an event to view its financial health.</p>
                        </div>
                    ) : loading ? (
                        <div className="text-center py-20">Loading report...</div>
                    ) : report?.budget ? (
                        <div className="space-y-8">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="card border-l-4 border-l-primary">
                                    <p className="text-slate-400 text-xs font-bold uppercase">Total Budget</p>
                                    <h4 className="text-2xl font-bold text-slate-800">₹{report.budget.totalAmount}</h4>
                                </div>
                                <div className="card border-l-4 border-l-amber">
                                    <p className="text-slate-400 text-xs font-bold uppercase">Utilized</p>
                                    <h4 className="text-2xl font-bold text-slate-800">₹{report.totalSpent}</h4>
                                </div>
                                <div className="card border-l-4 border-l-primary border-opacity-30">
                                    <p className="text-slate-400 text-xs font-bold uppercase">Remaining</p>
                                    <h4 className="text-2xl font-bold text-primary">₹{report.remaining}</h4>
                                </div>
                            </div>

                            <div className="card">
                                <h3 className="text-lg font-bold text-slate-800 mb-6">Approved Expenses</h3>
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left">
                                        <thead>
                                            <tr className="border-b border-slate-100">
                                                <th className="pb-4 font-semibold text-slate-400 text-sm">Category</th>
                                                <th className="pb-4 font-semibold text-slate-400 text-sm">Description</th>
                                                <th className="pb-4 font-semibold text-slate-400 text-sm">Amount</th>
                                                <th className="pb-4 font-semibold text-slate-400 text-sm">Status</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-slate-50">
                                            {report.expenses.map(expense => (
                                                <tr key={expense._id}>
                                                    <td className="py-4 text-sm font-medium text-slate-800">{expense.category}</td>
                                                    <td className="py-4 text-sm text-slate-500">{expense.description}</td>
                                                    <td className="py-4 text-sm font-bold text-slate-800">₹{expense.amount}</td>
                                                    <td className="py-4">
                                                        <span className="bg-green-50 text-green-700 text-xs px-2 py-1 rounded-full font-bold">
                                                            {expense.status}
                                                        </span>
                                                    </td>
                                                </tr>
                                            ))}
                                            {report.expenses.length === 0 && (
                                                <tr>
                                                    <td colSpan="4" className="py-8 text-center text-slate-400 text-sm italic">No expenses recorded yet.</td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="card text-center py-20 flex flex-col items-center">
                            <AlertCircle size={48} className="text-amber text-opacity-40 mb-4" />
                            <p className="text-slate-500 mb-6">No budget defined for this event yet.</p>
                            {user?.role === 'ClubAdmin' && (
                                <button className="btn-primary flex items-center">
                                    <Plus size={18} className="mr-2" /> Initialise Budget
                                </button>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default FinanceDashboard;
