import express, { Request, Response } from 'express';
import cors from 'cors'
import dotenv from 'dotenv'
import logRequest from './middleware/logRequest';
import router from './routes/router'
import path from 'path';
import cookieParser from 'cookie-parser';
import { notFound } from './middleware/notFound';
import { errorHandler } from './middleware/errorHandler';
import { autheticateUser } from './middleware/authenticateUser';
import whitelist from './info/whitelist';
const configFile = path.resolve(`${__dirname}/../${process.env.NODE_ENV === 'development' ? '.env.development' : '.env.production'}`);
dotenv.config({ path: configFile })

const app = express();
const port = process.env.PORT! || 3001;

app.use(cors({
  origin: whitelist,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],  // Allow preflight
  allowedHeaders: ['Content-Type', 'Authorization']     // Allow custom headers
}))
app.use(cookieParser());
app.use(express.json());
app.use(logRequest);

const staticDir = path.resolve(__dirname, '../uploads/productsImages');
app.use('/uploads/productsImages', express.static(staticDir));
app.use('/api', autheticateUser, router);// startWith(/auth | /public) excluded from middleware

const frontendDir = path.resolve(__dirname, 'public');
app.use(express.static(frontendDir));

app.get('*', (req: Request, res: Response) => {
  res.sendFile(path.join(frontendDir, 'index.html'));
});
app.use(notFound, errorHandler);

console.log('process.env.NODE_ENV: ', process.env.NODE_ENV);

const server = app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

server.on('error', (err: unknown) => {
  if (err instanceof Error) {
    if ((err as any).code === 'EADDRINUSE') {
      console.log(`Port ${port} is already in use run the following command to use a different port:\nnpm run dev -- --port <port>\n\t\tor \nnetstat -ano | findstr :<port> \nStop-Process -Id <process_id> -Force`);
    } else {
      console.error(`Server error: ${err.message}`);
    }
  } else {
    console.error('Unknown error occurred:', err);
  }
});



