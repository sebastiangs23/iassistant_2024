import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import 'dotenv/config.js';
import './db/config.js';

const server = express();

/*_________________
|   MIDDLEWARES  */
server.use(cors());
server.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
server.use(bodyParser.json({ limit: '50mb' }));
server.use(cookieParser());
server.use(morgan('dev'));
server.use((req: Request, res: Response, next: NextFunction) => {
  res.header('Access-Control-Allow-Origin', '*'); // update to match the domain you will make the request from
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});

/*_____________
|   ROUTES   */
import routes from './routes/index.js';

server.use('/api', routes);

/*_______________________
|   START THE SERVER   */
server.use((err: any, req: Request, res: Response, next: NextFunction) => {
    const status = err.status || 500;
    const message = err.message || err;
    res.status(status).send(message);
});

const PORT = Number(process.env.PORT) || 5099;

server.listen(PORT, '0.0.0.0', () => {
    console.log(`SERVER LISTENING AT PORT ${PORT}.`);
});