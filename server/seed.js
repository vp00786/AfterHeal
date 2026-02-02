const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');
const Task = require('./models/Task');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

const importData = async () => {
    try {
        await User.deleteMany();
        await Task.deleteMany();

        const doctor = await User.create({
            name: 'Dr. Smith',
            email: 'doctor@example.com',
            password: 'password123',
            role: 'doctor'
        });

        const patient = await User.create({
            name: 'John Doe',
            email: 'patient@example.com',
            password: 'password123',
            role: 'patient',
            assignedDoctor: doctor._id
        });

        const caregiver = await User.create({
            name: 'Jane Doe',
            email: 'caregiver@example.com',
            password: 'password123',
            role: 'caregiver',
            relatedPatient: patient._id
        });

        // Create tasks
        const tasks = [
            {
                title: 'Morning Medicine',
                description: 'Take 2 pills of Aspirin',
                type: 'medication',
                priority: 'critical',
                patient: patient._id,
                assignedBy: doctor._id,
                scheduledTime: new Date(new Date().setHours(new Date().getHours() + 1)), // 1 hour from now
            },
            {
                title: 'Evening Walk',
                description: 'Walk for 30 mins',
                type: 'exercise',
                priority: 'non-critical',
                patient: patient._id,
                assignedBy: doctor._id,
                scheduledTime: new Date(new Date().setHours(new Date().getHours() + 5)),
            },
            {
                title: 'Missed Medicine (Test)',
                description: 'This task is in the past',
                type: 'medication',
                priority: 'critical',
                patient: patient._id,
                assignedBy: doctor._id,
                scheduledTime: new Date(new Date().setHours(new Date().getHours() - 2)), // 2 hours ago
            }
        ];

        await Task.insertMany(tasks);

        console.log('Data Imported!');
        console.log('Test Accounts:');
        console.log('Doctor: doctor@example.com');
        console.log('Patient: patient@example.com');
        console.log('Caregiver: caregiver@example.com');
        console.log('Password: password123');

        process.exit();
    } catch (error) {
        console.error(`${error}`);
        process.exit(1);
    }
};

importData();
