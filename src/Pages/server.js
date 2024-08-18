const express = require('express');
const multer = require('multer');
const twilio = require('twilio');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const upload = multer({ dest: 'uploads/' });

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

app.post('/upload', upload.single('file'), (req, res) => {
    // In a real-world application, you would upload the file to cloud storage
    const fileUrl = `http://localhost:5000/uploads/${req.file.filename}`; // Example URL
    res.json({ fileUrl });
});

app.post('/send-whatsapp', async (req, res) => {
    const { imageUrl, toPhoneNumber } = req.body;

    try {
        const message = await client.messages.create({
            body: 'Here is your certificate!',
            from: 'whatsapp:+14155238886', // Replace with your Twilio WhatsApp number
            to: 'whatsapp:+918939889107',
            mediaUrl: [imageUrl],
        });

        res.json({ sid: message.sid });
    } catch (error) {
        console.error('Error sending message:', error);
        res.status(500).json({ error: error.message });
    }
});

app.listen(5000, () => {
    console.log('Server is running on port 5000');
});
