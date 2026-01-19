import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getEventById } from '../../services/event.service';
import api from '../../services/api';
import { Calendar, MapPin, Users, Award, CheckCircle } from 'lucide-react';

const EventDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [event, setEvent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [registered, setRegistered] = useState(false);
    const user = JSON.parse(localStorage.getItem('user'));

    useEffect(() => {
        const fetchEvent = async () => {
            try {
                const data = await getEventById(id);
                setEvent(data.data);
                
                if (user) {
                    const regCheck = await api.get('/registrations/my');
                    setRegistered(regCheck.data.data.some(r => r.event._id === id));
                }
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchEvent();
    }, [id, user]);

    const handleRegister = async () => {
        if (!user) return navigate('/login');
        try {
            await api.post('/registrations', { eventId: id });
            setRegistered(true);
        } catch (err) {
            alert(err.response?.data?.message || 'Registration failed');
        }
    };

    if (loading) return <div className="text-center mt-20">Loading...</div>;
    if (!event) return <div className="text-center mt-20">Event not found</div>;

    return (
        <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                <div className="bg-primary h-48 relative">
                    <div className="absolute -bottom-10 left-10 flex items-end">
                        <div className="bg-white p-4 rounded-xl shadow-lg border border-slate-50 inline-flex flex-col items-center">
                            <span className="text-primary font-bold text-2xl">{new Date(event.date).getDate()}</span>
                            <span className="text-slate-400 text-xs font-bold uppercase">{new Date(event.date).toLocaleString('default', { month: 'short' })}</span>
                        </div>
                    </div>
                </div>

                <div className="px-10 pt-16 pb-10">
                    <div className="flex justify-between items-start mb-6">
                        <div>
                            <span className="bg-sage bg-opacity-10 text-primary text-xs font-bold px-2 py-1 rounded uppercase tracking-wider mb-2 inline-block">
                                {event.type}
                            </span>
                            <h1 className="text-4xl font-bold text-slate-900">{event.name}</h1>
                            <div className="flex items-center text-slate-500 mt-2 space-x-6">
                                <div className="flex items-center"><MapPin size={18} className="mr-2" /> {event.venue}</div>
                                <div className="flex items-center"><Calendar size={18} className="mr-2" /> {new Date(event.date).toLocaleDateString()}</div>
                            </div>
                        </div>

                        {!registered ? (
                            <button 
                                onClick={handleRegister}
                                disabled={event.status === 'COMPLETED'}
                                className={`px-8 py-3 rounded-lg font-bold text-white shadow-lg transition-all ${
                                    event.status === 'COMPLETED' ? 'bg-slate-300 cursor-not-allowed' : 'bg-primary hover:bg-opacity-90 active:scale-95'
                                }`}
                            >
                                {event.status === 'COMPLETED' ? 'Event Ended' : 'Register Now'}
                            </button>
                        ) : (
                            <div className="flex items-center bg-green-50 text-green-700 px-4 py-2 rounded-lg font-semibold border border-green-100">
                                <CheckCircle size={20} className="mr-2" /> Registered
                            </div>
                        )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-10">
                        <div className="md:col-span-2">
                            <h2 className="text-xl font-bold text-slate-800 mb-4">About the Event</h2>
                            <p className="text-slate-600 leading-relaxed whitespace-pre-wrap">
                                {event.description}
                            </p>
                        </div>

                        <div className="space-y-6">
                            <div className="bg-slate-50 p-6 rounded-xl border border-slate-100">
                                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">Organized By</h3>
                                <div className="flex items-center">
                                    <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white font-bold mr-3">
                                        {event.club?.name?.charAt(0) || 'C'}
                                    </div>
                                    <span className="font-bold text-slate-800">{event.club?.name || 'Academic Club'}</span>
                                </div>
                            </div>

                            {event.type === 'Hackathon' && (
                                <div className="bg-primary bg-opacity-5 p-6 rounded-xl border border-primary border-opacity-10">
                                    <h3 className="text-sm font-bold text-primary uppercase tracking-widest mb-4 flex items-center">
                                        <Users size={16} className="mr-2" /> Team Enclosure
                                    </h3>
                                    <p className="text-xs text-slate-500 mb-4 italic">
                                        This is a hackathon event. Teams of up to 4 are permitted.
                                    </p>
                                    <button 
                                        onClick={() => navigate(`/events/${id}/teams`)}
                                        className="w-full btn-secondary text-sm"
                                    >
                                        View Teams
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EventDetails;
