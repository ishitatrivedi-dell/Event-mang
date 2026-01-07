/**
 * CONTROLLERS FOLDER
 * Purpose: Contains business logic for handling HTTP requests
 * Controllers process incoming requests, interact with services/models,
 * and send back appropriate HTTP responses
 */

const Event = require('../models/Event');

/**
 * @desc    Create a new event
 * @route    POST /api/events
 * @access   Public
 * 
 * This function handles the creation of new events in the database
 * It validates the request body and saves the event to MongoDB
 */
const createEvent = async (req, res) => {
    try {
        // Extract event data from request body
        // req.body contains the JSON data sent by the client
        const { title, date, location, description, maxAttendees } = req.body;

        // Create new Event instance with the provided data
        // Mongoose will validate the data against the schema
        const event = await Event.create({
            title,
            date,
            location,
            description,
            maxAttendees
        });

        // Send success response with created event
        // Status 201: Created - indicates successful resource creation
        res.status(201).json({
            success: true,
            data: event,
            message: 'Event created successfully'
        });

    } catch (error) {
        // Handle validation and server errors
        console.error('Error in createEvent:', error);
        
        // Send error response
        // Status 400: Bad Request - for validation errors
        // Status 500: Internal Server Error - for server issues
        res.status(error.name === 'ValidationError' ? 400 : 500).json({
            success: false,
            message: error.message || 'Server error occurred',
            error: error
        });
    }
};

/**
 * @desc    Get all events
 * @route    GET /api/events
 * @access   Public
 * 
 * This function retrieves all events from the database
 * Supports filtering and pagination through query parameters
 */
const getAllEvents = async (req, res) => {
    try {
        // Extract query parameters for filtering
        const { page = 1, limit = 10, status } = req.query;

        // Build query object based on filters
        const query = {};
        if (status) {
            query.status = status;
        }

        // Calculate skip value for pagination
        const skip = (page - 1) * limit;

        // Find events with pagination
        // Event.find() retrieves documents from the events collection
        const events = await Event.find(query)
            .sort({ date: 1 }) // Sort by date ascending
            .limit(limit * 1) // Limit results per page
            .skip(skip) // Skip documents for pagination
            .exec(); // Execute the query

        // Get total count for pagination info
        const total = await Event.countDocuments(query);

        // Send success response with events and pagination info
        // Status 200: OK - indicates successful request
        res.status(200).json({
            success: true,
            count: events.length,
            total,
            page: parseInt(page),
            pages: Math.ceil(total / limit),
            data: events
        });

    } catch (error) {
        // Handle server errors
        console.error('Error in getAllEvents:', error);
        
        // Send error response
        res.status(500).json({
            success: false,
            message: 'Server error occurred',
            error: error
        });
    }
};

/**
 * @desc    Get single event by ID
 * @route    GET /api/events/:id
 * @access   Public
 * 
 * This function retrieves a specific event using its unique ID
 * Validates that the ID is a valid MongoDB ObjectId
 */
const getEventById = async (req, res) => {
    try {
        // Extract event ID from route parameters
        // req.params contains URL parameters like :id
        const eventId = req.params.id;

        // Find event by ID in the database
        // Event.findById() searches for a document by its _id field
        const event = await Event.findById(eventId);

        // Check if event exists
        if (!event) {
            // Send 404 response if event not found
            return res.status(404).json({
                success: false,
                message: 'Event not found'
            });
        }

        // Send success response with event data
        res.status(200).json({
            success: true,
            data: event
        });

    } catch (error) {
        // Handle invalid ID format and server errors
        console.error('Error in getEventById:', error);
        
        // Send appropriate error response
        res.status(error.name === 'CastError' ? 400 : 500).json({
            success: false,
            message: error.message || 'Server error occurred',
            error: error
        });
    }
};

/**
 * @desc    Update an event
 * @route    PUT /api/events/:id
 * @access   Public
 * 
 * This function updates an existing event using its ID
 * Validates both the ID and the update data
 */
const updateEvent = async (req, res) => {
    try {
        // Extract event ID from route parameters
        const eventId = req.params.id;

        // Find event by ID to check if it exists
        const existingEvent = await Event.findById(eventId);

        // Check if event exists
        if (!existingEvent) {
            // Send 404 response if event not found
            return res.status(404).json({
                success: false,
                message: 'Event not found'
            });
        }

        // Update event with new data
        // Event.findByIdAndUpdate() finds and updates in one operation
        // { new: true } returns the updated document
        const updatedEvent = await Event.findByIdAndUpdate(
            eventId,
            req.body,
            { new: true, runValidators: true }
        );

        // Send success response with updated event
        res.status(200).json({
            success: true,
            data: updatedEvent,
            message: 'Event updated successfully'
        });

    } catch (error) {
        // Handle validation, invalid ID, and server errors
        console.error('Error in updateEvent:', error);
        
        // Send appropriate error response
        res.status(error.name === 'ValidationError' || error.name === 'CastError' ? 400 : 500).json({
            success: false,
            message: error.message || 'Server error occurred',
            error: error
        });
    }
};

/**
 * @desc    Delete an event
 * @route    DELETE /api/events/:id
 * @access   Public
 * 
 * This function removes an event from the database using its ID
 * Validates the ID before performing the deletion
 */
const deleteEvent = async (req, res) => {
    try {
        // Extract event ID from route parameters
        const eventId = req.params.id;

        // Find event by ID to check if it exists
        const existingEvent = await Event.findById(eventId);

        // Check if event exists
        if (!existingEvent) {
            // Send 404 response if event not found
            return res.status(404).json({
                success: false,
                message: 'Event not found'
            });
        }

        // Delete event from database
        // Event.findByIdAndDelete() finds and removes in one operation
        await Event.findByIdAndDelete(eventId);

        // Send success response
        res.status(200).json({
            success: true,
            message: 'Event deleted successfully'
        });

    } catch (error) {
        // Handle invalid ID format and server errors
        console.error('Error in deleteEvent:', error);
        
        // Send appropriate error response
        res.status(error.name === 'CastError' ? 400 : 500).json({
            success: false,
            message: error.message || 'Server error occurred',
            error: error
        });
    }
};

// Export all controller functions
// These functions will be used in the routes file
module.exports = {
    createEvent,
    getAllEvents,
    getEventById,
    updateEvent,
    deleteEvent
};
