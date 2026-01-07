/**
 * ROUTES FOLDER
 * Purpose: Defines API endpoints and maps them to controller functions
 * Routes organize the API structure and handle HTTP method routing
 */

const express = require('express');
const router = express.Router();
const {
    createEvent,
    getAllEvents,
    getEventById,
    updateEvent,
    deleteEvent
} = require('../controllers/eventController');

/**
 * @route    POST /api/events
 * @desc     Create a new event
 * @access    Public
 * 
 * router.post() handles HTTP POST requests to create new resources
 * It maps the endpoint to the createEvent controller function
 * The second parameter is the controller function that handles the request
 */
router.post('/', createEvent);

/**
 * @route    GET /api/events
 * @desc     Get all events with optional filtering
 * @access    Public
 * 
 * router.get() handles HTTP GET requests to retrieve resources
 * It maps the endpoint to the getAllEvents controller function
 * Supports query parameters for filtering and pagination
 */
router.get('/', getAllEvents);

/**
 * @route    GET /api/events/:id
 * @desc     Get a single event by ID
 * @access    Public
 * 
 * :id is a route parameter that captures the event ID from the URL
 * Express automatically makes this available as req.params.id
 * Maps to getEventById controller function
 */
router.get('/:id', getEventById);

/**
 * @route    PUT /api/events/:id
 * @desc     Update an existing event
 * @access    Public
 * 
 * router.put() handles HTTP PUT requests to update existing resources
 * It maps the endpoint to the updateEvent controller function
 * The :id parameter specifies which event to update
 */
router.put('/:id', updateEvent);

/**
 * @route    DELETE /api/events/:id
 * @desc     Delete an event
 * @access    Public
 * 
 * router.delete() handles HTTP DELETE requests to remove resources
 * It maps the endpoint to the deleteEvent controller function
 * The :id parameter specifies which event to delete
 */
router.delete('/:id', deleteEvent);

// Export the router
// This allows the main server.js file to use these routes
module.exports = router;
