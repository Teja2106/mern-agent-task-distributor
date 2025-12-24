import express from 'express';
import cors from 'cors';

const app = express();

app.use(cors());

app.get('/api/test', (req, res) => {
    return res.status(200).json({ message: 'Test Successful' });
});

app.listen(3000, () => {
    console.log('Server is running on port 3000')
})