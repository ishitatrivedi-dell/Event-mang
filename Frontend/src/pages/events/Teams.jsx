import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../services/api';
import { Users, UserPlus, Info } from 'lucide-react';

const Teams = () => {
    const { id: eventId } = useParams();
    const [teams, setTeams] = useState([]);
    const [loading, setLoading] = useState(true);
    const [teamName, setTeamName] = useState('');
    const user = JSON.parse(localStorage.getItem('user'));

    useEffect(() => {
        fetchTeams();
    }, [eventId]);

    const fetchTeams = async () => {
        try {
            const response = await api.get(`/teams/event/${eventId}`);
            setTeams(response.data.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleCreateTeam = async (e) => {
        e.preventDefault();
        try {
            await api.post('/teams', { name: teamName, eventId });
            setTeamName('');
            fetchTeams();
        } catch (err) {
            alert(err.response?.data?.message || 'Failed to create team');
        }
    };

    const handleJoinTeam = async (teamId) => {
        try {
            await api.post(`/teams/${teamId}/join`);
            fetchTeams();
        } catch (err) {
            alert(err.response?.data?.message || 'Failed to join team');
        }
    };

    if (loading) return <div className="text-center mt-20">Loading Teams...</div>;

    return (
        <div className="max-w-5xl mx-auto">
            <h1 className="text-3xl font-bold text-slate-900 mb-8 flex items-center">
                <Users size={32} className="mr-3 text-primary" /> Hackathon Teams
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                <div className="md:col-span-1">
                    <div className="card sticky top-8">
                        <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center">
                            <Info size={18} className="mr-2 text-primary" /> Build Your Team
                        </h3>
                        <p className="text-slate-500 text-sm mb-6">
                            Create a new team and invite others to join your mission.
                        </p>
                        <form onSubmit={handleCreateTeam} className="space-y-4">
                            <input
                                type="text"
                                placeholder="Team Name"
                                className="w-full px-4 py-2 border border-slate-200 rounded-md outline-none focus:ring-2 focus:ring-primary"
                                value={teamName}
                                onChange={(e) => setTeamName(e.target.value)}
                                required
                            />
                            <button type="submit" className="w-full btn-primary">Create Team</button>
                        </form>
                    </div>
                </div>

                <div className="md:col-span-2 space-y-6">
                    {teams.map(team => (
                        <div key={team._id} className="card hover:border-primary transition-all">
                            <div className="flex justify-between items-start mb-6">
                                <div>
                                    <h3 className="text-xl font-bold text-slate-800">{team.name}</h3>
                                    <p className="text-sm text-slate-400">Leader: {team.leader.name}</p>
                                </div>
                                <div className="text-right">
                                    <span className="text-sm font-bold text-primary">{team.members.length} / {team.maxSize}</span>
                                    <p className="text-xs text-slate-400 font-medium uppercase tracking-widest">Members</p>
                                </div>
                            </div>

                            <div className="flex flex-wrap gap-2 mb-6">
                                {team.members.map(member => (
                                    <span key={member._id} className="bg-slate-100 text-slate-600 px-3 py-1 rounded-full text-xs font-medium">
                                        {member.name}
                                    </span>
                                ))}
                            </div>

                            {!team.members.some(m => m._id === user?._id) && team.members.length < team.maxSize && (
                                <button 
                                    onClick={() => handleJoinTeam(team._id)}
                                    className="btn-secondary w-full flex items-center justify-center"
                                >
                                    <UserPlus size={18} className="mr-2" /> Join Team
                                </button>
                            )}
                        </div>
                    ))}

                    {teams.length === 0 && (
                        <div className="card text-center py-20 bg-slate-50 border-dashed">
                            <p className="text-slate-400 italic">No teams formed yet. Be the first!</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Teams;
