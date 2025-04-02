import express, { Express } from 'express';
import cors from 'cors';
import adminRoutes from "./routes/index";
import dotenv from 'dotenv';

dotenv.config();
const app: Express = express();

app.use(cors());
app.use(express.json());

app.use('/v1', adminRoutes);


export default app;