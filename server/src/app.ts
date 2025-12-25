import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import loginRoute from './routes/auth.routes';
import protectedDashboard from './routes/protected.routes';

const app = express();

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());

app.use('/api', loginRoute);
app.use('/api', protectedDashboard);

app.listen(3000, () => {
    console.log('Server is running on port 3000')
});