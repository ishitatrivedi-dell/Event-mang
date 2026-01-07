/**
 * MODELS FOLDER
 * Purpose: Contains Mongoose schema definitions
 * Models define the structure of data in MongoDB collections
 * Each model corresponds to a collection in the database
 */

const mongoose = require('mongoose');

/**
 * Event Schema Definition
 * Schema defines the structure, validation rules, and default values
 * for Event documents in the MongoDB collection
 */
const eventSchema = new mongoose.Schema({
    // Title of the event
    // Required field with string validation
    title: {
        type: String,
        required: [true, 'Please add a title for the event'],
        trim: true, // Remove whitespace from start and end
        maxlength: [100, 'Title cannot be more than 100 characters']
    },
    
    // Date and time of the event
    // Required field with Date type for proper date handling
    date: {
        type: Date,
        required: [true, 'Please add a date for the event'],
        default: Date.now // Default to current date if not provided
    },
    
    // Location where the event will take place
    // Required field with string validation
    location: {
        type: String,
        required: [true, 'Please add a location for the event'],
        trim: true,
        maxlength: [200, 'Location cannot be more than 200 characters']
    },
    
    // Description of the event
    // Optional field for additional event details
    description: {
        type: String,
        trim: true,
        maxlength: [500, 'Description cannot be more than 500 characters']
    },
    
    // Maximum number of attendees
    // Optional field for event capacity management
    maxAttendees: {
        type: Number,
        min: [1, 'Maximum attendees must be at least 1'],
        default: null // No limit by default
    },
    
    // Current number of registered attendees
    // Optional field for tracking registrations
    currentAttendees: {
        type: Number,
        min: [0, 'Current attendees cannot be negative'],
        default: 0
    },
    
    // Event status
    // Optional field to track event state
    status: {
        type: String,
        enum: ['upcoming', 'ongoing', 'completed', 'cancelled'],
        default: 'upcoming'
    }
}, {
    // Enable automatic timestamps
    // Mongoose will automatically add createdAt and updatedAt fields
    timestamps: true
});

/**
 * Create Event Model
 * Model provides an interface to interact with the events collection
 * First parameter: Model name (singular, capitalized)
 * Second parameter: Schema definition
 */
const Event = mongoose.model('Event', eventSchema);

// Export the Event model
// This allows other files to create, read, update, and delete events
module.exports = Event;
