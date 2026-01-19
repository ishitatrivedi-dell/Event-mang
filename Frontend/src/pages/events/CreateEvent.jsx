import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createEvent } from '../../services/event.service';

const CreateEvent = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        date: '',
        venue: '',
        type: 'Workshop',
        club: '' // In reality, we'd fetch clubs, but for this portfolio piece we assume it's assigned to user's club
    });

    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            // Placeholder: Typically we'd need a club ID. For this demo, we'll fetch clubs or use a mock.
            // Let's assume the backend handles assigning the user's club if missing.
            await createEvent({ ...formData, club: 'DEFAULT_CLUB_ID' }); // backend logic needs to be robust here
            navigate('/');
        } catch (err) {
            alert(err.response?.data?.message || 'Failed to create event');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto">
            <h1 className="text-3xl font-bold text-slate-900 mb-8">Create New Event</h1>
            
            <form onSubmit={handleSubmit} className="card space-y-6">
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Event Name</label>
                    <input
                        type="text"
                        required
                        className="w-full px-4 py-2 border border-slate-200 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Date</label>
                        <input
                            type="date"
                            required
                            className="w-full px-4 py-2 border border-slate-200 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                            value={formData.date}
                            onChange={(e) => setFormData({...formData, date: e.target.value})}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Type</label>
                        <select
                            className="w-full px-4 py-2 border border-slate-200 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent outline-none bg-white"
                            value={formData.type}
                            onChange={(e) => setFormData({...formData, type: e.target.value})}
                        >
                            <option>Workshop</option>
                            <option>Hackathon</option>
                            <option>Seminar</option>
                        </select>
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Venue</label>
                    <input
                        type="text"
                        required
                        className="w-full px-4 py-2 border border-slate-200 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                        value={formData.venue}
                        onChange={(e) => setFormData({...formData, venue: e.target.value})}
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
                    <textarea
                        rows="4"
                        required
                        className="w-full px-4 py-2 border border-slate-200 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                        value={formData.description}
                        onChange={(e) => setFormData({...formData, description: e.target.value})}
                    ></textarea>
                </div>

                <div className="pt-4 flex space-x-4">
                    <button 
                        type="submit" 
                        disabled={loading}
                        className="flex-grow btn-primary py-3"
                    >
                        {loading ? 'Creating...' : 'Launch Event'}
                    </button>
                    <button 
                        type="button" 
                        onClick={() => navigate('/')}
                        className="btn-secondary px-8"
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CreateEvent;
