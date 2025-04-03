import express, { Express } from 'express';
import cors from 'cors';
import adminRoutes from "./routes/index";
import dotenv from 'dotenv';
import { subdomainMiddleware } from './middlewares/subdomain';

dotenv.config();
const app: Express = express();

app.use(cors());
app.use(express.json());

app.use(subdomainMiddleware);

app.use('/v1', adminRoutes);

export default app;