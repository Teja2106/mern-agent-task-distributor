import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import authRouter from './routes/auth.routes';
import protectedDashboard from './routes/protected.routes';
import { connectDB } from './config/db';
import addAgentRouter from './routes/add-agent.route';
import agentsRouter from './routes/agents.route';

const app = express();

await connectDB();

app.use(cors({
    origin: ['http://localhost:5173', 'http://localhost:4173'],
    credentials: true
}));

app.use(express.json());
app.use(cookieParser());

app.use('/api', authRouter);
app.use('/api', protectedDashboard);
app.use('/api', addAgentRouter);
app.use('/api', agentsRouter);

app.listen(3000, () => {
    console.log('Server is running on port 3000')
});