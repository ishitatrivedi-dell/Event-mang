import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getEvents } from '../../services/event.service';
import { Calendar, MapPin, Tag, ArrowRight } from 'lucide-react';
import { 
    Card, 
    CardContent, 
    CardDescription, 
    CardFooter, 
    CardHeader, 
    CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const EventsList = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const data = await getEvents();
                setEvents(data.data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchEvents();
    }, []);

    if (loading) return (
        <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            <p className="text-muted-foreground animate-pulse">Loading events...</p>
        </div>
    );

    return (
        <div className="space-y-10 animate-in fade-in slide-in-from-bottom-8 duration-700">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div>
                    <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl text-foreground">
                        University <span className="text-primary italic">Events</span>
                    </h1>
                    <p className="text-xl text-muted-foreground mt-3 max-w-2xl">
                        Discover workshops, hackathons, and seminars across the campus.
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <Button variant="outline" className="shadow-sm">Filters</Button>
                    <Button className="bg-primary hover:bg-primary/90 shadow-md">Refresh</Button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {events.map((event, index) => (
                    <Card 
                        key={event._id} 
                        className="group overflow-hidden border-border/40 hover:border-primary/50 transition-all duration-500 flex flex-col shadow-sm hover:shadow-xl hover:-translate-y-2 bg-card/50 backdrop-blur-sm shadow-black/5"
                        style={{ animationDelay: `${index * 50}ms` }}
                    >
                        <CardHeader className="pb-4 relative">
                            <div className="flex justify-between items-start mb-3">
                                <Badge variant={event.status === 'UPCOMING' ? 'success' : 'secondary'} className="uppercase tracking-widest text-[10px] py-0.5 px-3">
                                    {event.status}
                                </Badge>
                                <Badge variant="outline" className="text-primary border-primary/30 uppercase tracking-widest text-[10px] py-0.5 px-3 bg-primary/5">
                                    {event.type}
                                </Badge>
                            </div>
                            <CardTitle className="text-2xl group-hover:text-primary transition-colors duration-300 line-clamp-1">
                                {event.name}
                            </CardTitle>
                        </CardHeader>
                        
                        <CardContent className="flex-grow pb-6">
                            <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3 mb-8">
                                {event.description}
                            </p>

                            <div className="space-y-3">
                                <div className="flex items-center text-sm font-medium text-foreground/80">
                                    <div className="p-2 rounded-md bg-primary/10 mr-3">
                                        <Calendar size={14} className="text-primary" />
                                    </div>
                                    {new Date(event.date).toLocaleDateString(undefined, { dateStyle: 'medium' })}
                                </div>
                                <div className="flex items-center text-sm font-medium text-foreground/80">
                                    <div className="p-2 rounded-md bg-primary/10 mr-3">
                                        <MapPin size={14} className="text-primary" />
                                    </div>
                                    <span className="line-clamp-1">{event.venue}</span>
                                </div>
                            </div>
                        </CardContent>

                        <CardFooter className="pt-5 border-t border-border/20 bg-muted/20 flex justify-between items-center group-hover:bg-primary/5 transition-colors duration-500">
                            <div className="flex items-center gap-2">
                                <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center">
                                    <Tag size={12} className="text-primary" />
                                </div>
                                <span className="text-xs text-muted-foreground font-semibold uppercase tracking-tighter">
                                    {event.club?.name || 'Academic Club'}
                                </span>
                            </div>
                            <Button variant="ghost" size="sm" asChild className="group/btn text-primary hover:text-primary hover:bg-primary/10 px-4">
                                <Link to={`/events/${event._id}`} className="flex items-center font-bold">
                                    View Details <ArrowRight size={14} className="ml-2 group-hover/btn:translate-x-1.5 transition-transform" />
                                </Link>
                            </Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>
            
            {events.length === 0 && (
                <div className="text-center py-32 bg-card/30 border-2 border-dashed border-border/50 rounded-3xl animate-in zoom-in duration-700">
                    <p className="text-muted-foreground text-xl font-medium mb-6">No events found. Stay tuned!</p>
                    <Button variant="outline" size="lg" className="rounded-full px-8" onClick={() => window.location.reload()}>
                        Refresh Dashboard
                    </Button>
                </div>
            )}
        </div>
    );
};

export default EventsList;
