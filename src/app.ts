import express, { Express } from 'express';
import cors from 'cors';
import adminRoutes from "./routes/index";
import dotenv from 'dotenv';
import { subdomainMiddleware } from './middlewares/subdomain';
import { WebSocketService } from './socket/web';
import http from "http";

dotenv.config();
const app: Express = express();
const server = http.createServer(app);

app.use(cors());
app.use(express.json());

WebSocketService.init(server);
app.use(subdomainMiddleware);

app.use('/v1', adminRoutes);

export { app, server } ;