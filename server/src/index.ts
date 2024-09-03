import express, { Request, Response } from 'express';
import cors from 'cors'
import dotenv from 'dotenv'
dotenv.config()
import logRequest from './middleware/logRequest';
const notFound = require('./middleware/notFound')
const errorHandler = require('./middleware/errorHandler')
import router from './routes/router'
import path from 'path';
import cookieParser from 'cookie-parser';// cookie-parser automatically parses cookies from the Cookie header of incoming HTTP requests and makes them available in req.cookies. This simplifies accessing cookie data without manual parsing.


const configFile = path.resolve(`${__dirname}/../${process.env.NODE_ENV === 'development' ? '.env.development' : '.env.production'}`);
require('dotenv').config({ path: configFile })

const app = express();
const port = process.env.PORT || 3001;
app.use(cookieParser());
app.use(express.json());
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true// Allow cookies to be sent and received
}))
app.use(logRequest);//logging request in 'logRequest' middleware while logging response in 'responseUtils'


app.use('/api', router);

app.use(notFound, errorHandler);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});


