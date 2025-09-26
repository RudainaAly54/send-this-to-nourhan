const connect = require("./connect");
const express = require('express');
const cors = require('cors');
const requests = require("./requestsRoutes");
const points = require("./pointsRoutes");

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Root route for testing
app.get("/", (req, res) => {
    res.json({ message: "Server is running!", timestamp: new Date().toISOString() });
});

// Start server function
async function startServer() {
    try {
        console.log('Starting server...');
        
        // Connect to database FIRST
        console.log('Connecting to database...');
        await connect.connectToServer();
        console.log('Database connection established');
        
        // ONLY add routes after database is connected
        app.use('/requests', requests);
        app.use('/points', points);
        console.log('Routes registered');
        
        // Error handling middleware (add after routes)
        app.use((err, req, res, next) => {
            console.error('Server error:', err);
            res.status(500).json({ error: 'Internal server error', details: err.message });
        });
        
        // 404 handler
        app.use((req, res) => {
            res.status(404).json({ error: 'Route not found' });
        });
        
        // Start listening
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
            console.log(`Access your API at:`);
            console.log(`- Root: http://localhost:${PORT}/`);
            console.log(`- Requests: http://localhost:${PORT}/requests`);
            console.log(`- Points: http://localhost:${PORT}/points`);
        });
        
    } catch (error) {
        console.error('Failed to start server:', error);
        console.error('Error details:', error.message);
        process.exit(1);
    }
}

// Handle process termination
process.on('SIGINT', async () => {
    console.log('Shutting down server...');
    await connect.closeConnection();
    process.exit(0);
});

// Start the server
startServer();