import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { cn } from '../utils/cn';

const DashboardPage = () => {
  const [selectedFilter, setSelectedFilter] = useState('upcoming');

  // Sample data
  const stats = [
    { name: 'Total Events', value: '24', change: '+2 from last month', trend: 'up' },
    { name: 'My Registrations', value: '8', change: '+1 from last week', trend: 'up' },
    { name: 'Attended', value: '12', change: '+3 from last month', trend: 'up' },
    { name: 'Organizations', value: '6', change: 'No change', trend: 'neutral' },
  ];

  const events = [
    {
      id: 1,
      title: 'Tech Talk: AI & Machine Learning',
      date: '2024-01-15',
      time: '2:00 PM',
      location: 'Engineering Building, Room 101',
      category: 'Technology',
      attendees: 45,
      maxAttendees: 100,
      image: '🤖',
      registered: true,
      organizer: 'Computer Science Club',
      description: 'Join us for an exciting talk about the latest developments in AI and ML.',
    },
    {
      id: 2,
      title: 'Career Fair 2024',
      date: '2024-01-20',
      time: '10:00 AM',
      location: 'Main Auditorium',
      category: 'Career',
      attendees: 234,
      maxAttendees: 500,
      image: '💼',
      registered: false,
      organizer: 'Career Services',
      description: 'Connect with top employers and explore career opportunities.',
    },
    {
      id: 3,
      title: 'Spring Music Festival',
      date: '2024-02-01',
      time: '6:00 PM',
      location: 'Campus Green',
      category: 'Entertainment',
      attendees: 156,
      maxAttendees: 300,
      image: '🎵',
      registered: true,
      organizer: 'Student Activities',
      description: 'Enjoy live performances from student bands and local artists.',
    },
    {
      id: 4,
      title: 'Research Symposium',
      date: '2024-02-10',
      time: '9:00 AM',
      location: 'Science Complex',
      category: 'Academic',
      attendees: 78,
      maxAttendees: 150,
      image: '🔬',
      registered: false,
      organizer: 'Graduate School',
      description: 'Present your research and learn about groundbreaking studies.',
    },
  ];

  const filteredEvents = events.filter(event => {
    if (selectedFilter === 'upcoming') {
      return new Date(event.date) >= new Date();
    } else if (selectedFilter === 'registered') {
      return event.registered;
    }
    return true;
  });

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const getCategoryColor = (category) => {
    const colors = {
      Technology: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
      Career: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
      Entertainment: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300',
      Academic: 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300',
    };
    return colors[category] || 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300';
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
          Welcome back, John! 👋
        </h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Here's what's happening on campus this week.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card key={stat.name} glass className="hover-lift">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    {stat.name}
                  </p>
                  <p className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mt-1">
                    {stat.value}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">
                    {stat.change}
                  </p>
                </div>
                <div className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center",
                  stat.trend === 'up' ? 'bg-green-100 dark:bg-green-900/30' :
                  stat.trend === 'down' ? 'bg-red-100 dark:bg-red-900/30' :
                  'bg-gray-100 dark:bg-gray-900/30'
                )}>
                  {stat.trend === 'up' && (
                    <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                  )}
                  {stat.trend === 'down' && (
                    <svg className="w-4 h-4 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
                    </svg>
                  )}
                  {stat.trend === 'neutral' && (
                    <svg className="w-4 h-4 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14" />
                    </svg>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Events Section */}
      <div>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
            Upcoming Events
          </h2>
          <div className="flex space-x-2 mt-4 sm:mt-0">
            {['all', 'upcoming', 'registered'].map((filter) => (
              <Button
                key={filter}
                variant={selectedFilter === filter ? 'primary' : 'ghost'}
                size="sm"
                onClick={() => setSelectedFilter(filter)}
                className="capitalize"
              >
                {filter}
              </Button>
            ))}
          </div>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((event) => (
            <Card key={event.id} className="card-hover group">
              <div className="relative">
                {/* Event Image */}
                <div className="h-48 bg-gradient-to-br from-accent/20 to-accent/10 rounded-t-2xl flex items-center justify-center text-6xl">
                  {event.image}
                </div>
                
                {/* Registration Badge */}
                {event.registered && (
                  <div className="absolute top-4 right-4 bg-accent text-accent-foreground px-3 py-1 rounded-full text-xs font-medium">
                    Registered
                  </div>
                )}
                
                {/* Category Badge */}
                <div className="absolute top-4 left-4">
                  <span className={cn(
                    "px-3 py-1 rounded-full text-xs font-medium",
                    getCategoryColor(event.category)
                  )}>
                    {event.category}
                  </span>
                </div>
              </div>

              <CardHeader className="pb-3">
                <CardTitle className="text-lg line-clamp-2 group-hover:text-accent transition-colors">
                  {event.title}
                </CardTitle>
                <CardDescription className="line-clamp-2">
                  {event.description}
                </CardDescription>
              </CardHeader>

              <CardContent className="pt-0">
                <div className="space-y-3">
                  {/* Date & Time */}
                  <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    {formatDate(event.date)} at {event.time}
                  </div>

                  {/* Location */}
                  <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {event.location}
                  </div>

                  {/* Attendees */}
                  <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    {event.attendees}/{event.maxAttendees} attending
                  </div>

                  {/* Organizer */}
                  <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                    {event.organizer}
                  </div>

                  {/* Action Button */}
                  <Button 
                    className="w-full mt-4"
                    variant={event.registered ? "outline" : "primary"}
                  >
                    {event.registered ? 'View Details' : 'Register Now'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {filteredEvents.length === 0 && (
          <Card glass className="text-center py-12">
            <div className="text-6xl mb-4">📅</div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
              No events found
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              {selectedFilter === 'registered' 
                ? "You haven't registered for any events yet."
                : "No events match your current filter."
              }
            </p>
            <Button className="mt-4" variant="outline">
              Browse All Events
            </Button>
          </Card>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;
