/**
 * SERVICES FOLDER
 * Purpose: Contains business logic and data processing functions
 * Services separate business logic from controllers for better code organization
 * They handle complex operations, data transformations, and external API calls
 */

/**
 * Event Service
 * This file contains business logic specifically for event operations
 * It provides a layer of abstraction between controllers and models
 */

const Event = require('../models/Event');

/**
 * Calculate event statistics
 * @param {String} eventId - The ID of the event
 * @returns {Object} Statistics about the event
 * 
 * This function calculates various statistics for an event
 * Useful for dashboard and analytics features
 */
const getEventStats = async (eventId) => {
    try {
        // Find the event by ID
        const event = await Event.findById(eventId);
        
        if (!event) {
            throw new Error('Event not found');
        }

        // Calculate days until event
        const now = new Date();
        const eventDate = new Date(event.date);
        const daysUntil = Math.ceil((eventDate - now) / (1000 * 60 * 60 * 24));
        
        // Calculate registration percentage
        const registrationPercentage = event.maxAttendees 
            ? Math.round((event.currentAttendees / event.maxAttendees) * 100)
            : 0;

        // Determine event status based on date
        let status = event.status;
        if (eventDate < now && status !== 'completed') {
            status = 'completed';
        } else if (eventDate.toDateString() === now.toDateString() && status !== 'ongoing') {
            status = 'ongoing';
        }

        return {
            eventId: event._id,
            title: event.title,
            daysUntil,
            registrationPercentage,
            currentStatus: status,
            isFullyBooked: event.currentAttendees >= event.maxAttendees,
            spotsAvailable: event.maxAttendees - event.currentAttendees
        };

    } catch (error) {
        console.error('Error in getEventStats:', error);
        throw error;
    }
};

/**
 * Search events by multiple criteria
 * @param {Object} searchParams - Search criteria
 * @returns {Array} Array of matching events
 * 
 * This function provides advanced search capabilities
 * Searches across multiple fields with various filters
 */
const searchEvents = async (searchParams) => {
    try {
        const {
            keyword,
            startDate,
            endDate,
            location,
            status,
            minAttendees,
            maxAttendees,
            page = 1,
            limit = 10
        } = searchParams;

        // Build search query
        const query = {};

        // Text search in title and description
        if (keyword) {
            query.$or = [
                { title: { $regex: keyword, $options: 'i' } },
                { description: { $regex: keyword, $options: 'i' } },
                { location: { $regex: keyword, $options: 'i' } }
            ];
        }

        // Date range filter
        if (startDate || endDate) {
            query.date = {};
            if (startDate) query.date.$gte = new Date(startDate);
            if (endDate) query.date.$lte = new Date(endDate);
        }

        // Location filter
        if (location) {
            query.location = { $regex: location, $options: 'i' };
        }

        // Status filter
        if (status) {
            query.status = status;
        }

        // Attendee count filter
        if (minAttendees || maxAttendees) {
            query.currentAttendees = {};
            if (minAttendees) query.currentAttendees.$gte = parseInt(minAttendees);
            if (maxAttendees) query.currentAttendees.$lte = parseInt(maxAttendees);
        }

        // Execute search with pagination
        const skip = (page - 1) * limit;
        const events = await Event.find(query)
            .sort({ date: 1 })
            .limit(limit * 1)
            .skip(skip)
            .exec();

        const total = await Event.countDocuments(query);

        return {
            events,
            pagination: {
                page: parseInt(page),
                limit: parseInt(limit),
                total,
                pages: Math.ceil(total / limit)
            }
        };

    } catch (error) {
        console.error('Error in searchEvents:', error);
        throw error;
    }
};

/**
 * Update event attendance
 * @param {String} eventId - The ID of the event
 * @param {Number} change - Number of attendees to add/remove
 * @returns {Object} Updated event
 * 
 * This function manages event attendance updates
 * Handles both registration and cancellation
 */
const updateEventAttendance = async (eventId, change) => {
    try {
        // Find and update event in one operation
        const event = await Event.findByIdAndUpdate(
            eventId,
            { 
                $inc: { currentAttendees: change } // Increment/decrement attendees
            },
            { new: true, runValidators: true }
        );

        if (!event) {
            throw new Error('Event not found');
        }

        // Check if event is fully booked
        const isFullyBooked = event.maxAttendees && 
            (event.currentAttendees + change) >= event.maxAttendees;

        return {
            event,
            isFullyBooked,
            currentAttendees: event.currentAttendees + change
        };

    } catch (error) {
        console.error('Error in updateEventAttendance:', error);
        throw error;
    }
};

// Export service functions
// These functions can be used by controllers for complex operations
module.exports = {
    getEventStats,
    searchEvents,
    updateEventAttendance
};
