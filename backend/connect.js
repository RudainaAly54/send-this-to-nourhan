const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config({path: './config.env'});

console.log('ATLAS_URI loaded:', process.env.ATLAS_URI ? 'Yes' : 'No');

// Simple connection with minimal options
const client = new MongoClient(process.env.ATLAS_URI);

let database;

module.exports = {
    connectToServer: async () => {
        try {
            console.log('Attempting to connect to MongoDB...');
            await client.connect();
            console.log('Connected to MongoDB successfully');
            
            // Test the connection
            await client.db("admin").command({ ping: 1 });
            console.log('MongoDB ping successful');
            
            database = client.db("requests");
            console.log('Database "requests" selected');
            
            return database;
        } catch (err) {
            console.error("MongoDB connection error: ", err.message);
            throw err;
        }
    },
    getDb: () => {
        if (!database) {
            console.error('getDb() called but database is not initialized');
            throw new Error("Database not connected! Make sure to call connectToServer() first.");
        }
        return database;
    },
    closeConnection: async () => {
        try {
            await client.close();
            console.log('MongoDB connection closed');
        } catch (err) {
            console.error('Error closing MongoDB connection:', err);
        }
    }
};