const axios = require('axios');

const API_URL = 'http://localhost:5000/api';

const runVerification = async () => {
    try {
        console.log('1. Testing Registration...');
        const uniqueEmail = `dr.test.${Date.now()}@example.com`;
        const registerRes = await axios.post(`${API_URL}/auth/register`, {
            name: 'Dr. Test',
            email: uniqueEmail,
            password: 'password123',
            role: 'doctor'
        });
        console.log('✅ Registration Successful:', registerRes.data.email);

        console.log('\n2. Testing Login...');
        const loginRes = await axios.post(`${API_URL}/auth/login`, {
            email: uniqueEmail,
            password: 'password123'
        });
        const token = loginRes.data.token;
        console.log('✅ Login Successful. Token received.');

        console.log('\n3. Testing Task Creation (Supabase)...');
        // Use the newly created doctor's ID as the patient ID for testing (to satisfy FK)
        const patientId = registerRes.data._id;

        const taskRes = await axios.post(`${API_URL}/tasks`, {
            title: 'Verify Supabase Migration',
            description: 'Automated test task',
            type: 'Checkup',
            priority: 'normal',
            patientId: patientId,
            scheduledTime: new Date().toISOString()
        }, {
            headers: { Authorization: `Bearer ${token}` }
        });
        console.log('✅ Task Created via Supabase:', taskRes.data.title);

        console.log('\n🎉 VALIDATION COMPLETE: Backend is successfully connected to Supabase!');
    } catch (error) {
        console.error('❌ Verification Failed:', error.response ? error.response.data : error.message);
        process.exit(1);
    }
};

runVerification();
