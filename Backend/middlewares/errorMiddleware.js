/**
 * MIDDLEWARES FOLDER
 * Purpose: Contains custom middleware functions for request processing
 * Middleware functions run before the main controller logic
 * They handle cross-cutting concerns like error handling and validation
 */

/**
 * 404 Not Found Middleware
 * This function handles requests to non-existent routes
 * It should be placed after all route definitions
 */
const notFound = (req, res, next) => {
    // Create error object for 404 response
    const error = new Error(`Not Found - ${req.originalUrl}`);
    
    // Set status code to 404
    error.status = 404;
    
    // Pass error to next middleware in the chain
    // This allows the error handler middleware to process it
    next(error);
};

/**
 * Global Error Handler Middleware
 * This function handles all errors that occur in the application
 * It should be the last middleware in the chain
 */
const errorHandler = (err, req, res, next) => {
    // If response already sent, delegate to default Express error handler
    if (res.headersSent) {
        return next(err);
    }

    // Set default status code if not already set
    let statusCode = err.status || 500;
    
    // Set default error message
    let message = err.message || 'Internal Server Error';

    // Handle Mongoose validation errors specifically
    if (err.name === 'ValidationError') {
        statusCode = 400;
        message = Object.values(err.errors).map(val => val.message).join(', ');
    }

    // Handle Mongoose CastError (invalid ObjectId)
    if (err.name === 'CastError') {
        statusCode = 400;
        message = 'Resource not found';
    }

    // Handle Mongoose duplicate key error
    if (err.code === 11000) {
        statusCode = 400;
        message = 'Duplicate field value';
    }

    // Log error for debugging
    console.error('Error:', {
        message: err.message,
        stack: err.stack,
        statusCode
    });

    // Send error response with appropriate status code
    res.status(statusCode).json({
        success: false,
        message: message,
        // Include stack trace in development mode only
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
    });
};

// Export middleware functions
// These will be used in the main server.js file
module.exports = {
    notFound,
    errorHandler
};
