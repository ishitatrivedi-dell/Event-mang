const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

// Load environment variables from .env file
// This keeps sensitive data like database URIs and port numbers secure
dotenv.config();

// Initialize Express application
// Express is a web framework for Node.js that simplifies API creation
const app = express();

// Connect to MongoDB database
// This establishes connection before starting the server
connectDB();

// Apply middleware functions
// Middleware functions run between request and response
app.use(express.json()); // Parse incoming JSON requests
app.use(express.urlencoded({ extended: false })); // Parse URL-encoded data

// Define API routes
// All event-related routes will be prefixed with /api/events
app.use('/api/events', require('./routes/eventRoutes'));

// Start the server
// listen() starts the HTTP server on specified port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// Export app for testing purposes
module.exports = app;
