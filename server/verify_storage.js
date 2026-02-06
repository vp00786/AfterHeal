const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');
const path = require('path');

const API_URL = 'http://localhost:5000/api';

const runVerification = async () => {
    try {
        console.log('1. Logging in...');
        // Login with the doctor account created earlier
        // (Assuming you have a valid user, otherwise register one)
        // Let's just register a new temp user to be safe and autonomous
        const uniqueEmail = `storage.test.${Date.now()}@example.com`;

        await axios.post(`${API_URL}/auth/register`, {
            name: 'Storage Tester',
            email: uniqueEmail,
            password: 'password123',
            role: 'patient'
        });

        const loginRes = await axios.post(`${API_URL}/auth/login`, {
            email: uniqueEmail,
            password: 'password123'
        });
        const token = loginRes.data.token;
        const userId = loginRes.data._id;
        console.log('✅ Login Successful');

        console.log('\n2. Creating dummy file...');
        const filePath = path.join(__dirname, 'test_record.txt');
        fs.writeFileSync(filePath, 'This is a test medical record content.');

        console.log('\n3. Uploading file...');
        const form = new FormData();
        form.append('file', fs.createReadStream(filePath));
        form.append('title', 'Test Record');
        form.append('description', 'Automated upload test');

        const uploadRes = await axios.post(`${API_URL}/records/upload`, form, {
            headers: {
                ...form.getHeaders(),
                Authorization: `Bearer ${token}`
            }
        });
        console.log('✅ Upload Successful:', uploadRes.data.title);

        console.log('\n4. Verifying Fetch...');
        const fetchRes = await axios.get(`${API_URL}/records/${userId}`, {
            headers: { Authorization: `Bearer ${token}` }
        });

        if (fetchRes.data.length > 0 && fetchRes.data[0].file_url) {
            console.log('✅ Fetch Successful. Signed URL generated:', fetchRes.data[0].file_url.substring(0, 50) + '...');
        } else {
            throw new Error('Record not found or URL missing');
        }

        console.log('\n🎉 STORAGE CHECK PASSED: Bucket and Table are working!');

        // Cleanup
        fs.unlinkSync(filePath);

    } catch (error) {
        console.error('❌ Verification Failed:', error.response ? error.response.data : error.message);
    }
};

runVerification();
