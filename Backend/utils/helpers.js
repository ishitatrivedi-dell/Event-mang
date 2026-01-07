/**
 * UTILS FOLDER
 * Purpose: Contains utility functions and helper methods
 * Utils provide reusable functionality across the application
 * They handle common tasks like validation, formatting, and data processing
 */

/**
 * Validate MongoDB ObjectId
 * @param {String} id - The ID to validate
 * @returns {Boolean} True if valid ObjectId, false otherwise
 * 
 * This function checks if a string is a valid MongoDB ObjectId
 * Useful for validating route parameters
 */
const isValidObjectId = (id) => {
    // Regular expression for MongoDB ObjectId format
    const objectIdPattern = /^[0-9a-fA-F]{24}$/;
    return objectIdPattern.test(id);
};

/**
 * Format date for display
 * @param {Date} date - The date to format
 * @returns {String} Formatted date string
 * 
 * This function formats dates in a user-friendly way
 * Returns date in format: "January 1, 2024 at 2:30 PM"
 */
const formatDate = (date) => {
    if (!date) return 'No date';
    
    const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    };
    
    return new Date(date).toLocaleDateString('en-US', options);
};

/**
 * Calculate days remaining until event
 * @param {Date} eventDate - The event date
 * @returns {Object} Days remaining and status
 * 
 * This function calculates time remaining until an event
 * Returns formatted information for display purposes
 */
const getDaysRemaining = (eventDate) => {
    const now = new Date();
    const event = new Date(eventDate);
    const diffTime = event - now;
    
    if (diffTime < 0) {
        return {
            days: 0,
            status: 'completed',
            message: 'Event has ended'
        };
    }
    
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) {
        return {
            days: 0,
            status: 'today',
            message: 'Event is today'
        };
    }
    
    if (diffDays === 1) {
        return {
            days: 1,
            status: 'tomorrow',
            message: 'Event is tomorrow'
        };
    }
    
    return {
        days: diffDays,
        status: 'upcoming',
        message: `${diffDays} days remaining`
    };
};

/**
 * Sanitize user input
 * @param {String} input - The input to sanitize
 * @returns {String} Sanitized input
 * 
 * This function removes potentially harmful characters from user input
 * Basic XSS protection for text fields
 */
const sanitizeInput = (input) => {
    if (!input) return '';
    
    return input
        .trim() // Remove whitespace from start and end
        .replace(/</g, '&lt;') // Replace < with HTML entity
        .replace(/>/g, '&gt;') // Replace > with HTML entity
        .replace(/"/g, '&quot;') // Replace " with HTML entity
        .replace(/'/g, '&#x27;') // Replace ' with HTML entity
        .replace(/\//g, '&#x2F;'); // Replace / with HTML entity
};

/**
 * Generate pagination metadata
 * @param {Number} page - Current page number
 * @param {Number} limit - Items per page
 * @param {Number} total - Total number of items
 * @returns {Object} Pagination information
 * 
 * This function creates pagination metadata for API responses
 * Helps frontend with pagination controls
 */
const generatePagination = (page, limit, total) => {
    const currentPage = parseInt(page) || 1;
    const itemsPerPage = parseInt(limit) || 10;
    const totalPages = Math.ceil(total / itemsPerPage);
    
    return {
        currentPage,
        itemsPerPage,
        totalItems: total,
        totalPages,
        hasNextPage: currentPage < totalPages,
        hasPrevPage: currentPage > 1,
        nextPage: currentPage < totalPages ? currentPage + 1 : null,
        prevPage: currentPage > 1 ? currentPage - 1 : null
    };
};

/**
 * Create API response structure
 * @param {Boolean} success - Whether the operation was successful
 * @param {String} message - Response message
 * @param {*} data - Response data
 * @param {Object} additional - Additional response fields
 * @returns {Object} Formatted API response
 * 
 * This function creates a consistent response structure for all API endpoints
 * Ensures uniform response format across the application
 */
const createApiResponse = (success, message, data = null, additional = {}) => {
    const response = {
        success,
        message,
        timestamp: new Date().toISOString(),
        ...additional
    };
    
    if (data !== null) {
        response.data = data;
    }
    
    return response;
};

// Export utility functions
// These can be used throughout the application
module.exports = {
    isValidObjectId,
    formatDate,
    getDaysRemaining,
    sanitizeInput,
    generatePagination,
    createApiResponse
};
