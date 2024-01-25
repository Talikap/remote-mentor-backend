require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const { createServer } = require('node:http');
const path = require('path');
const cors = require('cors');
const codeBlockRoutes = require('./routes/codeblocks');
const socketHandler = require('./socketHandler');

// Express app
const app = express();
app.use(express.json());

// Enable CORS for development (replace with your React app's URL in production)
if (process.env.NODE_ENV === 'development') {
  const corsOptions = {
    origin: ['http://127.0.0.1:3000', 'http://localhost:3000'],
    credentials: true,
  };
  app.use(cors(corsOptions));
}

// Serve static files in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.resolve(__dirname, 'public')));
}

// Define API routes
app.use('/api/codeblocks', codeBlockRoutes);

// Serve index.html for any other routes (client-side routing)
app.get('/**', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    // Create HTTP server
    const server = createServer(app);

    // Integrate socket handling
    socketHandler(server);

    // Listen for requests
    const port = process.env.PORT || 4000;
    server.listen(port, "0.0.0.0", () => {
      console.log(`Connected to db & listening on port ${port}`);
    });
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
  });
