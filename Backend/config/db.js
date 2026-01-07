const mongoose = require('mongoose');

/**
 * Connect to MongoDB database
 * This function establishes connection between our app and MongoDB
 */
const connectDB = async () => {
    try {
        // mongoose.connect() creates connection to MongoDB
        // First parameter: MongoDB connection string from environment variables
        // Second parameter: Connection options for better performance and reliability
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,    // Use new URL parser
            useUnifiedTopology: true // Use new server discovery engine
        });

        console.log(`MongoDB Connected: ${conn.connection.host}`);
        
    } catch (error) {
        // Handle connection errors
        // Log error and exit process if connection fails
        console.error(`Error: ${error.message}`);
        process.exit(1); // Exit with failure code
    }
};

// Export the connection function
// This allows other files to use this database connection
module.exports = connectDB;
