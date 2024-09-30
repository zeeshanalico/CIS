import express, { Request, Response } from 'express';
import cors from 'cors'
import dotenv from 'dotenv'
import logRequest from './middleware/logRequest';
import router from './routes/router'
import path from 'path';
import cookieParser from 'cookie-parser';// cookie-parser automatically parses cookies from the Cookie header of incoming HTTP requests and makes them available in req.cookies. This simplifies accessing cookie data without manual parsing.
import { notFound } from './middleware/notFound';
import { errorHandler } from './middleware/errorHandler';
import { autheticateUser } from './middleware/authenticateUser';

const configFile = path.resolve(`${__dirname}/../${process.env.NODE_ENV === 'development' ? '.env.development' : '.env.production'}`);
dotenv.config({ path: configFile })

const app = express();
const port = process.env.PORT! || 3001;
app.use(cookieParser());
app.use(express.json());
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true// Allow cookies to be sent and received
}))
app.use(logRequest);//logging request in 'logRequest' middleware while logging response in 'responseUtils'

// app.get("/testing",  (req: Request, res: Response) => {
//   console.log(req.path);

//   console.log("req.user: Zeeshan", req.user);
//   res.json({ user: req.user })
// })

app.use('/api', autheticateUser, router);// startWith(/auth | /public) excluded from middleware

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



