import express, { type Application } from 'express';
import noteRoutes from './routes/note.route.js'
import cors from 'cors';
const app: Application = express();

app.use(express.json());
app.use(cors({
    origin: process.env.APP_URL || true,
    methods: ['POST', 'GET', 'PUT', 'DELETE']
}));

app.use('/api/notes', noteRoutes)


export default app;
