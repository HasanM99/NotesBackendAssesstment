import express from 'express';
import mongoose from 'mongoose';
import rateLimit from 'express-rate-limit';
import auth from './routes/auth.js'; // Import the auth routes
import notes from './routes/notes.js'; // Import the notes routes

const app = express();
const port = 3000;

// Add these lines
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.use('/api/auth', auth); // Use the auth routes
app.use('/api/notes', notes);

// Establish a connection to your MongoDB database
const dbConnection = mongoose.connect('mongodb://localhost:27017/Notes', { 
  bufferCommands: false // Disable mongoose buffering
});


dbConnection.then(() => {
    console.log('Connected to MongoDB');
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
}).catch(err => console.error('Could not connect to MongoDB...', err));
  

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});

app.use(limiter);

// Your other middleware and route configurations go here

export default app; // Export the Express app instance using ES6 syntax
