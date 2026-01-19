import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import { Award, Download, ShieldCheck } from 'lucide-react';

const Certificates = () => {
    const [registrations, setRegistrations] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMyRegistrations = async () => {
            try {
                const response = await api.get('/registrations/my');
                setRegistrations(response.data.data.filter(r => r.event.status === 'COMPLETED'));
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchMyRegistrations();
    }, []);

    const handleDownload = async (eventId, eventName) => {
        try {
            const response = await api.get(`/winners/${eventId}/certificate`, { responseType: 'blob' });
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `Certificate_${eventName}.pdf`);
            document.body.appendChild(link);
            link.click();
        } catch (err) {
            alert('Failed to download certificate. Check if the event is completed and you participated.');
        }
    };

    if (loading) return <div className="text-center mt-20">Analysing records...</div>;

    return (
        <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold text-slate-900 mb-8 flex items-center">
                <Award size={32} className="mr-3 text-primary" /> My Achievements
            </h1>

            <div className="space-y-6">
                {registrations.map(reg => (
                    <div key={reg._id} className="card flex items-center justify-between hover:border-primary transition-all">
                        <div className="flex items-center">
                            <div className="bg-primary bg-opacity-10 p-4 rounded-xl mr-6 text-primary">
                                <ShieldCheck size={32} />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-slate-800">{reg.event.name}</h3>
                                <p className="text-slate-400 text-sm">{new Date(reg.event.date).toLocaleDateString()} • {reg.event.venue}</p>
                            </div>
                        </div>
                        <button 
                            onClick={() => handleDownload(reg.event._id, reg.event.name)}
                            className="btn-primary flex items-center"
                        >
                            <Download size={18} className="mr-2" /> Download Certificate
                        </button>
                    </div>
                ))}

                {registrations.length === 0 && (
                    <div className="card text-center py-20">
                        <Award size={48} className="text-slate-100 mx-auto mb-4" />
                        <p className="text-slate-400">No certificates available yet. Participating in events will earn you certificates once they are completed.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Certificates;
