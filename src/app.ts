import 'express-async-errors';
import express, { Express } from 'express';
import cors from 'cors';
import adminRoutes from "./routes/index";
import dotenv from 'dotenv';
import { subdomainMiddleware } from './middlewares/subdomain';
import http from "http";
import { errorMiddleware } from './middlewares/error';
import { WebSocketService } from './socket/web';

dotenv.config();
const app: Express = express();
const server = http.createServer(app);

app.use(cors());
app.use(express.json());

app.use(subdomainMiddleware);
WebSocketService.init(server);

app.use('/v1', adminRoutes);
app.use(errorMiddleware);

export { app, server };