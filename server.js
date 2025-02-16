import fetch from 'node-fetch';
import express from 'express';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors'; // Import CORS

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const PORT = process.env.PORT || 3000;

const ACCESS_TOKEN = 'IGAAQQcGv5FSBBZAE5kYktVMFZAUNlZAWTnpkTUNZAZA0tfOW16dGdiQjJnX1hpaGFhQmh1eng0a0xOR01tdDl6MWZAPblExcHQzendUczV5S3VZAMEUzcm5Wby1KaGp3NUxfcV9MT1NLVHNtdFU1WE5xcDJfb2FXTjRHS0VGZAFo4QnBSOAZDZD';
const USER_ID = '17841455020505588';

app.use(cors()); // Use CORS middleware

app.use(express.static(join(__dirname, 'public')));

app.get('/instagram', async (_req, res) => {
    try {
        const response = await fetch(`https://graph.instagram.com/${USER_ID}/media?fields=id,caption,media_type,media_url,thumbnail_url,permalink,timestamp&access_token=${ACCESS_TOKEN}`);
        const data = await response.json();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch Instagram posts' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
