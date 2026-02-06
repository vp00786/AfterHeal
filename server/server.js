const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const connectDB = require('./config/db');

// Load env vars
dotenv.config();

// Connect to database
// If MONGO_URI is not provided, we will warn but start the server.
// Database connection skipped for Demo Mode (In-Memory)
// if (process.env.MONGO_URI) {
//     connectDB();
// } else {
//     console.warn("⚠️ MONGO_URI not found in .env. Database connection skipped. Some features will fail.");
// }

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/tasks', require('./routes/taskRoutes'));
app.use('/api/records', require('./routes/recordRoutes'));

app.get('/', (req, res) => {
    res.send('AfterHeal API is running...');
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Server Error' });
});

// Cron Job for Alerts
const cron = require('node-cron');
const { checkOverdueTasks } = require('./controllers/taskController');

// Run every minute
cron.schedule('* * * * *', () => {
    console.log('Checking for overdue tasks...');
    checkOverdueTasks();
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
