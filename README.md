# AfterHeal - Medication Adherence App

## Overview
A mobile-first healthcare adherence application connecting Patients, Doctors, and Caregivers.

## Prerequisites
- Node.js
- MongoDB (Must be running locally on port 27017)

## Setup & Run

### 1. Database Setup
Make sure MongoDB is running.
Seed dummy data:
```bash
cd server
npm install
node seed.js
```
This creates 3 test accounts:
- **Doctor**: `doctor@example.com` / `password123`
- **Patient**: `patient@example.com` / `password123`
- **Caregiver**: `caregiver@example.com` / `password123`

### 2. Backend
Start the server (runs on port 5000):
```bash
cd server
npm start
```

### 3. Frontend
Start the React app (runs on port 5173):
```bash
cd client
npm install
npm run dev
```

## Features
- **Patient**: View tasks, mark as complete.
- **Doctor**: Create tasks, assign priority (Critical/Non-critical).
- **Caregiver**: Monitor linked patient, see missed tasks.
- **Alerts**: Background system checks for missed critical tasks.
